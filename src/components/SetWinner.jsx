import { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function SetWinner() {
  const [matches, setMatches] = useState([]);
  const [winners, setWinners] = useState({});
  const comp = useRef();

  useGSAP(() => {
    gsap.from(comp.current, {
      x: -50,
      opacity: 0,
      duration: 0.6,
      delay: 0.4,
    });
  });

  useEffect(() => {
    const fetchMatches = async () => {
      const snapshot = await getDocs(collection(db, "matches"));
      setMatches(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    };
    fetchMatches();
  }, []);

  const handleSetWinner = async (matchId) => {
    if (winners[matchId]) {
      await updateDoc(doc(db, "matches", matchId), {
        winner: winners[matchId],
      });
    }
  };

  return (
    <div ref={comp} className="glass-card p-6 max-w-md mx-auto">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center">
        <i className="ri-trophy-line mr-2 text-[var(--primary)]"></i>
        Set Winners
      </h3>

      <div className="space-y-4">
        {matches.map((match) => (
          <div key={match.id} className="bg-white/5 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                {match.player1}{" "}
                <span className="text-[var(--primary)] mx-2">vs</span>{" "}
                {match.player2}
              </span>
              {match.winner && (
                <span className="text-emerald-400 text-sm">
                  Winner: {match.winner}
                </span>
              )}
            </div>

            <div className="flex gap-2">
              <select
                className="input-field flex-1"
                value={winners[match.id] || ""}
                onChange={(e) =>
                  setWinners({ ...winners, [match.id]: e.target.value })
                }
              >
                <option value="">Select Winner</option>
                <option value={match.player1}>{match.player1}</option>
                <option value={match.player2}>{match.player2}</option>
              </select>

              <button
                onClick={() => handleSetWinner(match.id)}
                className="btn-primary px-4 py-2"
                disabled={!winners[match.id]}
              >
                Save
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

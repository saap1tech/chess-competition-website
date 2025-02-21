import { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const comp = useRef();

  useGSAP(
    () => {
      gsap.from(".match-card", {
        stagger: 0.1,
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
      });
    },
    { scope: comp }
  );

  useEffect(() => {
    const fetchMatches = async () => {
      const snapshot = await getDocs(collection(db, "matches"));
      setMatches(snapshot.docs.map((d) => d.data()));
    };
    fetchMatches();
  }, []);

  return (
    <div ref={comp} className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Current Matches</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {matches.map((match, index) => (
          <div
            key={index}
            className="match-card glass-card p-6 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)/20] to-[var(--secondary)/20]"></div>
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-semibold">
                <span className="text-white">{match.player1}</span>
                <span className="mx-2 text-gray-400">vs</span>
                <span className="text-white">{match.player2}</span>
              </div>
            </div>
            {match.winner && (
              <div className="flex items-center text-emerald-400">
                <i className="ri-trophy-fill mr-2"></i>
                Winner: {match.winner}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

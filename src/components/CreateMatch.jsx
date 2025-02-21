import { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function CreateMatch() {
  const [participants, setParticipants] = useState([]);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [error, setError] = useState("");
  const comp = useRef();

  useGSAP(() => {
    gsap.from(comp.current, {
      x: -50,
      opacity: 0,
      duration: 0.6,
      delay: 0.2,
    });
  });

  useEffect(() => {
    const fetchParticipants = async () => {
      const snapshot = await getDocs(collection(db, "participants"));
      setParticipants(snapshot.docs.map((doc) => doc.data().name));
    };
    fetchParticipants();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!player1 || !player2) {
      setError("Please select both players");
      return;
    }

    if (player1 === player2) {
      setError("Players must be different");
      return;
    }

    await addDoc(collection(db, "matches"), {
      player1,
      player2,
      winner: null,
    });
    setPlayer1("");
    setPlayer2("");
  };

  return (
    <div ref={comp} className="glass-card p-6 max-w-md mx-auto">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center">
        <i className="ri-boxing-line mr-2 text-[var(--primary)]"></i>
        Create Match
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <select
            className="input-field w-full"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
          >
            <option value="">Select Player 1</option>
            {participants.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>

          <select
            className="input-field w-full"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
          >
            <option value="">Select Player 2</option>
            {participants.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          className="btn-primary w-full"
          disabled={!player1 || !player2 || player1 === player2}
        >
          Create Match
        </button>
      </form>
    </div>
  );
}

import { useRef, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function AddParticipant() {
  const [name, setName] = useState("");
  const comp = useRef();

  useGSAP(() => {
    gsap.from(comp.current, {
      x: -50,
      opacity: 0,
      duration: 0.6,
      delay: 0.2,
    });
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name) {
      await addDoc(collection(db, "participants"), { name });
      setName("");
    }
  };

  return (
    <div ref={comp} className="glass-card p-6 max-w-md mx-auto">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center">
        <i className="ri-user-add-line mr-2 text-[var(--primary)]"></i>
        Add Participant
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="input-field w-full"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Participant name"
        />
        <button type="submit" className="btn-primary cursor-pointer w-full">
          Add Participant
        </button>
      </form>
    </div>
  );
}

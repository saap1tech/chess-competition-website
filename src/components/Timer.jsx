import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function ChessTimer() {
  const [time, setTime] = useState(null);
  const [playerOneTime, setPlayerOneTime] = useState(0);
  const [playerTwoTime, setPlayerTwoTime] = useState(0);
  const [activePlayer, setActivePlayer] = useState(null);
  const [gameFinished, setGameFinished] = useState(false);
  const [playerOneName, setPlayerOneName] = useState("");
  const [playerTwoName, setPlayerTwoName] = useState("");
  const [playerOneOpening, setPlayerOneOpening] = useState("");
  const [playerTwoOpening, setPlayerTwoOpening] = useState("");

  useEffect(() => {
    if (activePlayer === "one") {
      const interval = setInterval(() => {
        setPlayerOneTime((prev) => Math.max(prev - 1, 0));
      }, 1000);
      return () => clearInterval(interval);
    } else if (activePlayer === "two") {
      const interval = setInterval(() => {
        setPlayerTwoTime((prev) => Math.max(prev - 1, 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [activePlayer]);

  useEffect(() => {
    if (playerOneTime === 0 && playerTwoTime === 0 && time !== null) {
      setGameFinished(true);
    }
  }, [playerOneTime, playerTwoTime]);

  const startGame = (selectedTime) => {
    setTime(selectedTime);
    setPlayerOneTime(selectedTime * 60);
    setPlayerTwoTime(selectedTime * 60);
    setActivePlayer("one");
  };

  const switchPlayer = () => {
    setActivePlayer((prev) => (prev === "one" ? "two" : "one"));
  };

  const finishGame = () => {
    setGameFinished(true);
  };

  const handleSubmit = async () => {
    await addDoc(collection(db, "openings"), {
      playerOne: playerOneName,
      playerTwo: playerTwoName,
      playerOneOpening,
      playerTwoOpening,
      timestamp: new Date(),
    });
    setPlayerOneName("");
    setPlayerTwoName("");
    setPlayerOneOpening("");
    setPlayerTwoOpening("");
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  if (time === null) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <h1 className="text-3xl mb-6">Select Match Time</h1>
        <div className="flex gap-4">
          {[10, 20, 30].map((t) => (
            <button
              key={t}
              className="btn-primary"
              onClick={() => startGame(t)}
            >
              {t} min
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (gameFinished) {
    return (
      <div className="h-screen flex flex-col">
        <div className="flex-1 flex flex-col p-10 items-center justify-center text-xl font-bold bg-blue-600 text-white">
          <input
            className="input-field w-full mb-4"
            type="text"
            value={playerOneName}
            onChange={(e) => setPlayerOneName(e.target.value)}
            placeholder="Player One Name"
          />
          <input
            className="input-field w-full mb-4"
            type="text"
            value={playerOneOpening}
            onChange={(e) => setPlayerOneOpening(e.target.value)}
            placeholder="Played Opening"
          />
        </div>
        <div className="flex-1 flex flex-col p-10 items-center justify-center text-xl font-bold bg-red-600 text-white">
          <input
            className="input-field w-full mb-4"
            type="text"
            value={playerTwoName}
            onChange={(e) => setPlayerTwoName(e.target.value)}
            placeholder="Player Two Name"
          />
          <input
            className="input-field w-full mb-4"
            type="text"
            value={playerTwoOpening}
            onChange={(e) => setPlayerTwoOpening(e.target.value)}
            placeholder="Played Opening"
          />
        </div>
        <button
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-3 text-black/75 rounded-lg font-semibold bg-white hover:scale-105 cursor-pointer"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <div
        className={`flex-1 flex items-center justify-center text-4xl font-bold cursor-pointer ${
          activePlayer === "one" ? "bg-blue-600" : "bg-blue-800"
        } text-white`}
        onClick={switchPlayer}
      >
        {formatTime(playerOneTime)}
      </div>
      <div
        className={`flex-1 flex items-center justify-center text-4xl font-bold cursor-pointer ${
          activePlayer === "two" ? "bg-red-600" : "bg-red-800"
        } text-white`}
        onClick={switchPlayer}
      >
        {formatTime(playerTwoTime)}
      </div>
      <button
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-3 text-black/75 rounded-lg font-semibold bg-white hover:scale-105 cursor-pointer"
        onClick={finishGame}
      >
        Finish
      </button>
    </div>
  );
}

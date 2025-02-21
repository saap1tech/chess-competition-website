import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import AddParticipant from "./components/AddParticipant";
import CreateMatch from "./components/CreateMatch";
import SetWinner from "./components/SetWinner";
import Matches from "./components/Matches";
import ChessTimer from "./components/Timer";

export default function App() {
  useGSAP(() => {
    gsap.from("nav", {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    gsap.from(".container", {
      opacity: 0,
      y: 50,
      delay: 0.3,
      duration: 0.8,
      ease: "power2.out",
    });
  });

  return (
    <Router>
      {/*<nav className="glass-card fixed w-full top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex space-x-6">
          <Link
            to="/admin"
            className="text-white/80 hover:text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/5"
          >
            <i className="ri-dashboard-line mr-2"></i>
            Admin
          </Link>
          <Link
            to="/matches"
            className="text-white/80 hover:text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/5"
          >
            <i className="ri-trophy-line mr-2"></i>
            Matches
          </Link>
          <Link
            to="/ChessTimer"
            className="text-white/80 hover:text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/5"
          >
            <i className="ri-trophy-line mr-2"></i>
            Timer
          </Link>
        </div>
      </nav>*/}

      <div className="container mx-auto px-4 pt-20 pb-8">
        <Routes>
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<AddParticipant />} />
            <Route path="create-match" element={<CreateMatch />} />
            <Route path="set-winner" element={<SetWinner />} />
          </Route>
          <Route path="/matches" element={<Matches />} />
          <Route path="/ChessTimer" element={<ChessTimer />} />
        </Routes>
      </div>
    </Router>
  );
}

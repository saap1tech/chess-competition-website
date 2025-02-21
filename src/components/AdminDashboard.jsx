import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import { Outlet, Link } from "react-router-dom";

export default function AdminDashboard() {
  const comp = useRef();

  useGSAP(() => {
    gsap.from(comp.current, {
      opacity: 0,
      y: 30,
      duration: 0.6,
    });
  });

  return (
    <div ref={comp} className="space-y-8">
      <h2 className="text-3xl font-bold text-white text-center">
        Tournament Dashboard
      </h2>
      <nav className="flex justify-center gap-4 flex-wrap">
        {[
          { to: "/admin", text: "Add Participants", icon: "ri-user-line" },
          {
            to: "/admin/create-match",
            text: "Create Match",
            icon: "ri-sword-line",
          },
          {
            to: "/admin/set-winner",
            text: "Set Winners",
            icon: "ri-medal-line",
          },
        ].map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="glass-card px-6 py-3 flex items-center gap-2 text-white/80 hover:bg-white/10"
          >
            <i className={`${link.icon} text-[var(--primary)]`}></i>
            {link.text}
          </Link>
        ))}
      </nav>
      <div className="glass-card p-6">
        <Outlet />
      </div>
    </div>
  );
}

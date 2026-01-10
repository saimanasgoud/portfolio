// import { NavLink } from 'react-router-dom';
// // import logo from '/portfolio.jpg';
// import Certificate from './Certificate'
// import './Navbar.css'
// import { useState, useEffect } from 'react';

// export default function Navbar() {
//   const [showGreeting, setShowGreeting] = useState(true);

//   const getGreeting = () => {
//   const hour = new Date().getHours();
//   if (hour >= 5 && hour < 12) return "🌞 Good morning! Explore my portfolio!";
//   else if (hour >= 12 && hour < 17) return "🌤️ Good afternoon! Check out my portfolio";
//   else if (hour >= 17 && hour < 21) return "🌆 Good evening! Keep exploring!";
//   else return "🌜 Night owl spotted! Thanks for visiting!";
// };

// useEffect(() => {
//   const timer = setTimeout(() => setShowGreeting(false), 10000); // hide after 10s
//   return () => clearTimeout(timer);
// }, []);
//   return (
//   <>
//     <nav className="flex mt-0 h-15 justify-between items-center navbar">
//       <div>
//         {/* <img src={logo} alt="Logo" className="h-12 rounded-full" /> */}
//         {/* <h1 className=" name text-xl font-bold text-blue-600 float-3d">
//           Godishela Sai Manas Goud
//         </h1> */}
//       </div>
//       <div className="flex space-x-1">
//         {/* <NavLink
//           to="/resume"
//           className="px-2 py-2 border border-blue-600 text-red-600 font-medium rounded-xl shadow-sm hover:bg-purple-600 hover:text-white transition duration-300"
//         >
//           Resume
//         </NavLink> */}

//         {/* Toggle Resume View/Download Buttons */}
//         <NavLink
//           to="/"
//           className="px-2 py-2 border border-orange-600 text-blue-600 font-medium rounded-xl shadow-sm hover:bg-green-400 hover:text-white transition duration-300"
//         >
//           Home
//         </NavLink>

//         {/* MessageBoard */}
//           <NavLink
//           to="/InteractionPoint"
//           className="px-2 py-2 border border-blue-600 text-blue-600 font-medium rounded-xl shadow-sm hover:bg-blue-600 hover:text-white transition duration-300"
//         >
//           connect
//         </NavLink>
//           {/* <button
//             onClick={() => setShowResumeButtons(!showResumeButtons)}
//             className="px-2 py-2 border border-blue-600 text-red-600 font-medium rounded-xl cursor-pointer shadow-sm hover:bg-red-300 hover:text-white transition duration-300"
//           >
//             Resume
//           </button> */}

//         <NavLink
//           to="/skillset"
//           className="px-2 py-2 border border-purple-600 text-purple-600 font-medium rounded-xl shadow-sm hover:bg-purple-600 hover:text-white transition duration-300"
//         >
//           Skillset
//         </NavLink>
//         <NavLink
//           to="/certificate"
//           className="px-2 py-2 border border-yellow-500 text-yellow-600 font-medium rounded-xl shadow-sm hover:bg-yellow-500 hover:text-white transition duration-300"
//         >
//           Certificate
//         </NavLink>

//         <NavLink
//           to="/resume"
//           className="px-2 py-2 border border-green-600 text-green-600 font-medium rounded-xl shadow-sm hover:bg-green-600 hover:text-white transition duration-300"
//         >
//           Resume
//         </NavLink>
//       </div>
//     </nav>

//           {/* Resume Buttons */}
//       {/* {showResumeButtons && (
//         <div className="flex justify-center mt-6 pt-15 space-x-5">
//           <a
//             href="/saimanas/SaimanasResume.pdf"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-blue-700 transition"
//           >
//             View
//           </a>
//           <a
//             href="/saimanas/SaimanasResume.pdf"
//             download
//             className="px-4 py-2 border-3 bg-green-400 border-blue-600 text-blue-800 rounded-lg hover:bg-blue-100 transition"
//           >
//             Download
//           </a>
//         </div>
//       )} */}

// {showGreeting && (
// <div className="fixed top-20 left-10 p-3 bg-yellow-200 text-gray-800 rounded shadow-lg animate-slide-in z-10">
//   {getGreeting()}
// </div>
// )}
//     </>

//   );
// }


import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [time, setTime] = useState(new Date());
  const [menuOpen, setMenuOpen] = useState(false);
  const [greeting, setGreeting] = useState("");


  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // ⏰ Update time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 60000); // every 1 minute

    return () => clearInterval(interval);
  }, []);

  // 🌞 Time-based Greeting Logic
  useEffect(() => {
    const hour = time.getHours();

    if (hour >= 5 && hour < 12) {
      setGreeting("🌞 Good Morning");
    } else if (hour >= 12 && hour < 16) {
      setGreeting("🌤️ Good Afternoon");
    } else if (hour >= 16 && hour < 20) {
      setGreeting("🌆 Good Evening");
    } else {
      setGreeting("🌙 Good Night");
    }
  }, [time]);

  const date = time.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const clock = time.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <>
      {/* LEFT SLIDE MENU */}
      <div className={`collapse-panel ${menuOpen ? "show" : ""}`}>
        <div className="menu-top">
          <span className="close-icon" onClick={() => setMenuOpen(false)}>
            ✖
          </span>
        </div>
        <NavLink to="/" onClick={() => setMenuOpen(false)} className="nav-link">Home</NavLink>
        <NavLink to="/about" onClick={() => setMenuOpen(false)} className="nav-link">About</NavLink>
        <NavLink to="/skillset" onClick={() => setMenuOpen(false)} className="nav-link">Skillset</NavLink>
        <NavLink to="/InteractionPoint" onClick={() => setMenuOpen(false)} className="nav-link">Message Online</NavLink>
        <NavLink to="/certificate" onClick={() => setMenuOpen(false)} className="nav-link">Certificate</NavLink>
        <NavLink to="/resume" onClick={() => setMenuOpen(false)} className="nav-link">Resume</NavLink>
        <NavLink to="/projects" onClick={() => setMenuOpen(false)} className="nav-link">Projects</NavLink>
        <NavLink to="/game" onClick={() => setMenuOpen(false)} className="nav-link">Play Game</NavLink>
        <NavLink to="/ConnectMe" onClick={() => setMenuOpen(false)} className="nav-link">Connect Me</NavLink>
        <NavLink to="/technical-skills" onClick={() => setMenuOpen(false)} className="nav-link">Technical Skills</NavLink>
        <NavLink to="/blog" onClick={() => setMenuOpen(false)} className="nav-link">Blog</NavLink>
        <NavLink to="/faq" onClick={() => setMenuOpen(false)} className="nav-link">FAQ</NavLink>

        <button className="menu-close-btn" onClick={() => setMenuOpen(false)}>
          Close Menu
        </button>
      </div>

      {/* MAIN NAVBAR */}
      <nav className="main-navbar">
        {/* TOGGLER */}
        <button
          className="navbar-toggler"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>

        {/* DATE & TIME SIDE BY SIDE */}
        <div className="date">
          <span>📅 {date}</span>
        </div>
        <div className="clock">
          <span>⏰ {clock}</span>
        </div>

        {/* 🌞 GREETING */}
        <div className="greeting">
          {greeting}
        </div>
      </nav>
    </>
  );
}

import { useState, useEffect } from "react";
import logo from '/portfolio.jpg';

export default function Intro() {
  const [showFullText, setShowFullText] = useState(false);
  const [bgColor, setBgColor] = useState("");
  const [showStayMessage, setshowStayMessage] = useState(""); 

  const handleToggleText = () => setShowFullText(!showFullText);

  const shortText = "Hi there! 👋 Welcome to my digital space! I’m a passionate Full‑Stack Developer...";
  const fullText = `Hi there! 👋  Welcome to my digital space! I’m a passionate Full‑Stack Developer with a
   strong interest in software engineering and hands-on 
experience in building scalable web applications. With a solid foundation 
in both frontend and backend technologies, I’ve worked with databases such
as MySQL to deliver efficient, secure, and responsive solutions.`;

  const accentColors = [
    "#fef9c3", "#d1fae5", "#c3e0e3ff", "#fde2e4", "#e0f2fe", "#fef2f2"
  ];

  // Background color animation
  useEffect(() => {
    const colorInterval = setInterval(() => {
      const randomColor = accentColors[Math.floor(Math.random() * accentColors.length)];
      setBgColor(randomColor);
    }, 5000);
    return () => clearInterval(colorInterval);
  }, []);

  return (
    <main className="screen items-center justify-center text-center space-y-10 px-0 pt-10 md:px-10 mt-0">
      {/* Hero Section */}
      <section 
        style={{ backgroundColor: bgColor, transition: 'background-color 1s ease' }}
        className="w-full py-8"
      >
        <img 
          src={logo} 
          alt="Profile" 
          className="w-48 h-48 rounded-full mx-auto mb-0 object-cover animate-bounce-in"
        />

        <h1 className="text-2xl md:text-4xl p-4 font-extrabold text-yellow-400 mb-4 typewriter">
          Godishela Sai Manas Goud
        </h1>

        <div className="px-6 md:px-0 max-w-3xl mx-auto">
          <p className="text-lg text-gray-700 cursor-pointer mb-4 cursor-pointer">
            {showFullText ? fullText : shortText}
          </p>
          <button 
            onClick={handleToggleText}
            className="text-blue-600 font-semibold hover:underline mb-6 cursor-pointer"
          >
            {showFullText ? "Show Less" : "Show More"}
          </button>

          <div className="mt-6 flex justify-center gap-4">
            <a
              href="#projects"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-100 transition hover:scale-105"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

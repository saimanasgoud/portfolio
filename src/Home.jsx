import "./Home.css"
import { useEffect, useState } from "react";
import Intro from './Intro';
import AboutMe from './AboutMe';
import Projects from './Projects';
import Connect from './Connect';
import Skills from './TechnicalScills';

export default function Home() {
  const [showStayMessage, setshowStayMessage] = useState("");
  const [CurrentMessage, setCurrentMessage] = useState("");
  const [tipMessage, setTipMessage] = useState("");
  const [showTip, setShowTip] = useState(false);
  const [bgColor, setBgColor] = useState("#fef9c3");
  const [sectionColors, setSectionColors] = useState({});

  const messages = [
    "💚 Thanks for taking the time to explore my portfolio!",
    "👋 I appreciate you spending a moment to check out my work!",
    "🙏 Thank you for your time — it means a lot to me!",
    "🌟 Your interest in my journey truly motivates me. Thanks for visiting!",
    "💼 Thanks for stopping by and exploring what I love to build!",
    "💻 You’ve unlocked: 'Dedicated Viewer' — thanks for exploring my code world!",
    "🚀 Thanks for diving deep into my portfolio — you’re awesome!",
    "🧠 Thanks for debugging through my projects and story!",
    "🪄 Your curiosity keeps developers like me inspired — thank you!"
  ];

  const tips = [
    "💡 Tip: Check out my Projects section!",
    "🚀 Did you see my Portfolio Website project?",
    "👀 Hover over skillset to see more details!",
    "🌟 Don’t forget to connect with me on LinkedIn!",
    "✨ Scroll down to see all my core skills.",
    "🌐 Explore my GitHub for more projects!",
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "🌞 Good morning! Explore my portfolio!";
    else if (hour >= 12 && hour < 17) return "🌤️ Good afternoon! Check out my projects!";
    else if (hour >= 17 && hour < 21) return "🌆 Good evening! Keep exploring!";
    else return "🌜 Night owl spotted! Thanks for visiting!";
  };

  const accentColors = [
    "#fef9c3", // soft yellow
    "#d1fae5", // soft green
    "#c3e0e3ff", // soft cyan
    "#fde2e4", // soft pink
    "#e0f2fe", // soft blue
    "#fef2f2", // soft red
  ];

  //message
  useEffect(() => {
    const timer = setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * messages.length);
      setCurrentMessage(messages[randomIndex]);
      setshowStayMessage(true);

      const hideTimer = setTimeout(() => setshowStayMessage(false), 8000);
      return () => clearTimeout(hideTimer);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  //tips
  useEffect(() => {
    const timer = setTimeout(() => {
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      setTipMessage(randomTip);
      setShowTip(true);

      // Hide tip after 9 seconds
      setTimeout(() => setShowTip(false), 9000);
    }, 20000); // show once after 20s

    return () => clearTimeout(timer);
  }, []);

  //color change
  useEffect(() => {
    const colorInterval = setInterval(() => {
      const randomColor = accentColors[Math.floor(Math.random() * accentColors.length)];
      setBgColor(randomColor);
    }, 5000); // every 5 seconds

    return () => clearInterval(colorInterval);
  }, []);

  //colors for sections
  useEffect(() => {
    const colorInterval = setInterval(() => {
      const newColors = {};
      document.querySelectorAll("section").forEach((sec, index) => {
        newColors[index] = accentColors[Math.floor(Math.random() * accentColors.length)];
      });
      setSectionColors(newColors);
    }, 2000);

    return () => clearInterval(colorInterval);
  }, []);

  return (
    <main className="hig space-y-5 text-center">
      {/* Intro Section */}
      <Intro />

      {/* About Me Section */}
      <AboutMe />

      {/* Projects Section */}
      <Projects />

      {/*Core skills */}
      <Skills />

      {/* Contact Teaser */}
      <Connect />

      {showStayMessage && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-lg shadow-lg animate-fadeIn z-50">
          {CurrentMessage}
        </div>
      )}

      {showTip && (
        <div className="fixed right-4 top-1/3 bg-green-500 text-white p-4 rounded-lg shadow-lg animate-slide-in">
          {tipMessage}
        </div>
      )}
    </main>
  );
}

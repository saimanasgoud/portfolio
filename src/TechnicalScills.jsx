import React, { useEffect, useState, useRef } from "react";
import { animate, useMotionValue, useInView } from "framer-motion";

function CircularProgress({ percentage, color, label }) {
  const radius = 45;
  const stroke = 2.5;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const progress = useMotionValue(0);
  const [count, setCount] = useState(0);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(progress, percentage, {
        duration: 1000 / percentage,
        onUpdate: (v) => setCount(Math.round(v)),
        ease: "easeOut",
      });
      return () => controls.stop();
    }
  }, [isInView, percentage, progress]);

  const strokeDashoffset = circumference - (count / 100) * circumference;

  return (
    <div ref={ref} className="flex flex-col items-center">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: "stroke-dashoffset 0.1s linear" }}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="18px"
          fontWeight="bold"
          fill="#111827"
        >
          {count}%
        </text>
      </svg>
      <span className="mt-3 text-lg font-semibold" style={{ color }}>
        {label}
      </span>
    </div>
  );
}

export default function Skills() {
  const skills = [
    { label: "Vite + React", percentage: 90, color: "#facc15" },
    { label: "MySQL", percentage: 85, color: "#3b82f6" },
    { label: "Spring Boot", percentage: 80, color: "#10b981" },
    { label: "Git", percentage: 75, color: "#f97316" },
    { label: "Java", percentage: 85, color: "#ef4444" },
    { label: "CSS", percentage: 90, color: "#6366f1" },
    { label: "HTML", percentage: 95, color: "#69f50be8" },
    { label: "Tailwind Css", percentage: 90, color: "#b5e43eda" },
    { label: "JavaScript", percentage: 92, color: "#eab308" },
  ];

const logoMap = {
  "Vite + React": "https://cdn.worldvectorlogo.com/logos/react-2.svg",
  "MySQL": "https://cdn.simpleicons.org/mysql/4479A1",
  "Spring Boot": "https://cdn.worldvectorlogo.com/logos/spring-3.svg",
  "Git": "https://cdn.worldvectorlogo.com/logos/git-icon.svg",
  "Java": "https://cdn.worldvectorlogo.com/logos/java-4.svg",          // WORKING
  "CSS": "https://cdn.worldvectorlogo.com/logos/css-3.svg",           // WORKING
  "HTML": "https://cdn.worldvectorlogo.com/logos/html-1.svg",
  "Tailwind Css": "https://cdn.worldvectorlogo.com/logos/tailwind-css-2.svg",
  "JavaScript": "https://cdn.worldvectorlogo.com/logos/javascript-1.svg",
};

  return (
    <section className="py-12 px-2 md:px-12 lg:px-24 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold mb-10 text-green-500 text-center">
        Technical Skills
      </h2>

      {/* --- ABOUT TEXT MARQUEE --- */}
      <hr /><marquee className="p-5 flex bg-yellow-100 text-blue-900 font-semibold text-lg slow">
        Striving for excellence in every line of code, I blend creativity with
        technical expertise to build robust applications.Proficient in <strong className="text-orange-400">Java,
        Spring Boot, React, MySQL, and Tailwind CSS,</strong> I aim to transform ideas
        into impactful digital solutions.
      </marquee><hr />

      {/* --- LOGO MARQUEE --- */}
      <marquee direction="right" scrollamount="5" className="mb-12 mt-12">
        <div className="flex gap-6 items-center py-2">
          {skills.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center bg-white/80 backdrop-blur-md shadow-md border border-gray-200 rounded-xl p-3 min-w-[90px] hover:scale-105 transition"
            >
              <img
                src={logoMap[s.label]}
                alt={s.label}
                className="w-12 h-12"
              />
              <span className="text-sm mt-2 font-medium text-gray-700 text-center">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </marquee>

      {/* --- CIRCULAR SKILLS --- */}
      <div className="flex flex-wrap justify-between gap-8 mt-4">
        {skills.map((skill) => (
          <div
            key={skill.label}
            className="flex-1 min-w-[130px] max-w-[150px]"
          >
            <CircularProgress
              percentage={skill.percentage}
              color={skill.color}
              label={skill.label}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

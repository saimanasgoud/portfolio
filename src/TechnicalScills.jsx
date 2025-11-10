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
        {/* Background Circle */}
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Foreground Animated Circle */}
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
        {/* Percentage Text */}
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
      <span className="mt-3 text-lg font-semibold" style={{color}}>{label}</span>
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

  return (
    <section className="py-12 px-6 md:px-12 lg:px-24 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold mb-10 text-green-500 text-center">
        Technical Skills
      </h2>

      {/* Side-by-side responsive layout */}
      <div className="flex flex-wrap justify-between gap-8">
        {skills.map((skill) => (
          <div key={skill.label} className="flex-1 min-w-[120px] max-w-[150px]">
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

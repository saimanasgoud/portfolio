import React, { useState } from "react";
import "./Certificate.css"; // Keep your animations here

export default function Certificate() {
  const [activeCert, setActiveCert] = useState(null); // To control which certificate is visible
  const [loading, setLoading] = useState(false);

  const handleViewCertificate = (certType) => {
    if (activeCert === certType) {
      setActiveCert(null); // Hide if clicked again
    } else {
      setLoading(true);
      setTimeout(() => {
        setActiveCert(certType);
        setLoading(false);
      }, 800); // Simulate a short loading animation
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center py-12 mt-20 px-2">
      <h1 className="text-4xl font-bold text-blue-700 mb-8 slide">
        🎓 Certificates
      </h1>

      {/* ===== Full Stack Development Certificate ===== */}
      <div className="max-w-3xl bg-white rounded-2xl shadow-lg p-8 mb-10 text-center border border-blue-100">
        <h2 className="text-2xl font-semibold text-yellow-700 mb-4 blink">
          Internship Certificate - Full Stack Development
        </h2>

        <p className="text-gray-700 leading-relaxed mb-6">
          I completed an internship in <strong>Full Stack Development</strong> with Value Laden during my final year of B.Tech in Computer Science and Engineering (CSE), where I learned to build full web applications using modern technologies.
        </p>

        <ul className="list-disc list-inside text-left text-gray-800 space-y-2 mb-6">
          <li><strong className="text-violet-800">Frontend:</strong> React.js, Tailwind CSS, HTML5, CSS3</li>
          <li><strong className="text-violet-800">Backend:</strong> Spring Boot with Java</li>
          <li><strong className="text-violet-800">Database:</strong> MySQL</li>
          <li><strong className="text-violet-800">Version Control:</strong> Git & GitHub</li>
        </ul>

        <button
          onClick={() => handleViewCertificate("fullstack")}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition transform hover:scale-105"
        >
          {activeCert === "fullstack" ? "Hide Certificate" : "View Certificate"}
        </button>

        {loading && <p className="text-gray-500 animate-pulse mt-3">Loading certificate...</p>}

        {activeCert === "fullstack" && !loading && (
          <img
            src="/portfolio/sai.valueladen.jpg"
            alt="Full Stack Development Certificate"
            className="mt-4 w-full max-w-xl rounded-lg shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105 fade-in"
          />
        )}
      </div>

      {/* ===== Java Certificate ===== */}
      <div className="max-w-3xl bg-white rounded-2xl shadow-lg p-8 text-center border border-blue-100">
        <h2 className="text-2xl font-semibold text-yellow-700 mb-4 blink">
          Certificate - Java Programming
        </h2>

        <p className="text-gray-700 leading-relaxed mb-6">
          This certification demonstrates my proficiency in <strong>Core Java programming concepts</strong> such as Object-Oriented Programming, Collections, Exception Handling, and Stream APIs. It strengthened my backend development foundations.
        </p>

        <ul className="list-disc list-inside text-left text-gray-800 space-y-2 mb-6">
          <li><strong className="text-violet-800">Core Java:</strong> Classes, Objects, and Inheritance</li>
          <li><strong className="text-violet-800">Advanced Topics:</strong> Exception Handling, Collections, Streams</li>
          <li><strong className="text-violet-800">Tools:</strong> IntelliJ IDEA, Eclipse, Git</li>
        </ul>

        <button
          onClick={() => handleViewCertificate("java")}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition transform hover:scale-105"
        >
          {activeCert === "java" ? "Hide Certificate" : "View Certificate"}
        </button>

        {loading && <p className="text-gray-500 animate-pulse mt-3">Loading certificate...</p>}

        {activeCert === "java" && !loading && (
          <img
            src="/portfolio/java.certificate.jpg"
            alt="Java Programming Certificate"
            className="mt-14 w-full max-w-xl rounded-lg shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105 fade-in"
          />
        )}
      </div>
    </div>
  );
}

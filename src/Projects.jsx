import React, { useState } from "react";
import project from "/project.mp4";

function Projects() {
  return (
    <section id="projects" style={{ padding: "1.5rem" }}>
      <h2 className="text-3xl font-bold mb-9 text-green-500 blink pt-10 text-center">
        Featured Projects
      </h2>

      <div className="grid gap-8 md:grid-cols-2 text-yellow-600">
        {[
          {
            title: "Clinic Care",
            desc: "A comprehensive full-stack healthcare management system that simplifies clinic operations and enhances patient–doctor interactions. It includes secure authentication, role-based access control, appointment scheduling, and patient record management. Built using React, Tailwind CSS, Spring Boot, and MySQL for seamless performance and scalability. Currently under continuous improvement and optimization.",
            video: project,
          },
          {
            title: "Portfolio Website",
            desc: "A fully responsive and visually engaging personal portfolio designed to showcase my skills, projects, and professional background. Built with React and Tailwind CSS for a fast, dynamic UI, and powered by Spring Boot and MySQL for backend data management and authentication. Includes interactive sections, smooth animations, and a contact form for seamless communication.",
            video: null,
            link: "/",
          },
          {
            title: "Computer Vision–Based Quality Control in Manufacturing",
            desc: "An AI-driven system that leverages computer vision to automate defect detection and quality assurance in manufacturing environments. Using high-resolution imaging and real-time analytics, it identifies defects or deviations from quality standards, minimizing human error and boosting production efficiency. The system significantly improves consistency and reliability in large-scale production.",
            video: null,
            link: "portfolio/saimanasProject.pdf",
          },
        ].map((proj) => (
          <ProjectCard key={proj.title} proj={proj} />
        ))}
      </div>
    </section>
  );
}

// Separate Project Card Component
function ProjectCard({ proj }) {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="p-6 bg-white dark:bg-gray-200 rounded-lg shadow transition transform hover:shadow-2xl hover:scale-105">
      {/* Title */}
      <h3 className="text-2xl font-semibold mb-3 text-yellow-500">
        {proj.title}
      </h3>

      {/* Description */}
      <p className="text-gray-700 mb-4 leading-relaxed text-left">{proj.desc}</p>

      {/* Video Player (shown only if state is true) */}
      {proj.video && showVideo && (
        <div className="relative mb-4">
          <video
            className="w-full rounded-md border border-gray-200 shadow-sm"
            src={proj.video}
            controls
            autoPlay
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* View Button */}
      {proj.video ? (
        <button
          onClick={() => setShowVideo((prev) => !prev)}
          className="text-blue-600 cursor-pointer hover:underline"
        >
          {showVideo ? "Hide Video →" : "View →"}
        </button>
      ) : (
        <a
          href={proj.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          View →
        </a>
      )}
    </div>
  );
}

export default Projects;

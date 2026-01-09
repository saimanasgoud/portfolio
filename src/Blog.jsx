import { useState } from "react";
import journeyImg from "../src/assets/journey.jpg";
import fullstackImg from "../src/assets/fullstack.jpg";
// import techImg from "../assets/blog/tech-stack.jpg";
import projectsImg from "../src/assets/projects.jpg";
import challengesImg from "../src/assets/challengs.jpg";
import problemSolvingImg from "../src/assets/problem-solving.jpg";
import learningImg from "../src/assets/learning.jpg";
import teamworkImg from "../src/assets/teamwork.jpg";
import careerImg from "../src/assets/career-goals.jpg";
// import finalImg from "../assets/blog/final-thoughts.jpg";

export default function BlogAboutMe() {
  const [activeTopic, setActiveTopic] = useState(null);

  const topics = [
    {
      title: "My Journey as a Fresher Full Stack Developer",
      image: journeyImg,
      content: (
        <>
          
        <p className="mb-4 text-justify">
          When I started my journey in software development, I didn’t begin with the goal
          of becoming a “full stack developer.” Like many students from a Computer Science &
          Engineering background, I started with curiosity—trying to understand how websites
          work and how applications solve real-world problems.
        </p>
        <p className="mb-4 text-justify">
          During my academic years, I explored different areas of computer science and slowly
          developed a strong interest in web development. Writing code and seeing it transform
          into functional interfaces motivated me to learn consistently.
        </p>
        <p className="text-justify">
          I completed my B.Tech in Computer Science & Engineering in 2024. I realized that
          learning concepts alone was not enough, and applying them through projects became
          the foundation of my growth as a developer.
        </p>
        </>
      ),
    },
    {
      title: "How I Entered Full Stack Development",
      image: fullstackImg,
      content: (
        <>
          <p className="mb-4 text-justify">
          I started my development journey with frontend technologies such as HTML, CSS,
          and JavaScript. Designing layouts, styling components, and adding interactivity
          helped me understand how users interact with applications.
        </p>
        <p className="mb-4 text-justify">
          As I progressed, I worked with React, which introduced me to component-based
          architecture and reusable UI patterns. This experience improved my ability to
          structure applications efficiently.
        </p>
        <p className="text-justify">
          Later, I moved into backend development using Java and Spring Boot to understand
          APIs, server-side logic, and data flow. Combining frontend and backend knowledge
          allowed me to think end-to-end.
        </p>
        </>
      ),
    },
    {
      title: "Technologies I Work With",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      content: (
        <>
          <p className="mb-4 text-justify">
          Over time, I built a strong technical stack. On the frontend, I work with React,
          Tailwind CSS, and Bootstrap to create responsive and user-friendly interfaces.
        </p>
        <p className="mb-4 text-justify">
          On the backend, I use Java and Spring Boot to build RESTful APIs and handle
          application logic. I work with MySQL for relational data and Firebase for
          authentication and real-time features.
        </p>
        <p className="text-justify">
          More than tools, I focus on understanding why a technology is used and how it
          fits into the overall system architecture.
        </p>
        </>
      ),
    },
    {
      title: "Projects and Practical Experience",
      image: projectsImg,
      content: (
        <>
          <p className="mb-4 text-justify">
          Projects played a major role in my learning journey. I worked on Clinic Care,
          CRUD-based applications, UI-focused projects, and real-time systems.
        </p>
        <p className="mb-4 text-justify">
          These projects helped me understand application flow, data handling, and
          frontend–backend integration.
        </p>
        <p className="text-justify">
          Practical experience strengthened my confidence and improved my ability to
          design scalable and maintainable applications.
        </p>
        </>
      ),
    },
    {
      title: "Challenges I Faced",
      image: challengesImg,
      content: (
        <>
        <p className="mb-4 text-justify">
          As a fresher, understanding complex concepts and debugging errors was challenging.
          Sometimes, solving a single issue required deep analysis and patience.
        </p>
        <p className="mb-4 text-justify">
          Instead of getting discouraged, I focused on breaking problems into smaller
          steps and understanding the root cause.
        </p>
        <p className="text-justify">
          These challenges improved my problem-solving skills and made me more confident
          as a developer.
        </p>
        </>
      ),
    },
    {
      title: "Problem-Solving Approach",
      image: problemSolvingImg,
      content: (
        <>
          <p className="mb-4 text-justify">
          I approach problems by analyzing requirements and breaking them into manageable
          components. This helps me stay organized and focused.
        </p>
        <p className="mb-4 text-justify">
          I prefer understanding the logic behind a solution rather than memorizing code.
        </p>
        <p className="text-justify">
          This approach allows me to build clean, reusable, and maintainable solutions.
        </p>
        </>
      ),
    },
    {
      title: "My Learning Strategy",
      image: learningImg,
      content: (
        <>
            <p className="mb-4 text-justify">
          My learning strategy is based on consistency and practice. I learn new concepts
          by reading documentation and watching tutorials.
        </p>
        <p className="mb-4 text-justify">
          I immediately apply what I learn by building small projects or features.
        </p>
        <p className="text-justify">
          This hands-on approach helps me retain knowledge and gain practical experience.
        </p>
        </>
      ),
    },
    {
      title: "Teamwork & Collaboration",
      image: teamworkImg,
      content: (
        <>
          <p className="mb-4 text-justify">
          I enjoy working in collaborative environments where ideas are shared openly.
        </p>
        <p className="mb-4 text-justify">
          Teamwork helps me learn different perspectives and improve communication skills.
        </p>
        <p className="text-justify">
          I believe collaboration leads to better solutions and stronger applications.
        </p>
        </>
      ),
    },
    {
      title: "Career Goals",
      image: careerImg,
      content: (
        <>
          <p className="mb-4 text-justify">
          My goal is to work as a Frontend or Full Stack Developer in a growth-oriented
          organization.
        </p>
        <p className="mb-4 text-justify">
          I want to contribute to meaningful projects while learning from experienced
          professionals.
        </p>
        <p className="text-justify">
          I am open to remote, hybrid, or relocation opportunities and adapt quickly
          to new environments.
        </p>
        </>
      ),
    },
    {
      title: "Final Thoughts",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      content: (
        <>
           <p className="mb-4 text-justify">
          This journey represents continuous learning, improvement, and self-growth.
        </p>
        <p className="mb-4 text-justify">
          Every challenge and project has contributed to shaping me as a developer.
        </p>
        <p className="text-justify">
          I am excited to continue building, learning, and growing in my professional career.
        </p>
        </>
      ),
    },
  ];

  return (
    <div className="max-w-6xl mt-10 mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">
        Professional Journey <span className="text-green-500">Blog</span>
      </h1>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {topics.map((topic, index) => (
          <div
            key={index}
            onClick={() => setActiveTopic(topic)}
            className="cursor-pointer bg-white rounded-2xl shadow-md
            hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <img
              src={topic.image}
              alt={topic.title}
              className="h-44 w-full object-cover rounded-t-2xl"
            />
            <div className="p-4">
              <h2 className="font-semibold text-gray-800">
                {topic.title}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeTopic && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-white max-w-3xl w-full max-h-[90vh]
            overflow-y-auto rounded-2xl pt-12 p-3 relative">

            <button
              onClick={() => setActiveTopic(null)}
              className="absolute top-2 right-4 text-xl cursor-pointer text-red-500  hover:text-red-500 hover:border-red-500"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              {activeTopic.title}
            </h2>

            {activeTopic.content}
          </div>
        </div>
      )}
    </div>
  );
}

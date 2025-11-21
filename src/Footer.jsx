import React, { useState } from "react";

export default function Footer() {
  const techData = [
    {
      name: "Vite + React",
      points: [
        "Fast and efficient build tool",
        "Component-based UI development",
        "Excellent developer experience",
        "Highly scalable and maintainable",
      ],
      tags: ["Fast", "Scalable", "Maintainable", "Developer-friendly"],
    },
    {
      name: "Tailwind CSS",
      points: [
        "Utility-first styling for rapid design",
        "Consistent and responsive layouts",
        "Minimal custom CSS required",
        "Easy to customize and extend",
      ],
      tags: ["Utility-first", "Responsive", "Customizable", "Efficient"],
    },
    {
      name: "CSS",
      points: [
        "Custom styles for unique design touches",
        "Fine control over layout and visuals",
        "Complements Tailwind for special cases",
      ],
      tags: ["Flexible", "Precise", "Complementary"],
    },
    {
      name: "Firebase",
      points: [
        "Secure user authentication out of the box",
        "Real-time cloud database for live updates",
        "Scalable backend without server management",
        "Simplifies full-stack development",
      ],
      tags: ["Secure", "Real-time", "Scalable", "Serverless"],
    },
  ];

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  // Content for each link
  const legalMessages = {
    privacy:
      "Your details are fully encrypted in my database. There is no chance anyone else can access your data. Privacy is my top priority.",
    legal:
      "All legal information ensures your rights and mine are fully respected. Your data remains safe and secure.",
    copyrights:
      "Copyrights are protected. All creative works are respected and your content is safe.",
    terms:
      "Terms of Service promote a trustworthy environment. Your experience is secure and positive.",
  };

  // Handle link click to open modal with message
  function openModal(type) {
    setModalContent(legalMessages[type]);
    setModalOpen(true);
  }

  // Close modal handler
  function closeModal() {
    setModalOpen(false);
    setModalContent("");
  }

  return (
    <footer className="p-2  mt-1 border-t bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-t-[20px] shadow-inner">
      <div className="flex flex-col mt-8 md:flex-row justify-between items-center gap-8 max-w-6xl mx-auto">
        {/* 🌐 Social Links */}
        <div className="flex flex-wrap justify-center gap-8">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/saimanas/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 transform hover:scale-110 transition duration-300"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              alt="LinkedIn Logo"
              className="w-8 h-8"
            />
            <span>LinkedIn</span>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/saimanasgoud/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 font-medium hover:text-gray-900 dark:hover:text-white transform hover:scale-105 transition duration-300"
          >
            <img
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
              alt="GitHub Logo"
              className="w-8 h-8"
            />
            <span>GitHub</span>
          </a>

          {/* HackerRank */}
          <a
            href="https://www.hackerrank.com/profile/saimanas"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 font-medium hover:text-green-600 transform hover:scale-105 transition duration-300"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/65/HackerRank_logo.png"
              alt="HackerRank Logo"
              className="w-8 h-8"
            />
            <span>HackerRank</span>
          </a>
        </div>

        {/* ⚙️ Contact & Built With */}
        <div className="text-center md:text-right space-y-2 max-w-md">
          <p className="text-gray-700 dark:text-gray-300">
            🚀 Built with:{" "}
            <span className="font-semibold text-blue-600">Vite + React,</span>{" "}
            <span className="font-semibold text-cyan-500">Tailwind CSS,</span>{" "}
            <span className="font-semibold text-yellow-500">Firebase,</span>{" "}
            <span className="font-semibold text-pink-500">CSS</span>
          </p>

          <p className="text-gray-700 dark:text-gray-300">
            📧 Reach me at:{" "}
            <a
              href="mailto:saimanas670@gmail.com"
              className="underline hover:text-blue-500 transition"
            >
              saimanas670@gmail.com
            </a>
          </p>
        </div>
      </div>
  <p className="text-gray-700 dark:text-gray-300 flex items-center justify-center md:justify-end mt-2 gap-2">
    <img
      src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
      alt="India Flag"
      className="w-8 h-5 rounded-sm object-cover "
    />
    India, Telangana, Hyderabad
  </p>
      {/* Technologies & Why I Chose Them */}
      <h2 className="text-2xl font-bold mb-5 text-center text-gray-100 pt-10">
          Core Tools & Their Benefits      </h2>
      <section className="mt-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-5 px-1">
        {techData.map(({ name, points, tags }) => (
          <div
            key={name}
            className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">
              {name}
            </h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-left space-y-1 mb-3">
              {points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {(tags || []).map((tag, i) => (
                <span
                  key={i}
                  className="bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-200 text-xs font-semibold px-3 py-1 rounded-full select-none"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Legal Section */}
      <div className="mt-10 max-w-6xl mx-auto flex flex-wrap justify-center gap-6 text-gray-600 dark:text-gray-400 text-sm">
        <button
          onClick={() => openModal("privacy")}
          className="hover:underline hover:text-blue-600 transition"
        >
          Privacy Policy
        </button>
        <button
          onClick={() => openModal("legal")}
          className="hover:underline hover:text-blue-600 transition"
        >
          Legal
        </button>
        <button
          onClick={() => openModal("copyrights")}
          className="hover:underline hover:text-blue-600 transition"
        >
          Copyrights
        </button>
        <button
          onClick={() => openModal("terms")}
          className="hover:underline hover:text-blue-600 transition"
        >
          Terms of Service
        </button>
      </div>

      <p className="text-sm mt-6 text-gray-500 dark:text-gray-400 text-center">
        © {new Date().getFullYear()} <span className="font-medium">Sai Manas Goud</span>. All
        rights reserved.
      </p>

      {/* 💬 Bottom Message */}
      <div className="mt-5 text-center max-w-6xl mx-auto">
        <p className="text-green-600 dark:text-green-400 p-3 font-medium tracking-wide">
          Thanks for visiting! Let's build something amazing together 🚀
        </p>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white dark:bg-gray-900 p-6 rounded-lg max-w-md mx-4 text-gray-900 dark:text-gray-100 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl bg-transprant font-semibold mb-4">INFO</h3>
            <p>{modalContent}</p>
            <button
              onClick={closeModal}
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* FAQ DATA */
const faqs = [
  {
    question: "Who are you professionally?",
    short: "I am a Full Stack Developer with a CSE background.",
    full: "I am a Full Stack Developer with a strong foundation in Computer Science & Engineering, graduating in 2024. I focus on building scalable, maintainable, and user-centric web applications by combining modern frontend technologies with robust backend systems. I enjoy solving real-world problems through clean architecture, thoughtful design, and efficient implementation."
  },
  {
    question: "What technologies do you work with?",
    short: "React, Java, Spring Boot, and MySQL.",
    full: "My primary technology stack includes React for frontend development, Tailwind CSS and Bootstrap for responsive UI design, and Java with Spring Boot for backend development. I use MySQL for database management, Firebase for authentication and real-time data, and Git/GitHub for version control."
  },
  {
    question: "Are you a fresher or experienced?",
    short: "I am a fresher with strong project experience.",
    full: "I am a fresher with hands-on experience gained through academic projects, internships, and personal development work. I have practical exposure to real-world use cases, application architecture, and end-to-end development."
  },
  {
    question: "What roles are you looking for?",
    short: "Frontend and Full Stack Developer roles.",
    full: "I am seeking Frontend Developer or Full Stack Developer roles where I can contribute to impactful products, work with modern technologies, and grow alongside experienced teams."
  },
  {
    question: "Are you open to relocation or remote work?",
    short: "Yes, I am flexible.",
    full: "I am open to relocation, remote, or hybrid work environments. I adapt easily to new workplaces and focus on maintaining consistent productivity regardless of location."
  },
  {
    question: "What projects have you worked on?",
    short: "Full stack and frontend projects.",
    full: "I have worked on full-stack applications like Clinic Care, frontend dashboards, UI-based games, CRUD applications, and real-time systems using Firebase. These projects strengthened my understanding of application flow and user experience."
  },
  {
    question: "Do you have backend experience?",
    short: "Yes, with Java and Spring Boot.",
    full: "Yes, I have built RESTful APIs using Java and Spring Boot, implemented CRUD operations, handled authentication, and integrated databases using MySQL."
  },
  {
    question: "Do you have real-time experience?",
    short: "Yes, using Firebase.",
    full: "I have implemented real-time data updates and authentication using Firebase, enabling instant synchronization and responsive application behavior."
  },
  {
    question: "What frontend skills do you have?",
    short: "Modern UI development with React.",
    full: "I specialize in building responsive, reusable UI components using React. I focus on clean layouts, performance optimization, and good UX practices using Tailwind CSS and Bootstrap."
  },
  {
    question: "How do you manage state in React?",
    short: "Using hooks and component state.",
    full: "I use React hooks such as useState and useEffect for local state management and side effects. I design components to remain simple, predictable, and easy to maintain."
  },
  {
    question: "How do you handle API integration?",
    short: "Using REST APIs.",
    full: "I integrate frontend applications with backend services using REST APIs, handle responses properly, manage loading and error states, and ensure smooth data flow."
  },
  {
    question: "What databases have you worked with?",
    short: "MySQL and Firebase.",
    full: "I have experience with MySQL for relational data storage and Firebase for real-time NoSQL data handling and authentication."
  },
  {
    question: "Do you follow coding best practices?",
    short: "Yes, consistently.",
    full: "I follow clean code principles, meaningful naming conventions, modular design, and proper folder structures to ensure maintainability and scalability."
  },
  {
    question: "How do you debug issues?",
    short: "Systematic and logical approach.",
    full: "I debug by analyzing error messages, checking logs, isolating issues step-by-step, and testing fixes carefully to avoid breaking existing functionality."
  },
  {
    question: "Do you use Git?",
    short: "Yes, for version control.",
    full: "I use Git and GitHub for version control, branch management, and collaboration. I am comfortable with commits, pull requests, and resolving conflicts."
  },
  {
    question: "How do you handle deadlines?",
    short: "With planning and consistency.",
    full: "I break tasks into smaller milestones, prioritize work effectively, and stay disciplined to meet deadlines without compromising quality."
  },
  {
    question: "What are your strengths?",
    short: "Problem-solving and adaptability.",
    full: "My strengths include strong problem-solving skills, adaptability, attention to detail, and a continuous learning mindset."
  },
  {
    question: "What are your weaknesses?",
    short: "I focus on improving continuously.",
    full: "I sometimes spend extra time perfecting details, but I am learning to balance perfection with efficiency by following deadlines and feedback."
  },
  {
    question: "How do you learn new technologies?",
    short: "Through practice and projects.",
    full: "I learn new technologies by studying documentation, following tutorials, and implementing them in real projects to gain hands-on experience."
  },
  {
    question: "Are you comfortable working in a team?",
    short: "Yes, very comfortable.",
    full: "Yes, I enjoy collaborating with team members, sharing ideas, accepting feedback, and contributing positively to group success."
  },
  {
    question: "Do you handle UI/UX considerations?",
    short: "Yes, user-first design.",
    full: "I prioritize usability, accessibility, and responsiveness while designing interfaces to ensure a smooth user experience."
  },
  {
    question: "What motivates you as a developer?",
    short: "Building real-world solutions.",
    full: "I am motivated by solving real-world problems, seeing users benefit from my work, and continuously improving my technical skills."
  },
  {
    question: "What kind of company are you looking for?",
    short: "Growth-oriented and collaborative.",
    full: "I am looking for a company that values learning, teamwork, innovation, and provides opportunities for professional growth."
  },
  {
    question: "How do you handle feedback?",
    short: "Positively and professionally.",
    full: "I take feedback positively and use it as an opportunity to improve my skills and deliver better results."
  },
  {
    question: "Why should someone hire you?",
    short: "Strong fundamentals and growth mindset.",
    full: "I bring strong technical fundamentals, discipline, adaptability, and a passion for learning. I am committed to delivering quality work and growing with the organization."
  }
];


/* HIGHLIGHT SEARCH TEXT */
function highlightText(text, query) {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "gi");
  return text.split(regex).map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span
        key={index}
        className="bg-yellow-200 text-gray-900 px-1 rounded"
      >
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);
  const [readMoreIndex, setReadMoreIndex] = useState(null);
  const [search, setSearch] = useState("");

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-emerald-50 px-4 py-16 mt-5">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-red-500">
            Frequently Asked Questions FAQ <span className="text-green-500">:)</span>
          </h1>
          <p className="mt-5 text-gray-600">
            Search and explore common professional questions
          </p>
        </motion.div>

        {/* SEARCH */}
        <div className="mb-8"> 
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-green-300 px-4 py-3
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* FAQ LIST */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 && (
            <p className="text-center text-gray-500">
              No matching questions found.
            </p>
          )}

          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border shadow-sm overflow-hidden
                         transition hover:shadow-lg"
            >
              {/* QUESTION */}
              <button
                className="w-full flex justify-between items-center px-6 py-4
                           text-left font-medium text-gray-900
                           hover:bg-indigo-50 transition cursor-pointer"
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              >
                <span>
                  {highlightText(faq.question, search)}
                </span>
                <span className="text-xl text-indigo-600">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {/* ANSWER */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-5 text-gray-700"
                  >
                    <p>{faq.short}</p>

                    {readMoreIndex === index && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-3 text-gray-600"
                      >
                        {faq.full}
                      </motion.p>
                    )}

                    <button
                      onClick={() =>
                        setReadMoreIndex(
                          readMoreIndex === index ? null : index
                        )
                      }
                      className="mt-3 text-sm font-semibold text-indigo-600
                                 hover:underline cursor-pointer"
                    >
                      {readMoreIndex === index ? "Read less" : "Read more"}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

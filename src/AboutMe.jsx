// AboutMe.jsx
import React from "react";
import { motion } from "framer-motion";

const popIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2, 
      delay,
      ease: "easeOut",
    },
  },
});

export default function AboutMe() {
  return (
    <section className="pt-0 mt-15 px-10 md:px-12 lg:px-24 py-1 bg-gray-50 rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <motion.h2
        variants={popIn(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-4xl font-bold mb-10 text-green-500 text-center"
      >
        About Me
      </motion.h2>

      {/* Content */}
      <motion.ul
        className="space-y-6 text-gray-800 leading-relaxed text-lg"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.li variants={popIn(0.5)} className="">
          ➤ I’m a passionate <strong>Full-Stack Developer</strong> with a
          degree in <strong>Computer Science & Engineering (2024)</strong>.
          I enjoy building efficient, scalable, and user-focused web applications.
        </motion.li>

        <motion.li variants={popIn(1.5)}>
          ➤ On the <strong>frontend</strong>, I specialize in{" "}
          <strong>React.js, Tailwind CSS, and modern JavaScript (ES6+)</strong>,
          creating fast, responsive, and visually appealing interfaces.
        </motion.li>
        <motion.li variants={popIn(2.3)}>
          ➤ I have also implemented <strong>**real-time messaging** </strong>using{" "}
          <strong>Firebase Realtime Database & Authentication</strong>, enabling
          live chat features with secure data handling and instant updates.
        </motion.li>

        <motion.li variants={popIn(2.9)}>
          ➤ On the <strong>backend</strong>, I work with{" "}
          <strong>Java, Spring Boot, and SQL</strong> to design RESTful APIs,
          manage data, and implement robust business logic with full CRUD operations.
        </motion.li>

        <motion.li variants={popIn(3.5)}>
          ➤ My featured project, <strong>"Clinic Care"</strong>, combines
          patient management, appointment scheduling, and doctor profiles using
          Spring Boot endpoints like <code>@PostMapping</code>,{" "}
          <code>@GetMapping</code>, and <code>@DeleteMapping</code>.
        </motion.li>

        <motion.li variants={popIn(4.5)}>
          ➤ I also use <strong>MySQL, Git/GitHub, and REST API design</strong>{" "}
          to build maintainable, well-documented, and scalable applications.
        </motion.li>

        <motion.li variants={popIn(5.5)}>
          ➤ Beyond coding, I’m passionate about exploring new technologies,
          optimizing performance, and continuously improving as a developer.
        </motion.li>
      </motion.ul>
    </section>
  );
}

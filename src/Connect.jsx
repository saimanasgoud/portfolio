import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";

export default function Connect() {
  const [successMessage, setSuccessMessage] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, backgroundColor: "#16a34a", transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    try {
      // Send message to me
      await emailjs.sendForm(
        "service_1t5agnb",      // Your EmailJS service ID
        "template_shgzeu5",     // Your EmailJS template ID
        form,
        "j5xB7ThI3TARsVK5G"     // Your EmailJS public key
      );

      // Auto-reply to user
      await emailjs.sendForm(
        "service_1t5agnb",       // Your EmailJS service ID (can be the same)
        "template_9buk97l",    // Your auto-reply template ID
        form,
        "j5xB7ThI3TARsVK5G"      // Your EmailJS public key
      );

      setSuccessMessage("✅ Message sent successfully! Thank you for reaching out.");
      form.reset();
    } catch (error) {
      console.error("Email sending error:", error);
      setSuccessMessage("❌ Oops! Something went wrong. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="w-full px-4 md:px-12 text-center space-y-6 py-12 bg-gray-50 rounded-lg shadow-lg"
    >
      <motion.h2
        className="text-3xl font-bold mb-6 text-green-500"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
      >
        Let’s Connect
      </motion.h2>

      <motion.p
        className="text-gray-700 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        If you have any upcoming projects or collaboration opportunities, feel free to reach out! 
        For a quicker response, you're always welcome to connect with me on LinkedIn or explore my work on GitHub.
      </motion.p>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-lg mx-auto mt-8"
      >
        <motion.input
          type="text"
          name="name"
          placeholder="Enter your name"
          required
          variants={inputVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <motion.input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          variants={inputVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.5 }}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <motion.textarea
          name="message"
          placeholder="Your Message (min. 10 characters)"
          required
          rows={4}
          variants={inputVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 1 }}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
        />

        <motion.button
          type="submit"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="w-full px-6 py-3 bg-green-500 text-white font-semibold rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-600 transition"
        >
          Send
        </motion.button>

        {successMessage && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
            className={`text-center text-sm font-semibold mt-4 ${
              successMessage.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {successMessage}
          </motion.p>
        )}
      </motion.form>
    </section>
  );
}

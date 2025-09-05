import React from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  return (
    <>
      <Navbar />
      <section className="w-full min-h-[92vh] bg-gradient-to-b from-[#060606] to-[#0b0b0b] text-gray-200 flex flex-col items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl text-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">
            Get in <span className="text-blue-400">Touch</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed">
            Have questions, feedback, or collaboration ideas? We’d love to hear
            from you! Reach out directly or connect with us on social media.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.a
              href="mailto:muhammadamaan0034@gmail.com"
              aria-label="Email"
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-md flex flex-col items-center hover:bg-white/10 hover:shadow-blue-500/20 transition"
            >
              <FaEnvelope className="text-blue-400 text-4xl mb-3" />
              <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
              <p className="text-gray-400 text-sm">
                muhammadamaan0034@gmail.com
              </p>
            </motion.a>

            <motion.a
              href="https://github.com/Amaan-12-git"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-md flex flex-col items-center hover:bg-white/10 hover:shadow-blue-500/20 transition"
            >
              <FaGithub className="text-blue-400 text-4xl mb-3" />
              <h3 className="text-lg font-semibold text-white mb-1">GitHub</h3>
              <p className="text-gray-400 text-sm">github.com/Amaan-12-git</p>
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/mohd-amaan-ansari12/"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-md flex flex-col items-center hover:bg-white/10 hover:shadow-blue-500/20 transition"
            >
              <FaLinkedin className="text-blue-400 text-4xl mb-3" />
              <h3 className="text-lg font-semibold text-white mb-1">
                LinkedIn
              </h3>
              <p className="text-gray-400 text-sm">
                linkedin.com/in/mohd-amaan-ansari12
              </p>
            </motion.a>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Contact;

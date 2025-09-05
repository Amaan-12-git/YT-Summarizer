import React from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen w-full bg-gradient-to-b from-[#060606] to-[#0b0b0b] text-gray-100 flex flex-col items-center py-16 px-6">
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl w-full text-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            About <span className="text-blue-400">YT-Summarizer</span>
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed mb-10">
            YT-Summarizer is a modern web application designed to save you time
            and effort. By pasting a YouTube video link, our system instantly
            processes the video, extracts key information, and generates a
            clear, concise summary — all powered by state-of-the-art AI models.
          </p>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 shadow-md hover:shadow-cyan-900/40 transition">
              <h2 className="text-xl font-semibold text-white mb-3">
                🎯 Why we built this
              </h2>
              <p className="text-gray-400">
                Online content is growing faster than ever. Watching long videos
                to find just one answer is inefficient. We built YT-Summarizer
                to let users instantly transform lengthy content into
                easy-to-digest summaries without rewatching the entire video.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 shadow-md hover:shadow-cyan-900/40 transition">
              <h2 className="text-xl font-semibold text-white mb-3">
                ⚙️ How it works
              </h2>
              <p className="text-gray-400">
                Our system uses a combination of transcript extraction, natural
                language processing, and deep learning models. It pulls the
                spoken content from YouTube, understands its meaning, and
                condenses it into precise summaries.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 shadow-md hover:shadow-cyan-900/40 transition">
              <h2 className="text-xl font-semibold text-white mb-3">
                🛠️ Upcoming Features
              </h2>
              <p className="text-gray-400">
                We are working on an interactive Q&A feature that will let you
                ask questions about the video content and receive direct,
                accurate answers — all within the same interface. Stay tuned for
                the next update!
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 shadow-md hover:shadow-cyan-900/40 transition">
              <h2 className="text-xl font-semibold text-white mb-3">
                🚀 Built with
              </h2>
              <p className="text-gray-400">
                This project leverages the MERN stack (MongoDB, Express.js,
                React, Node.js) along with Python deep learning models for AI
                processing. It’s designed for speed, scalability, and a smooth
                user experience.
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12"
          >
            <Link
              to="/"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-medium shadow transition"
            >
              Back to Home
            </Link>
          </motion.div>
        </motion.section>
      </main>
    </>
  );
};

export default About;

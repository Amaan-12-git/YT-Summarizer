import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <section className="w-full h-screen flex justify-center items-center px-6 bg-black">
      <div className="text-center max-w-2xl">
        {/* 404 Heading Animation */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-7xl font-extrabold text-blue-500 mb-4"
        >
          404
        </motion.h1>

        {/* Message Animation */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xl md:text-2xl text-gray-300 mb-8"
        >
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </motion.p>

        {/* Button Animation */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link to="/">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold text-lg rounded-2xl shadow-lg hover:scale-105 hover:shadow-xl hover:from-blue-700 hover:to-blue-900 transition duration-300">
              Back to Home
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default NotFound;

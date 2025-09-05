import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    fetch("http://localhost:3000/api/check-auth", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Auth check response:", data);
        setLoggedIn(data.loggedIn);
      })
      .catch((err) => console.error("Auth check failed:", err));
  }, []);

  return (
    <section className="w-full h-[90vh] flex justify-center items-center px-6 bg-black">
      <div className="text-center max-w-3xl">
        {/* Heading Animation */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold text-gray-200 mb-6 leading-tight"
        >
          Welcome to <span className="text-blue-400">YT-Summarizer!</span>
        </motion.h1>

        {/* Subtext Animation */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-400 mb-8"
        >
          Save time with YT-Summarizer — instantly transform long YouTube videos
          into{" "}
          <span className="font-semibold text-gray-100">clear summaries</span>.
          Understand content faster in English, no matter the language. Get{" "}
          <span className="font-semibold text-gray-100">direct answers</span>{" "}
          without rewatching.
        </motion.p>

        {/* Button Animation */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link to={loggedIn ? "/dashboard" : "/signup"}>
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold text-lg rounded-2xl shadow-lg hover:scale-105 hover:shadow-xl hover:from-blue-700 hover:to-blue-900 transition duration-300">
              {loggedIn ? "Go to Dashboard" : "Get Started"}
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

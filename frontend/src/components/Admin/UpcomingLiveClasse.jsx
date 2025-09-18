import React from "react";
import { motion } from "framer-motion";
import AdminHeader from "./Admin Header/header";

const UpcomingLiveClasse = () => {
  return (
    <div className="flex h-screen w-full font-sans">
      {/* Sidebar */}
      <AdminHeader />

      {/* Main Content */}
      <div className="min-h-screen h-full w-full bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 font-sans text-gray-800 ml-2 mr-2 mt-2 flex-1 space-y-6 p-4 sm:p-6 overflow-y-auto">
        
        {/* Hero Section */}
        <section className="w-full px-6 md:px-16 py-16 flex flex-col lg:flex-row items-center justify-between">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="w-full lg:w-1/2 space-y-6 text-center lg:text-left"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Elevate your meetings with{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
                AI-powered recording
              </span>
            </h2>
            <p className="text-lg text-gray-700 max-w-xl mx-auto lg:mx-0">
              With our advanced artificial intelligence transcription services,
              your meetings become smarter. Record, transcribe, and analyze
              insights with precision.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 text-white rounded-full font-semibold shadow-lg transition duration-300"
              >
                🚀 Try Free
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border-2 border-purple-600 text-purple-600 hover:bg-purple-50 rounded-full font-semibold shadow-lg transition duration-300"
              >
                🎥 Book a Demo
              </motion.button>
            </div>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row gap-6 pt-8 justify-center lg:justify-start">
              <motion.div whileHover={{ scale: 1.1 }} className="text-center">
                <h3 className="text-3xl font-bold text-purple-700">10K+</h3>
                <p className="text-gray-500 text-sm">Users worldwide</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} className="text-center">
                <h3 className="text-3xl font-bold text-pink-600">23+</h3>
                <p className="text-gray-500 text-sm">Integrations</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="w-full lg:w-1/2 mt-12 lg:mt-0 flex justify-center relative"
          >
            {/* Gradient Background Circle */}
            <div className="absolute -top-16 -right-16 w-96 h-96 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full blur-3xl opacity-40 animate-pulse"></div>

            {/* Image Cards */}
            <div className="relative z-10 grid grid-cols-2 gap-6">
              {[
                "https://randomuser.me/api/portraits/women/44.jpg",
                "https://randomuser.me/api/portraits/men/46.jpg",
                "https://randomuser.me/api/portraits/women/65.jpg",
                "https://randomuser.me/api/portraits/men/12.jpg",
              ].map((src, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.08, rotate: 2 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden w-40 h-52 flex items-center justify-center border border-gray-200"
                >
                  <img
                    src={src}
                    alt="Meeting"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Integration Logos */}
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          id="integrations"
          className="w-full py-12 px-6 md:px-16 flex flex-wrap items-center justify-center gap-10 bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 shadow-inner rounded-xl"
        >
          {[
            "https://upload.wikimedia.org/wikipedia/commons/4/45/Google-logo.png",
            "https://upload.wikimedia.org/wikipedia/commons/e/e0/Zoom_Communications_Logo.svg",
            "https://upload.wikimedia.org/wikipedia/commons/7/76/Slack_Icon.png",
            "https://upload.wikimedia.org/wikipedia/commons/4/4e/Microsoft_logo.svg",
          ].map((logo, i) => (
            <motion.img
              whileHover={{ scale: 1.2 }}
              key={i}
              src={logo}
              alt="Integration"
              className="h-10"
            />
          ))}
        </motion.section>

        {/* Footer */}
        <footer className="w-full py-6 px-6 md:px-16 bg-gradient-to-r from-gray-900 via-purple-900 to-black text-gray-300 text-center">
          © {new Date().getFullYear()}{" "}
          <span className="text-purple-400 font-semibold">Metcord</span>. All
          rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default UpcomingLiveClasse;

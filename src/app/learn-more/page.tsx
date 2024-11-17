"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

const LearnMore = () => {
  return (
    <section className="dark:bg-gray-dark relative z-10 overflow-hidden bg-white pb-16 pt-[120px]">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute left-8 top-8"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-600 hover:text-[#4A6CF7] dark:text-gray-400 dark:hover:text-white transition-colors duration-300"
        >
          <IoArrowBack className="text-xl" />
          <span className="font-medium">Back to Home</span>
        </Link>
      </motion.div>

      <div className="container">
        <div className="flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[800px]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                {/* Introduction Section */}
                <div className="text-center mb-12">
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-4xl font-bold text-black dark:text-white mb-4"
                  >
                    Transform Your <span className="text-[#4A6CF7]">Aerospace Documentation</span>
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-lg text-body-color dark:text-body-color-dark"
                  >
                    Simplify complex technical documents with our advanced AI-powered solution
                  </motion.p>
                </div>

                {/* How It Works Section */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg"
                >
                  <h2 className="text-2xl font-semibold text-black dark:text-white mb-6">
                    How It Works
                  </h2>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-3">
                      <div className="text-[#4A6CF7] text-xl font-bold">01</div>
                      <h3 className="font-semibold text-black dark:text-white">Upload</h3>
                      <p className="text-body-color dark:text-body-color-dark">
                        Upload your technical documents, no matter how complex
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="text-[#4A6CF7] text-xl font-bold">02</div>
                      <h3 className="font-semibold text-black dark:text-white">Process</h3>
                      <p className="text-body-color dark:text-body-color-dark">
                        Our AI analyzes and extracts key information
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="text-[#4A6CF7] text-xl font-bold">03</div>
                      <h3 className="font-semibold text-black dark:text-white">Transform</h3>
                      <p className="text-body-color dark:text-body-color-dark">
                        Receive visual representations, quizzes, and summaries of your content
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Benefits Section */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-semibold text-black dark:text-white">
                    Key Benefits
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {benefits.map((benefit, index) => (
                      <div 
                        key={index}
                        className="p-6 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
                      >
                        <h3 className="font-semibold text-black dark:text-white mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-body-color dark:text-body-color-dark">
                          {benefit.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const benefits = [
  {
    title: "Enhanced Learning",
    description: "Transform complex documentation into easily digestible visual content"
  },
  {
    title: "Time Savings",
    description: "Reduce training time with automated document processing"
  },
  {
    title: "Improved Safety",
    description: "Minimize errors through clear visual representations"
  },
  {
    title: "Better Retention",
    description: "Interactive elements ensure better knowledge retention"
  }
];

export default LearnMore;
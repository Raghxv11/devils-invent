"use client";

import React, { useState } from 'react';
import { Upload, FileCheck, Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';

const FileUpload: React.FC = () => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setError("");
    setUploadProgress(0);
    setUploadSuccess(false);
  };

  const handleSubmit = () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    setUploadSuccess(false);

    // Simulate progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadSuccess(true);
          return 100;
        }
        return prev + 1; // Slower increment for 10-second duration
      });
    }, 100);

    // Wait for progress to complete, then navigate
    setTimeout(() => {
      router.push('/result');
    }, 10000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute left-8 top-8"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
        >
          <IoArrowBack className="text-xl" />
          <span className="font-medium">Back to Home</span>
        </Link>
      </motion.div>

      <div className="max-w-7xl mx-auto mt-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Supercharge Your Training Process
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload your technical documents and let AI transform them into 
            visual representations, quizzes, and summaries
          </p>
        </motion.div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8 p-4 bg-red-100 text-red-700 rounded-lg flex items-center"
          >
            {error}
          </motion.div>
        )}

        {uploadSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8 p-4 bg-green-100 text-green-700 rounded-lg flex items-center"
          >
            <FileCheck className="w-5 h-5 mr-2" />
            File uploaded successfully!
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="max-w-xl mx-auto">
            <motion.label 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-lg transition-colors ${
                isUploading ? 'cursor-not-allowed bg-gray-100' : 'cursor-pointer hover:bg-gray-50'
              }`}
            >
              {isUploading ? (
                <>
                  <Loader className="w-12 h-12 text-blue-600 mb-2 animate-spin" />
                  <span className="text-gray-600">Uploading... {uploadProgress}%</span>
                  <div className="w-full h-2 bg-gray-200 rounded-full mt-4">
                    <div 
                      className="h-full bg-blue-600 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-blue-600 mb-2" />
                  <span className="text-gray-600">
                    {selectedFile ? selectedFile.name : "Choose a file to upload"}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                  />
                </>
              )}
            </motion.label>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={!selectedFile || isUploading}
              className={`mt-4 w-full py-2 px-4 rounded-lg font-medium transition-colors
                ${selectedFile && !isUploading
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-white text-gray-500 cursor-not-allowed'
              }`}
            >
              {isUploading ? 'Processing...' : 'Analyze Document'}
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-black mb-6">
              How It Works
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-3">
                <div className="text-blue-600 text-xl font-bold">01</div>
                <h3 className="font-semibold text-black">Upload</h3>
                <p className="text-gray-600">
                  Upload your technical documents, no matter how complex
                </p>
              </div>
              <div className="space-y-3">
                <div className="text-blue-600 text-xl font-bold">02</div>
                <h3 className="font-semibold text-black">Process</h3>
                <p className="text-gray-600">
                  Our AI analyzes and extracts key information
                </p>
              </div>
              <div className="space-y-3">
                <div className="text-blue-600 text-xl font-bold">03</div>
                <h3 className="font-semibold text-black">Transform</h3>
                <p className="text-gray-600">
                  Receive visual representations, quizzes, and summaries of your content
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FileUpload;
"use client"; // This component will run on the client side (csr)

import React, { useState, useRef } from "react";
import { UploadCloudIcon } from "lucide-react"; // Still need lucide-react for the icon unless you use an SVG directly
import { useRouter } from "next/navigation";

export default function UploadForm() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // --- START: MP4 Validation Logic ---
      if (file.type === "video/mp4") {
        setSelectedFile(file);
      } else {
        setSelectedFile(null);
        alert("Only MP4 video files are allowed. Please select an MP4 file.");
        // Optionally, reset the file input visually
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
      // --- END: MP4 Validation Logic ---
    } else {
      setSelectedFile(null);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleUploadAreaClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please upload a valid MP4 file.");
      return;
    }

    if (!selectedOption) {
      alert("Please select a language option.");
      return;
    }

    console.log("Submitting form...");
    console.log("Selected File:", selectedFile.name);
    console.log("Selected Option:", selectedOption);

    // Navigate to the Result page with query params
    router.push(
      `/Result?filename=${encodeURIComponent(
        selectedFile.name
      )}&option=${selectedOption}&message=${encodeURIComponent(
        "Submitted successfully!"
      )}`
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      {/* Simplified Card equivalent */}
      <div className="w-full max-w-md rounded-xl shadow-lg bg-white p-6">
        {/* Simplified CardHeader equivalent */}
        <div className="text-center pb-4 border-b border-gray-200 mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            AI Mp4 to Text Translator
          </h2>
          <p className="text-gray-600">
            Upload a file and select an option to proceed.
          </p>
        </div>

        {/* Simplified CardContent equivalent */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload Section */}
            <div>
              <label
                htmlFor="file-upload"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Upload your file
              </label>
              <div
                onClick={handleUploadAreaClick}
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
              >
                <UploadCloudIcon className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">
                  {selectedFile
                    ? selectedFile.name
                    : "Click to upload .mp4 file or drag and drop"}
                </p>
                <p className="text-xs text-gray-400">Max file size: 500MB</p>
                {/* Hidden file input (simplified Input equivalent) */}
                <input
                  id="file-upload"
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden" // Hide the default input
                />
              </div>
            </div>

            {/* Select Menu Section */}
            <div>
              <label
                htmlFor="select-option"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Choose an option
              </label>
              {/* Simplified Select equivalent */}
              <select
                id="select-option"
                onChange={handleSelectChange}
                value={selectedOption}
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="" disabled>
                  Select a language
                </option>
                <option value="eng">English</option>
                <option value="fr">French</option>
                <option value="ar">Arabic</option>
                <option value="other">Others</option>
              </select>
            </div>

            {/* Simplified Button equivalent */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              onClick={() =>
                router.push(
                  `/Result?filename=${encodeURIComponent(
                    selectedFile.name
                  )}&option=${selectedOption}&message=${encodeURIComponent(
                    "Submitted successfully!"
                  )}`
                )
              } // Navigate to the about page on click
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

export default function Result() {
  const searchParams = useSearchParams();

  const filename = searchParams.get("filename") || "Unknown file";
  const languageCode = searchParams.get("option") || "Unknown language";
  const message = searchParams.get("message") || "No message available";
  const transcription =
    searchParams.get("transcription") || "No transcription available";

  const displayLanguage =
    {
      eng: "English",
      fr: "French",
      ar: "Arabic",
      other: "Others",
    }[languageCode] || "Not selected";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
          Upload Result
        </h1>
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-4">
            <span className="text-lg font-medium text-gray-700">Filename:</span>
            <span className="text-lg text-gray-900">{filename}</span>
          </div>
          <div className="flex items-center justify-between border-b pb-4">
            <span className="text-lg font-medium text-gray-700">Language:</span>
            <span className="text-lg text-gray-900">{displayLanguage}</span>
          </div>
          <div className="flex items-center justify-between border-b pb-4">
            <span className="text-lg font-medium text-gray-700">Status:</span>
            <span
              className={`text-lg font-medium ${
                languageCode === "other" ? "text-yellow-500" : "text-green-600"
              }`}
            >
              {languageCode === "other" ? "Processing" : "Completed"}
            </span>
          </div>
          <div className="flex items-center justify-between border-b pb-4">
            <span className="text-lg font-medium text-gray-700">Message:</span>
            <span
              className={`text-lg font-medium ${
                message.includes("Failed") ? "text-red-600" : "text-green-600"
              }`}
            >
              {message}
            </span>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Transcription:
          </h2>
          <p className="text-gray-700 whitespace-pre-wrap bg-gray-100 p-4 rounded-lg shadow-inner">
            {transcription}
          </p>
        </div>
      </div>
    </div>
  );
}

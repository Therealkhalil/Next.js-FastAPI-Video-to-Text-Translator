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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6">
      <h1 className="text-3xl font-bold mb-4">Upload Result</h1>
      <p className="text-lg text-gray-700 mb-2">Filename: {filename}</p>
      <p className="text-lg text-gray-700 mb-2">Language: {displayLanguage}</p>
      <p className="text-lg text-gray-700 mb-4">
        Status: {languageCode === "other" ? "Processing" : "Completed"}
      </p>
      <p
        className={`text-md font-medium ${
          message.includes("Failed") ? "text-red-600" : "text-green-600"
        }`}
      >
        {message}
      </p>
      <div className="text-left mt-6">
        <h2 className="text-xl font-semibold mb-2">Transcription:</h2>
        <p className="text-gray-700 whitespace-pre-wrap">{transcription}</p>
      </div>
    </div>
  );
}

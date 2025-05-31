"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

export default function Result() {
  const searchParams = useSearchParams();

  const filename = searchParams.get("filename");
  const languageCode = searchParams.get("option");
  const message = searchParams.get("message");

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
      <p className="text-lg text-gray-700 mb-2">
        Language-code: {languageCode}
      </p>
      <p className="text-md text-green-600 font-medium">{message}</p>
    </div>
  );
}

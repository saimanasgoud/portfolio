import React, { useState } from "react";
import { Eye, EyeOff, Download, ExternalLink, Loader2, Printer } from "lucide-react";

export default function Resume() {
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  const pdfUrl = "/portfolio/SaimanasResume.pdf";

  const handleViewClick = () => {
    if (!showPreview) {
      setLoading(true);
      setTimeout(() => setLoading(false), 1200);
    }
    setShowPreview((prev) => !prev);
  };

  const handlePrint = () => {
    window.open(pdfUrl, "_blank");
    setTimeout(() => window.print(), 500);
  };

  return (
    <main className="mx-auto rounded-lg w-full text-center py-24 px-4 mt-27 min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-600 transition">
      
      <h2 style={{"margin-top": -75}} className="text-4xl font-bold mb-4 text-green-600 dark:text-green-400">
        My Resume
      </h2>

      <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
        View, download, or preview my resume below.
        <br />
        For better mobile experience, use desktop mode.
      </p>

      {/* Summary Card */}
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-4x2 transition-all duration-600 p-6 mb-10 border border-gray-200 dark:border-purple-900 transform hover:-translate-y-2">
        <h3 className="text-2xl font-semibold text-yellow-800 dark:text-yellow-400 mb-3">
          Sai Manas
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          Frontend Developer • JavaScript • React
        </p>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Passionate about crafting responsive designs, clean UI, and smooth user experiences.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex justify-center flex-wrap gap-6 mb-10">
        <button
          onClick={handleViewClick}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
        >
          {showPreview ? <EyeOff size={20} /> : <Eye size={20} />}
          {showPreview ? "Hide Resume" : "View Resume"}
        </button>

        <a
          href={pdfUrl}
          download
          className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition flex items-center gap-2"
        >
          <Download size={20} /> Download
        </a>

        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-700 transition flex items-center gap-2"
        >
          <ExternalLink size={20} /> Open in New Tab
        </a>

        <button
          onClick={handlePrint}
          className="px-6 py-3 border-2 border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center gap-2"
        >
          <Printer size={20} /> Print
        </button>
      </div>

      {/* PDF Preview */}
      {showPreview && (
        <section
          id="resume-preview"
          className="border border-gray-300 dark:border-gray-700 rounded-xl shadow-2xl hover:shadow-[0_0_25px_rgba(0,0,0,0.2)] transition-all duration-300 overflow-hidden max-w-4xl mx-auto bg-white dark:bg-gray-800"
          style={{ height: "600px" }}
        >
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="animate-spin text-gray-600 dark:text-gray-300" size={40} />
            </div>
          ) : (
            <iframe
              src={pdfUrl}
              title="Resume Preview"
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
            />
          )}
        </section>
      )}
      
      <p className="text-gray-500 dark:text-gray-400 text-sm mt-6">
        Improved UI • Hover animations • Smooth gradients • Clean layout<br />
        Last Updated: January 2025 • File Size: ~120 KB
      </p>
    </main>
  );
}

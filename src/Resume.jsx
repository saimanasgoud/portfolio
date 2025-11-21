import React, { useState } from "react";

export default function Resume() {
  const [showPreview, setShowPreview] = useState(false);

  const pdfUrl = "/portfolio/SaimanasResume.pdf"; // Update path as needed

  const handleViewClick = () => {
    setShowPreview((prev) => !prev);
  };

  return (
    <main className=" mx-auto text-center py-20 px-4 mt-20 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold mb-6 text-green-600">My Resume</h2>
      <p className="text-gray-700 mb-10">
      You can view or download my resume using the buttons below.<br></br>
      If you are using mobile for the better experiance please use desktop mode.<br></br>  
      </p>
    

      <div className="flex justify-center space-x-6 mb-10">
        <button
          onClick={handleViewClick}
          className="px-6 py-3 cursor-pointer bg-green-600 text-white rounded-lg hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          aria-expanded={showPreview}
          aria-controls="resume-preview"
        >
          {showPreview ? "Hide Resume" : "View Resume"}
        </button>

        <a
          href={pdfUrl}
          download
          className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-100 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Download Resume PDF"
        >
          Download Resume
        </a>
      </div>

      {showPreview && (
        <section
          id="resume-preview"
          className="border border-gray-300 rounded shadow-md overflow-hidden"
          style={{ height: "600px" }}
        >
          <iframe
            src={pdfUrl}
            title="Resume Preview"
            className="w-full h-full"
            frameBorder="0"
            allowFullScreen
          />
        </section>
      )}
    </main>
  );
}

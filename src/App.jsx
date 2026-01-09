// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Navbar from './Navbar';
// import Home from './Home';
// import Resume from './Resume';
// import Footer from './Footer';
// import './App.css';
// import './index.css';
// import Certificate from './Certificate'
// import Skillset from './Skillset';
// import MessageBoard from './MessageBoard';

// export default function App() {
//   return (
//     // <BrowserRouter>
//     <>
//       <Navbar />
//       <main className="min-h-screen bg-gray-50 justify-center">
//         <Routes>
//           <Route path="/InteractionPoint" element={<MessageBoard />} />
//           <Route path="/messageboard" element={<MessageBoard />} />
//           <Route path="/" element={<Home />} />
//           <Route path="/skillset" element={<Skillset />} />
//           <Route path="/certificate" element={<Certificate />}/>
//           <Route path="/resume" element={<Resume />} />
//           <Route path="*" element={
//           <div className="flex flex-col items-center justify-center p-10">
//             <img src='/portfolio/404.jpg' alt='404 Not Found' className='mx-auto border-4 border-red -500 rounded-md w-full max-w-lg mt-25 mb-5 h-auto' />
//             <h2 className="text-2xl mt-4 text-red-600 pt-5 font-semibold">Oops! Page Not Found</h2>
//             <p className="text-gray-600 mt-2">The page you're looking for doesn't exist's.</p>
//         </div>
//           } />
//         </Routes>
//       </main>
//     <Footer />
//   </>
//   // </BrowserRouter>
//   );
// }


// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Resume from "./Resume";
import Footer from "./Footer";
import Certificate from "./Certificate";
import Skillset from "./Skillset";
import MessageBoard from "./MessageBoard";
import Projects from "./Projects";
import Game from "./Game"
import AboutMe from "./AboutMe";
import ConnectMe from "./Connect";
import TechnicalSkills from "./TechnicalSkills"
import Blog from "./Blog"
import Faq from "./Faq";
import './App.css';
import './index.css';

export default function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 flex justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skillset" element={<Skillset />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/InteractionPoint" element={<MessageBoard />} />
          <Route path="/messageboard" element={<MessageBoard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/game" element={<Game />} />
          <Route path="/about" element={<AboutMe/>} />
          <Route path="/connectme" element={<ConnectMe />} />
          <Route path="/technical-skills" element={<TechnicalSkills />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faq" element={<Faq />} />

          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center p-10">
                <img
                  src="/portfolio/404.jpg"
                  alt="404 Not Found"
                  className="mx-auto mt-33 border-4 border-red-500 rounded-md w-full max-w-lg mt-6 mb-5 h-auto"
                />
                <h2 className="text-2xl mt-1 text-red-600 pt-5 font-semibold">
                  Oops! Page Not Found
                </h2>
                <p className="text-gray-600 mt-2">
                  The page you're looking for doesn't exist.
                </p>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

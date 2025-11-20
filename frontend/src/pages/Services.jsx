import React from "react";
import Footer from "../components/Footer";
import { MdAnalytics, MdOutlineAdminPanelSettings, MdSecurity } from "react-icons/md";
import { FaCamera, FaCheck } from "react-icons/fa";
import { LuScanFace } from "react-icons/lu";


const Services = () => {
  return (
    <>
    <div className="pt-20 px-10 overflow-y-auto flex flex-col space-y-5">
      <h1 className="text-4xl font-semibold text-center">Our Services</h1>
      <p className="text-lg text-center mb-12 max-w-4xl mx-auto text-gray-700">
        Smart attendance tracking through advanced face detection and AI-powered analytics —
        secure, fast, and reliable for Institutions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-10 max-w-7xl mx-auto">
        {/* Card 1 */}
        <div className="flex flex-col p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 bg-white w-full">
          <h2 className="text-2xl font-semibold flex items-center gap-3 mb-3">
            <LuScanFace  className="text-[#0046FF] text-3xl" />
            AI-Based Face Recognition
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Uses YOLOv3 and InsightFace for highly accurate, real-time face detection and recognition of students and staff.
          </p>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 bg-white w-full">
          <h2 className="text-2xl font-semibold flex items-center gap-3 mb-3">
            <FaCheck className="text-[#0046FF] text-3xl" />
            Automated Attendance Making
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Automatically marks attendance and stores data securely in the database — no manual input required.
          </p>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 bg-white w-full">
          <h2 className="text-2xl font-semibold flex items-center gap-3 mb-3">
            <MdOutlineAdminPanelSettings className="text-[#0046FF] text-3xl" />
            Admin Dashboard
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Interactive dashboard for admin to view reports, attendance summaries, and student analytics easily.
          </p>
        </div>

        {/* Card 4 */}
        <div className="flex flex-col p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 bg-white w-full">
          <h2 className="text-2xl font-semibold flex items-center gap-3 mb-3">
            <FaCamera className="text-[#0046FF] text-3xl" />
            Multi-Camera Support
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Supports multiple camera angles for better face capture accuracy in classrooms or offices.
          </p>
        </div>

        {/* Card 5 */}
        <div className="flex flex-col p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 bg-white w-full">
          <h2 className="text-2xl font-semibold flex items-center gap-3 mb-3">
            <MdSecurity className="text-[#0046FF] text-3xl" />
            Data Security
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Ensures all attendance data is encrypted and stored safely, maintaining privacy and integrity.
          </p>
        </div>

        {/* Card 6 */}
        <div className="flex flex-col p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 bg-white w-full">
          <h2 className="text-2xl font-semibold flex items-center gap-3 mb-3">
            <MdAnalytics className="text-[#0046FF] text-3xl" />
            Reports & Analytics
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Generates monthly reports, charts, and insights to help management monitor student performance and attendance trends effectively.
          </p>
        </div>
      </div>
      
    </div>
    <Footer />
    </>
    
  );
};

export default Services;

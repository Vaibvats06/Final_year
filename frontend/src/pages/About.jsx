import React from "react";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
    <div className="bg-blue-50 min-h-screen flex flex-col text-gray-800">

      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold tracking-wide">FaceTrack</h1>
        <ul className="flex space-x-6 text-sm md:text-base">
          <li><a href="/" className="hover:text-gray-200">Home</a></li>
          <li><a href="/services" className="hover:text-gray-200">Services</a></li>
          <li><a href="/about" className="underline font-semibold">About</a></li>
          <li><a href="/contact" className="hover:text-gray-200">Contact</a></li>
        </ul>
      </nav>

      {/* About Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-20 py-16">
        {/* Text Section */}
        <div className="md:w-1/2 space-y-5">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-700">About Us</h2>
          <h3 className="text-2xl font-semibold text-gray-800 leading-snug">
            Innovative face detection attendance system for modern institutions.
          </h3>
          <p className="text-gray-600 leading-relaxed">
            FaceTrack leverages cutting-edge machine learning and computer vision technologies 
            to provide secure and reliable attendance tracking. Our system is designed to be 
            user-friendly, scalable, and adaptable to the needs of schools, colleges, and organizations.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium">
            Learn More
          </button>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center mb-10 md:mb-0">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
            alt="Face Recognition Illustration"
            className="w-72 md:w-96 drop-shadow-lg"
          />
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white py-16 px-8 md:px-20 text-center shadow-inner">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">Our Mission</h2>
        <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed">
          Our mission is to revolutionize the way institutions track attendance by integrating 
          artificial intelligence and automation. We aim to reduce manual errors, enhance security, 
          and save valuable time for educators and administrators.
        </p>
      </section>

      {/* Footer */}
      
    </div>
    <Footer />
    </>
  );
};

export default About;

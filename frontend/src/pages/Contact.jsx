import React from "react";
import Footer from "../components/Footer";
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast'
const Contact = () => {
  const navigate=useNavigate();
  const handleContactPage=()=>{
    toast.success("Your response Successfully Submit")
    // navigate('/')
    
  }

  return (
   
    <>
    <div className="bg-blue-50 min-h-screen text-gray-800 flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold tracking-wide">FaceTrack</h1>
        <ul className="flex space-x-6 text-sm md:text-base">
          <li><a href="/" className="hover:text-gray-200">Home</a></li>
          <li><a href="/services" className="hover:text-gray-200">Services</a></li>
          <li><a href="/about" className="hover:text-gray-200">About</a></li>
          <li><a href="/contact" className="underline font-semibold">Contact</a></li>
        </ul>
      </nav>

      {/* Header Section */}
      <section className="text-center py-16">
        <h2 className="text-4xl font-bold text-blue-700 mb-4">Contact Us</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get in touch with our team to learn more about the Face Detection Attendance System or request a live demo.
        </p>
      </section>

      {/* Contact Form */}
      <section className="flex justify-center mb-20">
        <form
          className="bg-white shadow-lg rounded-2xl p-8 w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3"
          onSubmit={handleContactPage}
        >
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              rows="5"
              placeholder="Write your message..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Send Message
          </button>
        </form>
      </section>

      
    </div>
    <Footer />
    </>
  );
};

export default Contact;
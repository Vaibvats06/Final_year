import React, { useState } from "react";

const CreateOrganization = () => {
  const [orgData, setOrgData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
  });

  const handleChange = (e) => {
    setOrgData({ ...orgData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🔹 Here you’ll connect API call (axios.post('/api/org/create', orgData))
    console.log("Organization created:", orgData);
  };

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0046FF] to-[#00B4FF] p-6">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-10">
        <h1 className="text-3xl font-semibold text-center text-[#0046FF] mb-2">
          Create Organization
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Register your institute to start smart attendance tracking with FaceTrack.
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Organization Name */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-2">
              Organization Name
            </label>
            <input
              type="text"
              name="name"
              value={orgData.name}
              onChange={handleChange}
              placeholder="Enter organization name"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0046FF]"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={orgData.email}
              onChange={handleChange}
              placeholder="Enter organization email"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0046FF]"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={orgData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0046FF]"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={orgData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0046FF]"
              required
            />
          </div>

          {/* Address */}
          <div className="flex flex-col md:col-span-2">
            <label className="font-medium text-gray-700 mb-2">Address</label>
            <textarea
              name="address"
              value={orgData.address}
              onChange={handleChange}
              placeholder="Enter organization address"
              className="border border-gray-300 rounded-lg px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[#0046FF]"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-[#0046FF] hover:bg-[#0033cc] text-white font-semibold py-2 rounded-lg transition-all duration-200"
            >
              Create Organization
            </button>
          </div>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-[#0046FF] font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default CreateOrganization;

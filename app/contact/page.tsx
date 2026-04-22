"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-20">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            Contact Us
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Reach out to Khushi International for local supply,
            bulk orders, or international export enquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* CONTACT INFO */}
          <div className="bg-white rounded-2xl p-8 shadow">
            <h2 className="text-2xl font-semibold mb-6">
              Our Office
            </h2>

            <p className="mb-4">
              <strong>Khushi International</strong><br />
              Fresh Fruits & Vegetables<br />
              Local Market • Export Quality
            </p>

            <p className="mb-3">
              📍 <strong>Address:</strong><br />
              Maharashtra, India
            </p>

            <p className="mb-3">
              📞 <strong>Phone:</strong><br />
              +91 8767668715
            </p>

            <p className="mb-3">
              📧 <strong>Email:</strong><br />
              info@khushiinternational.com
            </p>

            <p className="text-sm text-gray-500 mt-6">
              Available for domestic delivery and international exports.
            </p>
          </div>

          {/* CONTACT FORM */}
          <div className="bg-white rounded-2xl p-8 shadow">
            <h2 className="text-2xl font-semibold mb-6">
              Send an Enquiry
            </h2>

            {submitted ? (
              <div className="bg-green-100 border border-green-300 text-green-800 p-4 rounded-lg">
                ✅ Thank you for contacting us.<br />
                We will get back to you shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                />

                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                />

                <textarea
                  placeholder="Your Message"
                  rows={4}
                  required
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                ></textarea>

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
                >
                  Submit Enquiry
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

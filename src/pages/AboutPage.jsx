import React from "react";
import { FaCheckCircle, FaClinicMedical, FaHeartbeat, FaShieldAlt, FaHandsHelping, FaStore } from "react-icons/fa";
import { motion } from "framer-motion";

function AboutPage() {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-16 px-6 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-4"
        >
          Empowering Healthcare Professionals & Individuals
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg max-w-2xl mx-auto"
        >
          Reliable Medical Surgical Supplies since 2010 – MEDIZINTEK is committed to quality, innovation, and customer satisfaction.
        </motion.p>
      </section>

      {/* About Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.h2 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-semibold text-gray-800 mb-6"
        >
          About MEDIZINTEK
        </motion.h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Established in 2010, MEDIZINTEK is a leading authorized distributor of surgical disposables and healthcare products. 
          Serving hospitals and dealers across South India, we ensure high-quality products that meet industry standards.
        </p>

        <h2 className="text-3xl font-semibold text-gray-800 mt-8">Our Legacy</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          With dealership experience in brands like <span className="font-semibold">Nipro, Schulke, BD, Johnson & Johnson</span>, 
          we have built a strong presence in the healthcare industry. Our monthly turnover is ₹80-90 lakhs, and we are now expanding into the retail sector.
        </p>

        {/* Expansion Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 bg-gradient-to-r from-gray-100 to-gray-200 p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <FaStore className="text-blue-600" /> Medizintek Plus – Expanding Horizons
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mt-2">
            Introducing <span className="font-semibold">Medizintek Plus</span>, a Retail Hyper Mart for Surgical & Medicine, 
            with plans to expand into a <span className="font-semibold">Retail Pharmacy & Clinic</span> offering specialized doctor consultations.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mt-2">
            Expected sales: ₹25 lakhs/month with a minimum profit of 20%.
          </p>
        </motion.div>

        {/* Medizintek Promise */}
        <div className="mt-10">
          <h2 className="text-3xl font-semibold text-gray-800">The Medizintek Promise</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {[
              { icon: FaShieldAlt, title: "Quality First", desc: "We prioritize excellence, ensuring every product meets the highest standards." },
              { icon: FaHeartbeat, title: "Accessibility", desc: "Essential medical supplies, made affordable and available for all." },
              { icon: FaHandsHelping, title: "Customer-Centric", desc: "Dedicated to exceptional service, personalized support, and seamless shopping." },
              { icon: FaClinicMedical, title: "Integrity", desc: "Honest, transparent, and committed to ethical business practices." },
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="p-4 bg-gray-50 rounded-lg shadow-md flex items-start gap-4"
              >
                <item.icon className="text-blue-600 text-3xl" />
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-lg text-gray-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Services */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-3xl font-semibold flex items-center gap-2">
            <FaCheckCircle className="text-green-400" /> Beyond Healthcare
          </h2>
          <p className="text-lg mt-2">
            Expanding our services with a <span className="font-semibold">Hygiene Health Club, Beauty Station, Cafeteria, Game Center, 
            Office Space, Luxury Conference Hall,</span> and rental suites.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default AboutPage;

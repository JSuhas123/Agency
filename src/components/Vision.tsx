import { motion } from 'framer-motion';
import { Award, Compass, Target, Users } from 'lucide-react';
import React from 'react';

interface ValueCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  delay: number;
}

const ValueCard: React.FC<ValueCardProps> = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-gray-100 p-6 rounded-lg shadow-md"
  >
    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mb-4">
      <Icon className="text-black w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const Vision = () => {
  const values = [
    { icon: Target, title: "Innovation", description: "We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions.", delay: 0.3 },
    { icon: Users, title: "Collaboration", description: "We believe in building strong partnerships with our clients to achieve exceptional results.", delay: 0.4 },
    { icon: Award, title: "Excellence", description: "We maintain the highest standards in everything we do, from strategy to execution.", delay: 0.5 },
    { icon: Compass, title: "Integrity", description: "We operate with complete transparency and always put our clients' interests first.", delay: 0.6 }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 pt-32 pb-16 flex flex-col md:flex-row gap-12">
        {/* Left Side Content */}
        <div className="md:w-3/4">
          <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Vision</h1>
            <div className="bg-gray-100 p-8 rounded-lg shadow-md">
              <p className="text-gray-700 text-lg leading-relaxed">
                To be the catalyst for digital transformation, empowering businesses to thrive 
                in the digital age through innovative marketing solutions and exceptional service.
              </p>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-12">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <div className="bg-gray-100 p-8 rounded-lg shadow-md">
              <p className="text-gray-700 text-lg leading-relaxed">
                We deliver measurable results through data-driven marketing strategies, 
                creative excellence, and cutting-edge technology. Our mission is to help 
                businesses build meaningful connections with their audience and achieve 
                sustainable growth in the digital landscape.
              </p>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <ValueCard key={index} {...value} />
              ))}
            </div>
          </motion.section>
        </div>

        {/* Right Side Image */}
        <div className="md:w-1/4 flex items-center">
          <img src="/images/vision.jpg" alt="Vision" className="rounded-lg shadow-lg w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default Vision;

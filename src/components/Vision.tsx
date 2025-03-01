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
    className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md"
  >
    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-500 rounded-full flex items-center justify-center mb-3 sm:mb-4">
      <Icon className="text-black w-5 h-5 sm:w-6 sm:h-6" />
    </div>
    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">{title}</h3>
    <p className="text-sm sm:text-base text-gray-600">{description}</p>
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
      <div className="container mx-auto px-4 sm:px-6 pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16">
        {/* Flex container that switches between column and row */}
        <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12">
          {/* Main Content - adjusts width based on screen size */}
          <div className="w-full lg:w-3/4">
            <motion.section 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="mb-8 sm:mb-12"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Our Vision</h1>
              <div className="bg-gray-100 p-4 sm:p-6 md:p-8 rounded-lg shadow-md">
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  To be the catalyst for digital transformation, empowering businesses to thrive 
                  in the digital age through innovative marketing solutions and exceptional service.
                </p>
              </div>
            </motion.section>

            <motion.section 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 }} 
              className="mb-8 sm:mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Our Mission</h2>
              <div className="bg-gray-100 p-4 sm:p-6 md:p-8 rounded-lg shadow-md">
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  We deliver measurable results through data-driven marketing strategies, 
                  creative excellence, and cutting-edge technology. Our mission is to help 
                  businesses build meaningful connections with their audience and achieve 
                  sustainable growth in the digital landscape.
                </p>
              </div>
            </motion.section>

            <motion.section 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Our Values</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                {values.map((value, index) => (
                  <ValueCard key={index} {...value} />
                ))}
              </div>
            </motion.section>
          </div>

          {/* Right Side Image - becomes top image on mobile */}
          <div className="w-full lg:w-1/4 mb-8 lg:mb-0">
            <div className="sticky top-24">
              <img 
                src="/images/vision.jpg" 
                alt="Vision" 
                className="rounded-lg shadow-lg w-full h-auto object-cover max-h-96 lg:max-h-none" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vision;
import { motion } from 'framer-motion';
import { ArrowRight, BarChart, Code, Globe, Palette, Zap } from 'lucide-react';
import React from 'react';
import Navbar from './Navbar';

interface ServiceCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-zinc-900 p-6 rounded-lg hover:bg-zinc-800 transition-colors"
  >
    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
      <Icon className="text-black w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400 mb-4">{description}</p>
    <motion.button
      whileHover={{ x: 10 }}
      className="flex items-center text-yellow-400 font-medium"
    >
      Learn More <ArrowRight className="ml-2 w-4 h-4" />
    </motion.button>
  </motion.div>
);

const Services = () => {
  const services = [
    {
      icon: Zap,
      title: "Business Intelligence & Analytics",
      description: "Transforming data into actionable insights, enabling informed decision making optimized strategies and business growth.",
      delay: 0.2
    },
    {
      icon: Code,
      title: "Content Creation & Design",
      description: "Blends compelling story-telling with visually engaging elements to captivat.",
      delay: 0.3
    },
    {
      icon: BarChart,
      title: "Innovative Marketing & Growth",
      description: "Advanced tracking implementation, custom dashboards, and continuous optimization strategies.",
      delay: 0.4
    },
    {
      icon: Globe,
      title: "Web Design & Development",
      description: "Comprehensive SEO audits, content planning, and execution to improve organic visibility.",
      delay: 0.5
    },
    {
      icon: Palette,
      title: "Branding & Strategy",
      description: "Strategic brand positioning, visual identity design, and brand voice development.",
      delay: 0.6
    },
    {
      icon: Palette,
      title: "Content Marketing",
      description: "Creating valuabe content to attract, engage and retain audience.",
      delay: 0.7
    },
   
  ];

  return (
    <div className="min-h-screen bg-black relative">
      {/* Background image with opacity */}
      <div 
  className="absolute inset-0 bg-black"
  style={{
    backgroundImage: `url('/images/dm.jpg')`, // ✅ Corrected with url()
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.2, // Adjust opacity as needed
    mixBlendMode: 'overlay',
  }}
></div>

      {/* Content with relative positioning to appear above background */}
      <div className="relative z-10">
        <Navbar />
        
        <div className="container mx-auto px-6 pt-32 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mb-16"
          >
            <h1 className="text-5xl font-bold text-white mb-6">Our Services</h1>
            <p className="text-gray-400 text-lg">
              We offer comprehensive digital marketing solutions tailored to your business goals.
              Each service is designed to deliver measurable results and drive sustainable growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
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
      title: "Performance Marketing",
      description: "Data-driven campaigns across social media, PPC, and programmatic platforms to drive measurable ROI.",
      delay: 0.2
    },
    {
      icon: BarChart,
      title: "Analytics & Optimization",
      description: "Advanced tracking implementation, custom dashboards, and continuous optimization strategies.",
      delay: 0.3
    },
    {
      icon: Globe,
      title: "SEO & Content Strategy",
      description: "Comprehensive SEO audits, content planning, and execution to improve organic visibility.",
      delay: 0.4
    },
    {
      icon: Palette,
      title: "Brand Development",
      description: "Strategic brand positioning, visual identity design, and brand voice development.",
      delay: 0.5
    },
    {
      icon: Code,
      title: "Web Development",
      description: "Custom website development focused on conversion optimization and user experience.",
      delay: 0.6
    }
  ];

  return (
    <div className="min-h-screen bg-black">
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
  );
};

export default Services;
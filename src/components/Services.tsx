import { motion } from 'framer-motion';
import { ArrowRight, BarChart, Code, FileText, Globe, TrendingUp, Zap } from 'lucide-react';
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
    <motion.a
  whileHover={{ x: 10 }}
  href="/pdf/services.pdf" // Update this with the correct path
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center text-yellow-400 font-medium"
>
  Learn More <ArrowRight className="ml-2 w-4 h-4" />
</motion.a>
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
      description: "Blends compelling story-telling with visually engaging elements to create impactful brand experiences.",
      delay: 0.3
    },
    {
      icon: BarChart,
      title: "Innovative Marketing & Growth",
      description: "Leveraging creativity, data and technology to drive smarter strategies, enhance engagement , hence accelerating sustainable brand growth.",
      delay: 0.4
    },
    {
      icon: Globe,
      title: "Web Design & Development",
      description: "Creating seamless, visually engaging and high performance digital experiences that drive user engagement and business growth.",
      delay: 0.5
    },
    {
      icon: TrendingUp, // Represents growth and strategy
      title: "Branding & Strategy",
      description: "Creating a unique identity that resonates with your audience, while strategy ensures meaningful growth. Together they build a powerful market presence.",
      delay: 0.6
    },
    {
      icon: FileText, // Represents content creation and marketing
      title: "Content Marketing",
      description: "Using valuable content to attract, engage, and grow your audience, boosting awareness, trust, and impact.",
      delay: 0.7
    },
   
  ];

  return (
  
    <div className="min-h-screen relative bg-black">
    <Navbar />
    {/* Background Image with Tailwind */}
    <div className="absolute inset-0 bg-[url('/images/laptop.jpg')] bg-cover bg-center opacity-40"></div>
      {/* Content with relative positioning to appear above background */}
      <div className="relative z-10">
        
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
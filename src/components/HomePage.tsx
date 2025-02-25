import { motion } from 'framer-motion';
import { Award, ChevronRight, Compass, Target, Users } from 'lucide-react';
import React from 'react';
import AboutUs from './AboutUs';
import ContactSection from './ContactSection';
import Navbar from './Navbar';
import PortfolioPage from './PortfolioPage';

const HomePage = () => {
  
  const values = [
    { icon: Target, title: "Innovation", description: "We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions.", delay: 0.3 },
    { icon: Users, title: "Collaboration", description: "We believe in building strong partnerships with our clients to achieve exceptional results.", delay: 0.4 },
    { icon: Award, title: "Excellence", description: "We maintain the highest standards in everything we do, from strategy to execution.", delay: 0.5 },
    { icon: Compass, title: "Integrity", description: "We operate with complete transparency and always put our clients' interests first.", delay: 0.6 }
  ];

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

  return (
    <div className="min-h-screen bg-black">
  <Navbar />
  
  {/* Hero Section */}
  <section 
    className="relative min-h-[80vh] px-6 py-16 mb-16" 
    id="home"
  >
    {/* Background image with opacity overlay */}
    <div 
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: "url('/images/home.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity: 0.7,
      }}
    >
      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
    </div>
    
    {/* Content container */}
    <div className="container mx-auto pt-32 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl"
      >
        <h1 className="text-7xl font-light mb-2">
          <motion.div 
            className="text-white"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            DIGITAL
          </motion.div>
          <motion.div 
            className="text-yellow-400 font-bold"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            MARKETING
          </motion.div>
        </h1>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 border-l-4 border-yellow-400 pl-6 max-w-2xl"
        >
          <p className="text-white text-lg leading-relaxed">
            We help D2C brands unlock exponential growth through cutting-edge business 
            intelligence, innovative marketing, and high-converting web experiences. Let's 
            build your brand's future, together.
          </p>
        </motion.div>
        <motion.button
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ delay: 0.8 }}
          className="mt-12 group flex items-center space-x-2 bg-yellow-400 rounded-full px-6 py-3 text-black hover:bg-yellow-500 transition-colors"
        >
          <span>get a free strategy session</span>
          <motion.div
            className="w-6 h-6 bg-black rounded-full flex items-center justify-center"
            whileHover={{ rotate: 90 }}
          >
            <ChevronRight className="text-yellow-400 w-4 h-4" />
          </motion.div>
        </motion.button>
      </motion.div>
    </div>
  </section>

      {/* About Section */}
      <AboutUs />
      {/* Services Section */}
      <div className="min-h-screen bg-white flex">
        {/* Left Content Section */}
        <div className="w-1/2 p-16 flex flex-col justify-center">
          {/* Orange Accent Line */}
          <div className="w-16 h-1 bg-yellow-500 mb-6"></div>
          
          {/* Heading */}
          <h1 className="text-5xl font-bold text-[#1A1A1A] leading-tight mb-8">
            OUR DIGITAL<br />MARKETING
          </h1>
          
          {/* Main Description */}
          <p className="text-gray-700 mb-12 leading-relaxed">
            At SurgeWing, we redefine digital marketing by integrating business 
            intelligence, data-driven insights, and AI-powered automation to help 
            brands scale efficiently. Our strategies go beyond traditional marketing, 
            leveraging cutting-edge tools to enhance engagement, optimize 
            campaigns, and maximize conversions. We tailor each approach to fit your 
            brand's unique needs, ensuring impactful growth in a competitive digital 
            landscape.
          </p>
          
          {/* Two Column Section */}
          <div className="grid grid-cols-2 gap-8">
            {/* Business Intelligence Column */}
            <div>
              <h3 className="text-yellow-500 font-medium mb-4">
                Business Intelligence & Analytics
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We provide data-driven insights to optimize strategies, track market 
                trends, and enhance decision-making. Our analytics ensure real-
                time reporting, predictive insights, and measurable growth.
              </p>
            </div>
            
            {/* Innovative Marketing Column */}
            <div>
              <h3 className="text-yellow-500 font-medium mb-4">
                Innovative Marketing & Growth
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We craft data-driven marketing campaigns that drive 
                engagement, conversions, and brand growth. Our strategies 
                leverage consumer insights to maximize impact.
              </p>
            </div>
          </div>
        </div>
        
        {/* Right Image Section */}
        <div className="w-1/2 relative">
          <div className="absolute inset-0 bg-black">
            <img 
              src="/images/dm.jpg" 
              alt="Modern Architecture"
              className="w-full h-full object-cover grayscale"
            />
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-6 pt-32 pb-16 flex flex-col md:flex-row gap-12">
          {/* Left Side Content */}
          <div className="md:w-3/4">
            <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Vision</h1>
                <p className="text-gray-700 text-lg leading-relaxed">
                  To be the catalyst for digital transformation, empowering businesses to thrive 
                  in the digital age through innovative marketing solutions and exceptional service.
                </p>
            </motion.section>
  
            <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-12">
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  We deliver measurable results through data-driven marketing strategies,
                  creative excellence, and cutting-edge technology. Our mission is to help
                  businesses build meaningful connections with their audience and achieve
                  sustainable growth in the digital landscape.
                </p>
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
  <img src="/images/vision.jpg" alt="Vision"
    className="rounded-lg shadow-lg w-full h-auto md:h-[100%]"/>
</div>
        </div>
      </div>
      <PortfolioPage />
      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

export default HomePage;
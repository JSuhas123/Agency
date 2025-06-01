import { motion } from 'framer-motion';
import { Award, Compass, Download, Target, Users } from 'lucide-react';
import React, { useState } from 'react';
import AboutUs from './AboutUs';
import ContactSection from './ContactSection';
import Navbar from './Navbar';

const HomePage = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleDownload = () => {
    const pdfUrl = "/pdf/services.pdf";
    window.open(pdfUrl, '_blank');

    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = "services.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const values = [
    {
      icon: Target,
      title: "Innovation",
      description: "We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions.",
      delay: 0.3
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "We believe in building strong partnerships with our clients to achieve exceptional results.",
      delay: 0.4
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We maintain the highest standards in everything we do, from strategy to execution.",
      delay: 0.5
    },
    {
      icon: Compass,
      title: "Integrity",
      description: "We operate with complete transparency and always put our clients' interests first.",
      delay: 0.6
    }
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
      <section className="relative min-h-[80vh] px-4 sm:px-6 py-16 mb-16" id="home">
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
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <div className="container mx-auto pt-20 sm:pt-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-light mb-2">
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
              className="mt-8 border-l-4 border-yellow-400 pl-4 sm:pl-6 max-w-2xl"
            >
              <p className="text-white text-base sm:text-lg leading-relaxed">
                We help D2C brands unlock exponential growth through cutting-edge business intelligence,
                innovative marketing, and high-converting web experiences. Let's build your brand's future, together.
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 0.8 }}
              className="mt-8 sm:mt-12 group flex items-center space-x-2 bg-yellow-400 rounded-full px-4 sm:px-6 py-3 text-black hover:bg-yellow-500 transition-colors"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleDownload}
              aria-label="Download strategy session PDF"
            >
              <span className="flex items-center gap-2">
                get a free strategy session
                <Download
                  size={18}
                  className={`transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                />
              </span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <AboutUs />

      {/* Services Section */}
      <div className="bg-white">
        {/* First service block */}
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-16 flex flex-col justify-center">
            <div className="w-16 h-1 bg-yellow-500 mb-6"></div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-tight mb-6 sm:mb-8">
              OUR DIGITAL<br />MARKETING
            </h1>
            <p className="text-gray-700 mb-8 sm:mb-12 leading-relaxed">
              At SurgeWing, we revolutionize digital growth by blending creativity, cutting-edge content creation,
              innovative marketing, and business intelligence. From dynamic content strategies and high-impact social
              media management to seamless web development and data-backed campaign optimization, we craft tailored
              solutions that drive engagement and conversions. With SurgeWing, your brand doesn't just grow—it thrives.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <h3 className="text-yellow-500 font-medium mb-3 sm:mb-4">
                  Content Creation & Design
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We craft compelling visuals, copy, and multimedia content that enhance brand identity and engagement.
                  Our designs are tailored to captivate audiences and drive results.
                </p>
              </div>
              <div>
                <h3 className="text-yellow-500 font-medium mb-3 sm:mb-4">
                  Web & E-Commerce Development
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We build high-performing websites and e-commerce platforms optimized for user experience, speed, and conversions.
                  Our solutions ensure seamless navigation and scalable growth.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-64 sm:h-96 md:h-auto relative">
            <div className="absolute inset-0 bg-black">
              <img
                src="/images/dm1.jpg"
                alt="Digital marketing team at work"
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </div>
        </div>

        {/* Second service block */}
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 h-64 sm:h-96 md:h-auto relative order-1 md:order-1">
            <div className="absolute inset-0 bg-black">
              <img
                src="/images/dm.jpg"
                alt="Business intelligence"
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-16 flex flex-col justify-center order-2 md:order-2">
            <div className="w-16 h-1 bg-yellow-500 mb-6"></div>
            <p className="text-gray-700 mb-8 sm:mb-12 leading-relaxed">
              At SurgeWing, we empower digital acceleration through deep analytics, strategic design,
              and innovative growth strategies. We support brands from vision to execution, unlocking performance.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <h3 className="text-yellow-500 font-medium mb-3 sm:mb-4">
                  Business Intelligence & Analytics
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We provide data-driven insights to optimize strategies, track market trends, and enhance decision-making.
                  Our analytics ensure real-time reporting, predictive insights, and measurable growth.
                </p>
              </div>
              <div>
                <h3 className="text-yellow-500 font-medium mb-3 sm:mb-4">
                  Innovative Marketing & Growth
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We craft data-driven marketing campaigns that drive measurable ROI and customer acquisition.
                  Our strategies adapt to industry shifts and audience behavior for sustained success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <section className="bg-gray-100 py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Our Core Values
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The guiding principles that shape our vision, culture, and commitment to clients.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <ValueCard key={index} {...value} />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

export default HomePage;

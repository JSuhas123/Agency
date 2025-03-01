import { motion, useAnimation } from 'framer-motion';
import { Clock, Eye, Globe, Mail, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Navbar from './Navbar';

const ContactSection = () => {
  const [visitorCount, setVisitorCount] = useState(1);
  
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Simulate loading visitor count from storage or API
  useEffect(() => {
    // In a real implementation, you'd fetch this from your backend or analytics
    const storedCount = localStorage.getItem('visitorCount');
    if (storedCount) {
      setVisitorCount(parseInt(storedCount, 10));
    } else {
      // Generate random number between 1000-5000 for demonstration
      const randomCount = Math.floor(Math.random() * 4000) + 1000;
      setVisitorCount(randomCount);
      localStorage.setItem('visitorCount', randomCount.toString());
    }
  }, []);

  const contactInfo = [
    { icon: Phone, text: "+91 9036329838", href: "tel:+91 9036329838" },
    { icon: Globe, text: "www.surgewing.com", href: "https://www.surgewing.com" },
    { icon: Mail, text: "surgewingsolutions@gmail.com", href: "mailto:surgewingsolutions@gmail.com" },
    { icon: Clock, text: "All Days: 9:00 AM - 9:00 PM", href: null }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };
  
  return (
    <>
      <Navbar />
      <section ref={ref} className="container mx-auto px-6 py-24 relative" id="contact">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="flex justify-center"
        >
          {/* Centered Contact Information */}
          <motion.div
            variants={itemVariants}
            className="bg-zinc-900 p-8 rounded-lg shadow-xl max-w-2xl w-full"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-5xl font-bold text-white mb-8 text-center"
            >
              CONTACT US
            </motion.h2>

            <motion.div
              variants={containerVariants}
              className="space-y-6"
            >
              {contactInfo.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href ? item.href : undefined}
                  target={item.href ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, x: 10 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center space-x-4 text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                >
                  <div className="bg-yellow-400/10 p-3 rounded-full">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="text-lg">{item.text}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Visitor Counter - positioned at bottom right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          whileHover={{ opacity: 1 }}
          className="absolute bottom-4 right-6 flex items-center space-x-1 text-xs text-gray-400 bg-zinc-900/70 px-2 py-1 rounded-full"
        >
          <Eye className="w-3 h-3" />
          <span>{visitorCount.toLocaleString()} visitors</span>
        </motion.div>
      </section>
    </>
  );
};

export default ContactSection;
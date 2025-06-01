import { motion, useAnimation } from 'framer-motion';
import { Clock, Globe, Mail, Phone } from 'lucide-react';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const ContactSection = () => {
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
    <section ref={ref} className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 relative" id="contact">
      <motion.div
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="flex justify-center"
      >
        <motion.div
          variants={itemVariants}
          className="bg-zinc-900 p-6 sm:p-8 rounded-lg shadow-xl max-w-lg sm:max-w-2xl w-full"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8 text-center"
          >
            CONTACT US
          </motion.h2>

          <motion.div variants={containerVariants} className="space-y-5 sm:space-y-6">
            {contactInfo.map((item, index) => (
              <motion.a
                key={index}
                href={item.href ? item.href : undefined}
                target={item.href ? "_blank" : undefined}
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-3 sm:space-x-4 text-gray-300 hover:text-yellow-400 transition-colors duration-300"
              >
                <div className="bg-yellow-400/10 p-2 sm:p-3 rounded-full">
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-base sm:text-lg">{item.text}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
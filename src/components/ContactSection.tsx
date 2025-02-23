import { motion, useAnimation } from 'framer-motion';
import { Clock, Globe, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Navbar from './Navbar';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

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
    { icon: Phone, text: "+123-456-7890", href: "tel:+1234567890" },
    { icon: Globe, text: "www.reallygreatsite.com", href: "https://www.reallygreatsite.com" },
    { icon: Mail, text: "hello@reallygreatsite.com", href: "mailto:hello@reallygreatsite.com" },
    { icon: MapPin, text: "123 Anywhere ST., Any City, ST 12345", href: "https://maps.google.com" },
    { icon: Clock, text: "Mon-Fri: 9:00 AM - 6:00 PM", href: null }
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
      <section ref={ref} className="container mx-auto px-6 py-24" id="contact">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-12"
        >
          {/* Contact Information */}
          <motion.div
            variants={itemVariants}
            className="bg-zinc-900 p-8 rounded-lg shadow-xl"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-5xl font-bold text-white mb-8"
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

          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            className="bg-zinc-800 p-8 rounded-lg shadow-xl"
          >
            <motion.h3 
              variants={itemVariants}
              className="text-3xl font-bold text-white mb-6"
            >
              Send Us a Message
            </motion.h3>

            <motion.form 
              variants={containerVariants}
              className="space-y-6"
            >
              <motion.div variants={itemVariants}>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-zinc-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-zinc-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full bg-zinc-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </motion.div>

              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </motion.button>
            </motion.form>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default ContactSection;
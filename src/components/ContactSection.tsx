import { motion, useAnimation } from 'framer-motion';
import { Clock, Globe, Mail, Phone, Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Navbar from './Navbar';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  type SubmitStatus = {
    success: boolean;
    message: string;
  } | null;

  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
  
    try {
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error("Please fill in all required fields");
      }
  
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error("Please enter a valid email address");
      }
  
      const response = await fetch('https://api.surgewingsolutions.com/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Submission failed");
  
      setFormData({ name: '', email: '', message: '' });
      setSubmitStatus({ success: true, message: "Your message has been sent!" });
  
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred.";
      setSubmitStatus({ success: false, message: errorMessage });
    } finally {
      setIsSubmitting(false);
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
              onSubmit={handleSubmit}
            >
              <motion.div variants={itemVariants}>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-zinc-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-zinc-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full bg-zinc-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                />
              </motion.div>

              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-lg ${submitStatus.success ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}
                >
                  {submitStatus.message}
                </motion.div>
              )}

              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full font-bold py-3 px-6 rounded-lg flex items-center justify-center space-x-2 ${isSubmitting ? 'bg-yellow-600 cursor-wait' : 'bg-yellow-400 hover:bg-yellow-500'} text-black transition-colors duration-300`}
                type="submit"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
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
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import Navbar from './Navbar';

const ContactForm = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "hello@digitalmarketing.com",
      delay: 0.2
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+1 (555) 123-4567",
      delay: 0.3
    },
    {
      icon: MapPin,
      title: "Location",
      content: "123 Marketing St, Digital City, DC 12345",
      delay: 0.4
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 pb-16">
        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-bold text-white mb-6">Get in Touch</h1>
            <p className="text-gray-400 text-lg mb-8">
              Ready to transform your digital presence? Let's discuss how we can help 
              your business grow.
            </p>
            
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: item.delay }}
                  className="flex items-start"
                >
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <item.icon className="text-black w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-white font-medium">{item.title}</h3>
                    <p className="text-gray-400">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-zinc-900 p-8 rounded-lg"
          >
            <form className="space-y-6">
              <div>
                <label className="block text-white mb-2">Name</label>
                <input
                  type="text"
                  className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Email</label>
                <input
                  type="email"
                  className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Your email"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Message</label>
                <textarea
                  className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 h-32"
                  placeholder="Your message"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-yellow-400 text-black font-medium py-3 rounded-lg hover:bg-yellow-500 transition-colors"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 bg-zinc-900 rounded-lg p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Office Hours</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-yellow-400 font-medium mb-2">Weekdays</h3>
              <p className="text-gray-400">Monday - Friday: 9:00 AM - 6:00 PM</p>
            </div>
            <div>
              <h3 className="text-yellow-400 font-medium mb-2">Weekends</h3>
              <p className="text-gray-400">Available by appointment only</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactForm;
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Navbar from './Navbar';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32">
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
    </div>
  );
};

export default HomePage;
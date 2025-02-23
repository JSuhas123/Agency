import { motion } from 'framer-motion';
import Navbar from './Navbar';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full"
          >
            <img
              src="/api/placeholder/600/600"
              alt="SurgeWing Team"
              className="rounded-lg shadow-xl w-full h-full object-cover"
            />
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold text-gray-900 mb-6"
            >
              ABOUT US
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-700 mb-4"
            >
              At SurgeWing, we empower D2C brands with business intelligence, branding,
              web development, and content design to fuel their growth.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-gray-700 mb-4"
            >
              Our data-driven approach ensures that every marketing move is optimized for
              maximum impact and scalability. We believe in innovation, personalization, and
              strategic execution to help brands thrive in an evolving digital landscape.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg text-gray-700 mb-4"
            >
              Whether you're a startup looking for a breakthrough or an established brand
              seeking transformation, we craft solutions that drive results.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-lg text-gray-700"
            >
              We believe in the power of AI, creativity, and strategic execution to transform
              brands into industry leaders. Whether you're a startup looking to establish your
              presence or a growing business aiming for expansion, our tailored approach
              ensures measurable success. At SurgeWing, we don't just market—we build
              brands that thrive in the digital age.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
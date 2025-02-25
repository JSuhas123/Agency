import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Navbar from './Navbar';

const AboutUs = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div ref={ref} className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="space-y-16"
        >
          {/* Top section with main image and content */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={itemVariants}
              className="w-full h-[400px]"
            >
              <img
                src="/images/about 2.jpg"
                alt="SurgeWing Team"
                className="rounded-lg shadow-xl w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="space-y-6"
            >
              <motion.h1
                variants={itemVariants}
                className="text-4xl font-bold text-gray-900 mb-6"
              >
                ABOUT US
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg text-gray-700"
              >
                At SurgeWing, we empower D2C brands with business intelligence, branding,
                web development, and content design to fuel their growth.
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-lg text-gray-700"
              >
                Our data-driven approach ensures that every marketing move is optimized for
                maximum impact and scalability. We believe in innovation, personalization, and
                strategic execution to help brands thrive in an evolving digital landscape.
              </motion.p>
            </motion.div>
          </div>

          {/* Bottom section with content and secondary image */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={containerVariants}
              className="space-y-6 order-2 md:order-1"
            >
              <motion.p
                variants={itemVariants}
                className="text-lg text-gray-700"
              >
                Whether you're a startup looking for a breakthrough or an established brand
                seeking transformation, we craft solutions that drive results.
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-lg text-gray-700"
              >
                We believe in the power of AI, creativity, and strategic execution to transform
                brands into industry leaders. Whether you're a startup looking to establish your
                presence or a growing business aiming for expansion, our tailored approach
                ensures measurable success. At SurgeWing, we don't just market—we build
                brands that thrive in the digital age.
              </motion.p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="w-full h-[400px] order-1 md:order-2"
            >
              <img
                src="/images/about 2.jpg"
                alt="Our Workspace"
                className="rounded-lg shadow-xl w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
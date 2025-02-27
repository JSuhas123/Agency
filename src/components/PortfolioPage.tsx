/*import { motion, useAnimation } from 'framer-motion';
import {
  ArrowRight,
} from 'lucide-react';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Navbar from './Navbar';

interface CaseStudyCardProps {
  title: string;
  category: string;
  description: string;
  stats: {
    roi: string;
    duration: string;
    impact: string;
  };
  delay: number;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ 
  title, 
  category, 
  description, 
  stats
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.5,
            ease: "easeOut"
          }
        }
      }}
      className="bg-zinc-900 rounded-lg p-6 flex flex-col justify-between h-full hover:shadow-lg transition-shadow duration-300"
    >
      <div>
        <div className="inline-block px-3 py-1 bg-yellow-400 rounded-full mb-4">
          <span className="text-zinc-900 text-sm font-medium">{category}</span>
        </div>
        
        <h3 className="text-white text-lg font-bold mb-3 group-hover:text-yellow-400 transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-gray-400 text-sm mb-6">{description}</p>
      </div>

      <div>
        <div className="grid grid-cols-3 gap-2 mb-4 py-4 border-t border-zinc-800">
          <div className="text-center">
            <p className="text-yellow-400 text-lg font-bold">{stats.roi}</p>
            <p className="text-white text-xs">ROI</p>
          </div>
          <div className="text-center">
            <p className="text-yellow-400 text-lg font-bold">{stats.duration}</p>
            <p className="text-white text-xs">Duration</p>
          </div>
          <div className="text-center">
            <p className="text-yellow-400 text-lg font-bold">{stats.impact}</p>
            <p className="text-white text-xs">Impact</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center text-white hover:text-yellow-400 transition-colors duration-300 text-sm font-medium"
        >
          View Details <ArrowRight className="ml-2 w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

/*const StatsCard = ({ icon: Icon, value, label }: { icon: React.FC<LucideProps>, value: string, label: string }) => (
  <motion.div 
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
    className="flex items-center space-x-4 bg-zinc-50 p-4 rounded-lg"
  >
    <div className="bg-yellow-400 p-2 rounded-lg">
      <Icon className="w-6 h-6 text-zinc-900" />
    </div>
    <div>
      <p className="text-2xl font-bold text-zinc-900">{value}</p>
      <p className="text-sm text-zinc-600">{label}</p>
    </div>
  </motion.div>
);

const PortfolioSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        controls.start('visible');
      }, 1000);
    }
  }, [controls, inView]);

  /*const stats = [
    { icon: Globe, value: "50+", label: "Global Clients" },
    { icon: Award, value: "95%", label: "Success Rate" },
    { icon: Users, value: "1M+", label: "Users Reached" },
  ];

  const caseStudies = [
    {
      title: "E-commerce Growth Strategy",
      category: "Digital Marketing",
      description: "300% growth in online sales through integrated marketing campaigns.",
      stats: {
        roi: "300%",
        duration: "6 mo",
        impact: "1M+"
      },
      delay: 0.2
    },
    {
      title: "Brand Transformation",
      category: "Branding",
      description: "150% increase in brand engagement for luxury lifestyle brand.",
      stats: {
        roi: "150%",
        duration: "4 mo",
        impact: "500K"
      },
      delay: 0.3
    },
    {
      title: "SEO Optimization",
      category: "SEO & Content",
      description: "200% increase in organic traffic through technical SEO.",
      stats: {
        roi: "200%",
        duration: "8 mo",
        impact: "2M+"
      },
      delay: 0.4
    },
    {
      title: "Social Media Campaign",
      category: "Social Media",
      description: "400% engagement increase through viral campaign strategy.",
      stats: {
        roi: "400%",
        duration: "3 mo",
        impact: "3M+"
      },
      delay: 0.5
    },
    {
      title: "Web Performance",
      category: "Development",
      description: "80% improvement in core web vitals and conversion.",
      stats: {
        roi: "180%",
        duration: "2 mo",
        impact: "1.5M+"
      },
      delay: 0.6
    }
  ];

  return (
    <>
      <Navbar />
      <section ref={ref} className="bg-white py-20" id="portfolio">
        <div className="container mx-auto px-6">
          <motion.div 
            className="space-y-12"
            initial="hidden"
            animate={controls}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.2  }
              }
            }}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="space-y-4">
                <motion.h2 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                  }}
                  className="text-4xl font-bold text-zinc-900"
                >
                  Our Success Stories
                </motion.h2>
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                  }}
                  className="w-20 h-1 bg-yellow-400"
                />
              </div>
              
              {/*<motion.div
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                className="grid grid-cols-3 gap-4"
              >
                {stats.map((stat, index) => (
                  <StatsCard key={index} {...stat} />
                ))}
              </motion.div>}
            </div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
            >
              {caseStudies.map((study, index) => (
                <CaseStudyCard key={index} {...study} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default PortfolioSection;*/
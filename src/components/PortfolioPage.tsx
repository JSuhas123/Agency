import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import React from 'react';

interface PortfolioCardProps {
  image: string;
  title: string;
  category: string;
  description: string;
  delay: number;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ image, title, category, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-zinc-900 rounded-lg overflow-hidden group"
  >
    <div className="relative overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover"
      />
      <div className="absolute inset-0 bg-yellow-400 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
    </div>
    <div className="p-6">
      <div className="text-yellow-400 text-sm mb-2">{category}</div>
      <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        className="flex items-center text-white"
      >
        View Case Study <ExternalLink className="ml-2 w-4 h-4" />
      </motion.button>
    </div>
  </motion.div>
);

const PortfolioPage = () => {

  return (
    <section className="container mx-auto px-6 py-16 mb-16 pt-32 bg-white" id="home">
  <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
    <div className="lg:col-span-2 flex flex-col justify-center space-y-6">
      <h1 className="text-5xl font-bold text-gray-900">Company Portfolio</h1>
      <p className="text-gray-700 text-lg leading-relaxed">
        At SurgeWing, we specialize in empowering D2C brands through cutting-edge business intelligence, strategic branding, and growth-focused digital marketing. Our expertise ensures that every brand we work with gains a competitive edge through data-driven decision-making.
      </p>
      <p className="text-gray-700 text-lg leading-relaxed">
        We craft compelling brand identities and marketing strategies that resonate with target audiences. From designing visually striking brand assets to executing high-impact campaigns, we help businesses create lasting impressions and build customer loyalty.
      </p>
      <p className="text-gray-700 text-lg leading-relaxed">
        Our web development and e-commerce solutions focus on delivering seamless digital experiences. By building high-performance websites and optimizing online stores, we ensure brands maximize engagement, streamline operations, and drive revenue growth.
      </p>
    </div>
    
    <div className="lg:col-span-3">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-4"
      >
        <div className="space-y-4">
          <PortfolioCard 
            image="/api/placeholder/400/250" 
            title="E-commerce Growth Strategy" 
            category="Digital Marketing" 
            description="Helped a D2C brand achieve 300% growth in online sales through integrated marketing campaigns." 
            delay={0.2} 
          />
          <PortfolioCard 
            image="/api/placeholder/400/250" 
            title="Brand Transformation" 
            category="Branding" 
            description="Complete brand overhaul and digital presence optimization for a luxury lifestyle brand." 
            delay={0.3} 
          />
          <PortfolioCard 
            image="/api/placeholder/400/250" 
            title="SEO Success Story" 
            category="SEO & Content" 
            description="Achieved 200% increase in organic traffic through strategic content and technical SEO." 
            delay={0.4} 
          />
        </div>
      </motion.div>
    </div>
  </div>
</section>

  );
};

export default PortfolioPage;
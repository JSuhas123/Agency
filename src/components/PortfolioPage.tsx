import { motion, useAnimation } from 'framer-motion';
import { ArrowRight, Check, ChevronLeft, Download, ExternalLink, Eye, LucideProps, Play, X } from 'lucide-react';
import React, { memo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Navbar from './Navbar';

// Improved TypeScript interfaces
interface Stat {
  icon: React.FC<LucideProps>;
  value: string;
  label: string;
}

interface CaseStudyStats {
  roi: string;
  duration: string;
  impact: string;
}

interface DetailedCaseStudy {
  challenge: string;
  solution: string;
  results: string[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
  galleryImages?: string[];
}

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  description: string;
  stats: CaseStudyStats;
  delay: number;
  imageUrl: string;
  brandLogo?: string;
  brandName: string;
  details: DetailedCaseStudy;
}

// New interfaces for creative work
interface CreativeWorkStats {
  views?: string;
  engagement?: string;
  duration?: string;
  format?: string;
}

interface CreativeWork {
  id: string;
  title: string;
  category: string;
  description: string;
  stats: CreativeWorkStats;
  thumbnailUrl: string;
  videoUrl?: string; // MP4 video link
  previewUrl?: string; // For thumbnails and static content
  brandName: string;
  tags: string[];
  delay: number;
}

// Animation variants
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: custom * 0.1
    }
  })
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: { duration: 0.2, ease: "easeIn" }
  }
};

const contentVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3, staggerChildren: 0.1 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

// Memoized components
const StatsCard = memo(({ icon: Icon, value, label, index }: Stat & { index: number }) => (
  <motion.div 
    custom={index}
    variants={fadeInUpVariants}
    className="flex items-center space-x-4 bg-white p-6 rounded-lg shadow-md border border-zinc-100 hover:shadow-lg transition-shadow duration-300"
  >
    <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-3 rounded-lg shadow-sm">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-2xl font-bold text-zinc-900">{value}</p>
      <p className="text-sm text-zinc-600 font-medium">{label}</p>
    </div>
  </motion.div>
));

const CaseStudyCard = memo(({ 
  id,
  title, 
  category, 
  description, 
  stats,
  delay,
  imageUrl,
  brandLogo,
  brandName,
  onViewDetails
}: CaseStudy & { onViewDetails: (id: string) => void }) => {
  return (
    <motion.div
      custom={delay}
      variants={fadeInUpVariants}
      className="bg-white rounded-xl overflow-hidden flex flex-col justify-between h-full shadow-md border border-zinc-100 hover:shadow-xl transition-all duration-300 group"
      whileHover={{ y: -5 }}
    >
      <div>
        <div className="relative h-44 bg-zinc-100">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <div className="inline-block px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full shadow-sm">
              <span className="text-white text-xs font-semibold tracking-wide">{category}</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-zinc-800 text-lg font-bold group-hover:text-yellow-500 transition-colors duration-300">
              {title}
            </h3>
            
            {brandLogo ? (
              <img src={brandLogo} alt={brandName} className="h-8 w-8 rounded-full object-cover" />
            ) : (
              <div className="h-8 w-8 bg-zinc-100 rounded-full flex items-center justify-center">
                <span className="text-xs text-zinc-500 font-bold">{brandName.charAt(0)}</span>
              </div>
            )}
          </div>
          
          <p className="text-zinc-600 mb-6 text-sm leading-relaxed">{description}</p>
        </div>
      </div>

      <div className="mt-auto p-6 pt-0">
        <div className="grid grid-cols-3 gap-2 mb-4 py-4 border-t border-zinc-100">
          <div className="text-center">
            <p className="text-yellow-500 text-lg font-bold">{stats.roi}</p>
            <p className="text-zinc-600 text-xs font-medium">ROI</p>
          </div>
          <div className="text-center">
            <p className="text-yellow-500 text-lg font-bold">{stats.duration}</p>
            <p className="text-zinc-600 text-xs font-medium">Duration</p>
          </div>
          <div className="text-center">
            <p className="text-yellow-500 text-lg font-bold">{stats.impact}</p>
            <p className="text-zinc-600 text-xs font-medium">Impact</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onViewDetails(id)}
          className="flex items-center justify-center bg-zinc-50 hover:bg-yellow-50 border border-zinc-200 hover:border-yellow-200 text-zinc-800 hover:text-yellow-500 transition-colors duration-300 text-sm font-medium py-3 px-4 rounded-lg w-full"
        >
          View Details <ArrowRight className="ml-2 w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
});

// New Creative Work Card Component
const CreativeWorkCard = memo(({ 
  id,
  title, 
  category, 
  description, 
  stats,
  thumbnailUrl,
  videoUrl,
  previewUrl,
  brandName,
  tags,
  delay,
  onViewDetails
}: CreativeWork & { onViewDetails: (work: CreativeWork) => void }) => {
  
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      custom={delay}
      variants={fadeInUpVariants}
      className="bg-white rounded-xl overflow-hidden flex flex-col justify-between h-full shadow-md border border-zinc-100 hover:shadow-xl transition-all duration-300 group"
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <div className="relative h-48 bg-zinc-100 overflow-hidden">
          <img 
            src={thumbnailUrl} 
            alt={title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Play button overlay for videos */}
          {videoUrl && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white bg-opacity-90 rounded-full p-3 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                <Play className="w-6 h-6 text-zinc-800" />
              </div>
            </div>
          )}
          
          <div className="absolute top-4 left-4">
            <div className="inline-block px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full shadow-sm">
              <span className="text-white text-xs font-semibold tracking-wide">{category}</span>
            </div>
          </div>
          
          {/* Eye icon for thumbnails */}
          {!videoUrl && (
            <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Eye className="w-4 h-4 text-zinc-700" />
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-zinc-800 text-lg font-bold group-hover:text-yellow-500 transition-colors duration-300 flex-1 pr-2">
              {title}
            </h3>
            <div className="h-8 w-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xs text-white font-bold">{brandName.charAt(0)}</span>
            </div>
          </div>
          
          <p className="text-zinc-600 mb-4 text-sm leading-relaxed">{description}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-zinc-100 text-zinc-600 text-xs rounded-full">
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-1 bg-zinc-100 text-zinc-600 text-xs rounded-full">
                +{tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-auto p-6 pt-0">
        <div className="grid grid-cols-2 gap-3 mb-4 py-4 border-t border-zinc-100">
          {stats.views && (
            <div className="text-center">
              <p className="text-yellow-500 text-lg font-bold">{stats.views}</p>
              <p className="text-zinc-600 text-xs font-medium">Views</p>
            </div>
          )}
          {stats.engagement && (
            <div className="text-center">
              <p className="text-yellow-500 text-lg font-bold">{stats.engagement}</p>
              <p className="text-zinc-600 text-xs font-medium">Engagement</p>
            </div>
          )}
          {stats.duration && (
            <div className="text-center">
              <p className="text-yellow-500 text-lg font-bold">{stats.duration}</p>
              <p className="text-zinc-600 text-xs font-medium">Duration</p>
            </div>
          )}
          {stats.format && (
            <div className="text-center">
              <p className="text-yellow-500 text-lg font-bold">{stats.format}</p>
              <p className="text-zinc-600 text-xs font-medium">Format</p>
            </div>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onViewDetails({
            id, title, category, description, stats, thumbnailUrl, videoUrl, previewUrl, brandName, tags, delay
          })}
          className="flex items-center justify-center bg-zinc-50 hover:bg-yellow-50 border border-zinc-200 hover:border-yellow-200 text-zinc-800 hover:text-yellow-500 transition-colors duration-300 text-sm font-medium py-3 px-4 rounded-lg w-full"
        >
          {videoUrl ? 'Watch Video' : 'View Details'} <ArrowRight className="ml-2 w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
});

// Creative Work Detail Modal
const CreativeWorkDetailModal = memo(({ 
  work, 
  onClose 
}: { 
  work: CreativeWork | null, 
  onClose: () => void 
}) => {
  if (!work) return null;

  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white z-10 border-b border-zinc-100 p-6 flex justify-between items-center">
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-zinc-800 transition-colors duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold text-zinc-800">{work.title}</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-zinc-800 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          {/* Video/Preview Section */}
          <div className="relative rounded-xl overflow-hidden mb-8 bg-zinc-900">
            {work.videoUrl ? (
              <video 
                controls 
                className="w-full h-auto max-h-96 object-contain"
                poster={work.thumbnailUrl}
              >
                <source src={work.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img 
                src={work.previewUrl || work.thumbnailUrl} 
                alt={work.title} 
                className="w-full h-auto max-h-96 object-contain"
              />
            )}
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <div className="inline-block px-3 py-1 bg-yellow-500 rounded-full shadow-sm mb-2">
                <span className="text-white text-xs font-semibold tracking-wide">{work.category}</span>
              </div>
              <h3 className="text-white text-2xl font-bold mb-2">{work.title}</h3>
              <p className="text-white text-sm opacity-90">{work.brandName}</p>
            </div>
          </div>
          
          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {work.stats.views && (
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <p className="text-yellow-500 text-xl font-bold">{work.stats.views}</p>
                <p className="text-zinc-700 text-sm font-medium">Total Views</p>
              </div>
            )}
            {work.stats.engagement && (
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <p className="text-yellow-500 text-xl font-bold">{work.stats.engagement}</p>
                <p className="text-zinc-700 text-sm font-medium">Engagement Rate</p>
              </div>
            )}
            {work.stats.duration && (
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <p className="text-yellow-500 text-xl font-bold">{work.stats.duration}</p>
                <p className="text-zinc-700 text-sm font-medium">Duration</p>
              </div>
            )}
            {work.stats.format && (
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <p className="text-yellow-500 text-xl font-bold">{work.stats.format}</p>
                <p className="text-zinc-700 text-sm font-medium">Format</p>
              </div>
            )}
          </div>
          
          {/* Description */}
          <div className="mb-8">
            <h4 className="text-lg font-bold text-zinc-800 mb-3">Project Description</h4>
            <p className="text-zinc-600 leading-relaxed">{work.description}</p>
          </div>
          
          {/* Tags */}
          <div className="mb-8">
            <h4 className="text-lg font-bold text-zinc-800 mb-3">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {work.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-zinc-100 text-zinc-700 text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Action Buttons */}
          {work.videoUrl && (
            <div className="flex gap-3">
              <a
                href={work.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Video
              </a>
              <a
                href={work.videoUrl}
                download
                className="flex items-center justify-center bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-medium py-3 px-6 rounded-lg transition-colors duration-300"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
});

const CaseStudyDetailModal = memo(({ 
  study, 
  onClose 
}: { 
  study: CaseStudy | null, 
  onClose: () => void 
}) => {
  if (!study) return null;

  // State to track the active gallery image index for modal gallery
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  function handleSetActiveImageIndex(i: number): void {
    // Set the active image index to display the selected gallery image
    // (You may want to use this to open a lightbox or highlight the image)
    // For now, just update the state
    setActiveImageIndex(i);
  }
  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white z-10 border-b border-zinc-100 p-6 flex justify-between items-center">
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-zinc-800 transition-colors duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold text-zinc-800">{study.title}</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-zinc-800 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="relative h-64 rounded-xl overflow-hidden mb-8">
            <img 
              src={study.imageUrl} 
              alt={study.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <div className="inline-block px-3 py-1 bg-yellow-500 rounded-full shadow-sm mb-2 w-fit">
                <span className="text-white text-xs font-semibold tracking-wide">{study.category}</span>
              </div>
              <h3 className="text-white text-2xl font-bold">{study.title}</h3>
              <div className="flex items-center mt-2">
                {study.brandLogo ? (
                  <img src={study.brandLogo} alt={study.brandName} className="h-8 w-8 rounded-full object-cover mr-2 border-2 border-white" />
                ) : (
                  <div className="h-8 w-8 bg-yellow-500 rounded-full flex items-center justify-center mr-2 border-2 border-white">
                    <span className="text-xs text-white font-bold">{study.brandName.charAt(0)}</span>
                  </div>
                )}
                <span className="text-white text-sm font-medium">{study.brandName}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <p className="text-yellow-500 text-2xl font-bold">{study.stats.roi}</p>
              <p className="text-zinc-700 text-sm font-medium">Return On Investment</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <p className="text-yellow-500 text-2xl font-bold">{study.stats.duration}</p>
              <p className="text-zinc-700 text-sm font-medium">Project Duration</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <p className="text-yellow-500 text-2xl font-bold">{study.stats.impact}</p>
              <p className="text-zinc-700 text-sm font-medium">Users Impacted</p>
            </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-bold text-zinc-800 mb-3">The Challenge</h4>
              <p className="text-zinc-600 leading-relaxed">{study.details.challenge}</p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-zinc-800 mb-3">Our Solution</h4>
              <p className="text-zinc-600 leading-relaxed">{study.details.solution}</p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-zinc-800 mb-3">Results</h4>
              <ul className="space-y-2">
                {study.details.results.map((result, i) => (
                  <li key={i} className="flex items-start">
                    <div className="mt-1 mr-3 p-1 bg-yellow-100 rounded-full">
                      <Check className="w-3 h-3 text-yellow-500" />
                    </div>
                    <span className="text-zinc-600">{result}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {study.details.galleryImages && study.details.galleryImages.length > 0 && (
              <div>
                <h4 className="text-lg font-bold text-zinc-800 mb-3">Project Gallery</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {study.details.galleryImages.map((image, i) => (
                    <button
                      key={`gallery-image-${i}`}
                      onClick={() => handleSetActiveImageIndex(i)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSetActiveImageIndex(i)}
                      aria-label={`View gallery image ${i + 1}`}
                      type="button"
                      className="rounded-lg w-full h-48 overflow-hidden focus:outline-none"
                    >
                      <img 
                        src={image} 
                        alt=""
                        className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity duration-200"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {study.details.testimonial && (
              <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-100">
                <div className="relative pl-10">
                  <span className="absolute left-0 top-0 text-yellow-400 text-5xl font-serif">"</span>
                  <p className="text-zinc-700 italic mb-4">{study.details.testimonial.quote}</p>
                  <div>
                    <p className="text-zinc-900 font-medium">{study.details.testimonial.author}</p>
                    <p className="text-zinc-500 text-sm">{study.details.testimonial.position}, {study.brandName}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="sticky bottom-0 bg-white border-t border-zinc-100 p-6">
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-full"
          >
            Back to Portfolio
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
});

// Set display names
StatsCard.displayName = 'StatsCard';
CaseStudyCard.displayName = 'CaseStudyCard';
CreativeWorkCard.displayName = 'CreativeWorkCard';
CaseStudyDetailModal.displayName = 'CaseStudyDetailModal';
CreativeWorkDetailModal.displayName = 'CreativeWorkDetailModal';

const PortfolioSection: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const [selectedCreativeWork, setSelectedCreativeWork] = useState<CreativeWork | null>(null);
  const [activeTab, setActiveTab] = useState<'marketing' | 'videos' | 'thumbnails' | 'ads'>('marketing');
  
  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
 
  const caseStudies: CaseStudy[] = [
    {
      id: "cs1",
      title: "E-commerce Growth Strategy",
      category: "Digital Marketing",
      description: "Achieved 300% growth in online sales through integrated marketing campaigns and customer journey optimization.",
      stats: {
        roi: "300%",
        duration: "6 mo",
        impact: "1M+"
      },
      delay: 0.2,
      imageUrl: "/api/placeholder/800/400",
      brandName: "TechStore",
      details: {
        challenge: "TechStore was struggling to convert website visitors into paying customers, with a stagnant conversion rate of 1.2% despite growing traffic. Their digital marketing efforts were fragmented across channels without proper attribution tracking.",
        solution: "We implemented a comprehensive omnichannel strategy with unified tracking and attribution models. This included optimizing the customer journey through personalized touchpoints, redesigning product pages, implementing cart abandonment emails, and creating targeted paid search and social campaigns.",
        results: [
          "Increased conversion rate from 1.2% to 4.8% within six months",
          "Grew monthly sales by 300% while maintaining ROAS above target",
          "Reduced cart abandonment rate by 42% through optimization",
          "Increased average order value by 28% with strategic product bundling",
          "Expanded email subscriber base by 215%, creating a sustainable marketing channel"
        ],
        testimonial: {
          quote: "The team transformed our digital strategy completely. The results speak for themselves - we've never seen growth like this in our 10 years of business.",
          author: "Jennifer Ramirez",
          position: "Chief Marketing Officer"
        },
        galleryImages: [
          "/api/placeholder/800/400",
          "/api/placeholder/800/400",
          "/api/placeholder/800/400",
          "/api/placeholder/800/400"
        ]
      }
    },
    {
      id: "cs2",
      title: "Brand Transformation",
      category: "Branding",
      description: "Delivered 150% increase in brand engagement metrics for luxury lifestyle brand through strategic repositioning.",
      stats: {
        roi: "150%",
        duration: "4 mo",
        impact: "500K"
      },
      delay: 0.3,
      imageUrl: "/api/placeholder/800/400",
      brandName: "LuxuryLife",
      details: {
        challenge: "LuxuryLife was losing market share to newer, more digitally-savvy competitors. Their brand positioning had become outdated and failed to resonate with younger affluent demographics, resulting in declining engagement across all channels.",
        solution: "We conducted extensive market research and competitive analysis, then developed a comprehensive brand refresh that maintained core brand equity while modernizing their visual identity, messaging, and digital presence. The transformation included new brand guidelines, website redesign, and social media strategy.",
        results: [
          "Increased social media engagement by 150% across all platforms",
          "Grew website traffic by 83% with improved session duration",
          "Boosted direct sales through e-commerce by 94%",
          "Increased brand recall in target demographics by 62%",
          "Successfully attracted younger audience while maintaining loyalty of existing customers"
        ],
        testimonial: {
          quote: "The rebranding exceeded our expectations. Our brand feels fresh and relevant again without losing our heritage, and the market has responded enthusiastically.",
          author: "Marcus Chen",
          position: "Brand Director"
        },
        galleryImages: [
          "/api/placeholder/800/400",
          "/api/placeholder/800/400",
          "/api/placeholder/800/400",
          "/api/placeholder/800/400"
        ]
      }
    },
    {
      id: "cs3",
      title: "SEO Optimization",
      category: "SEO & Content",
      description: "Drove 200% increase in organic traffic through technical SEO improvements and content strategy.",
      stats: {
        roi: "200%",
        duration: "8 mo",
        impact: "2M+"
      },
      delay: 0.4,
      imageUrl: "/api/placeholder/800/400",
      brandName: "GrowthCo",
      details: {
        challenge: "GrowthCo was heavily dependent on paid traffic acquisition, with organic search providing only 15% of their total website traffic. Their technical SEO foundation had numerous issues, and content was not optimized for search performance or audience needs.",
        solution: "We implemented a comprehensive SEO strategy beginning with a technical audit and improvements to site architecture, mobile performance, and page speed. This was followed by keyword research and competitive content gap analysis to develop a strategic content calendar targeting high-value search topics.",
        results: [
          "Increased organic traffic by 200% over an 8-month period",
          "Improved ranking positions for 80+ target keywords to top 3 results",
          "Reduced dependency on paid traffic from 85% to 40% of total traffic",
          "Decreased bounce rates by 35% through improved content relevance",
          "Created 48 new optimized content pieces that continue to drive compounding traffic growth"
        ]
      }
    }
  ];

  // Video Edits Data
  const videoEdits: CreativeWork[] = [
    {
      id: "v1",
      title: "Brand Launch Campaign",
      category: "Video Edit",
      description: "Dynamic brand launch video featuring motion graphics, product shots, and compelling storytelling to introduce a new tech startup to the market.",
      stats: {
        views: "2.5M",
        engagement: "8.4%",
        duration: "1:30",
        format: "4K"
      },
      thumbnailUrl: "/api/placeholder/800/450",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      brandName: "TechFlow",
      tags: ["Motion Graphics", "Brand Video", "Product Launch", "Corporate", "4K"],
      delay: 0.2
    },
    {
      id: "v2",
      title: "Social Media Promo",
      category: "Video Edit",
      description: "High-energy promotional video optimized for social media platforms with engaging transitions and trending music.",
      stats: {
        views: "1.8M",
        engagement: "12.1%",
        duration: "0:45",
        format: "1080p"
      },
      thumbnailUrl: "/api/placeholder/800/450",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
      brandName: "FitLife",
      tags: ["Social Media", "Fitness", "Lifestyle", "Trendy", "Short Form"],
      delay: 0.3
    },
    {
      id: "v3",
      title: "Product Demo Video",
      category: "Video Edit",
      description: "Professional product demonstration showcasing features and benefits with clean animations and clear messaging.",
      stats: {
        views: "950K",
        engagement: "15.3%",
        duration: "2:15",
        format: "4K"
      },
      thumbnailUrl: "/api/placeholder/800/450",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4",
      brandName: "SmartHome",
      tags: ["Product Demo", "Technology", "Tutorial", "Professional", "Educational"],
      delay: 0.4
    },
    {
      id: "v4",
      title: "Event Highlight Reel",
      category: "Video Edit",
      description: "Cinematic event coverage with multi-camera editing, color grading, and synchronized audio for a corporate conference.",
      stats: {
        views: "1.2M",
        engagement: "9.7%",
        duration: "3:45",
        format: "4K"
      },
      thumbnailUrl: "/api/placeholder/800/450",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      brandName: "EventCorp",
      tags: ["Event", "Corporate", "Multi-cam", "Color Grading", "Conference"],
      delay: 0.5
    },
    {
      id: "v5",
      title: "Music Video Edit",
      category: "Video Edit",
      description: "Creative music video with advanced visual effects, color correction, and rhythmic editing synchronized to the beat.",
      stats: {
        views: "3.1M",
        engagement: "18.2%",
        duration: "3:20",
        format: "4K"
      },
      thumbnailUrl: "/api/placeholder/800/450",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
      brandName: "MusicLabel",
      tags: ["Music Video", "VFX", "Color Grading", "Creative", "Entertainment"],
      delay: 0.6
    },
    {
      id: "v6",
      title: "Documentary Style",
      category: "Video Edit",
      description: "Compelling documentary-style video with interviews, B-roll footage, and narrative structure for a non-profit organization.",
      stats: {
        views: "675K",
        engagement: "22.4%",
        duration: "5:30",
        format: "4K"
      },
      thumbnailUrl: "/api/placeholder/800/450",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4",
      brandName: "GoodCause",
      tags: ["Documentary", "Non-profit", "Storytelling", "Interview", "Social Impact"],
      delay: 0.7
    }
  ];

  // Thumbnails Data
  const thumbnails: CreativeWork[] = [
    {
      id: "t1",
      title: "YouTube Gaming Thumbnail",
      category: "Thumbnail",
      description: "Eye-catching gaming thumbnail with vibrant colors, character artwork, and bold typography designed to maximize click-through rates.",
      stats: {
        views: "1.5M",
        engagement: "14.2%",
        format: "1920x1080"
      },
      thumbnailUrl: "/api/placeholder/800/450",
      previewUrl: "/api/placeholder/1920/1080",
      brandName: "GameHub",
      tags: ["Gaming", "YouTube", "Bright Colors", "Typography", "CTR Optimized"],
      delay: 0.2
    },
    {
      id: "t2",
      title: "Tech Review Thumbnail",
      category: "Thumbnail",
      description: "Clean and professional tech review thumbnail featuring product imagery, rating graphics, and clear value proposition.",
      stats: {
        views: "892K",
        engagement: "11.8%",
        format: "1920x1080"
      },
      thumbnailUrl: "/api/placeholder/800/450",
      previewUrl: "/api/placeholder/1920/1080",
      brandName: "TechReviews",
      tags: ["Technology", "Reviews", "Clean Design", "Product Focus", "Professional"],
      delay: 0.3
    },
    {
      id: "t3",
      title: "Fitness Tutorial Thumbnail",
      category: "Thumbnail",
      description: "Motivational fitness thumbnail with before/after imagery, workout equipment, and energetic design elements.",
      stats: {
        views: "1.1M",
        engagement: "16.5%",
        format: "1920x1080"
      },
      thumbnailUrl: "/api/placeholder/800/450",
      previewUrl: "/api/placeholder/1920/1080",
      brandName: "FitCoach",
      tags: ["Fitness", "Tutorial", "Motivation", "Before/After", "Health"],
      delay: 0.4
    },
    {
      id: "t4",
      title: "Cooking Show Thumbnail",
      category: "Thumbnail",
      description: "Appetizing food thumbnail with high-quality food photography, recipe details, and warm color palette.",
      stats: {
        views: "756K",
        engagement: "13.7%",
        format: "1920x1080"
      },
      thumbnailUrl: "/api/placeholder/800/450",
      previewUrl: "/api/placeholder/1920/1080",
      brandName: "ChefKitchen",
      tags: ["Food", "Cooking", "Recipe", "Photography", "Appetizing"],
      delay: 0.5
    },
    {
      id: "t5",
      title: "Podcast Episode Thumbnail",
      category: "Thumbnail",
      description: "Professional podcast thumbnail with guest photos, episode information, and brand-consistent design elements.",
      stats: {
        views: "445K",
        engagement: "9.3%",
        format: "1920x1080"
      },
      thumbnailUrl: "/api/placeholder/800/450",
      previewUrl: "/api/placeholder/1920/1080",
      brandName: "TalkShow",
      tags: ["Podcast", "Interview", "Professional", "Brand Consistent", "Episode"],
      delay: 0.6
    },
    {
      id: "t6",
      title: "Educational Content Thumbnail",
      category: "Thumbnail",
      description: "Informative educational thumbnail with infographic elements, clear learning objectives, and academic styling.",
      stats: {
        views: "623K",
        engagement: "18.9%",
        format: "1920x1080"
      },
      thumbnailUrl: "/api/placeholder/800/450",
      previewUrl: "/api/placeholder/1920/1080",
      brandName: "EduChannel",
      tags: ["Education", "Learning", "Infographic", "Academic", "Tutorial"],
      delay: 0.7
    }
  ];

  // Ad Edits Data
  const adEdits: CreativeWork[] = [
    {
      id: "a1",
      title: "Fashion Brand Commercial",
      category: "Ad Edit",
      description: "Luxury fashion commercial with cinematic visuals, model photography, and premium brand positioning for high-end audience.",
      stats: {
        views: "3.2M",
        engagement: "7.8%",
        duration: "0:30",
        format: "4K"
      },
      thumbnailUrl: "/api/placeholder/800/450",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      brandName: "LuxFashion",
      tags: ["Fashion", "Luxury", "Commercial", "Cinematic", "Premium"],
      delay: 0.2
    },
    {
      id: "a2",
      title: "Food Delivery App Ad",
      category: "Ad Edit",
      description: "Quick-paced food delivery ad showcasing app features, delivery speed, and mouth-watering food imagery for mobile audience.",
      stats: {
        views: "4.1M",
        engagement: "12.4%",
        duration: "0:15",
        format: "1080p"
      },
      thumbnailUrl: "/api/placeholder/800/450",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
      brandName: "QuickEats",
      tags: ["Food Delivery", "Mobile App", "Fast-Paced", "Convenience", "Lifestyle"],
      delay: 0.3
    },
    {
      id: "a3",
      title: "Automotive Launch Ad",
      category: "Ad Edit",
      description: "High-energy automotive commercial featuring car performance, advanced features, and emotional storytelling for brand differentiation.",
      stats: {
        views: "2.8M",
        engagement: "9.1%",
        duration: "0:45",
        format: "4K"
      },
      thumbnailUrl: "/api/placeholder/800/450",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4",
      brandName: "AutoTech",
      tags: ["Automotive", "Performance", "Technology", "Emotional", "Launch"],
      delay: 0.4
    },
    {
      id: "a4",
      title: "E-learning Platform Ad",
      category: "Ad Edit",
      description: "Educational platform advertisement highlighting course variety, instructor quality, and learning outcomes with student testimonials.",
      stats: {
        views: "1.9M",
        engagement: "15.6%",
        duration: "1:00",
        format: "1080p"
      },
      thumbnailUrl: "/api/placeholder/800/450",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      brandName: "LearnPro",
      tags: ["E-learning", "Education", "Testimonials", "Course Variety", "Professional"],
      delay: 0.5
    },
    {
      id: "a5",
      title: "Health & Wellness Ad",
      category: "Ad Edit",
      description: "Inspiring health and wellness advertisement promoting lifestyle changes, fitness goals, and mental wellbeing through visual storytelling.",
      stats: {
        views: "2.3M",
        engagement: "11.2%",
        duration: "0:30",
        format: "4K"
      },
      thumbnailUrl: "/api/placeholder/800/450",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
      brandName: "WellLife",
      tags: ["Health", "Wellness", "Lifestyle", "Inspiration", "Fitness"],
      delay: 0.6
    },
    {
      id: "a6",
      title: "FinTech App Commercial",
      category: "Ad Edit",
      description: "Modern fintech advertisement showcasing app security, ease of use, and financial benefits with clean, trustworthy design.",
      stats: {
        views: "1.7M",
        engagement: "8.9%",
        duration: "0:20",
        format: "1080p"
      },
      thumbnailUrl: "/api/placeholder/800/450",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4",
      brandName: "FinSecure",
      tags: ["FinTech", "Security", "Mobile App", "Trust", "Financial"],
      delay: 0.7
    }
  ];

  const handleViewStudyDetails = (id: string) => {
    const study = caseStudies.find(study => study.id === id);
    if (study) {
      setSelectedStudy(study);
    }
  };

  const handleViewCreativeDetails = (work: CreativeWork) => {
    setSelectedCreativeWork(work);
  };

  const handleCloseModal = () => {
    setSelectedStudy(null);
    setSelectedCreativeWork(null);
  };

  const tabs = [
    { key: 'marketing' as const, label: 'Digital Marketing', count: caseStudies.length },
    { key: 'videos' as const, label: 'Video Edits', count: videoEdits.length },
    { key: 'thumbnails' as const, label: 'Thumbnails', count: thumbnails.length },
    { key: 'ads' as const, label: 'Ad Edits', count: adEdits.length }
  ];

  const getCurrentData = () => {
    switch (activeTab) {
      case 'videos':
        return videoEdits;
      case 'thumbnails':
        return thumbnails;
      case 'ads':
        return adEdits;
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div ref={ref} className="container mx-auto px-4 sm:px-6 pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={contentVariants}
          className="space-y-16"
        >
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">Our Portfolio</h2>
            <p className="text-zinc-600 text-lg">Explore our comprehensive collection of work across digital marketing, video production, design, and creative advertising solutions.</p>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
            {tabs.map((tab) => (
              <motion.button
                key={tab.key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 md:px-6 py-3 rounded-full font-medium text-sm md:text-base transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab.key
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-lg'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-800'
                }`}
              >
                {tab.label}
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  activeTab === tab.key
                    ? 'bg-white bg-opacity-20 text-white'
                    : 'bg-zinc-200 text-zinc-600'
                }`}>
                  {tab.count}
                </span>
              </motion.button>
            ))}
          </div>
          
          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTab === 'marketing' ? (
              caseStudies.map((study) => (
                <CaseStudyCard
                  key={study.id}
                  {...study}
                  onViewDetails={handleViewStudyDetails}
                />
              ))
            ) : (
              getCurrentData().map((work) => (
                <CreativeWorkCard
                  key={work.id}
                  {...work}
                  onViewDetails={handleViewCreativeDetails}
                />
              ))
            )}
          </div>

          {/* Empty State */}
          {getCurrentData().length === 0 && activeTab !== 'marketing' && (
            <div className="text-center py-16">
              <div className="text-zinc-400 text-6xl mb-4">🎬</div>
              <h3 className="text-xl font-semibold text-zinc-700 mb-2">More Content Coming Soon</h3>
              <p className="text-zinc-500">We're constantly adding new projects to our portfolio.</p>
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Modals */}
      {selectedStudy && (
        <CaseStudyDetailModal
          study={selectedStudy}
          onClose={handleCloseModal}
        />
      )}
      
      {selectedCreativeWork && (
        <CreativeWorkDetailModal
          work={selectedCreativeWork}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default PortfolioSection;
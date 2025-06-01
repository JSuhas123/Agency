import { motion, useAnimation } from 'framer-motion';
import { ArrowRight, Check, ChevronLeft, LucideProps, X } from 'lucide-react';
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

// Content exit animation - fixing transition issue
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

const CaseStudyDetailModal = memo(({ 
  study, 
  onClose 
}: { 
  study: CaseStudy | null, 
  onClose: () => void 
}) => {
  // State for active gallery image (for potential lightbox or preview)
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  if (!study) return null;

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
          {/* Hero Section */}
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
          
          {/* Stats Section */}
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
          
          {/* Content Sections */}
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
            
            {/* Project Gallery */}
            {study.details.galleryImages && study.details.galleryImages.length > 0 && (
              <div>
                <h4 className="text-lg font-bold text-zinc-800 mb-3">Project Gallery</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {study.details.galleryImages.map((image, i) => (
                    <button
                      key={`gallery-image-${i}`}
                      onClick={() => setActiveImageIndex(i)}
                      onKeyDown={(e) => e.key === 'Enter' && setActiveImageIndex(i)}
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
            
            {/* Testimonial if available */}
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
CaseStudyDetailModal.displayName = 'CaseStudyDetailModal';

const PortfolioSection: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Add state for selected case study
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  
  // Start animation when in view
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
      imageUrl: "/images/about 2.jpg",
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
          "/images/about 2.jpg",
          "/images/about 2.jpg",
          "/images/about 2.jpg",
          "/images/about 2.jpg"
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
      imageUrl: "/images/about 2.jpg",
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
          "/images/about 2.jpg",
          "/images/about 2.jpg",
          "/images/about 2.jpg",
          "/images/about 2.jpg"
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
        ],
        testimonial: {
          quote: "Their SEO expertise was immediately apparent in the methodical approach to our challenges. We've seen incredible growth in organic traffic that continues to deliver value every month.",
          author: "Sarah Johnson",
          position: "Digital Marketing Manager"
        },
        galleryImages: [
         "/images/about 2.jpg",
          "/images/about 2.jpg",
          "/images/about 2.jpg",
          "/images/about 2.jpg"
        ]
      }
    },
    {
      id: "cs4",
      title: "Social Media Campaign",
      category: "Social Media",
      description: "Achieved 400% engagement increase through viral campaign strategy across multiple platforms.",
      stats: {
        roi: "400%",
        duration: "3 mo",
        impact: "3M+"
      },
      delay: 0.5,
      imageUrl: "/api/placeholder/800/400",
      brandName: "SocialBrand",
      details: {
        challenge: "SocialBrand was experiencing declining engagement rates across their social media channels despite increasing their posting frequency. Their content was failing to cut through algorithm changes, and their audience growth had stagnated.",
        solution: "We developed a disruptive campaign strategy centered around user-generated content and interactive challenges. The approach leveraged platform-specific content optimizations, influencer partnerships, and a cohesive narrative that encouraged sharing and participation across TikTok, Instagram, and Twitter.",
        results: [
          "Increased engagement rate by 400% across all social platforms",
          "Generated over 3 million impressions through organic reach",
          "Collected 25,000+ pieces of user-generated content under campaign hashtag",
          "Grew follower count by 178% during the campaign period",
          "Achieved 320% increase in website traffic from social referrals"
        ],
        testimonial: {
          quote: "The campaign transformed our social presence overnight. We went from struggling for attention to being everywhere. The ROI on this campaign was nothing short of extraordinary.",
          author: "Alex Rivera",
          position: "Social Media Director"
        },
        galleryImages: [
         "/images/about 2.jpg",
          "/images/about 2.jpg",
          "/images/about 2.jpg",
          "/images/about 2.jpg"
        ]
      }
    },
    {
      id: "cs5",
      title: "Web Performance",
      category: "Development",
      description: "Delivered 80% improvement in core web vitals and conversion rates through technical optimization.",
      stats: {
        roi: "180%",
        duration: "2 mo",
        impact: "1.5M+"
      },
      delay: 0.6,
      imageUrl: "/api/placeholder/800/400",
      brandName: "FastWeb",
      details: {
        challenge: "FastWeb's e-commerce site was suffering from poor performance metrics, with slow page load times averaging 7.2 seconds. This resulted in high bounce rates (68%) and abandonment, particularly on mobile devices which represented 70% of their traffic.",
        solution: "We conducted a comprehensive performance audit and implemented a technical optimization strategy focused on core web vitals. This included code splitting, image optimization, lazy loading, server-side improvements, CDN implementation, and a complete rebuild of their critical rendering path.",
        results: [
          "Reduced average page load time from 7.2s to 1.8s",
          "Improved mobile Core Web Vitals scores by 80%",
          "Decreased bounce rate from 68% to 32%",
          "Increased conversion rate by 42% through improved user experience",
          "Boosted Google search rankings due to improved performance signals"
        ],
        testimonial: {
          quote: "The performance improvements were transformative for our business. Not only did conversions dramatically increase, but our team can now deploy updates faster with confidence in site stability.",
          author: "Michael Torres",
          position: "CTO"
        },
        galleryImages: [
          "/api/placeholder/400/300",
          "/api/placeholder/400/300",
          "/api/placeholder/400/300",
          "/api/placeholder/400/300"
        ]
      }
    }
  ];
  
  // Function to handle case study selection
  const handleViewDetails = (id: string) => {
    const study = caseStudies.find(study => study.id === id);
    if (study) {
      setSelectedStudy(study);
    }
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedStudy(null);
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
            <h2 className="text-5xl md:text-4xl font-bold text-zinc-900 mb-4">Our Portfolio</h2>
            <p className="text-zinc-600">Explore our case studies showcasing successful projects across various industries.</p>
          </div>
          
          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((study) => (
              <CaseStudyCard
                key={study.id}
                {...study}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Case Study Detail Modal */}
      {selectedStudy && (
        <CaseStudyDetailModal
          study={selectedStudy}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default PortfolioSection;
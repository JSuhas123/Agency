import { AlertCircle, ArrowRight, BookOpen, CheckCircle, ChevronLeft, ChevronRight, Clock, ExternalLink, Filter, Linkedin, Loader2, Mail, Search, Tag, Users } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './Navbar';

// Types
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
  category: string;
  tags: string[];
  url?: string; // Optional URL for the post

}

interface BlogProps {
  posts?: BlogPost[];
  linkedinUrl?: string;
  mediumUrl?: string;
}

// Newsletter submission states
type NewsletterState = 'idle' | 'loading' | 'success' | 'error';

// Mock blog data
const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of AI in Web Development",
    excerpt: "Exploring how artificial intelligence is revolutionizing the way we build and maintain websites, from automated testing to intelligent design systems.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
    readTime: "4 min read",
    category: "Technology",
    tags: ["AI", "Web Development", "Future Tech"],
    url: 'https://medium.com/@surgewingsolutions/the-future-of-ai-in-web-development-a-deep-dive-79378aa67ab4' // Medium blog link

  },
  {
    id: 2,
    title: "Building Scalable Marketing Funnels",
    excerpt: "A comprehensive guide to creating marketing funnels that grow with your business and deliver consistent results across all channels.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    readTime: "12 min read",
    category: "Marketing",
    tags: ["Marketing", "Sales Funnel", "Growth"],
    url: 'https://medium.com/@surgewingsolutions/building-scalable-marketing-funnels-c561a22ca637' // Medium blog link

  },
  {
    id: 3,
    title: "React Performance Optimization Techniques",
    excerpt: "Advanced strategies for optimizing React applications, including code splitting, memoization, and efficient state management patterns.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    readTime: "15 min read",
    category: "Technology",
    tags: ["React", "Performance", "JavaScript"],
    url: 'https://medium.com/@surgewingsolutions/react-performance-optimization-techniques-f8f0621add15' // Medium blog link
  },
  {
    id: 4,
    title: "The Psychology of User Experience Design",
    excerpt: "Understanding how cognitive biases and psychological principles can be leveraged to create more intuitive and engaging user interfaces.",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=250&fit=crop",
    readTime: "10 min read",
    category: "Design",
    tags: ["UX", "Psychology", "Design"],
    url: 'https://medium.com/@surgewing/ai-content-creation-xyz' // Medium blog link
  },
  {
    id: 5,
    title: "Building Remote Team Culture",
    excerpt: "Strategies for fostering collaboration, communication, and company culture in distributed teams across different time zones.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
    readTime: "7 min read",
    category: "Business",
    tags: ["Remote Work", "Team Culture", "Management"],
    url: 'https://medium.com/@surgewing/ai-content-creation-xyz' // Medium blog link
  },
  {
    id: 6,
    title: "Data-Driven Content Strategy",
    excerpt: "How to use analytics, user behavior data, and market research to create content that resonates with your target audience.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    readTime: "9 min read",
    category: "Marketing",
    tags: ["Content Strategy", "Analytics", "Data"],
    url: 'https://medium.com/@surgewing/ai-content-creation-xyz' // Medium blog link
  }
];

const categories: string[] = ["All", "Technology", "Marketing", "Design", "Business"];

// Newsletter Modal Component (now just shows status)
const NewsletterModal = ({ 
  showNewsletter, 
  setShowNewsletter,
  newsletterState,
  setNewsletterState,
  errorMessage
}: { 
  showNewsletter: boolean; 
  setShowNewsletter: (val: boolean) => void;
  newsletterState: NewsletterState;
  setNewsletterState: (state: NewsletterState) => void;
  errorMessage: string;
}) => {
  const handleClose = React.useCallback(() => {
    setShowNewsletter(false);
    setNewsletterState('idle');
  }, [setShowNewsletter, setNewsletterState]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showNewsletter) {
        handleClose();
      }
    };

    if (showNewsletter) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [showNewsletter, handleClose]);

  if (!showNewsletter) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-title"
    >
      <div className="bg-white rounded-xl p-8 max-w-md w-full relative animate-in zoom-in-95 duration-200">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded"
          aria-label="Close newsletter signup"
        >
          ×
        </button>
        <div className="text-center">
          <div className="bg-green-100 p-4 rounded-full w-fit mx-auto mb-4">
            <Mail className="w-8 h-8 text-green-600" />
          </div>
          <h3 id="newsletter-title" className="text-2xl font-bold text-gray-900 mb-2">
            Subscribe to Our Newsletter
          </h3>
          <p className="text-gray-600 mb-6">
            Get the latest updates and insights delivered to your inbox.
          </p>
          {newsletterState === 'loading' && (
            <div className="flex flex-col items-center gap-4 py-8">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              <p className="text-gray-600">Subscribing...</p>
            </div>
          )}
          {newsletterState === 'error' && (
            <div className="flex flex-col items-center gap-4 py-8">
              <AlertCircle className="w-8 h-8 text-red-500" />
              <div className="text-center">
                <p className="text-red-600 font-medium mb-2">Failed to subscribe</p>
                <p className="text-gray-600 text-sm mb-4">
                  {errorMessage || 'Please check your internet connection and try again.'}
                </p>
                <button
                  onClick={handleClose}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          )}
          {newsletterState === 'success' && (
            <div className="flex flex-col items-center gap-4 py-8">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div className="text-center">
                <p className="text-green-600 font-medium mb-2">Successfully subscribed!</p>
                <p className="text-gray-600 text-sm">
                  Thank you for subscribing. You'll receive our latest updates soon.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Newsletter CTA Component (submits email to backend)
const NewsletterCTA: React.FC<{ 
  onSubmit: (email: string) => void; 
  newsletterState: NewsletterState; 
}> = ({ onSubmit, newsletterState }) => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setEmailError("");

    if (!email.trim()) {
      setEmailError("Email address is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    onSubmit(email);
    setEmail("");
  };

  const isLoading = newsletterState === 'loading';

  return (
    <section className="bg-gradient-to-br from-yellow-100 to-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto mb-16">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-shrink-0 flex flex-col items-center md:items-start">
          <Mail className="w-12 h-12 text-yellow-500 mb-2" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Join Our Newsletter</h3>
          <p className="text-gray-600 mb-4 text-center md:text-left">
            Get the latest articles, insights, and exclusive content delivered straight to your inbox.
          </p>
        </div>
        <form className="flex flex-col md:flex-row gap-4 w-full" onSubmit={handleSubmit} noValidate>
          <div className="flex-1">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 border ${emailError ? 'border-red-400' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200`}
              disabled={isLoading}
              required
              aria-label="Email address"
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-yellow-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-all duration-200 flex items-center justify-center min-w-[140px]"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Subscribing...
              </>
            ) : (
              <>
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

const Blog: React.FC<BlogProps> = ({ 
  posts = mockBlogPosts, 
  linkedinUrl = "https://www.linkedin.com/company/surgewing/?viewAsMember=true", 
  mediumUrl = "https://medium.com/@surgewingsolutions" 
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showNewsletter, setShowNewsletter] = useState<boolean>(false);
  const [newsletterState, setNewsletterState] = useState<NewsletterState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>("");
  const postsPerPage: number = 4;

  // Filter and search logic
  const filteredPosts = useMemo(() => {
    return posts.filter((post: BlogPost) => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, posts]);

  // Pagination logic
  const totalPages: number = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex: number = (currentPage - 1) * postsPerPage;
  const currentPosts: BlogPost[] = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (category: string): void => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Updated: Actually submit email to backend
  const handleNewsletterSubmit = React.useCallback(async (email: string): Promise<void> => {
    setNewsletterState('loading');
    setErrorMessage("");

    try {
      // Replace the following fetch URL with your actual backend endpoint
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setShowNewsletter(true);
        setNewsletterState('success');
      } else {
        setNewsletterState('error');
        setErrorMessage(data.error || 'Failed to subscribe. Please try again.');
        setShowNewsletter(true);
      }
    } catch {
      setNewsletterState('error');
      setErrorMessage('Failed to process subscription. Please try again.');
      setShowNewsletter(true);
    }
  }, [setNewsletterState, setShowNewsletter, setErrorMessage]);

  // Reset search when category changes
  useEffect(() => {
    if (selectedCategory !== "All") {
      setSearchTerm("");
    }
  }, [selectedCategory]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative bg-black text-yellow-400 py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Blog & Insights
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Stay updated with our latest articles and insights on technology, marketing, and business trends. 
              Discover in-depth analysis, practical tips, and industry expertise all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-yellow-200">
                <BookOpen className="w-5 h-5" />
                <span>Professional insights</span>
              </div>
              <div className="flex items-center gap-2 text-yellow-200">
                <Users className="w-5 h-5" />
                <span>Expert perspectives</span>
              </div>
              <div className="flex items-center gap-2 text-yellow-200">
                <Tag className="w-5 h-5" />
                <span>Industry trends</span>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Search and Filter Section */}
          <div className="mb-12 bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles, topics, or tags..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="w-5 h-5 text-gray-500" />
                {categories.map((category: string) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-yellow-400 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Latest Articles
              {filteredPosts.length > 0 && (
                <span className="text-lg font-normal text-gray-500 ml-2">
                  ({filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''})
                </span>
              )}
            </h2>

            {currentPosts.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  {currentPosts.map((post: BlogPost) => (
                    <article
                      key={post.id}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors duration-200">
                          {post.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-4">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag: string, index: number) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        
                        <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200 group"
                        >
                            Read More
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </a>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors duration-200"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                          currentPage === i + 1
                            ? 'bg-blue-600 text-white'
                            : 'border border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors duration-200"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
                  <p className="text-gray-500">Try adjusting your search terms or filters</p>
                </div>
              </div>
            )}
          </div>

          {/* External Blog Links Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Follow Our Journey
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* LinkedIn Card */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-white bg-opacity-20 p-3 rounded-xl">
                      <Linkedin className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold">LinkedIn Updates</h3>
                  </div>
                  
                  <p className="text-blue-100 mb-6 text-lg leading-relaxed">
                    Follow us on LinkedIn for professional insights, company updates, industry news, and networking opportunities. 
                    Stay connected with our team's latest thoughts and achievements.
                  </p>
                  
                  <a 
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 flex items-center gap-2 group w-fit"
                  >
                    Follow on LinkedIn
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </a>
                </div>
              </div>

              {/* Medium Card */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-white bg-opacity-20 p-3 rounded-xl">
                      <BookOpen className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold">Medium Stories</h3>
                  </div>
                  
                  <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                    Dive deeper into our comprehensive articles, tutorials, and thought pieces on Medium. 
                    Explore detailed case studies, technical guides, and behind-the-scenes stories.
                  </p>
                  
                  <a 
                    href={mediumUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-all duration-200 flex items-center gap-2 group w-fit"
                  >
                    Read on Medium
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </a>
                </div>
              </div>
            </div>
          </section>
          {/* Newsletter CTA Section */}
          <NewsletterCTA
            onSubmit={handleNewsletterSubmit}
            newsletterState={newsletterState}
          />
        </div>
        {/* Newsletter Modal */}
        <NewsletterModal      
          showNewsletter={showNewsletter}
          setShowNewsletter={setShowNewsletter}
          newsletterState={newsletterState}
          setNewsletterState={setNewsletterState}
          errorMessage={errorMessage}
        />
      </div>
    </>
  );
}
export default Blog;
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'AI Marketing', href: '/ai-marketing' },
    { label: 'Blog', href: '/blog' },
    { label: 'About Us', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-black ${scrolled ? 'bg-black/80 backdrop-blur-lg' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center" aria-label="Surgewing Homepage">
            <motion.div 
              className="w-5 h-5 sm:w-6 sm:h-6 bg-yellow-400 rotate-45"
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.3 }}
            />
            <span className="ml-2 text-white text-xs sm:text-sm">surgewing company</span>
          </Link>

          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="text-white text-sm hover:text-yellow-400 transition-colors relative group"
              >
                {item.label}
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            ))}
            
            <Link to="/ai-audit" className="ml-4 px-4 py-2 bg-yellow-400 text-black rounded-full text-sm font-semibold hover:bg-yellow-300 transition-colors">
              Get AI Audit
            </Link>
          </div>

          <motion.button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-black/90"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div className="py-2">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.href}
                    className="block px-4 py-3 text-white hover:text-yellow-400 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <motion.span
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="inline-block w-full"
                    >
                      {item.label}
                    </motion.span>
                  </Link>
                ))}
                
                <Link
                  to="/ai-audit"
                  className="block px-4 py-3 text-yellow-400 font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get AI Audit
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;

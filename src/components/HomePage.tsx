import { motion } from 'framer-motion';
import { Award, ChevronRight, Compass, ExternalLink, Target, Users } from 'lucide-react';
import React from 'react';
import Navbar from './Navbar';

const HomePage = () => {
  const teamMembers = [
    {
      name: "Ganesh",
      role: "Founder & CEO",
      description: "Ganesh leads SurgeWing with a vision for AI-driven business growth, helping D2C brands scale through innovation and data."
    },
    {
      name: "Suhas",
      role: "CTO",
      description: "Driving innovation and scalability, Suhas leads SurgeWing's tech vision with cutting-edge solutions."
    },
    {
      name: "Ataur",
      role: "CDO",
      description: "Crafting impactful visuals, Ataur shapes SurgeWing's brand identity with creativity and strategy."
    }
  ];
  
  const values = [
    { icon: Target, title: "Innovation", description: "We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions.", delay: 0.3 },
    { icon: Users, title: "Collaboration", description: "We believe in building strong partnerships with our clients to achieve exceptional results.", delay: 0.4 },
    { icon: Award, title: "Excellence", description: "We maintain the highest standards in everything we do, from strategy to execution.", delay: 0.5 },
    { icon: Compass, title: "Integrity", description: "We operate with complete transparency and always put our clients' interests first.", delay: 0.6 }
  ];

  interface ValueCardProps {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    delay: number;
  }

  const ValueCard: React.FC<ValueCardProps> = ({ icon: Icon, title, description, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-gray-100 p-6 rounded-lg shadow-md"
    >
      <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mb-4">
        <Icon className="text-black w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
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

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      {/* Hero Section */}
      <section className="relative container mx-auto px-6 py-16 mb-16 pt-32 bg-cover bg-center" 
      id="home" style={{ backgroundImage: "url('/images/home.jpg')" }}>
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
      </section>


      {/* About Section */}
      <div className="min-h-screen bg-white">
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

      {/* Services Section */}
      <div className="min-h-screen bg-white flex">
        {/* Left Content Section */}
        <div className="w-1/2 p-16 flex flex-col justify-center">
          {/* Orange Accent Line */}
          <div className="w-16 h-1 bg-orange-400 mb-6"></div>
          
          {/* Heading */}
          <h1 className="text-5xl font-bold text-[#1A1A1A] leading-tight mb-8">
            OUR DIGITAL<br />MARKETING
          </h1>
          
          {/* Main Description */}
          <p className="text-gray-700 mb-12 leading-relaxed">
            At SurgeWing, we redefine digital marketing by integrating business 
            intelligence, data-driven insights, and AI-powered automation to help 
            brands scale efficiently. Our strategies go beyond traditional marketing, 
            leveraging cutting-edge tools to enhance engagement, optimize 
            campaigns, and maximize conversions. We tailor each approach to fit your 
            brand's unique needs, ensuring impactful growth in a competitive digital 
            landscape.
          </p>
          
          {/* Two Column Section */}
          <div className="grid grid-cols-2 gap-8">
            {/* Business Intelligence Column */}
            <div>
              <h3 className="text-orange-400 font-medium mb-4">
                Business Intelligence & Analytics
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We provide data-driven insights to optimize strategies, track market 
                trends, and enhance decision-making. Our analytics ensure real-
                time reporting, predictive insights, and measurable growth.
              </p>
            </div>
            
            {/* Innovative Marketing Column */}
            <div>
              <h3 className="text-orange-400 font-medium mb-4">
                Innovative Marketing & Growth
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We craft data-driven marketing campaigns that drive 
                engagement, conversions, and brand growth. Our strategies 
                leverage consumer insights to maximize impact.
              </p>
            </div>
          </div>
        </div>
        
        {/* Right Image Section */}
        <div className="w-1/2 relative">
          <div className="absolute inset-0 bg-black">
            <img 
              src="/api/placeholder/800/1000" 
              alt="Modern Architecture"
              className="w-full h-full object-cover grayscale"
            />
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-6 pt-32 pb-16 flex flex-col md:flex-row gap-12">
          {/* Left Side Content */}
          <div className="md:w-3/4">
            <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Vision</h1>
              <div className="bg-gray-100 p-8 rounded-lg shadow-md">
                <p className="text-gray-700 text-lg leading-relaxed">
                  To be the catalyst for digital transformation, empowering businesses to thrive 
                  in the digital age through innovative marketing solutions and exceptional service.
                </p>
              </div>
            </motion.section>
  
            <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-12">
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <div className="bg-gray-100 p-8 rounded-lg shadow-md">
                <p className="text-gray-700 text-lg leading-relaxed">
                  We deliver measurable results through data-driven marketing strategies, 
                  creative excellence, and cutting-edge technology. Our mission is to help 
                  businesses build meaningful connections with their audience and achieve 
                  sustainable growth in the digital landscape.
                </p>
              </div>
            </motion.section>
  
            <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {values.map((value, index) => (
                  <ValueCard key={index} {...value} />
                ))}
              </div>
            </motion.section>
          </div>
  
          {/* Right Side Image */}
          <div className="md:w-1/4 flex items-center">
            <img src="/path-to-your-image.jpg" alt="Vision" className="rounded-lg shadow-lg w-full h-auto" />
          </div>
        </div>
      </div>
      
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


      {/* Team Section */}
      <section className="container mx-auto px-6 py-24" id="team">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-white mb-12"
        >
          MEET OUR TEAM
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index }}
              className="bg-zinc-900/50 p-8 rounded-lg"
            >
              <h3 className="text-xl font-bold text-yellow-400 mb-2">
                {member.name}, <span className="text-white">{member.role}</span>
              </h3>
              <p className="text-gray-300">{member.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-6 py-24" id="contact">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 p-8 rounded-lg"
        >
          <h2 className="text-5xl font-bold text-white mb-8">CONTACT US</h2>
          <div className="space-y-4 text-gray-300">
            <p>+123-456-7890</p>
            <p>www.reallygreatsite.com</p>
            <p>hello@reallygreatsite.com</p>
            <p>123 Anywhere ST., Any City, ST 12345</p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
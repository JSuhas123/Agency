import { motion } from 'framer-motion';
import { Linkedin, Twitter } from 'lucide-react';
import React from 'react';
import Navbar from './Navbar';

interface TeamMemberCardProps {
  image: string;
  name: string;
  role: string;
  bio: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
  };
  delay: number;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ image, name, role, bio, socialLinks, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-zinc-900 rounded-lg overflow-hidden"
  >
    <div className="relative">
      <img
        src={image}
        alt={name}
        className="w-full h-72 object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-24" />
    </div>
    <div className="p-6">
      <h3 className="text-white text-xl font-bold mb-1">{name}</h3>
      <div className="text-yellow-400 text-sm mb-4">{role}</div>
      <p className="text-gray-400 mb-4">{bio}</p>
      <div className="flex space-x-4">
        {socialLinks.linkedin && (
          <a href={socialLinks.linkedin} className="text-gray-400 hover:text-yellow-400">
            <Linkedin className="w-5 h-5" />
          </a>
        )}
        {socialLinks.twitter && (
          <a href={socialLinks.twitter} className="text-gray-400 hover:text-yellow-400">
            <Twitter className="w-5 h-5" />
          </a>
        )}
      </div>
    </div>
  </motion.div>
);

const TeamPage = () => {
  const teamMembers = [
    {
      image: "/api/placeholder/400/500",
      name: "Sarah Johnson",
      role: "CEO & Strategic Director",
      bio: "15+ years of experience in digital marketing and business strategy. Previously led marketing at Fortune 500 companies.",
      socialLinks: {
        linkedin: "#",
        twitter: "#"
      },
      delay: 0.2
    },
    {
      image: "/api/placeholder/400/500",
      name: "Michael Chen",
      role: "Technical Director",
      bio: "Expert in marketing technology and analytics. Specialist in building data-driven marketing solutions.",
      socialLinks: {
        linkedin: "#",
        twitter: "#"
      },
      delay: 0.3
    },
    {
      image: "/api/placeholder/400/500",
      name: "Emily Rodriguez",
      role: "Creative Director",
      bio: "Award-winning creative director with a passion for building memorable brand experiences.",
      socialLinks: {
        linkedin: "#",
        twitter: "#"
      },
      delay: 0.4
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mb-16"
        >
          <h1 className="text-5xl font-bold text-white mb-6">Our Team</h1>
          <p className="text-gray-400 text-lg">
            Meet our team of digital marketing experts. We bring together diverse skills 
            and experiences to deliver exceptional results for our clients.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} {...member} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
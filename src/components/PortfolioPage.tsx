import { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import styles from './PortfolioPage.module.css';

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  type Project = {
    id: number;
    category: string;
    title: string;
    description: string;
    imageUrl: string;
    stats: { value: string; label: string }[];
    challenge: string;
    solution: string;
    solutionList: string[];
    resultsList: string[];
    galleryImages: string[];
    testimonial: {
      text: string;
      author: string;
      position: string;
    };
  };

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', name: 'All Projects', count: 16, icon: 'fa-folder-open' },
    { id: 'marketing', name: 'Digital Marketing', count: 4, icon: 'fa-bullhorn' },
    { id: 'video', name: 'Video Edits', count: 4, icon: 'fa-video' },
    { id: 'thumbnail', name: 'Thumbnails', count: 4, icon: 'fa-image' },
    { id: 'ad', name: 'Ad Edits', count: 4, icon: 'fa-ad' },
  ];

   const projects = [
    // --- Digital Marketing Projects ---
    {
      id: 1,
      category: 'marketing',
      title: 'Teenban',
      description: 'A comprehensive digital marketing campaign that increased brand visibility and engagement across multiple platforms.',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      stats: [
        { value: '40%', label: 'ROI' },
        { value: '2 mo', label: 'Duration' },
        { value: '70K+', label: 'Impact' }
      ],
      challenge: 'The client needed to boost online presence and drive more leads in a competitive market. They were struggling with low engagement rates and lower conversion metrics across their digital channels.',
      solution: 'We implemented a multi-channel campaign with targeted ads, content marketing, and influencer partnerships. Our approach included:',
      solutionList: [
        'Comprehensive audience research and segmentation',
        'Data-driven content strategy across social platforms',
        'Performance-optimized paid advertising campaigns',
        'Influencer collaborations for authentic engagement',
        'Conversion rate optimization for landing pages'
      ],
      resultsList: [
        'Doubled website traffic in just 3 months',
        'Increased conversion rate by 40%',
        'Reduced cost per acquisition by 25%',
        'Generated 5,000+ qualified leads',
        'Improved brand sentiment by 35%'
      ],
      galleryImages: [
        'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
      ],
      testimonial: {
        text: 'Outstanding results and a pleasure to work with! The team at Surgewing transformed our digital presence and delivered results that exceeded our expectations.',
        author: 'Balaji',
        position: 'Founder, Teenban'
      }
    },
    {
      id: 2,
      category: 'marketing',
      title: 'Untamed Streetwear',
      description: 'A D2C campaign focused on generating high-quality leads through Social media and offline sales.',
      imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
      stats: [
        { value: '30%', label: 'Lead Growth' },
        { value: '2 mo', label: 'Duration' },
        { value: '1.2K', label: 'Leads' }
      ],
      challenge: 'The client was struggling to reach decision-makers in their target industry.',
      solution: 'We built a targeted outreach funnel and automated follow-ups.',
      solutionList: [
        'Automated email drip campaigns',
        'Personalized landing pages',
        'A/B testing for messaging',
        'CRM integration for lead tracking'
      ],
      resultsList: [
        '1,200+ new leads in 2 months',
        'Open rates improved by 60%',
        'Reduced manual outreach by 80%',
        'Increased sales pipeline by $500K',
        'Positive feedback from sales team'
      ],
      galleryImages: [
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80'
      ],
      testimonial: {
        text: 'The campaign delivered more leads than we expected. The automation saved us hours every week!',
        author: 'Nandan',
        position: 'Founder, Untamed Streetwear'
      }
    },
    {
      id: 3,
      category: 'marketing',
      title: 'E-commerce Sales Surge',
      description: 'A conversion-focused campaign for an online retailer, leveraging Google Ads and retargeting.',
      imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
      stats: [
        { value: '320%', label: 'Sales Growth' },
        { value: '1.5 mo', label: 'Duration' },
        { value: '2M+', label: 'Impressions' }
      ],
      challenge: 'The client had high traffic but low conversion rates.',
      solution: 'We optimized ad spend and implemented retargeting strategies.',
      solutionList: [
        'Google Shopping campaign setup',
        'Dynamic retargeting ads',
        'Cart abandonment email flows',
        'Landing page A/B testing',
        'Analytics-driven optimization'
      ],
      resultsList: [
        'Sales tripled in 6 weeks',
        'Cart abandonment reduced by 50%',
        'Ad spend efficiency up by 70%',
        '2M+ ad impressions',
        'Customer lifetime value increased'
      ],
      galleryImages: [
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80'
      ],
      testimonial: {
        text: 'Our sales skyrocketed! The team knew exactly how to turn visitors into buyers.',
        author: 'Samir Patel',
        position: 'E-commerce Owner'
      }
    },
    {
      id: 4,
      category: 'marketing',
      title: 'Local SEO Domination',
      description: 'A local business campaign that pushed the client to the top of Google Maps and search results.',
      imageUrl: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80',
      stats: [
        { value: '#1', label: 'Google Rank' },
        { value: '4 mo', label: 'Duration' },
        { value: '300%', label: 'Traffic' }
      ],
      challenge: 'The client was invisible in local search and losing business to competitors.',
      solution: 'We revamped their Google My Business and built local citations.',
      solutionList: [
        'Google My Business optimization',
        'Local citation building',
        'Review generation strategy',
        'On-page SEO improvements',
        'Geo-targeted content creation'
      ],
      resultsList: [
        'Ranked #1 in local search',
        'Tripled local website traffic',
        'Doubled inbound calls',
        '200+ new reviews',
        'Sustained top rankings'
      ],
      galleryImages: [
        'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80'
      ],
      testimonial: {
        text: 'We now dominate local search. Our phones haven\'t stopped ringing!',
        author: 'Linda Green',
        position: 'Owner, LocalBiz'
      }
    },
    // --- Video Edits Projects ---
    {
      id: 5,
      category: 'video',
      title: 'Corporate Promo Video',
      description: 'A high-energy promotional video for a tech startup, featuring motion graphics and dynamic editing.',
      imageUrl: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
      stats: [
        { value: '2 min', label: 'Length' },
        { value: '4K', label: 'Resolution' },
        { value: '3 days', label: 'Turnaround' }
      ],
      challenge: 'The client needed a video to launch their new product at a major conference.',
      solution: 'We storyboarded, shot, and edited a compelling promo with custom graphics.',
      solutionList: [
        'Scriptwriting and storyboarding',
        'On-site filming',
        'Motion graphics integration',
        'Sound design and mixing',
        'Quick delivery for event deadline'
      ],
      resultsList: [
        'Video played to 2,000+ attendees',
        'Received 50K+ online views',
        'Client received media coverage',
        'Positive feedback from stakeholders',
        'Boosted product launch impact'
      ],
      galleryImages: [
        'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80'
      ],
      testimonial: {
        text: 'The video was a showstopper! It captured our brand perfectly.',
        author: 'Jordan Lee',
        position: 'CEO, TechStart'
      }
    },
    {
      id: 6,
      category: 'video',
      title: 'Event Highlights Reel',
      description: 'A fast-paced highlights reel for a major industry event, edited overnight for next-day release.',
      imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
      stats: [
        { value: '3 min', label: 'Length' },
        { value: 'HD', label: 'Resolution' },
        { value: '1 day', label: 'Turnaround' }
      ],
      challenge: 'The event organizer needed a highlights video ready for social media within 24 hours.',
      solution: 'We edited footage on-site and delivered a polished video by morning.',
      solutionList: [
        'On-site editing setup',
        'Rapid footage selection',
        'Music and effects sync',
        'Branding overlays',
        'Optimized for social sharing'
      ],
      resultsList: [
        'Video shared by 10+ sponsors',
        '20K+ views in 48 hours',
        'Increased event engagement',
        'Client booked for next year',
        'Positive attendee feedback'
      ],
      galleryImages: [
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80'
      ],
      testimonial: {
        text: 'Super quick turnaround and amazing quality. Our sponsors loved it!',
        author: 'Maya Chen',
        position: 'Event Manager, ExpoPro'
      }
    },
    {
      id: 7,
      category: 'video',
      title: 'YouTube Channel Intro',
      description: 'A catchy animated intro for a popular YouTube channel, designed to boost brand recognition.',
      imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
      stats: [
        { value: '15 sec', label: 'Length' },
        { value: 'HD', label: 'Resolution' },
        { value: '2 days', label: 'Turnaround' }
      ],
      challenge: 'The channel needed a memorable intro to stand out from competitors.',
      solution: 'We created a custom animation with sound branding.',
      solutionList: [
        'Brand-aligned animation',
        'Custom sound design',
        'Logo reveal',
        'Color grading',
        'Delivered in multiple formats'
      ],
      resultsList: [
        'Intro used in 100+ videos',
        'Channel subscribers up 30%',
        'Positive viewer comments',
        'Brand recall improved',
        'Client referred 3 new creators'
      ],
      galleryImages: [
        'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
      ],
      testimonial: {
        text: 'Our intro is now instantly recognizable. The animation is top-notch!',
        author: 'Chris Evans',
        position: 'YouTuber, TechTalks'
      }
    },
    {
      id: 8,
      category: 'video',
      title: 'Product Demo Edit',
      description: 'A concise, engaging product demo video for a SaaS company, highlighting key features.',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      stats: [
        { value: '1.5 min', label: 'Length' },
        { value: 'HD', label: 'Resolution' },
        { value: '2 days', label: 'Turnaround' }
      ],
      challenge: 'The client needed to explain a complex product in under 2 minutes.',
      solution: 'We scripted and edited a clear, benefit-focused demo.',
      solutionList: [
        'Scriptwriting for clarity',
        'Screen capture and overlays',
        'Feature highlights',
        'Call-to-action integration',
        'Optimized for web and mobile'
      ],
      resultsList: [
        'Demo increased signups by 25%',
        'Reduced support queries',
        'Shared by industry blogs',
        'Positive user feedback',
        'Client requested more videos'
      ],
      galleryImages: [
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80'
      ],
      testimonial: {
        text: 'The demo video made our product easy to understand. It\'s a great sales tool!',
        author: 'Nina Rao',
        position: 'CMO, SaaSify'
      }
    },
    // --- Thumbnails Projects ---
    {
      id: 9,
      category: 'thumbnail',
      title: 'YouTube Viral Thumbnail',
      description: 'A bold, eye-catching thumbnail that helped a video go viral and reach 1M+ views.',
      imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
      stats: [
        { value: '1M+', label: 'Views' },
        { value: '3x', label: 'CTR' },
        { value: '1 day', label: 'Turnaround' }
      ],
      challenge: 'The client\'s videos were underperforming due to bland thumbnails.',
      solution: 'We designed a vibrant, curiosity-driven thumbnail.',
      solutionList: [
        'Bold color palette',
        'Expressive facial cutout',
        'Large, readable text',
        'Brand logo integration',
        'A/B tested for best results'
      ],
      resultsList: [
        'Video reached trending page',
        'CTR tripled',
        '1M+ views in 2 weeks',
        'Channel gained 10K subs',
        'Client requested more designs'
      ],
      galleryImages: [
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80'
      ],
      testimonial: {
        text: 'Our video finally went viral! The thumbnail made all the difference.',
        author: 'Ravi Kumar',
        position: 'YouTuber, FunFacts'
      }
    },
    {
      id: 10,
      category: 'thumbnail',
      title: 'Podcast Cover Art',
      description: 'A modern, minimalist thumbnail for a new podcast series, designed for Spotify and Apple Podcasts.',
      imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
      stats: [
        { value: '5+', label: 'Platforms' },
        { value: '2x', label: 'Engagement' },
        { value: '2 days', label: 'Turnaround' }
      ],
      challenge: 'The podcast needed a strong visual identity for launch.',
      solution: 'We created a clean, memorable cover with bold typography.',
      solutionList: [
        'Minimalist design',
        'Custom iconography',
        'Brand color palette',
        'Optimized for all platforms',
        'Quick delivery for launch'
      ],
      resultsList: [
        'Podcast featured on Apple',
        'Doubled listener engagement',
        'Positive reviews on design',
        'Brand identity established',
        'Client referred 2 new shows'
      ],
      galleryImages: [
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
      ],
      testimonial: {
        text: 'The cover art gave our podcast instant credibility. Listeners loved it!',
        author: 'Sara Lee',
        position: 'Host, Startup Stories'
      }
    },
    {
      id: 11,
      category: 'thumbnail',
      title: 'Course Thumbnail Series',
      description: 'A set of cohesive thumbnails for an online course, boosting click-through and brand consistency.',
      imageUrl: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80',
      stats: [
        { value: '8', label: 'Thumbnails' },
        { value: '2.5x', label: 'CTR' },
        { value: '3 days', label: 'Turnaround' }
      ],
      challenge: 'The course had inconsistent visuals and low engagement.',
      solution: 'We designed a series of branded, high-contrast thumbnails.',
      solutionList: [
        'Consistent color scheme',
        'Clear, bold text',
        'Visual cues for each module',
        'Brand logo placement',
        'Delivered in all required sizes'
      ],
      resultsList: [
        'CTR more than doubled',
        'Course sales up 40%',
        'Brand recognition improved',
        'Positive student feedback',
        'Client requested more modules'
      ],
      galleryImages: [
        'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80'
      ],
      testimonial: {
        text: 'Our course looks so much more professional. Students noticed the upgrade!',
        author: 'Emily Tran',
        position: 'Course Creator, LearnPro'
      }
    },
    {
      id: 12,
      category: 'thumbnail',
      title: 'Instagram Highlight Covers',
      description: 'A set of custom highlight covers for a lifestyle influencer, boosting profile aesthetics.',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      stats: [
        { value: '12', label: 'Covers' },
        { value: '3x', label: 'Profile Views' },
        { value: '1 day', label: 'Turnaround' }
      ],
      challenge: 'The influencer wanted a more cohesive Instagram profile.',
      solution: 'We designed custom icons and a pastel color palette.',
      solutionList: [
        'Custom icon design',
        'Pastel color palette',
        'Consistent style for all covers',
        'Quick delivery',
        'Optimized for Instagram'
      ],
      resultsList: [
        'Profile views tripled',
        'Followers up 20%',
        'Brand collaborations increased',
        'Positive DMs from followers',
        'Client recommended to peers'
      ],
      galleryImages: [
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80'
      ],
      testimonial: {
        text: 'My Instagram looks so much better! The covers are beautiful and unique.',
        author: 'Ava Smith',
        position: 'Lifestyle Influencer'
      }
    },
    // --- Ad Edits Projects ---
    {
      id: 13,
      category: 'ad',
      title: 'Facebook Ad Animation',
      description: 'A high-converting animated ad for a retail brand, designed for Facebook and Instagram.',
      imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
      stats: [
        { value: '4x', label: 'ROAS' },
        { value: '30 sec', label: 'Length' },
        { value: '2 days', label: 'Turnaround' }
      ],
      challenge: 'The client needed a scroll-stopping ad to boost sales during a holiday campaign.',
      solution: 'We created a vibrant animation with a clear call-to-action.',
      solutionList: [
        'Animated product showcase',
        'Holiday-themed graphics',
        'Strong CTA overlay',
        'Optimized for mobile',
        'A/B tested for best results'
      ],
      resultsList: [
        'ROAS quadrupled',
        'Ad reached 500K+ users',
        'Sales up 60%',
        'Positive comments on ad',
        'Client extended campaign'
      ],
      galleryImages: [
        'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80'
      ],
      testimonial: {
        text: 'The animation made our ad campaign a huge success. Sales soared!',
        author: 'Olivia Brown',
        position: 'Marketing Lead, RetailCo'
      }
    },
    {
      id: 14,
      category: 'ad',
      title: 'Google Display Banner',
      description: 'A set of animated banners for a SaaS company, optimized for Google Display Network.',
      imageUrl: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80',
      stats: [
        { value: '6', label: 'Banner Sizes' },
        { value: '2x', label: 'CTR' },
        { value: '3 days', label: 'Turnaround' }
      ],
      challenge: 'The client needed banners in multiple sizes for a product launch.',
      solution: 'We designed and animated banners for all required formats.',
      solutionList: [
        'Responsive banner design',
        'Animated transitions',
        'Brand color integration',
        'Clear value proposition',
        'Delivered in all GDN sizes'
      ],
      resultsList: [
        'CTR doubled',
        'Product launch success',
        'Positive feedback from client',
        'Banners used in future campaigns',
        'Brand awareness increased'
      ],
      galleryImages: [
        'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80'
      ],
      testimonial: {
        text: 'The banners looked amazing and performed even better. Highly recommend!',
        author: 'David Kim',
        position: 'CMO, SaaSify'
      }
    },
    {
      id: 15,
      category: 'ad',
      title: 'Instagram Story Ad',
      description: 'A vertical video ad for Instagram Stories, designed to maximize swipe-ups and conversions.',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      stats: [
        { value: '2x', label: 'Conversions' },
        { value: '15 sec', label: 'Length' },
        { value: '1 day', label: 'Turnaround' }
      ],
      challenge: 'The client wanted to drive more traffic from Instagram Stories.',
      solution: 'We created a fast-paced, visually engaging story ad.',
      solutionList: [
        'Vertical video format',
        'Animated text overlays',
        'Strong swipe-up CTA',
        'Brand colors and logo',
        'Optimized for mobile speed'
      ],
      resultsList: [
        'Conversions doubled',
        'Ad reached 100K+ users',
        'Positive DMs from viewers',
        'Client requested more ads',
        'Brand followers increased'
      ],
      galleryImages: [
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80'
      ],
      testimonial: {
        text: 'The Instagram Story ad was a huge hit! We saw a significant increase in conversions',
        author: 'Emily Chen',
        position: 'Social Media Manager, TrendyShop'
      }
    },
  ];
// Assuming you have a types file for Project interface
  const filteredProjects = projects.filter(project => 
    activeCategory === 'all' || project.category === activeCategory
  );

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isModalOpen]);

  return (
    <>
      <Navbar />
      <section className={styles.portfolioSection}>
        {/* Hero Section */}
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>
            <span style={{ color: '#FFD600' }}>Our Portfolio</span>
          </h1>
          <p className={styles.heroDesc}>
            Explore our portfolio of innovative digital marketing campaigns, video productions, and creative designs that have delivered exceptional results for our clients.
          </p>
          {/* Portfolio Tabs */}
          <div className={styles.tabs}>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`${styles.tab} ${activeCategory === category.id ? styles.activeTab : ''}`}
                onClick={() => setActiveCategory(category.id)}
                type="button"
                aria-selected={activeCategory === category.id}
                aria-controls={`portfolio-${category.id}`}
              >
                <span>{category.name}</span>
                <span className={styles.tabBadge}>{category.count}</span>
              </button>
            ))}
          </div>
          {/* Portfolio Grid */}
          <div className={styles.portfolioGrid}>
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={styles.portfolioCard}
                onClick={() => openModal(project)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    openModal(project);
                  }
                }}
              >
                <div className={styles.cardImage}>
                  <img src={project.imageUrl} alt={project.title} />
                  <div className={styles.cardBadge}>
                    {categories.find((c) => c.id === project.category)?.name}
                  </div>
                </div>
                <div className={styles.cardContent}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className={styles.cardStats}>
                    {project.stats.map((stat) => (
                      <div className={styles.stat} key={stat.label}>
                        <div className={styles.statValue}>{stat.value}</div>
                        <div className={styles.statLabel}>{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Portfolio Detail Modal */}
        {isModalOpen && selectedProject && (
          <div className={styles.modal}>
            <div className={styles.modalContent} ref={modalRef} tabIndex={-1} aria-modal="true">
              <div className={styles.modalHeader}>
                <h2 style={{ fontFamily: 'Times New Roman', fontWeight: 800, fontSize: '2rem', letterSpacing: '0.5px' }}>{selectedProject.title}</h2>
                <button className={styles.closeButton} onClick={closeModal} aria-label="Close modal">
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className={styles.modalBody}>
                <div className={styles.modalImage}>
                  <button
                    className={styles.imageExpandButton}
                    onClick={() => setExpandedImage(selectedProject.imageUrl)}
                    aria-label="Expand image"
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'zoom-in', width: '100%' }}
                  >
                    <img
                      src={selectedProject.imageUrl}
                      alt={selectedProject.title}
                      style={{ width: '100%', display: 'block' }}
                    />
                  </button>
                </div>
                <div className={styles.modalStats}>
                  {selectedProject.stats.map((stat) => (
                    <div className={styles.modalStat} key={stat.label}>
                      <div className={styles.modalStatValue}>{stat.value}</div>
                      <div className={styles.modalStatLabel}>{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className={styles.modalSection}>
                  <h3>The Challenge</h3>
                  <p style={{ fontFamily: 'Times New Roman', fontWeight: 400 }}>{selectedProject.challenge}</p>
                </div>
                <div className={styles.modalSection}>
                  <h3>Our Solution</h3>
                  <p style={{ fontFamily: 'Times New Roman', fontWeight: 400 }}>{selectedProject.solution}</p>
                  <ul className={styles.resultsList}>
                    {selectedProject.solutionList.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.modalSection}>
                  <h3>Results</h3>
                  <ul className={styles.resultsList}>
                    {selectedProject.resultsList.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.modalSection}>
                  <h3>Project Gallery</h3>
                  <div className={styles.gallery}>
                    {selectedProject.galleryImages.map((img, i) => (
                      <button
                        className={styles.imageExpandButton}
                        key={img}
                        onClick={() => setExpandedImage(img)}
                        aria-label={`Expand gallery image ${i + 1}`}
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'zoom-in' }}
                      >
                        <img
                          src={img}
                          alt={`Gallery ${i + 1}`}
                          style={{ width: '100px', height: '70px', objectFit: 'cover', borderRadius: '8px', display: 'block' }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className={styles.testimonial}>
                  <p>{selectedProject.testimonial.text}</p>
                  <div className={styles.testimonialAuthor}>{selectedProject.testimonial.author}</div>
                  <div className={styles.testimonialPosition}>{selectedProject.testimonial.position}</div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Expanded Image Modal */}
        {expandedImage && (
          <div
            className={styles.expandedImageOverlay}
            role="dialog"
            aria-modal="true"
            tabIndex={0}
            onClick={() => setExpandedImage(null)}
            onKeyDown={e => (e.key === 'Escape' ? setExpandedImage(null) : undefined)}
            style={{ outline: 'none' }}
          >
            <div
              className={styles.expandedImageContainer}
              tabIndex={0}
              onClick={e => e.stopPropagation()}
              onKeyDown={e => (e.key === 'Escape' ? setExpandedImage(null) : undefined)}
              style={{ outline: 'none' }}
            >
              <button className={styles.closeButton} onClick={() => setExpandedImage(null)} aria-label="Close image">&times;</button>
              <img src={expandedImage} alt="Expanded" className={styles.expandedImage} />
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default PortfolioSection;
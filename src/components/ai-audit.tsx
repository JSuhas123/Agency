import { ArrowRightIcon, BarChartIcon, CheckIcon, ClockIcon, CogIcon, GroupIcon, HelpCircle, LightbulbIcon, Minus, Plus, ShieldCheckIcon, StarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Forms from './forms';

interface FAQItem {
  question: string;
  answer: string;
}

interface AuditFeature {
  icon: JSX.Element;
  title: string;
  description: string;
  value: string;
  gradient: string;
}

interface Testimonial {
  name: string;
  company: string;
  role: string;
  quote: string;
  avatar: string;
  results: string;
}

interface Stat {
  number: string;
  label: string;
  icon: string;
}

const AiAuditPage = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToForm = () => {
    const element = document.getElementById('audit-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const auditFeatures: AuditFeature[] = [
    {
      icon: <CogIcon className="w-8 h-8" />,
      title: 'AI Opportunity Mapping',
      description: 'Identify high-impact automation opportunities across your entire business workflow',
      value: '₹2,00,000 Value',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      icon: <BarChartIcon className="w-8 h-8" />,
      title: 'ROI Projection Analysis',
      description: 'Get detailed projections on potential cost savings and revenue increases',
      value: '₹2,40,000 Value',
      gradient: 'from-green-500 to-teal-600'
    },
    {
      icon: <LightbulbIcon className="w-8 h-8" />,
      title: 'Custom AI Strategy Blueprint',
      description: 'Receive a tailored 90-day implementation roadmap specific to your business',
      value: '₹3,30,000 Value',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      title: 'Risk Assessment & Mitigation',
      description: 'Comprehensive analysis of potential challenges and proven solutions',
      value: '₹1,25,000 Value',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: <GroupIcon className="w-8 h-8" />,
      title: 'Team Readiness Evaluation',
      description: 'Assess your team\'s capabilities and training requirements for AI adoption',
      value: '₹1,65,000 Value',
      gradient: 'from-indigo-500 to-blue-600'
    },
    {
      icon: <ClockIcon className="w-8 h-8" />,
      title: 'Priority Implementation Plan',
      description: 'Ranked list of AI initiatives by impact, effort, and timeline',
      value: '₹2,90,000 Value',
      gradient: 'from-teal-500 to-green-600'
    }
  ];

  const testimonials: Testimonial[] = [
    {
      name: 'Sarah Chen',
      company: 'TechFlow Solutions',
      role: 'CEO & Founder',
      quote: 'This audit completely transformed our approach to AI. We implemented their recommendations and saw a 340% ROI within 6 months. The roadmap was incredibly detailed and actionable.',
      avatar: '👩‍💼',
      results: '340% ROI in 6 months'
    },
    {
      name: 'Marcus Rodriguez',
      company: 'GrowthLab Ventures',
      role: 'Chief Technology Officer',
      quote: 'The most comprehensive AI analysis we\'ve ever received. Their team identified opportunities we completely missed and provided a clear path to implementation.',
      avatar: '👨‍💻',
      results: '50% reduction in manual tasks'
    },
    {
      name: 'Emily Watson',
      company: 'InnovateHub',
      role: 'Operations Director',
      quote: 'Outstanding expertise and practical insights. The audit revealed $2M in potential savings through automation we never considered possible.',
      avatar: '👩‍🔬',
      results: '$2M in identified savings'
    }
  ];

  const faqData: FAQItem[] = [
    {
      question: 'Is this audit really completely free?',
      answer: 'Absolutely! This is a genuine ₹13,75,000 value audit that we provide at no cost. We believe in demonstrating our expertise upfront and building long-term partnerships with forward-thinking businesses.'
    },
    {
      question: 'What makes your audit different from generic AI consultations?',
      answer: 'Our audit is conducted by AI practitioners who build and deploy AI solutions daily. We provide actionable insights with specific tool recommendations, implementation timelines, and ROI projections - not just theoretical advice.'
    },
    {
      question: 'How quickly can I expect results after the audit?',
      answer: 'You\'ll receive your comprehensive audit report within 5-7 business days, including a 60-minute strategy session. Many clients see initial improvements within 2-3 weeks of implementing our quick-win recommendations.'
    },
    {
      question: 'Do you work with companies that have no AI experience?',
      answer: 'Yes! We specialize in helping businesses at every stage of their AI journey. Whether you\'re completely new to AI or looking to optimize existing implementations, we tailor our recommendations to your current capabilities.'
    },
    {
      question: 'What happens if I want to implement your recommendations?',
      answer: 'While there\'s no obligation, we offer implementation services for clients who want our continued support. During your audit results session, we\'ll discuss options that fit your timeline and budget.'
    },
    {
      question: 'How do you ensure the confidentiality of our business information?',
      answer: 'We sign comprehensive NDAs before any audit begins and follow enterprise-grade security protocols. Your business information is completely confidential and never shared with third parties.'
    }
  ];

  const stats: Stat[] = [
    { number: '500+', label: 'Businesses Audited', icon: '🏢' },
    { number: '$50M+', label: 'Revenue Generated', icon: '💰' },
    { number: '85%', label: 'Implementation Success Rate', icon: '📈' },
    { number: '24hrs', label: 'Average Response Time', icon: '⚡' }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-48 -translate-y-48 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/10 rounded-full translate-x-36 translate-y-36 animate-pulse delay-700"></div>
        
        <div className={`relative max-w-6xl mx-auto text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center bg-black/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <span className="text-white font-semibold">🎯 Limited Time Offer</span>
            <span className="ml-2 text-white/80">•</span>
            <span className="ml-2 text-white">Worth ₹13,75,000 - Free Until End of Month</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-black mb-6 leading-tight">
            Unlock Your Business's 
            <span className="block bg-gradient-to-r from-black to-gray-800 bg-clip-text text-transparent">
              Hidden AI Goldmine
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-black/80 mb-8 max-w-4xl mx-auto leading-relaxed">
            Get a comprehensive AI readiness audit that reveals exactly how to <strong>automate your workflows</strong>, 
            <strong> reduce costs by 40-60%</strong>, and <strong>scale revenue</strong> using cutting-edge AI solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={scrollToForm}
              className="group bg-black text-yellow-400 px-8 py-4 text-lg font-semibold rounded-2xl hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center"
            >
              Get My Free ₹13,75,000 Audit
              <ArrowRightIcon className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white/20 backdrop-blur-sm text-black px-8 py-4 text-lg font-semibold rounded-2xl hover:bg-white/30 transition-all duration-300 border border-black/20">
              📞 Book Strategy Call
            </button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                <div className="text-2xl mb-2" role="img" aria-label={stat.label}>{stat.icon}</div>
                <div className="text-2xl font-bold text-black">{stat.number}</div>
                <div className="text-black/70 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
              🚀 Complete AI Transformation Package
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">What's Inside Your Free Audit</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A comprehensive analysis worth <strong>₹13,75,000</strong> that most consultancies charge premium rates for.
              Get the complete roadmap to AI success in your business.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {auditFeatures.map((feature, index) => (
              <div key={index} className={`group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl text-white mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                  <span className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                    {feature.value}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">{feature.description}</p>
                <div className="flex items-center text-sm font-medium text-green-600">
                  <CheckIcon className="w-5 h-5 mr-2" />
                  Included FREE
                </div>
              </div>
            ))}
          </div>

          <div className="text-center bg-gradient-to-r from-green-100 to-blue-100 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Total Value: ₹13,75,000</h3>
            <p className="text-lg text-gray-700 mb-4">Get everything above completely FREE (Limited time offer)</p>
            <button
              onClick={scrollToForm}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Claim Your Free Audit Now
            </button>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Industry Leaders</h2>
            <p className="text-xl text-gray-600">See how businesses like yours achieved breakthrough results</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                <div className="flex mb-4" role="img" aria-label="5 star rating">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-4 mb-6">
                  <div className="text-sm font-bold text-green-700 mb-1">RESULTS ACHIEVED:</div>
                  <div className="text-xl font-bold text-gray-900">{testimonial.results}</div>
                </div>
                <blockquote className="text-gray-700 mb-6 italic text-lg leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <div className="text-3xl mr-4" role="img" aria-label="Profile avatar">{testimonial.avatar}</div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600">{testimonial.role}</div>
                    <div className="text-sm font-semibold text-blue-600">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <Forms />

      {/* FAQ Section */}   
      <section className="relative py-24 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-indigo-500 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-500 rounded-full blur-3xl opacity-50"></div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-lg">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6 leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Find answers to common questions about our products, services, and policies. 
              Can't find what you're looking for? Contact our support team.
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div 
                key={index} 
                className={`group relative bg-white/70 backdrop-blur-lg border border-white/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden ${
                  openFAQ === index ? 'bg-white/90 shadow-2xl scale-[1.02]' : 'hover:bg-white/80'
                }`}
              >
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                
                <div className="relative p-8">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full text-left flex items-center justify-between group/button"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 pr-4 group-hover/button:text-blue-700 transition-colors duration-300">
                      {item.question}
                    </h3>
                    
                    <div className="flex-shrink-0 relative">
                      {openFAQ === index ? (
                        <Minus className="w-6 h-6 text-blue-600 transform transition-all duration-300 hover:scale-110" />
                      ) : (
                        <Plus className="w-6 h-6 text-gray-500 group-hover/button:text-blue-600 transform transition-all duration-300 hover:scale-110" />
                      )}
                    </div>
                  </button>

                  {/* Answer with smooth animation */}
                  <div className={`transition-all duration-500 ease-in-out ${
                    openFAQ === index 
                      ? 'max-h-96 opacity-100 mt-6' 
                      : 'max-h-0 opacity-0 mt-0'
                  } overflow-hidden`}>
                    <div className="border-t border-gray-200/50 pt-6">
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
              <HelpCircle className="w-5 h-5" />
              <span>Still have questions? Contact Support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AiAuditPage;
import {
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle,
  Clock,
  Download,
  Eye,
  Lightbulb,
  LucideIcon,
  MessageSquare,
  PlayCircle,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';



// Type definitions
interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
}

interface UseCase {
  industry: string;
  company: string;
  challenge: string;
  solution: string;
  result: string;
  logo: string;
}

interface Step {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

interface Stat {
  number: string;
  label: string;
  icon: LucideIcon;
}

interface Trend {
  title: string;
  description: string;
  icon: LucideIcon;
  impact: 'High' | 'Medium' | 'Critical';
}




const AIMarketing: React.FC = () => {

  const benefits: Benefit[] = [
    {
      icon: Target,
      title: "Hyper-Personalization at Scale",
      description: "Deliver individually tailored experiences to thousands of customers simultaneously using AI-driven behavioral analysis and predictive modeling.",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      icon: BarChart3,
      title: "Advanced Customer Insights",
      description: "Uncover hidden patterns in customer behavior, preferences, and purchasing journeys with sophisticated AI analytics and segmentation.",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      icon: Zap,
      title: "Intelligent Automation",
      description: "Automate complex marketing workflows, from email sequences to ad optimization, freeing your team for strategic initiatives.",
      gradient: "from-blue-400 to-cyan-500"
    },
    {
      icon: Brain,
      title: "Predictive Analytics",
      description: "Forecast customer behavior, market trends, and campaign performance to make data-driven decisions before your competition.",
      gradient: "from-green-400 to-emerald-500"
    },
    {
      icon: TrendingUp,
      title: "Enhanced ROI & Efficiency",
      description: "Optimize marketing spend automatically across channels, reducing waste and maximizing return on every marketing dollar invested.",
      gradient: "from-red-400 to-rose-500"
    },
    {
      icon: Users,
      title: "Dynamic Audience Segmentation",
      description: "Create and update customer segments in real-time based on evolving behaviors, ensuring maximum relevance and engagement.",
      gradient: "from-indigo-400 to-purple-500"
    }
  ];

  

  const useCases: UseCase[] = [
    {
    industry: "E-commerce",
    company: "ASOS",
    challenge: "Low conversion rates and high cart abandonment",
    solution: "Leveraged AI for personalized product recommendations and dynamic pricing models using machine learning algorithms.",
    result: "35% increase in average order value and 20% reduction in cart abandonment rate within 6 months of implementation.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0b/ASOS_logo.svg",
  },
  {
    industry: "SaaS",
    company: "HubSpot",
    challenge: "Difficulty identifying high-value leads from marketing qualified leads",
    solution: "Integrated AI-based predictive lead scoring and launched automated, behavior-driven nurture campaigns.",
    result: "2x increase in sales team efficiency and a 50% faster lead-to-close time.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/HubSpot_Logo.svg",
  },
  {
    industry: "Retail",
    company: "Sephora",
    challenge: "Generic email campaigns with low engagement and poor personalization",
    solution: "Adopted AI for hyper-personalized email marketing using dynamic product suggestions and predictive analysis.",
    result: "70% boost in email open rates and 40% increase in click-through rates.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/60/Sephora_logo.svg",
  },
  ];

  const steps: Step[] = [
    {
      number: "01",
      title: "Audit Your Current Data",
      description: "Assess the quality and completeness of your customer data across all touchpoints and platforms.",
      icon: Eye
    },
    {
      number: "02",
      title: "Define Clear Objectives",
      description: "Establish specific, measurable goals for your AI marketing initiatives and success metrics.",
      icon: Target
    },
    {
      number: "03",
      title: "Choose the Right Tools",
      description: "Select AI marketing platforms that align with your objectives, budget, and technical capabilities.",
      icon: Lightbulb
    },
    {
      number: "04",
      title: "Start Small & Scale",
      description: "Begin with pilot programs, measure results, and gradually expand successful AI implementations.",
      icon: TrendingUp
    }
  ];

  const stats: Stat[] = [
    { number: "80%", label: "of marketers report improved efficiency with AI", icon: Clock },
    { number: "37%", label: "average increase in conversion rates", icon: TrendingUp },
    { number: "52%", label: "reduction in customer acquisition costs", icon: Target },
    { number: "90%", label: "of businesses see ROI within 12 months", icon: BarChart3 }
  ];

  const trends: Trend[] = [
    {
      title: "Generative AI Content Creation",
      description: "AI-powered tools creating human-like content at scale, from blog posts to video scripts and social media content.",
      icon: Sparkles,
      impact: "High"
    },
    {
      title: "Conversational AI & Chatbots",
      description: "Advanced chatbots providing personalized customer service and driving sales through natural conversations.",
      icon: MessageSquare,
      impact: "High"
    },
    {
      title: "Voice Search Optimization",
      description: "AI algorithms optimizing content for voice queries as smart speakers and voice assistants gain popularity.",
      icon: Brain,
      impact: "Medium"
    },
    {
      title: "Privacy-First AI Marketing",
      description: "AI solutions that respect user privacy while delivering personalized experiences in a cookieless future.",
      icon: Shield,
      impact: "Critical"
    }
  ];




  return (
    <div className="min-h-screen  bg-black relative overflow-hidden">
      <Navbar />
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-4 sm:px-6 z-10">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto text-center">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Brain className="w-4 h-4 text-yellow-400" />
              <span className="text-white/90 text-sm font-medium">Next-Generation Marketing</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-none">
              <span className="text-white block mb-2">AI-Powered</span>
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
                Marketing
              </span>
              <span className="text-white block text-3xl sm:text-4xl font-light mt-4">
                That Delivers Results
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Transform your marketing strategy with artificial intelligence. Drive exponential growth through 
              <span className="text-yellow-400 font-semibold"> data-driven insights</span>, personalized campaigns, 
              and intelligent automation that adapts to your customers' needs in real-time.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link to="/ai-audit">
                <button className="group bg-yellow-400 text-black font-bold px-8 py-4 rounded-full hover:shadow-2xl hover:shadow-yellow-400/25 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <span>Start Your AI Journey</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </Link>
   
              <button className="group flex items-center gap-3 px-8 py-4 rounded-full border border-white/30 text-white hover:bg-white/10 transition-all duration-300">
                <PlayCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat: Stat, index: number) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="text-white w-8 h-8" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What is AI Marketing Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                What is <span className="bg-yellow-400 bg-clip-text text-transparent">AI Marketing?</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  AI Marketing leverages artificial intelligence technologies like machine learning, natural language processing, 
                  and predictive analytics to revolutionize how businesses connect with their customers.
                </p>
                <p>
                  Unlike traditional marketing approaches, AI marketing systems continuously learn from customer interactions, 
                  automatically optimize campaigns, and deliver personalized experiences at unprecedented scale.
                </p>
                <p>
                  By integrating AI with your existing marketing stack, you can automate complex decision-making processes, 
                  predict customer behavior, and create hyper-relevant content that resonates with each individual prospect.
                </p>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-3">
                {(['Machine Learning', 'Natural Language Processing', 'Predictive Analytics', 'Marketing Automation'] as const).map((tech: string, index: number) => (
                  <span key={index} className="px-4 py-2 bg-yellow-300 text-yellow-800 rounded-full font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-3xl p-8">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                  alt="AI Marketing Visualization" 
                  className="w-full rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl">
                <div className="text-2xl font-bold text-gray-900">85%</div>
                <div className="text-gray-600">Automation Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 py-28 px-6 sm:px-12 bg-gradient-to-br from-gray-50 via-white to-gray-100">
  <div className="container mx-auto max-w-7xl">
    <div className="text-center mb-20">
      <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6">
        Key Benefits of{" "}
        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          AI Marketing
        </span>
      </h2>
      <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
        Unleash the power of artificial intelligence to elevate your marketing strategy — from hyper-personalized campaigns to data-driven decisions that accelerate growth and customer loyalty.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {benefits.map((benefit: Benefit, index: number) => (
        <div
          key={index}
          className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
        >
          <div className="flex items-center justify-center w-14 h-14 mb-5 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 text-white text-xl font-bold shadow-md">
            <benefit.icon className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-200 mb-3">
            {benefit.title}
          </h3>
          <p className="text-gray-600 leading-relaxed text-base">
            {benefit.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Use Cases Section */}
      <section className="relative z-10 py-28 px-6 sm:px-12 bg-gradient-to-br from-gray-50 via-white to-gray-100">
  <div className="container mx-auto max-w-7xl">
    <div className="text-center mb-20">
      <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-snug mb-6">
        Real-World{" "}
        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          Success Stories
        </span>
      </h2>
      <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
        Explore how leading businesses across various industries have used AI-driven marketing strategies to unlock growth, optimize customer journeys, and boost ROI.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {useCases.map((useCase: UseCase, index: number) => (
        <div
          key={index}
          className="bg-white p-8 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition duration-300 group"
        >
          <div className="mb-4">
            <div className="w-full h-48 flex items-center justify-center bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl mb-6">
              <img
                src={useCase.logo}
                alt={`${useCase.company} logo`}
                className="h-16 max-w-[80%] object-contain"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-200 mb-2">
              {useCase.company}
            </h3>
            <p className="text-sm text-gray-500 italic mb-3">{useCase.industry}</p>
            <div className="text-base text-gray-600 leading-relaxed space-y-2">
              <div>
                <span className="font-semibold">Challenge:</span> {useCase.challenge}
              </div>
              <div>
                <span className="font-semibold">AI Solution:</span> {useCase.solution}
              </div>
              <div>
                <span className="font-semibold">Result:</span> {useCase.result}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>



      {/* Getting Started Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              How to Get Started with <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">AI Marketing</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow these strategic steps to successfully integrate AI into your marketing operations and start seeing results quickly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step: Step, index: number) => (
              <div key={index} className="flex gap-6 p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                    {step.number}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <step.icon className="w-6 h-6 text-yellow-600" />
                    <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Trends Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Future Trends in <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">AI Marketing</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay ahead of the curve with emerging AI technologies that will shape the next generation of marketing strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {trends.map((trend: Trend, index: number) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <trend.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{trend.title}</h3>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        trend.impact === 'High' ? 'bg-green-100 text-green-800' :
                        trend.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {trend.impact} Impact
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{trend.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-900 to-black">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
            Ready to Transform Your Marketing with <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">AI?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Join thousands of businesses already leveraging AI to drive unprecedented growth. 
            Get started with a free consultation and discover your AI marketing potential.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link to="/ai-audit">
            <button className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-8 py-4 rounded-full hover:shadow-2xl hover:shadow-yellow-400/25 transition-all duration-300">
              <div className="flex items-center gap-3">
                <span>Get Free AI Marketing Audit</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
            </Link>
            
            <button className="group flex items-center gap-3 px-8 py-4 rounded-full border border-white/30 text-white hover:bg-white/10 transition-all duration-300">
              <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Download AI Marketing Guide</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <p className="text-gray-300">Free 30-minute consultation</p>
            </div>
            <div>
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <p className="text-gray-300">Custom AI strategy roadmap</p>
            </div>
            <div>
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <p className="text-gray-300">ROI projection analysis</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIMarketing;
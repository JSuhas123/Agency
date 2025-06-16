import React, { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

// Add TypeScript declaration for window.grecaptcha
declare global {
  interface Window {
    grecaptcha: Grecaptcha;
  }
}

// Minimal grecaptcha type definition for ready()
interface Grecaptcha {
  ready: (cb: () => void) => void;
  // Add more methods if needed
}

const RECAPTCHA_SITE_KEY = '6Lf9lVYrAAAAAAAKTFd22AC2LLXjj_7PmwxVrAdW';

const Forms = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    website: '',
    industry: '',
    teamSize: '',
    revenue: '',
    challenges: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string>('');
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  // Load reCAPTCHA script only if not already present
  useEffect(() => {
    if (!document.querySelector('script[src="https://www.google.com/recaptcha/api.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.grecaptcha && typeof window.grecaptcha.ready === 'function') {
          window.grecaptcha.ready(() => {
            // reCAPTCHA is ready
          });
        }
      };
      document.head.appendChild(script);
      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
    setCaptchaError('');
  };

  const handleCaptchaExpired = () => {
    setCaptchaToken(null);
    setCaptchaError('reCAPTCHA expired. Please verify again.');
  };

  const handleCaptchaError = () => {
    setCaptchaToken(null);
    setCaptchaError('reCAPTCHA verification failed. Please try again.');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = ['fullName', 'companyName', 'email', 'industry', 'challenges'];
    const missingFields = requiredFields.filter(field => !formData[field].trim());

    if (missingFields.length > 0) {
      alert('Please fill in all required fields.');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Validate reCAPTCHA
    if (!captchaToken) {
      setCaptchaError('Please complete the reCAPTCHA verification.');
      return;
    }

    setIsSubmitting(true);
    setCaptchaError('');

    try {
      const response = await fetch('/api/audit/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          captchaToken: captchaToken
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({
          fullName: '',
          companyName: '',
          email: '',
          website: '',
          industry: '',
          teamSize: '',
          revenue: '',
          challenges: ''
        });
        setCaptchaToken(null);
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      alert('There was an error submitting your form. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="audit-form" className="py-24 px-4 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-yellow-400 text-black px-6 py-2 rounded-full text-sm font-bold mb-6">
            ⚡ LIMITED TIME: Free ₹13,75,000 Value Audit
          </div>
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Fill out this form and we'll deliver your comprehensive AI audit within 24 hours. 
            <strong className="text-yellow-400"> No strings attached, no sales pressure.</strong>
          </p>
        </div>

        {showSuccess ? (
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl p-12 rounded-3xl text-center">
            <div className="text-8xl mb-6" role="img" aria-label="Celebration">🎉</div>
            <h3 className="text-3xl font-bold text-white mb-6">Audit Request Submitted!</h3>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              Thank you for your interest! Our AI experts will analyze your business and contact you within 24 hours 
              to schedule your comprehensive audit session.
            </p>
            <div className="bg-green-500/20 border border-green-400/30 rounded-2xl p-6 mb-8">
              <h4 className="text-green-400 font-bold mb-2">What happens next:</h4>
              <div className="text-green-200 text-left space-y-2 max-w-md mx-auto">
                <div>✅ Review of your business within 4 hours</div>
                <div>✅ Personal call within 24 hours</div>
                <div>✅ Complete audit delivered in 5-7 days</div>
              </div>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="bg-yellow-400 text-black px-8 py-4 rounded-2xl font-bold hover:bg-yellow-300 transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          // Add inert attribute if you ever want to hide this form from interaction
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl p-8 rounded-3xl" /* inert={showSuccess ? "true" : undefined} */>
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="block text-sm font-semibold text-white">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    aria-required="true"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="companyName" className="block text-sm font-semibold text-white">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    required
                    aria-required="true"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
                    placeholder="Your company name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-white">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    aria-required="true"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
                    placeholder="your@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="website" className="block text-sm font-semibold text-white">
                    Company Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
                    placeholder="https://yourcompany.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label htmlFor="industry" className="block text-sm font-semibold text-white">
                    Industry *
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    required
                    aria-required="true"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
                  >
                    <option value="" className="text-gray-900">Select industry</option>
                    <option value="technology" className="text-gray-900">Technology/Software</option>
                    <option value="healthcare" className="text-gray-900">Healthcare</option>
                    <option value="finance" className="text-gray-900">Finance/Banking</option>
                    <option value="retail" className="text-gray-900">Retail/E-commerce</option>
                    <option value="manufacturing" className="text-gray-900">Manufacturing</option>
                    <option value="education" className="text-gray-900">Education</option>
                    <option value="consulting" className="text-gray-900">Consulting</option>
                    <option value="real-estate" className="text-gray-900">Real Estate</option>
                    <option value="other" className="text-gray-900">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="teamSize" className="block text-sm font-semibold text-white">
                    Team Size
                  </label>
                  <select
                    id="teamSize"
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
                  >
                    <option value="" className="text-gray-900">Select size</option>
                    <option value="1-10" className="text-gray-900">1-10 employees</option>
                    <option value="11-50" className="text-gray-900">11-50 employees</option>
                    <option value="51-200" className="text-gray-900">51-200 employees</option>
                    <option value="201-500" className="text-gray-900">201-500 employees</option>
                    <option value="500+" className="text-gray-900">500+ employees</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="revenue" className="block text-sm font-semibold text-white">
                    Annual Revenue
                  </label>
                  <select
                    id="revenue"
                    name="revenue"
                    value={formData.revenue}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
                  >
                    <option value="" className="text-gray-900">Select range</option>
                    <option value="under-83l" className="text-gray-900">Under ₹83 Lakhs</option>
                    <option value="83l-4.1cr" className="text-gray-900">₹83 Lakhs - ₹4.1 Crores</option>
                    <option value="4.1cr-8.3cr" className="text-gray-900">₹4.1 Crores - ₹8.3 Crores</option>
                    <option value="8.3cr-41.5cr" className="text-gray-900">₹8.3 Crores - ₹41.5 Crores</option>
                    <option value="41.5cr-83cr" className="text-gray-900">₹41.5 Crores - ₹83 Crores</option>
                    <option value="83cr+" className="text-gray-900">₹83 Crores+</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="challenges" className="block text-sm font-semibold text-white">
                  What are your biggest business challenges? *
                </label>
                <textarea
                  id="challenges"
                  name="challenges"
                  rows={4}
                  required
                  aria-required="true"
                  value={formData.challenges}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 resize-none"
                  placeholder="Describe your main challenges, bottlenecks, or areas where you want to improve efficiency..."
                />
              </div>
              {/* Only ONE reCAPTCHA below */}
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                    <ReCAPTCHA
                      sitekey={RECAPTCHA_SITE_KEY}
                      onChange={handleCaptchaChange}
                      onExpired={handleCaptchaExpired}
                      onErrored={handleCaptchaError}
                      theme="dark"
                      ref={recaptchaRef}
                    />
                  </div>
                </div>
                {captchaError && (
                  <div className="text-red-400 text-sm text-center bg-red-500/10 border border-red-400/30 rounded-lg p-3">
                    {captchaError}
                  </div>
                )}
              </div>

              <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-2xl p-6">
                <h4 className="text-yellow-400 font-bold mb-2">🎯 What You'll Get:</h4>
                <div className="text-yellow-200 space-y-1 text-sm">
                  <div>✅ Custom AI opportunity assessment (₹2,90,000 value)</div>
                  <div>✅ ROI projections for automation (₹1,65,000 value)</div>
                  <div>✅ 90-day AI implementation roadmap (₹3,30,000 value)</div>
                  <div>✅ Risk assessment and mitigation strategies (₹1,25,000 value)</div>
                  <div>✅ Team readiness evaluation and training plan (₹2,10,000 value)</div>
                  <div>✅ Priority implementation plan with timelines (₹2,50,000 value)</div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting || !captchaToken}
                  className={`bg-yellow-400 text-black px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 ${
                    isSubmitting || !captchaToken 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-yellow-300'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Get My Free Audit'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowSuccess(false)}
                  className="text-white underline hover:text-yellow-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default Forms;

import React from 'react';
import { ArrowRight } from 'lucide-react';

const caseStudies = [
  {
    title: 'E-commerce Revenue Growth',
    client: 'Fashion Retailer',
    description: 'Increased online sales by 150% through strategic digital marketing and UX improvements.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    results: ['150% increase in sales', '200% ROI', '3x customer engagement']
  },
  {
    title: 'B2B Lead Generation',
    client: 'Tech Startup',
    description: 'Implemented AI-driven lead scoring system resulting in 3x qualified leads.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    results: ['300% more leads', '45% conversion rate', '2x sales pipeline']
  },
  {
    title: 'Mobile App Success',
    client: 'Healthcare Provider',
    description: 'Developed a patient care app with 100,000+ downloads and 4.8 star rating.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    results: ['100k+ downloads', '4.8 star rating', '90% user retention']
  }
];

export default function CaseStudies() {
  return (
    <section id="case-studies" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Case Studies</h2>
          <p className="text-xl text-gray-600">Real results for real businesses</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div 
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${study.image})` }}
              />
              <div className="p-6">
                <div className="text-sm text-indigo-600 mb-2">{study.client}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{study.title}</h3>
                <p className="text-gray-600 mb-4">{study.description}</p>
                <div className="space-y-2">
                  {study.results.map((result, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-600">
                      <ArrowRight className="w-4 h-4 text-indigo-600 mr-2" />
                      {result}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
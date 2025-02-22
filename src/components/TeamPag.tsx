import React from 'react';
import { CheckCircle, Clock, Users } from 'lucide-react';

const stats = [
  { number: '98%', label: 'Client Satisfaction' },
  { number: '250+', label: 'Projects Completed' },
  { number: '15+', label: 'Years Experience' }
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We combine creativity, technical expertise, and strategic thinking to deliver exceptional results.
            </p>
            
            <div className="space-y-6">
              {[
                {
                  icon: CheckCircle,
                  title: 'Proven Results',
                  description: 'Track record of delivering measurable business impact'
                },
                {
                  icon: Users,
                  title: 'Dedicated Team',
                  description: 'Expert professionals committed to your success'
                },
                {
                  icon: Clock,
                  title: 'Fast Delivery',
                  description: 'Efficient processes to meet your deadlines'
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <item.icon className="w-6 h-6 text-indigo-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`bg-gray-50 p-8 rounded-xl text-center ${index === stats.length - 1 ? "col-span-2" : ""}`}
              >
                <div className="text-4xl font-bold text-indigo-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
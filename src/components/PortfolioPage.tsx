import React from 'react';
import { FileText, Download, ExternalLink } from 'lucide-react';

export default function Presentation() {
  return (
    <section id="presentation" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Approach</h2>
            <p className="text-xl text-gray-600">
              Learn more about our methodology and success stories
            </p>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
            <div className="flex items-start gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">Agency Overview</h3>
                <p className="mb-6">
                  Discover how we help businesses transform their digital presence and achieve 
                  remarkable growth through our comprehensive presentation.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5" />
                    <span>Detailed case studies and success metrics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5" />
                    <span>Our proven methodology and approach</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5" />
                    <span>Industry insights and trends</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <a 
                  href="https://docs.google.com/presentation/d/example"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  View Presentation
                </a>
                <a 
                  href="https://docs.google.com/presentation/d/example/export/pdf"
                  className="flex items-center gap-2 bg-indigo-700 text-white px-6 py-3 rounded-lg hover:bg-indigo-800 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
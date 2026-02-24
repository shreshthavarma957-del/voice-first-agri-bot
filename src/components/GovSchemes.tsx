
import React from 'react';
import { Landmark, ExternalLink, ChevronRight } from 'lucide-react';

const schemes = [
  {
    title: "PM-KISAN",
    description: "Income support of ₹6,000 per year to all landholding farmers' families.",
    link: "https://pmkisan.gov.in/"
  },
  {
    title: "PM Fasal Bima Yojana",
    description: "Crop insurance scheme for farmers against natural calamities.",
    link: "https://pmfby.gov.in/"
  },
  {
    title: "Kisan Credit Card (KCC)",
    description: "Provides farmers with timely access to credit for their cultivation needs.",
    link: "https://www.myscheme.gov.in/schemes/kcc"
  }
];

export const GovSchemes: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-emerald-50 space-y-6">
      <h2 className="text-2xl font-bold text-emerald-900 flex items-center gap-2">
        <Landmark className="text-emerald-500" />
        Govt Schemes
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {schemes.map((scheme, i) => (
          <a
            key={i}
            href={scheme.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 bg-sky-50 rounded-2xl border border-sky-100 hover:bg-sky-100 transition-all group"
          >
            <div className="flex items-start justify-between h-full">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-sky-900 flex items-center gap-2">
                  {scheme.title}
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sky-700 text-sm leading-relaxed">
                  {scheme.description}
                </p>
              </div>
              <ChevronRight className="text-sky-400 mt-1 flex-shrink-0" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

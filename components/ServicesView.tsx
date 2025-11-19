import React from 'react';
import { ServiceInfo } from '../types';
import { Info, ShieldCheck } from 'lucide-react';

interface ServicesViewProps {
  services: ServiceInfo[];
}

const ServicesView: React.FC<ServicesViewProps> = ({ services }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {services.map((service, index) => (
        <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:border-indigo-200 transition-colors">
          <div className="flex items-center gap-3 mb-4 border-b border-slate-100 pb-3">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
              <Info size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">{service.category}</h3>
          </div>
          
          <p className="text-slate-600 mb-4 text-sm leading-relaxed">{service.details}</p>
          
          <div className="bg-slate-50 rounded-lg p-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-1">
              <ShieldCheck size={12} /> Öneriler
            </h4>
            <ul className="space-y-1">
              {service.recommendations.map((rec, rIdx) => (
                <li key={rIdx} className="text-sm text-slate-700 flex items-start gap-2">
                  <span className="text-indigo-500 mt-1">•</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesView;

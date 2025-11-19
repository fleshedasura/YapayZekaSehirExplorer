import React from 'react';
import { Itinerary } from '../types';
import { Clock, Map } from 'lucide-react';

interface ItineraryViewProps {
  itineraries: Itinerary[];
}

const ItineraryView: React.FC<ItineraryViewProps> = ({ itineraries }) => {
  const [selectedDay, setSelectedDay] = React.useState(0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 pb-4 border-b border-slate-200">
        {itineraries.map((itinerary, index) => (
          <button
            key={index}
            onClick={() => setSelectedDay(index)}
            className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
              selectedDay === index
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {itinerary.dayLabel}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Map className="text-indigo-500" />
          {itineraries[selectedDay].dayLabel} Planı
        </h3>
        
        <div className="relative pl-4 md:pl-8 border-l-2 border-indigo-100 space-y-8">
          {itineraries[selectedDay].items.map((item, idx) => (
            <div key={idx} className="relative">
              {/* Timeline Dot */}
              <div className="absolute -left-[25px] md:-left-[41px] top-1 w-6 h-6 rounded-full bg-white border-4 border-indigo-500 z-10 shadow-sm" />
              
              <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                <div className="min-w-[80px] shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-sm font-bold">
                    <Clock size={14} />
                    {item.time}
                  </span>
                </div>
                
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-slate-800">{item.activity}</h4>
                  <p className="text-slate-600 mt-1 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItineraryView;

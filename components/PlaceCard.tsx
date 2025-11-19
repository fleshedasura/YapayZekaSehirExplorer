import React from "react";
import { Place, Restaurant, Hotel } from "../types";
import { MapPin, DollarSign, Star, Clock, Tag } from "lucide-react";

interface PlaceCardProps {
  place: Place | Restaurant | Hotel;
  type: "generic" | "restaurant" | "hotel" | "museum";
  index: number;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place, type, index }) => {
  // Generate a consistent random image based on name length
  const seed = place.name.length + index;
  const imageUrl = `https://picsum.photos/seed/${seed}/400/250`;

  const renderPrice = (p: string | undefined) => {
    if (!p) return null;
    return (
      <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md text-xs font-bold">
        <DollarSign size={12} />
        {p}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden group">
        <img 
          src={imageUrl} 
          alt={place.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent opacity-60" />
        <h3 className="absolute bottom-3 left-3 text-white text-xl font-bold drop-shadow-md">{place.name}</h3>
      </div>

      <div className="p-5 flex-1 flex flex-col gap-3">
        
        <div className="flex flex-wrap gap-2 mb-1">
           {/* Type Specific Badges */}
           {(place as Restaurant).cuisine && (
             <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-orange-100 text-orange-700 flex items-center gap-1">
                <UtensilsIcon /> {(place as Restaurant).cuisine}
             </span>
           )}
           {(place as Hotel).category && (
             <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-blue-100 text-blue-700 flex items-center gap-1">
                <Star size={10} /> {(place as Hotel).category}
             </span>
           )}
           {(place as Place).collectionType && (
             <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-purple-100 text-purple-700">
                {(place as Place).collectionType}
             </span>
           )}
           {renderPrice(place.price || (place as Restaurant).priceRange)}
        </div>

        <p className="text-slate-600 text-sm leading-relaxed">{place.description}</p>

        {place.highlight && (
          <div className="bg-indigo-50 p-3 rounded-lg border-l-4 border-indigo-500">
            <p className="text-xs font-semibold text-indigo-800 uppercase mb-1">Önemli Özellik</p>
            <p className="text-slate-700 text-sm italic">"{place.highlight}"</p>
          </div>
        )}

        <div className="mt-auto space-y-2 pt-2">
            {place.tips && (
                <div className="flex items-start gap-2 text-sm text-slate-500">
                    <Tag size={16} className="mt-0.5 text-amber-500 shrink-0" />
                    <span><strong className="text-slate-700">İpucu:</strong> {place.tips}</span>
                </div>
            )}
            {place.visitingHours && (
                <div className="flex items-start gap-2 text-sm text-slate-500">
                    <Clock size={16} className="mt-0.5 text-blue-500 shrink-0" />
                    <span>{place.visitingHours}</span>
                </div>
            )}
             {(place as Hotel).locationTip && (
                <div className="flex items-start gap-2 text-sm text-slate-500">
                    <MapPin size={16} className="mt-0.5 text-red-500 shrink-0" />
                    <span>{(place as Hotel).locationTip}</span>
                </div>
            )}
        </div>
      </div>
      
      <a 
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-slate-50 border-t border-slate-100 py-3 text-center text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
      >
        <MapPin size={16} />
        Haritada Göster
      </a>
    </div>
  );
};

const UtensilsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
)

export default PlaceCard;

import React from "react";
import { ViewCategory } from "../types";
import { 
  MapPin, 
  CheckSquare, 
  Utensils, 
  Bed, 
  Landmark, 
  Info, 
  Navigation, 
  Calendar,
  ArrowLeft
} from "lucide-react";

interface SidebarProps {
  currentCategory: ViewCategory;
  onSelectCategory: (category: ViewCategory) => void;
  onBack: () => void;
  cityName: string;
}

const categories = [
  { id: ViewCategory.ATTRACTIONS, icon: MapPin, label: "Gezilecek Yerler" },
  { id: ViewCategory.MUST_DO, icon: CheckSquare, label: "Yapılacaklar" },
  { id: ViewCategory.FOOD, icon: Utensils, label: "Yeme & İçme" },
  { id: ViewCategory.HOTELS, icon: Bed, label: "Konaklama" },
  { id: ViewCategory.MUSEUMS, icon: Landmark, label: "Müzeler" },
  { id: ViewCategory.SERVICES, icon: Info, label: "Hizmetler" },
  { id: ViewCategory.NAVIGATION, icon: Navigation, label: "Navigasyon" },
  { id: ViewCategory.ITINERARY, icon: Calendar, label: "Gezi Planı" },
];

const Sidebar: React.FC<SidebarProps> = ({ currentCategory, onSelectCategory, onBack, cityName }) => {
  return (
    <div className="w-full md:w-64 bg-white/90 backdrop-blur-md border-r border-slate-200 flex flex-col h-screen sticky top-0 z-20 shadow-lg">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800 truncate pr-2" title={cityName}>{cityName}</h2>
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
          title="Yeni Arama"
        >
            <ArrowLeft size={20} />
        </button>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = currentCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                isActive 
                  ? "bg-indigo-600 text-white shadow-md transform scale-105" 
                  : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
            >
              <Icon size={18} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 text-center text-xs text-slate-400 border-t border-slate-100">
        AI City Explorer &copy; 2024
      </div>
    </div>
  );
};

export default Sidebar;

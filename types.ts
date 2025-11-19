export interface Place {
  name: string;
  description: string;
  highlight: string; // Önem/Özellik
  tips?: string; // Ziyaret ipuçları
  price?: string; // Fiyat bilgisi
  locationTip?: string; // Konum avantajı (oteller için)
  collectionType?: string; // Müzeler için
  visitingHours?: string; // Müzeler için
}

export interface Restaurant extends Place {
  cuisine: string;
  priceRange: 'Low' | 'Mid' | 'High';
}

export interface Hotel extends Place {
  category: 'Budget' | 'Mid-Range' | 'Luxury';
}

export interface ServiceInfo {
  category: string; // Ulaşım, Sağlık, Finans, Market
  details: string;
  recommendations: string[];
}

export interface NavigationInfo {
  routeDescription: string; // Popüler noktalar arası yönlendirme
  transportOptions: string; // Yürüme/Toplu taşıma vs.
  nearbySuggestions: string;
}

export interface ItineraryItem {
  time: string;
  activity: string;
  description: string;
}

export interface Itinerary {
  dayLabel: string; // 24 Saat, 48 Saat, vb.
  items: ItineraryItem[];
}

export interface CityGuideData {
  cityName: string;
  overview: string;
  attractions: Place[];
  mustDos: Place[];
  restaurants: Restaurant[];
  hotels: Hotel[];
  museums: Place[];
  services: ServiceInfo[];
  navigation: NavigationInfo;
  itineraries: Itinerary[];
}

export enum ViewCategory {
  ATTRACTIONS = 'Gezilecek Yerler',
  MUST_DO = 'Yapılacaklar',
  FOOD = 'Yeme & İçme',
  HOTELS = 'Konaklama',
  MUSEUMS = 'Müzeler',
  SERVICES = 'Hizmetler',
  NAVIGATION = 'Ulaşım & Rota',
  ITINERARY = 'Gezi Planı',
}
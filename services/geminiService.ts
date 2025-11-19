import { GoogleGenAI, Type, Schema } from "@google/genai";
import { CityGuideData } from "../types";

const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });

const placeSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    description: { type: Type.STRING },
    highlight: { type: Type.STRING },
    tips: { type: Type.STRING },
    price: { type: Type.STRING },
    visitingHours: { type: Type.STRING },
    collectionType: { type: Type.STRING },
    locationTip: { type: Type.STRING },
  },
  required: ["name", "description", "highlight"],
};

const restaurantSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    description: { type: Type.STRING },
    highlight: { type: Type.STRING },
    cuisine: { type: Type.STRING },
    priceRange: { type: Type.STRING, enum: ["Low", "Mid", "High"] },
  },
  required: ["name", "description", "cuisine", "priceRange"],
};

const hotelSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    description: { type: Type.STRING },
    highlight: { type: Type.STRING },
    locationTip: { type: Type.STRING },
    category: { type: Type.STRING, enum: ["Budget", "Mid-Range", "Luxury"] },
  },
  required: ["name", "description", "category", "locationTip"],
};

const serviceSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    category: { type: Type.STRING },
    details: { type: Type.STRING },
    recommendations: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
  },
  required: ["category", "details", "recommendations"],
};

const itineraryItemSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    time: { type: Type.STRING },
    activity: { type: Type.STRING },
    description: { type: Type.STRING },
  },
  required: ["time", "activity"],
};

const itinerarySchema: Schema = {
  type: Type.OBJECT,
  properties: {
    dayLabel: { type: Type.STRING },
    items: {
      type: Type.ARRAY,
      items: itineraryItemSchema,
    },
  },
  required: ["dayLabel", "items"],
};

const guideSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    cityName: { type: Type.STRING },
    overview: { type: Type.STRING },
    attractions: { type: Type.ARRAY, items: placeSchema },
    mustDos: { type: Type.ARRAY, items: placeSchema },
    restaurants: { type: Type.ARRAY, items: restaurantSchema },
    hotels: { type: Type.ARRAY, items: hotelSchema },
    museums: { type: Type.ARRAY, items: placeSchema },
    services: { type: Type.ARRAY, items: serviceSchema },
    navigation: {
      type: Type.OBJECT,
      properties: {
        routeDescription: { type: Type.STRING },
        transportOptions: { type: Type.STRING },
        nearbySuggestions: { type: Type.STRING },
      },
      required: ["routeDescription", "transportOptions"],
    },
    itineraries: { type: Type.ARRAY, items: itinerarySchema },
  },
  required: [
    "cityName",
    "overview",
    "attractions",
    "mustDos",
    "restaurants",
    "hotels",
    "museums",
    "services",
    "navigation",
    "itineraries",
  ],
};

export const fetchCityGuide = async (city: string): Promise<CityGuideData> => {
  const model = "gemini-2.5-flash";

  const prompt = `
    Sen uzman bir şehir rehberisin. "${city}" şehri veya bölgesi için kapsamlı bir Türkçe gezi rehberi oluştur.
    Aşağıdaki kategorilerde detaylı bilgi ver:
    1. Gezilecek Yerler (Tarihi, Parklar)
    2. Yapılacaklar Listesi (Deneyimler)
    3. Restoran & Kafe (Mutfak türü, fiyat)
    4. Oteller (Bütçe kategorileri)
    5. Müzeler
    6. Kamu Hizmetleri (Ulaşım, Sağlık, Banka)
    7. Konum ve Navigasyon İpuçları
    8. 24 Saat, 48 Saat ve 72 Saatlik Rota Planları.

    Cevabı sadece belirtilen JSON şemasına uygun olarak ver. Dil Türkçe olmalı.
  `;

  try {
    const response = await genAI.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: guideSchema,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No data received from Gemini.");
    }
    return JSON.parse(text) as CityGuideData;
  } catch (error) {
    console.error("Error fetching city guide:", error);
    throw error;
  }
};

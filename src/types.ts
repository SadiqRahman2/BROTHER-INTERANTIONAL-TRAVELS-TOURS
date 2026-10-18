export interface UmrahPackage {
  id: string;
  title: string;
  badge?: string;
  durationNights: number;
  makkahNights: number;
  madinahNights: number;
  makkahHotel: string;
  makkahDistance: string; // e.g. "150m from Clock Tower / Haram"
  madinahHotel: string;
  madinahDistance: string; // e.g. "200m from Gate 25"
  airline: string;
  transportType: string;
  quadPriceSAR: number;
  triplePriceSAR: number;
  doublePriceSAR: number;
  singlePriceSAR: number;
  inclusions: string[];
  featured?: boolean;
  tagline: string;
}

export interface VisaService {
  id: string;
  country: string;
  type: string;
  processingTime: string;
  validity: string;
  priceSAR: number;
  requirements: string[];
  icon: string;
}

export interface TourPackage {
  id: string;
  destination: string;
  title: string;
  duration: string;
  priceSAR: number;
  highlights: string[];
  imageType: string;
}

export interface CustomerInquiry {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  city: string;
  serviceType: 'Umrah' | 'Flights' | 'Visa' | 'Holiday Tour' | 'Custom Package';
  packageId?: string;
  travelDate?: string;
  travelersCount: number;
  roomPreference?: string;
  notes?: string;
  status: 'New' | 'Contacted' | 'Quoted' | 'Confirmed';
  createdAt: string;
}

export interface AgencySettings {
  agencyName: string;
  tagline: string;
  establishedYear: number;
  primaryPhone: string;
  whatsappNumber: string; // International format without +, e.g. "966500000000" or "923000000000"
  whatsappDisplay: string;
  email: string;
  address: string;
  operatingHours: string;
  licenseNumber: string;
}

export interface Currency {
  code: string;
  symbol: string;
  rateFromSAR: number; // 1 SAR = X target currency
  name: string;
}

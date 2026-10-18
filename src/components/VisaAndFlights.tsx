import React, { useState } from 'react';
import { VisaService, Currency, AgencySettings } from '../types';
import { 
  Plane, 
  FileCheck, 
  Clock, 
  CheckCircle2, 
  MessageCircle, 
  Send, 
  Globe, 
  ArrowRight,
  ShieldCheck,
  Calendar
} from 'lucide-react';

interface VisaAndFlightsProps {
  visas: VisaService[];
  currency: Currency;
  agencySettings: AgencySettings;
  onOpenInquiryModal: (service: string) => void;
}

export const VisaAndFlights: React.FC<VisaAndFlightsProps> = ({
  visas,
  currency,
  agencySettings,
  onOpenInquiryModal,
}) => {
  const [flightType, setFlightType] = useState<'roundtrip' | 'oneway'>('roundtrip');
  const [fromCity, setFromCity] = useState('Islamabad (ISB)');
  const [toCity, setToCity] = useState('Jeddah (JED)');
  const [travelDate, setTravelDate] = useState('2026-11-20');
  const [airlinePref, setAirlinePref] = useState('Any Airline (Best Rate)');

  const formatPrice = (priceSAR: number) => {
    const converted = Math.round(priceSAR * currency.rateFromSAR);
    return `${currency.symbol} ${converted.toLocaleString()}`;
  };

  const getFlightWhatsApp = () => {
    const text = `Salam Brothers International Travel & Tours! I would like to request an airline flight quote:
Route: ${fromCity} to ${toCity} (${flightType.toUpperCase()})
Date: ${travelDate}
Preferred Airline: ${airlinePref}
Please check best available promotional fares.`;
    return `https://wa.me/${agencySettings.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const getVisaWhatsApp = (visa: VisaService) => {
    const text = `Salam Brothers International Travel & Tours! I would like to apply for the "${visa.country} - ${visa.type}". Please guide me on documents required and processing time.`;
    return `https://wa.me/${agencySettings.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="visas-flights" className="py-16 sm:py-24 bg-[#F8FAFC] text-[#18181B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4C0A14] text-[#FFC709] text-xs font-bold uppercase tracking-wider mb-3">
            <Plane className="w-3.5 h-3.5" />
            <span>International Flight &amp; Visa Desk</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#4C0A14] tracking-tight font-serif-luxury">
            Global Airline Tickets &amp; Visa Solutions
          </h2>

          <p className="mt-3 text-base text-gray-700 leading-relaxed">
            As a full-service international travel agency, Brothers International Travel &amp; Tours issues worldwide airline tickets on all major carriers and handles hassle-free visa processing.
          </p>
        </div>

        {/* Flight Booking Engine Box */}
        <div className="mb-16 bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
          <div className="bg-[#4C0A14] text-white p-6 sm:p-7 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#FFC709] uppercase tracking-wider block">
                Instant Fare Inquiry
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white font-serif-luxury mt-0.5">
                Worldwide Flight Reservations
              </h3>
            </div>

            <div className="flex rounded-lg bg-[#35050D] p-1 border border-amber-500/20">
              <button
                type="button"
                onClick={() => setFlightType('roundtrip')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  flightType === 'roundtrip'
                    ? 'bg-[#FFC709] text-[#32040B]'
                    : 'text-amber-200 hover:text-white'
                }`}
              >
                Round Trip
              </button>
              <button
                type="button"
                onClick={() => setFlightType('oneway')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  flightType === 'oneway'
                    ? 'bg-[#FFC709] text-[#32040B]'
                    : 'text-amber-200 hover:text-white'
                }`}
              >
                One Way
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Departure City / Airport
                </label>
                <input
                  type="text"
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold focus:border-[#4C0A14] focus:ring-1 focus:ring-[#4C0A14] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Arrival City / Airport
                </label>
                <input
                  type="text"
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold focus:border-[#4C0A14] focus:ring-1 focus:ring-[#4C0A14] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Departure Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold focus:border-[#4C0A14] focus:ring-1 focus:ring-[#4C0A14] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Preferred Carrier
                </label>
                <select
                  value={airlinePref}
                  onChange={(e) => setAirlinePref(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold focus:border-[#4C0A14] focus:ring-1 focus:ring-[#4C0A14] focus:outline-none"
                >
                  <option value="Any Airline (Best Rate)">Any Airline (Lowest Fare Guarantee)</option>
                  <option value="Saudia (Direct Flights)">Saudia (Saudi Arabian Airlines)</option>
                  <option value="Emirates Airline">Emirates Airline</option>
                  <option value="Qatar Airways">Qatar Airways</option>
                  <option value="FlyDubai / Air Arabia">FlyDubai / Air Arabia</option>
                  <option value="PIA (Pakistan International)">Pakistan International Airlines</option>
                  <option value="Gulf Air">Gulf Air</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Special Group &amp; Umrah Bulk Fares Available With Generous Baggage Allowance</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={getFlightWhatsApp()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20BA59] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Check Fare via WhatsApp</span>
                </a>

                <button
                  onClick={() => onOpenInquiryModal('Flights')}
                  className="px-5 py-3 rounded-xl bg-[#4C0A14] hover:bg-[#5C0E1C] text-[#FFC709] font-extrabold text-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Agency Callback</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* International Visas Grid */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-black text-[#4C0A14] font-serif-luxury">
                Fast-Track Visa Assistance Services
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Official documentation guidance, appointment scheduling, and electronic visa filing.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visas.map((visa) => (
              <div
                key={visa.id}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black uppercase tracking-wider text-[#4C0A14] bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-md">
                      {visa.country}
                    </span>
                    <Globe className="w-4 h-4 text-gray-400" />
                  </div>

                  <h4 className="text-base font-extrabold text-gray-900 leading-snug">
                    {visa.type}
                  </h4>

                  <div className="mt-4 space-y-2 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#4C0A14]" />
                      <span><strong>Processing:</strong> {visa.processingTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-3.5 h-3.5 text-[#4C0A14]" />
                      <span><strong>Validity:</strong> {visa.validity}</span>
                    </div>
                  </div>

                  {/* Requirements checklist */}
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-2">
                      Key Requirements:
                    </span>
                    <ul className="space-y-1.5">
                      {visa.requirements.map((req, i) => (
                        <li key={i} className="text-[11px] text-gray-600 flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FFC709] mt-1 shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-xs text-gray-500">Service Fee:</span>
                    <span className="text-lg font-black text-[#4C0A14]">
                      {formatPrice(visa.priceSAR)}
                    </span>
                  </div>

                  <a
                    href={getVisaWhatsApp(visa)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-[#4C0A14] hover:bg-[#5C0E1C] text-[#FFC709] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-[#FFC709]" />
                    <span>Apply via WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

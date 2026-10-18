import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { AgencySettings } from '../types';
import { 
  Sparkles, 
  MessageCircle, 
  ShieldCheck, 
  Award, 
  MapPin, 
  Calendar, 
  Users, 
  ChevronRight,
  Plane,
  HeartHandshake
} from 'lucide-react';

interface HeroProps {
  agencySettings: AgencySettings;
  onSelectTab: (tab: string) => void;
  onOpenInquiryModal: (service?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  agencySettings,
  onSelectTab,
  onOpenInquiryModal,
}) => {
  const [quickService, setQuickService] = useState<'umrah' | 'flights' | 'visas'>('umrah');
  const [quickTravelers, setQuickTravelers] = useState(2);
  const [quickMonth, setQuickMonth] = useState('Next Month');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickService === 'umrah') {
      onSelectTab('builder');
    } else {
      onOpenInquiryModal(quickService === 'flights' ? 'Flights' : 'Visa');
    }
  };

  const whatsappDirectMsg = `Salam Brothers International Travel & Tours! I would like to inquire about your ${quickService.toUpperCase()} packages for ${quickTravelers} traveler(s) planned for ${quickMonth}.`;
  const whatsappUrl = `https://wa.me/${agencySettings.whatsappNumber}?text=${encodeURIComponent(whatsappDirectMsg)}`;

  return (
    <section id="home" className="relative overflow-hidden bg-[#4C0A14] text-white">
      {/* Decorative luxury architectural patterns and ambient glows */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #FFC709 1px, transparent 1px), radial-gradient(circle at 75% 75%, #D4AF37 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#731224] rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-[#FFC709] rounded-full blur-[120px] opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-16 sm:pb-24">
        
        {/* Top Centered Brand Crest & Official Seal */}
        <div className="flex flex-col items-center justify-center text-center mb-8 sm:mb-12">
          
          {/* Official Emblem Badge with clickable link */}
          <div className="mb-6 transform transition-all hover:scale-105 duration-300">
            <BrandLogo variant="badge" />
          </div>

          {/* Verification Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#36050D] border border-amber-400/40 text-amber-200 text-xs sm:text-sm font-semibold mb-4 shadow-inner">
            <ShieldCheck className="w-4 h-4 text-[#FFC709]" />
            <span>Trusted Independent Travel &amp; Umrah Specialists — Established 2024</span>
          </div>

          {/* Primary Majestic Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl text-white leading-tight font-serif-luxury">
            Sacred Pilgrimages &amp; Global Journeys Crafted with{' '}
            <span className="text-[#FFC709] drop-shadow-[0_2px_12px_rgba(255,199,9,0.4)]">
              Honor &amp; Precision
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-amber-100/90 max-w-2xl font-normal leading-relaxed">
            From premier 5-star Haram courtyard views in Makkah &amp; Madinah to seamless global visas and airline ticketing, <strong className="text-white font-semibold">Brothers International Travel &amp; Tours</strong> provides devoted care for every step of your journey.
          </p>

          {/* Key Quick Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onSelectTab('umrah')}
              className="px-6 py-3.5 rounded-xl bg-[#FFC709] hover:bg-[#F3BC00] text-[#32040B] font-extrabold text-base shadow-[0_4px_20px_rgba(255,199,9,0.35)] transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Umrah Packages</span>
              <ChevronRight className="w-5 h-5 text-[#32040B]" />
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20BA59] text-white font-bold text-base shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Instant WhatsApp Inquiry</span>
            </a>

            <button
              onClick={() => onSelectTab('builder')}
              className="px-5 py-3.5 rounded-xl bg-[#35050D] hover:bg-[#400711] text-amber-200 border border-amber-400/50 font-semibold text-base transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#FFC709]" />
              <span>Custom Cost Calculator</span>
            </button>
          </div>
        </div>

        {/* Quick Booking & Service Finder Card */}
        <div className="max-w-4xl mx-auto bg-[#36050E]/90 backdrop-blur-md rounded-2xl border border-amber-400/30 p-5 sm:p-7 shadow-2xl">
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-4 mb-5 flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFC709] animate-pulse" />
              <h2 className="text-sm sm:text-base font-bold text-white tracking-wide uppercase">
                Fast Inquiry &amp; Direct Quotation
              </h2>
            </div>
            
            {/* Service selector tabs */}
            <div className="flex rounded-lg bg-[#270308] p-1 border border-amber-500/20">
              <button
                type="button"
                onClick={() => setQuickService('umrah')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${
                  quickService === 'umrah'
                    ? 'bg-[#FFC709] text-[#32040B]'
                    : 'text-amber-200 hover:text-white'
                }`}
              >
                Umrah Packages
              </button>
              <button
                type="button"
                onClick={() => setQuickService('flights')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${
                  quickService === 'flights'
                    ? 'bg-[#FFC709] text-[#32040B]'
                    : 'text-amber-200 hover:text-white'
                }`}
              >
                Air Tickets
              </button>
              <button
                type="button"
                onClick={() => setQuickService('visas')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${
                  quickService === 'visas'
                    ? 'bg-[#FFC709] text-[#32040B]'
                    : 'text-amber-200 hover:text-white'
                }`}
              >
                Visas
              </button>
            </div>
          </div>

          <form onSubmit={handleQuickSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-amber-200/90 mb-1.5">
                Target Travel Window
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-[#FFC709] absolute left-3 top-3.5" />
                <select
                  value={quickMonth}
                  onChange={(e) => setQuickMonth(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-[#4A0A14] border border-amber-500/30 rounded-xl text-white text-sm focus:outline-none focus:border-[#FFC709]"
                >
                  <option value="November 2026">November 2026</option>
                  <option value="December 2026 (Winter Break)">December 2026 (Winter Holidays)</option>
                  <option value="January 2027">January 2027</option>
                  <option value="Rajab / Sha'ban 2027">Rajab / Sha'ban 2027</option>
                  <option value="Ramadan 2027 Special">Ramadan 2027 Special</option>
                  <option value="Flexible / Immediate">Flexible / Immediate</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-amber-200/90 mb-1.5">
                Number of Travelers
              </label>
              <div className="relative">
                <Users className="w-4 h-4 text-[#FFC709] absolute left-3 top-3.5" />
                <select
                  value={quickTravelers}
                  onChange={(e) => setQuickTravelers(Number(e.target.value))}
                  className="w-full pl-9 pr-3 py-2.5 bg-[#4A0A14] border border-amber-500/30 rounded-xl text-white text-sm focus:outline-none focus:border-[#FFC709]"
                >
                  <option value={1}>1 Solo Pilgrim</option>
                  <option value={2}>2 Persons (Couple / Pair)</option>
                  <option value={3}>3 Persons (Triple Room)</option>
                  <option value={4}>4 Persons (Family Quad)</option>
                  <option value={6}>6+ Group / Large Family</option>
                  <option value={10}>10+ Organization / Community</option>
                </select>
              </div>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#FFC709] hover:bg-[#F3BC00] text-[#32040B] font-extrabold rounded-xl text-sm transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Calculate &amp; Get Quote</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Quick Pillars */}
          <div className="mt-5 pt-4 border-t border-amber-500/20 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-amber-100/80">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#FFC709] shrink-0" />
              <span>Direct Hotel Contracts</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#FFC709] shrink-0" />
              <span>0m to 300m Haram Proximity</span>
            </div>
            <div className="flex items-center gap-2">
              <Plane className="w-4 h-4 text-[#FFC709] shrink-0" />
              <span>Confirmed Airline Seats</span>
            </div>
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-[#FFC709] shrink-0" />
              <span>Full On-Ground Concierge</span>
            </div>
          </div>
        </div>

      </div>

      {/* Golden divider accent bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-[#FFC709] to-transparent opacity-80" />
    </section>
  );
};

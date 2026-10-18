import React from 'react';
import { BrandLogo } from './BrandLogo';
import { AgencySettings } from '../types';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  ShieldCheck, 
  ArrowUp,
  Globe
} from 'lucide-react';

interface FooterProps {
  agencySettings: AgencySettings;
  onSelectTab: (tab: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  agencySettings,
  onSelectTab,
  onOpenAdmin,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/${agencySettings.whatsappNumber}?text=${encodeURIComponent(
    'Salam! I am reaching out to Brothers International Travel & Tours.'
  )}`;

  return (
    <footer className="bg-[#32040B] text-white border-t border-amber-500/20 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-amber-500/20">
          
          {/* Brand Column (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Clickable Brand Logo with burgundy background & yellow text */}
            <BrandLogo variant="navbar" />

            <p className="text-xs sm:text-sm text-amber-100/80 max-w-md leading-relaxed">
              Brothers International Travel &amp; Tours is dedicated to providing high-quality, transparent, and spiritually enriching Umrah pilgrimages, worldwide flights, visa facilitation, and bespoke holiday packages since 2024.
            </p>

            <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#FFC709]" />
              <span>Independent Licensed Agency · Since 2024</span>
            </div>

            {/* Quick contact badge */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-[#25D366] hover:bg-[#20BA59] text-white text-xs font-bold inline-flex items-center gap-2 shadow"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp Instant Line</span>
              </a>

              <a
                href={`tel:${agencySettings.primaryPhone}`}
                className="px-3.5 py-2 rounded-lg bg-[#4C0A14] hover:bg-[#5C0E1C] text-[#FFC709] border border-amber-500/30 text-xs font-bold inline-flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{agencySettings.primaryPhone}</span>
              </a>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-black uppercase tracking-wider text-[#FFC709]">
              Navigation &amp; Portfolios
            </h4>
            <ul className="space-y-2 text-xs text-amber-100/80">
              <li>
                <button
                  onClick={() => onSelectTab('umrah')}
                  className="hover:text-[#FFC709] transition-colors cursor-pointer"
                >
                  VIP &amp; Economy Umrah Packages
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('builder')}
                  className="hover:text-[#FFC709] transition-colors cursor-pointer"
                >
                  Custom Umrah Cost Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('visas-flights')}
                  className="hover:text-[#FFC709] transition-colors cursor-pointer"
                >
                  Saudi Tourist &amp; Umrah Visas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('visas-flights')}
                  className="hover:text-[#FFC709] transition-colors cursor-pointer"
                >
                  Worldwide Airline Tickets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('tours')}
                  className="hover:text-[#FFC709] transition-colors cursor-pointer"
                >
                  Dubai, Turkey &amp; Baku Tours
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('guide')}
                  className="hover:text-[#FFC709] transition-colors cursor-pointer"
                >
                  Pilgrim’s Checklist &amp; FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Office Locations & Contact (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-black uppercase tracking-wider text-[#FFC709]">
              Branch Offices &amp; Hours
            </h4>
            <div className="space-y-2.5 text-xs text-amber-100/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FFC709] mt-0.5 shrink-0" />
                <span>King Abdulaziz Road, Al Aziziyah, Makkah, Saudi Arabia</span>
              </div>
              <div className="flex items-start gap-2">
                <Globe className="w-4 h-4 text-[#FFC709] mt-0.5 shrink-0" />
                <span>International Partner Desk: Blue Area, Islamabad</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#FFC709] mt-0.5 shrink-0" />
                <a href={`mailto:${agencySettings.email}`} className="hover:text-[#FFC709]">
                  {agencySettings.email}
                </a>
              </div>
              <div className="pt-2 text-[11px] text-amber-300/80">
                Operating Hours: Sat – Thu (09:00 AM – 10:00 PM)
              </div>
            </div>
          </div>

        </div>

        {/* Regulatory Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-amber-200/70">
          <p className="max-w-2xl leading-relaxed text-center md:text-left">
            <strong>Disclaimer:</strong> Brothers International Travel &amp; Tours is an independent licensed travel and tour agency established in 2024. Brothers International Travel &amp; Tours is not an official government entity and is not directly affiliated with the Saudi Ministry of Hajj &amp; Umrah, any airline, or hotel chain unless individually contracted for travel arrangements.
          </p>

          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={onOpenAdmin}
              className="text-amber-300/60 hover:text-[#FFC709] underline transition-colors"
            >
              Agency Dashboard
            </button>

            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg bg-[#4C0A14] border border-amber-500/30 text-[#FFC709] hover:bg-[#5C0E1C] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-amber-500/10 text-center text-[10px] text-amber-300/50">
          © {new Date().getFullYear()} Brothers International Travel &amp; Tours (Since 2024). All rights reserved.
        </div>

      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { Currency, AgencySettings } from '../types';
import { 
  Phone, 
  MessageCircle, 
  Menu, 
  X, 
  ShieldCheck, 
  UserCheck, 
  Sparkles, 
  Globe 
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: Currency) => void;
  currencies: Currency[];
  agencySettings: AgencySettings;
  onOpenAdmin: () => void;
  onOpenInquiryModal: (service?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedCurrency,
  setSelectedCurrency,
  currencies,
  agencySettings,
  onOpenAdmin,
  onOpenInquiryModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'umrah', label: 'Umrah Packages' },
    { id: 'builder', label: 'Custom Umrah Calculator' },
    { id: 'visas-flights', label: 'Visas & Flights' },
    { id: 'tours', label: 'Worldwide Tours' },
    { id: 'guide', label: 'Pilgrim Guide' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappUrl = `https://wa.me/${agencySettings.whatsappNumber}?text=${encodeURIComponent(
    'Salam! I am inquiring with Brothers International Travel & Tours about your Umrah and travel packages.'
  )}`;

  return (
    <header className="sticky top-0 z-50 shadow-xl">
      {/* Top Brand Bar / Official Micro Banner */}
      <div className="bg-[#38060E] border-b border-amber-500/20 text-xs text-amber-100/90 py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[#FFC709] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FFC709]" />
              Official Portal
            </span>
            <span className="hidden sm:inline text-amber-300/40">|</span>
            <span className="hidden sm:inline">Brothers International Travel &amp; Tours (Since 2024)</span>
            <span className="hidden md:inline text-amber-300/40">|</span>
            <span className="hidden md:inline text-amber-200/80">Lic. #{agencySettings.licenseNumber}</span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            {/* Currency Selector */}
            <div className="flex items-center gap-1.5 bg-[#4A0A14] px-2 py-0.5 rounded border border-amber-500/30">
              <Globe className="w-3 h-3 text-[#FFC709]" />
              <select
                value={selectedCurrency.code}
                onChange={(e) => {
                  const curr = currencies.find((c) => c.code === e.target.value);
                  if (curr) setSelectedCurrency(curr);
                }}
                className="bg-transparent text-[#FFC709] font-medium text-xs focus:outline-none cursor-pointer"
                aria-label="Select Currency"
              >
                {currencies.map((curr) => (
                  <option key={curr.code} value={curr.code} className="bg-[#38060E] text-white">
                    {curr.code} ({curr.symbol})
                  </option>
                ))}
              </select>
            </div>

            {/* Helpline quick link */}
            <a
              href={`tel:${agencySettings.primaryPhone}`}
              className="hidden lg:flex items-center gap-1 hover:text-[#FFC709] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#FFC709]" />
              <span>{agencySettings.primaryPhone}</span>
            </a>

            {/* Admin staff toggle */}
            <button
              onClick={onOpenAdmin}
              className="text-[11px] text-amber-200/80 hover:text-[#FFC709] flex items-center gap-1 transition-colors px-1.5 py-0.5 rounded hover:bg-black/20"
              title="Agency Staff Portal"
            >
              <UserCheck className="w-3 h-3" />
              <span>Agency Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand Navigation Bar */}
      <nav className="bg-[#4C0A14] border-b border-amber-400/30 px-4 sm:px-6 py-2.5 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Official Clickable Logo */}
          <BrandLogo
            variant="navbar"
            onClick={() => handleNavClick('home')}
          />

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 text-sm font-semibold tracking-wide rounded-lg transition-all duration-150 ${
                  activeTab === item.id
                    ? 'text-[#FFC709] bg-[#38060E] shadow-inner'
                    : 'text-white/90 hover:text-[#FFC709] hover:bg-[#5C0E1C]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Call-to-action & WhatsApp */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA59] text-white px-3.5 py-2 rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span className="hidden xl:inline">WhatsApp Chat</span>
              <span className="xl:hidden">WhatsApp</span>
            </a>

            <button
              onClick={() => onOpenInquiryModal()}
              className="flex items-center gap-1.5 bg-[#FFC709] hover:bg-[#F3BC00] text-[#32040B] font-extrabold px-3.5 py-2 rounded-lg text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-[#32040B]" />
              <span>Book / Inquire</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white p-2 rounded-lg"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-amber-200 hover:text-white rounded-lg bg-[#3A0710] focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-amber-500/20 pb-4 space-y-2">
            {/* Prominent mobile logo emblem banner */}
            <div className="bg-[#36050D] p-3 rounded-xl border border-amber-500/30 flex items-center justify-between mb-3">
              <BrandLogo variant="compact" />
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-amber-200/80 block">Since 2024</span>
                <span className="text-xs font-semibold text-[#FFC709]">{agencySettings.whatsappDisplay}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    activeTab === item.id
                      ? 'bg-[#FFC709] text-[#32040B] font-bold'
                      : 'text-white hover:bg-[#5C0E1C]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiryModal();
                }}
                className="w-full py-2.5 bg-[#FFC709] text-[#32040B] rounded-lg text-center font-bold text-sm shadow"
              >
                Request Custom Quotation
              </button>

              <div className="flex items-center justify-between pt-2 px-1 text-xs text-amber-200/70">
                <span>Selected Currency: {selectedCurrency.code}</span>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="text-amber-300 underline font-medium"
                >
                  Staff Portal
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

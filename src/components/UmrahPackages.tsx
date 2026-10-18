import React, { useState } from 'react';
import { UmrahPackage, Currency, AgencySettings } from '../types';
import { 
  Building2, 
  MapPin, 
  Plane, 
  Bus, 
  CheckCircle2, 
  MessageCircle, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Users,
  ChevronRight
} from 'lucide-react';

interface UmrahPackagesProps {
  packages: UmrahPackage[];
  currency: Currency;
  agencySettings: AgencySettings;
  onSelectPackageForInquiry: (pkg: UmrahPackage) => void;
}

export const UmrahPackages: React.FC<UmrahPackagesProps> = ({
  packages,
  currency,
  agencySettings,
  onSelectPackageForInquiry,
}) => {
  const [roomType, setRoomType] = useState<'quad' | 'triple' | 'double' | 'single'>('quad');

  const formatPrice = (priceSAR: number) => {
    const converted = Math.round(priceSAR * currency.rateFromSAR);
    return `${currency.symbol} ${converted.toLocaleString()}`;
  };

  const getPriceForRoom = (pkg: UmrahPackage) => {
    switch (roomType) {
      case 'quad':
        return pkg.quadPriceSAR;
      case 'triple':
        return pkg.triplePriceSAR;
      case 'double':
        return pkg.doublePriceSAR;
      case 'single':
        return pkg.singlePriceSAR;
      default:
        return pkg.quadPriceSAR;
    }
  };

  const getWhatsAppLink = (pkg: UmrahPackage) => {
    const price = formatPrice(getPriceForRoom(pkg));
    const text = `Salam Brothers International Travel & Tours! I am interested in booking the "${pkg.title}" (${roomType.toUpperCase()} sharing at ${price} per person). Please share availability and payment details.`;
    return `https://wa.me/${agencySettings.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="umrah" className="py-16 sm:py-24 bg-[#FDFBF7] text-[#18181B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4C0A14] text-[#FFC709] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Brothers International Umrah Collections</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#4C0A14] tracking-tight font-serif-luxury">
            Curated Umrah Packages
          </h2>

          <p className="mt-3 text-base text-gray-700 leading-relaxed">
            Every package is backed by confirmed hotel vouchers, dedicated visa processing, and 24/7 on-ground assistance from the Brothers International Travel &amp; Tours family.
          </p>

          {/* Room occupancy switcher */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-xl bg-gray-200/80 border border-gray-300 shadow-inner">
            <span className="text-xs font-bold text-gray-600 px-3 flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              Room Sharing:
            </span>
            {(['quad', 'triple', 'double', 'single'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setRoomType(type)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  roomType === type
                    ? 'bg-[#4C0A14] text-[#FFC709] shadow-md'
                    : 'text-gray-700 hover:text-[#4C0A14]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {packages.map((pkg) => {
            const currentPriceSAR = getPriceForRoom(pkg);
            const isFeatured = pkg.featured;

            return (
              <div
                key={pkg.id}
                className={`relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl border ${
                  isFeatured
                    ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]/50 bg-white'
                    : 'border-gray-200 bg-white shadow-sm'
                }`}
              >
                {/* Header ribbon */}
                <div
                  className={`p-6 sm:p-7 ${
                    isFeatured
                      ? 'bg-gradient-to-r from-[#4C0A14] via-[#590D1A] to-[#3B060F] text-white'
                      : 'bg-[#4C0A14] text-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    {pkg.badge && (
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-extrabold uppercase tracking-wider bg-[#FFC709] text-[#32040B] shadow">
                        {pkg.badge}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-xs text-amber-200 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#FFC709]" />
                      {pkg.durationNights} Nights Total ({pkg.makkahNights} Makkah / {pkg.madinahNights} Madinah)
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FFC709] font-serif-luxury tracking-tight mt-1">
                    {pkg.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-amber-100/90 mt-1.5">
                    {pkg.tagline}
                  </p>

                  {/* Price Banner */}
                  <div className="mt-5 pt-4 border-t border-amber-400/20 flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-amber-200/80 block">
                        {roomType.toUpperCase()} Sharing (Per Person)
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl sm:text-4xl font-black text-white">
                          {formatPrice(currentPriceSAR)}
                        </span>
                        {currency.code !== 'SAR' && (
                          <span className="text-xs text-amber-200/70">
                            (SAR {currentPriceSAR.toLocaleString()})
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="inline-block px-2 py-1 rounded bg-[#2D040A] text-[#FFC709] text-[11px] font-bold border border-amber-500/30">
                        Visa &amp; Medical Included
                      </span>
                    </div>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                  
                  {/* Hotel & Transportation Specification */}
                  <div className="space-y-3.5 bg-amber-50/60 p-4 rounded-xl border border-amber-200/60 text-xs sm:text-sm text-[#18181B]">
                    <div className="flex items-start gap-2.5">
                      <Building2 className="w-4 h-4 text-[#4C0A14] mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-[#4C0A14] block font-bold">Makkah Hotel ({pkg.makkahNights} Nights):</strong>
                        <span className="font-semibold text-gray-900">{pkg.makkahHotel}</span>
                        <div className="flex items-center gap-1 text-gray-600 text-xs mt-0.5">
                          <MapPin className="w-3 h-3 text-[#D4AF37]" />
                          <span>{pkg.makkahDistance}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Building2 className="w-4 h-4 text-[#4C0A14] mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-[#4C0A14] block font-bold">Madinah Hotel ({pkg.madinahNights} Nights):</strong>
                        <span className="font-semibold text-gray-900">{pkg.madinahHotel}</span>
                        <div className="flex items-center gap-1 text-gray-600 text-xs mt-0.5">
                          <MapPin className="w-3 h-3 text-[#D4AF37]" />
                          <span>{pkg.madinahDistance}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-amber-200/60 text-xs">
                      <div className="flex items-center gap-1.5 text-gray-700">
                        <Plane className="w-3.5 h-3.5 text-[#4C0A14]" />
                        <span><strong>Flights:</strong> {pkg.airline}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-700">
                        <Bus className="w-3.5 h-3.5 text-[#4C0A14]" />
                        <span><strong>Transport:</strong> {pkg.transportType}</span>
                      </div>
                    </div>
                  </div>

                  {/* Inclusions List */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2.5">
                      Package Inclusions &amp; Services:
                    </h4>
                    <ul className="grid grid-cols-1 gap-2">
                      {pkg.inclusions.map((inc, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                    <a
                      href={getWhatsAppLink(pkg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BA59] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow transition-all transform hover:-translate-y-0.5"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>WhatsApp Inquiry</span>
                    </a>

                    <button
                      onClick={() => onSelectPackageForInquiry(pkg)}
                      className="py-3 px-5 rounded-xl bg-[#4C0A14] hover:bg-[#5C0E1C] text-[#FFC709] font-extrabold text-sm flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer"
                    >
                      <span>Custom Quote</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Quality Assurance Note */}
        <div className="mt-12 p-6 rounded-2xl bg-amber-50 border border-amber-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#4C0A14] flex items-center justify-center text-[#FFC709] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#4C0A14]">
                Brothers International Transparent Booking Guarantee
              </h4>
              <p className="text-xs sm:text-sm text-gray-700">
                All hotel reservations are verified with direct voucher codes before travel. No hidden fees or unexpected changes upon arrival.
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${agencySettings.whatsappNumber}?text=${encodeURIComponent('Salam, I need a customized Umrah group quote for my family.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#4C0A14] text-[#FFC709] hover:bg-[#36050D] text-xs font-bold rounded-xl whitespace-nowrap transition-colors"
          >
            Custom Family/Group Quotes
          </a>
        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Currency, AgencySettings } from '../types';
import { 
  Calculator, 
  MessageCircle, 
  Check, 
  Send, 
  Sparkles, 
  Train, 
  Building, 
  Users, 
  Calendar,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface PackageCalculatorProps {
  currency: Currency;
  agencySettings: AgencySettings;
  onSubmitInquiry: (inquiryData: any) => void;
}

export const PackageCalculator: React.FC<PackageCalculatorProps> = ({
  currency,
  agencySettings,
  onSubmitInquiry,
}) => {
  const [duration, setDuration] = useState<number>(14);
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [roomSharing, setRoomSharing] = useState<'quad' | 'triple' | 'double' | 'single'>('double');
  const [makkahTier, setMakkahTier] = useState<'5star' | '4star' | 'economy'>('4star');
  const [madinahTier, setMadinahTier] = useState<'5star' | '4star' | 'economy'>('4star');
  const [transportChoice, setTransportChoice] = useState<'bullet-train' | 'private-gmc' | 'luxury-bus'>('bullet-train');
  const [includeVisa, setIncludeVisa] = useState<boolean>(true);
  const [includeFlights, setIncludeFlights] = useState<boolean>(true);
  const [travelMonth, setTravelMonth] = useState<string>('November 2026');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Approximate realistic calculation per person base
  let basePriceSAR = 0;

  // Hotel per night rate per person
  const makkahNights = Math.ceil(duration * 0.6);
  const madinahNights = duration - makkahNights;

  const makkahRate = makkahTier === '5star' ? 380 : makkahTier === '4star' ? 220 : 120;
  const madinahRate = madinahTier === '5star' ? 340 : madinahTier === '4star' ? 190 : 100;

  basePriceSAR += makkahNights * makkahRate;
  basePriceSAR += madinahNights * madinahRate;

  // Sharing multiplier
  const sharingMultiplier = roomSharing === 'single' ? 1.8 : roomSharing === 'double' ? 1.25 : roomSharing === 'triple' ? 1.05 : 0.9;
  basePriceSAR = Math.round(basePriceSAR * sharingMultiplier);

  // Transport
  if (transportChoice === 'private-gmc') basePriceSAR += 950;
  else if (transportChoice === 'bullet-train') basePriceSAR += 550;
  else basePriceSAR += 300;

  // Visa & Insurance
  if (includeVisa) basePriceSAR += 550;

  // Airfare allowance
  if (includeFlights) basePriceSAR += 2400;

  const totalPilgrims = adults + children;
  const totalPriceSAR = (basePriceSAR * adults) + (Math.round(basePriceSAR * 0.8) * children);
  const perPersonPriceSAR = Math.round(totalPriceSAR / (totalPilgrims || 1));

  const formatPrice = (sar: number) => {
    const val = Math.round(sar * currency.rateFromSAR);
    return `${currency.symbol} ${val.toLocaleString()}`;
  };

  const getWhatsAppMessage = () => {
    return `Salam Brothers International Travel & Tours!
I customized an Umrah Package with your calculator:
- Duration: ${duration} Nights (${makkahNights} Makkah / ${madinahNights} Madinah)
- Pilgrims: ${adults} Adult(s)${children > 0 ? `, ${children} Child(ren)` : ''}
- Room Sharing: ${roomSharing.toUpperCase()}
- Makkah Hotel: ${makkahTier.toUpperCase()}
- Madinah Hotel: ${madinahTier.toUpperCase()}
- Transport: ${transportChoice}
- Visa: ${includeVisa ? 'Included' : 'Self-Arranged'}
- Flights: ${includeFlights ? 'Included' : 'Ticket arranged separately'}
- Month: ${travelMonth}
- Estimated Total: ${currency.symbol} ${Math.round(totalPriceSAR * currency.rateFromSAR).toLocaleString()} (${currency.code})

Please review and confirm available dates and hotel options.`;
  };

  const handleInquiryFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    onSubmitInquiry({
      fullName,
      phone,
      serviceType: 'Umrah',
      travelDate: travelMonth,
      travelersCount: totalPilgrims,
      roomPreference: roomSharing,
      notes: `Customized Umrah Estimate: ${duration} Nights, Makkah ${makkahTier}, Madinah ${madinahTier}, Transport: ${transportChoice}, Est Total: ${formatPrice(totalPriceSAR)}`,
    });

    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="builder" className="py-16 sm:py-24 bg-[#32040B] text-white relative overflow-hidden">
      {/* Background styling */}
      <div className="absolute inset-0 bg-[radial-gradient(#FFC709_1px,transparent_1px)] [background-size:32px_32px] opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4C0A14] border border-amber-400/40 text-[#FFC709] text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Estimator</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-serif-luxury tracking-tight">
            Tailor Your Sacred Umrah Journey
          </h2>

          <p className="mt-3 text-sm sm:text-base text-amber-100/90 leading-relaxed">
            Customize dates, hotel proximity to Haram, room sharing, and transport to get an immediate realistic estimate for your pilgrimage with Brothers International Travel &amp; Tours.
          </p>
        </div>

        {/* Two-Column Grid: Configurator on left, Live Quote Summary on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Configurator Box (8 cols) */}
          <div className="lg:col-span-8 bg-[#4C0A14] rounded-2xl p-6 sm:p-8 border border-amber-400/30 shadow-2xl space-y-7">
            
            {/* Step 1: Duration & Dates */}
            <div>
              <label className="text-sm font-bold text-[#FFC709] flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4" />
                1. Select Total Nights ({makkahNights} Makkah + {madinahNights} Madinah)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[7, 10, 14, 21].map((nights) => (
                  <button
                    key={nights}
                    type="button"
                    onClick={() => setDuration(nights)}
                    className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-bold text-center border transition-all ${
                      duration === nights
                        ? 'bg-[#FFC709] text-[#32040B] border-[#FFC709] shadow-lg'
                        : 'bg-[#3A050E] text-white border-amber-400/20 hover:border-amber-400/60'
                    }`}
                  >
                    {nights} Nights
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Pilgrims count */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-[#FFC709] flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4" />
                  Adults (12+ yrs)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setAdults(num)}
                      className={`flex-1 py-2 rounded-lg font-bold text-xs border ${
                        adults === num
                          ? 'bg-[#FFC709] text-[#32040B] border-[#FFC709]'
                          : 'bg-[#3A050E] text-white border-amber-400/20'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-[#FFC709] flex items-center gap-2 mb-2">
                  Children (under 12 yrs)
                </label>
                <div className="flex items-center gap-2">
                  {[0, 1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setChildren(num)}
                      className={`flex-1 py-2 rounded-lg font-bold text-xs border ${
                        children === num
                          ? 'bg-[#FFC709] text-[#32040B] border-[#FFC709]'
                          : 'bg-[#3A050E] text-white border-amber-400/20'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3: Room Sharing Choice */}
            <div>
              <label className="text-sm font-bold text-[#FFC709] block mb-2">
                2. Room Occupancy &amp; Sharing Preference
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { key: 'quad', label: 'Quad (4 Beds)', desc: 'Most economical for families' },
                  { key: 'triple', label: 'Triple (3 Beds)', desc: 'Great value for 3 people' },
                  { key: 'double', label: 'Double / Twin', desc: 'Private room for couple' },
                  { key: 'single', label: 'Single Solo', desc: 'Private exclusive room' },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setRoomSharing(item.key as any)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      roomSharing === item.key
                        ? 'bg-[#FFC709] text-[#32040B] border-[#FFC709] shadow-md'
                        : 'bg-[#3A050E] text-white border-amber-400/20 hover:border-amber-400/50'
                    }`}
                  >
                    <span className="block font-bold text-xs sm:text-sm">{item.label}</span>
                    <span className="block text-[10px] opacity-80 mt-0.5 leading-tight">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Hotel Tier Selections */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-[#FFC709] flex items-center gap-2 mb-2">
                  <Building className="w-4 h-4" />
                  Makkah Hotel Proximity
                </label>
                <div className="space-y-2">
                  {[
                    { key: '5star', title: '5-Star Haram Courtyard (0m)', desc: 'Clock Towers / Swissotel / Fairmont' },
                    { key: '4star', title: '4-Star Walking (150-300m)', desc: 'Makarem Ajyad / Elaf Kinda' },
                    { key: 'economy', title: 'Economy Value (Shuttle 24/7)', desc: 'Al Kiswah / Retaj Towers' },
                  ].map((h) => (
                    <button
                      key={h.key}
                      type="button"
                      onClick={() => setMakkahTier(h.key as any)}
                      className={`w-full p-2.5 rounded-lg text-left text-xs border transition-all ${
                        makkahTier === h.key
                          ? 'bg-[#FFC709] text-[#32040B] font-bold border-[#FFC709]'
                          : 'bg-[#3A050E] text-white border-amber-400/20'
                      }`}
                    >
                      <div className="font-bold">{h.title}</div>
                      <div className="text-[10px] opacity-80">{h.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-[#FFC709] flex items-center gap-2 mb-2">
                  <Building className="w-4 h-4" />
                  Madinah Hotel Proximity
                </label>
                <div className="space-y-2">
                  {[
                    { key: '5star', title: '5-Star Central Plaza (0-50m)', desc: 'The Oberoi / Dar Al Taqwa / Hilton' },
                    { key: '4star', title: '4-Star Close Walk (100-200m)', desc: 'Pullman Zamzam / Leader Muna' },
                    { key: 'economy', title: 'Economy Value (300-400m)', desc: 'Rua Al Hijrah / Central Madinah' },
                  ].map((h) => (
                    <button
                      key={h.key}
                      type="button"
                      onClick={() => setMadinahTier(h.key as any)}
                      className={`w-full p-2.5 rounded-lg text-left text-xs border transition-all ${
                        madinahTier === h.key
                          ? 'bg-[#FFC709] text-[#32040B] font-bold border-[#FFC709]'
                          : 'bg-[#3A050E] text-white border-amber-400/20'
                      }`}
                    >
                      <div className="font-bold">{h.title}</div>
                      <div className="text-[10px] opacity-80">{h.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 5: Ground Transport Mode */}
            <div>
              <label className="text-sm font-bold text-[#FFC709] flex items-center gap-2 mb-2">
                <Train className="w-4 h-4" />
                Inter-City Transport Between Makkah &amp; Madinah
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { key: 'bullet-train', label: 'Harmain High-Speed Train', desc: '2h 20m high-speed luxury rail' },
                  { key: 'private-gmc', label: 'Private GMC Yukon XL', desc: 'Door-to-door dedicated VIP SUV' },
                  { key: 'luxury-bus', label: 'Modern AC Tourist Coach', desc: 'Comfortable air-conditioned group bus' },
                ].map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setTransportChoice(t.key as any)}
                    className={`p-3 rounded-xl text-left border text-xs transition-all ${
                      transportChoice === t.key
                        ? 'bg-[#FFC709] text-[#32040B] font-bold border-[#FFC709]'
                        : 'bg-[#3A050E] text-white border-amber-400/20'
                    }`}
                  >
                    <div className="font-bold">{t.label}</div>
                    <div className="text-[10px] opacity-80 mt-0.5">{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 6: Inclusions Checkboxes */}
            <div className="pt-2 border-t border-amber-400/20 flex flex-wrap gap-4 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeVisa}
                  onChange={(e) => setIncludeVisa(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-500 accent-[#FFC709]"
                />
                <span className="font-semibold text-white">Include Saudi Umrah Visa &amp; Medical Insurance</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeFlights}
                  onChange={(e) => setIncludeFlights(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-500 accent-[#FFC709]"
                />
                <span className="font-semibold text-white">Include Round-Trip Return Airfare</span>
              </label>
            </div>

          </div>

          {/* Live Quote & Direct Dispatch Panel (4 cols) */}
          <div className="lg:col-span-4 bg-[#400711] rounded-2xl p-6 sm:p-7 border border-[#D4AF37]/50 shadow-2xl sticky top-24 space-y-6">
            
            <div className="border-b border-amber-400/30 pb-4">
              <span className="text-[11px] uppercase tracking-widest text-[#FFC709] font-black block">
                Estimated Live Quote
              </span>
              <h3 className="text-xl font-extrabold text-white font-serif-luxury mt-1">
                Custom Pilgrimage Package
              </h3>
            </div>

            {/* Big price display */}
            <div className="bg-[#2D040A] p-4 rounded-xl border border-amber-500/30 text-center">
              <span className="text-xs uppercase tracking-wider text-amber-200/70 block">
                Total for {totalPilgrims} Traveler(s)
              </span>
              <div className="text-3xl sm:text-4xl font-black text-[#FFC709] mt-1">
                {formatPrice(totalPriceSAR)}
              </div>
              <span className="text-xs text-amber-100/80 block mt-1">
                ~ {formatPrice(perPersonPriceSAR)} per adult
              </span>
              {currency.code !== 'SAR' && (
                <span className="text-[10px] text-amber-300/60 block mt-0.5">
                  (Estimated SAR {totalPriceSAR.toLocaleString()})
                </span>
              )}
            </div>

            {/* Spec highlights */}
            <div className="space-y-2 text-xs text-amber-100/90">
              <div className="flex justify-between py-1 border-b border-amber-500/20">
                <span className="text-amber-200/70">Duration:</span>
                <span className="font-bold text-white">{duration} Nights</span>
              </div>
              <div className="flex justify-between py-1 border-b border-amber-500/20">
                <span className="text-amber-200/70">Makkah Proximity:</span>
                <span className="font-bold text-white capitalize">{makkahTier} tier</span>
              </div>
              <div className="flex justify-between py-1 border-b border-amber-500/20">
                <span className="text-amber-200/70">Madinah Proximity:</span>
                <span className="font-bold text-white capitalize">{madinahTier} tier</span>
              </div>
              <div className="flex justify-between py-1 border-b border-amber-500/20">
                <span className="text-amber-200/70">Room Sharing:</span>
                <span className="font-bold text-white uppercase">{roomSharing}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-amber-500/20">
                <span className="text-amber-200/70">Transport:</span>
                <span className="font-bold text-white capitalize">{transportChoice.replace('-', ' ')}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-amber-200/70">Visa &amp; Insurance:</span>
                <span className="font-bold text-[#FFC709]">{includeVisa ? 'Included' : 'Self'}</span>
              </div>
            </div>

            {/* Direct WhatsApp Quote Button */}
            <a
              href={`https://wa.me/${agencySettings.whatsappNumber}?text=${encodeURIComponent(getWhatsAppMessage())}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BA59] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-transform transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Send to WhatsApp Live</span>
            </a>

            {/* Quick in-app callback request */}
            <form onSubmit={handleInquiryFormSubmit} className="pt-4 border-t border-amber-500/20 space-y-2.5">
              <span className="text-xs font-bold text-white block">
                Or Have Agency Agent Call You:
              </span>
              <input
                type="text"
                placeholder="Your Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs rounded-lg bg-[#2D040A] border border-amber-500/30 text-white placeholder-amber-200/50 focus:outline-none focus:border-[#FFC709]"
              />
              <input
                type="tel"
                placeholder="WhatsApp / Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs rounded-lg bg-[#2D040A] border border-amber-500/30 text-white placeholder-amber-200/50 focus:outline-none focus:border-[#FFC709]"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-[#FFC709] hover:bg-[#F3BC00] text-[#32040B] font-extrabold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry to Agency</span>
              </button>

              {isSubmitted && (
                <div className="p-2 bg-emerald-950/80 border border-emerald-500/50 rounded text-emerald-300 text-xs text-center flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Inquiry saved! Agency will contact you shortly.</span>
                </div>
              )}
            </form>

            <div className="flex items-center gap-1.5 text-[10px] text-amber-200/60 justify-center">
              <ShieldCheck className="w-3 h-3 text-[#FFC709]" />
              <span>No obligation estimate • Price locks upon booking</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

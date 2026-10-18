import React, { useState } from 'react';
import { AgencySettings, CustomerInquiry } from '../types';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  ShieldAlert, 
  CheckCircle2,
  Building,
  Sparkles
} from 'lucide-react';

interface ContactSectionProps {
  agencySettings: AgencySettings;
  onSubmitInquiry: (inquiry: Partial<CustomerInquiry>) => void;
  initialService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  agencySettings,
  onSubmitInquiry,
  initialService = 'Umrah',
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [serviceType, setServiceType] = useState<CustomerInquiry['serviceType']>(
    (initialService as any) || 'Umrah'
  );
  const [travelersCount, setTravelersCount] = useState(2);
  const [travelDate, setTravelDate] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    onSubmitInquiry({
      fullName,
      phone,
      email,
      city,
      serviceType,
      travelersCount,
      travelDate,
      notes,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFullName('');
      setPhone('');
      setEmail('');
      setNotes('');
    }, 6000);
  };

  const whatsappDirectUrl = `https://wa.me/${agencySettings.whatsappNumber}?text=${encodeURIComponent(
    'Salam! I would like to speak with a travel advisor at Brothers International Travel & Tours.'
  )}`;

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#FDFBF7] text-[#18181B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4C0A14] text-[#FFC709] text-xs font-bold uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Official Inquiries &amp; Branch Offices</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#4C0A14] tracking-tight font-serif-luxury">
            Contact Brothers International
          </h2>

          <p className="mt-3 text-base text-gray-700 leading-relaxed">
            Our experienced pilgrimage consultants and ticketing specialists are available to provide dedicated assistance and bespoke quotations.
          </p>
        </div>

        {/* Contact Info & Inquiry Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Agency Details (5 cols) */}
          <div className="lg:col-span-5 bg-[#4C0A14] text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-amber-400/30 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#FFC709] font-black block">
                Direct Contact Desk
              </span>
              <h3 className="text-2xl font-black text-white font-serif-luxury mt-1">
                Brothers International Travel &amp; Tours
              </h3>
              <span className="text-xs text-amber-200/80 font-semibold block mt-0.5">
                ESTABLISHED &amp; OPERATING SINCE 2024
              </span>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-amber-100/90">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#35050D] flex items-center justify-center text-[#FFC709] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-white font-bold">Helpline &amp; Telephone:</strong>
                  <a href={`tel:${agencySettings.primaryPhone}`} className="hover:text-[#FFC709] transition-colors">
                    {agencySettings.primaryPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#25D366] flex items-center justify-center text-white shrink-0">
                  <MessageCircle className="w-4 h-4 fill-white" />
                </div>
                <div>
                  <strong className="block text-white font-bold">WhatsApp Instant Support:</strong>
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FFC709] underline font-semibold transition-colors"
                  >
                    {agencySettings.whatsappDisplay} (Click to Chat)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#35050D] flex items-center justify-center text-[#FFC709] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-white font-bold">Official Email:</strong>
                  <a href={`mailto:${agencySettings.email}`} className="hover:text-[#FFC709] transition-colors">
                    {agencySettings.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#35050D] flex items-center justify-center text-[#FFC709] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-white font-bold">Registered Office Locations:</strong>
                  <span className="leading-relaxed block">
                    {agencySettings.address}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#35050D] flex items-center justify-center text-[#FFC709] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-white font-bold">Consultation Hours:</strong>
                  <span>{agencySettings.operatingHours}</span>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Action Button */}
            <div className="pt-4 border-t border-amber-500/20">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BA59] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow transition-transform transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Start WhatsApp Conversation</span>
              </a>
            </div>

            {/* Regulatory Transparency Statement */}
            <div className="pt-4 border-t border-amber-500/20 bg-[#35050D] p-3.5 rounded-xl border border-amber-400/20 text-[11px] text-amber-200/80 leading-relaxed">
              <div className="flex items-center gap-1.5 font-bold text-[#FFC709] mb-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Regulatory Notice &amp; Transparency</span>
              </div>
              Brothers International Travel &amp; Tours is an independent registered travel agency established in 2024. Not officially affiliated with or representative of any airline, hotel chain, or Saudi authority.
            </div>
          </div>

          {/* Online Quotation / Callback Request Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-xl">
            <div className="border-b border-gray-100 pb-4 mb-6">
              <span className="text-xs uppercase tracking-wider text-gray-500 font-bold block">
                Online Booking Request
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#4C0A14] font-serif-luxury mt-0.5">
                Send Us Your Travel Requirements
              </h3>
            </div>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-emerald-900 font-serif-luxury">
                  Thank You, {fullName}!
                </h4>
                <p className="text-sm text-emerald-800 max-w-md mx-auto">
                  Your inquiry has been received by Brothers International Travel &amp; Tours. An agent will contact you on <strong>{phone}</strong> within our active business hours.
                </p>
                <div className="pt-2">
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#25D366] text-white text-xs font-bold rounded-lg shadow"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Message us immediately on WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tariq Mehmood"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm focus:border-[#4C0A14] focus:ring-1 focus:ring-[#4C0A14] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+966 ... or +92 ..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm focus:border-[#4C0A14] focus:ring-1 focus:ring-[#4C0A14] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm focus:border-[#4C0A14] focus:ring-1 focus:ring-[#4C0A14] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Your City / Country
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Jeddah / Riyadh / Islamabad"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm focus:border-[#4C0A14] focus:ring-1 focus:ring-[#4C0A14] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Service Interested In
                    </label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm focus:border-[#4C0A14] focus:ring-1 focus:ring-[#4C0A14] focus:outline-none"
                    >
                      <option value="Umrah">Umrah Packages</option>
                      <option value="Flights">Airline Flight Tickets</option>
                      <option value="Visa">Visa Assistance</option>
                      <option value="Holiday Tour">Worldwide Holiday Tour</option>
                      <option value="Custom Package">Custom Tailored Package</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Travelers Count
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={travelersCount}
                      onChange={(e) => setTravelersCount(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm focus:border-[#4C0A14] focus:ring-1 focus:ring-[#4C0A14] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Estimated Travel Date
                    </label>
                    <input
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm focus:border-[#4C0A14] focus:ring-1 focus:ring-[#4C0A14] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Special Requests or Specific Hotel Preferences
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide any hotel requests, wheelchair requirements, or questions..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm focus:border-[#4C0A14] focus:ring-1 focus:ring-[#4C0A14] focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#4C0A14] hover:bg-[#5C0E1C] text-[#FFC709] font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-transform transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry to Brothers International</span>
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

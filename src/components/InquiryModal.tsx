import React, { useState } from 'react';
import { UmrahPackage, CustomerInquiry, AgencySettings } from '../types';
import { BrandLogo } from './BrandLogo';
import { X, Send, MessageCircle, CheckCircle2, ShieldCheck } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage?: UmrahPackage | null;
  selectedService?: string;
  agencySettings: AgencySettings;
  onSubmitInquiry: (inquiry: Partial<CustomerInquiry>) => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  selectedPackage,
  selectedService = 'Umrah',
  agencySettings,
  onSubmitInquiry,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [travelersCount, setTravelersCount] = useState(2);
  const [travelDate, setTravelDate] = useState('');
  const [roomSharing, setRoomSharing] = useState('Double Sharing');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    onSubmitInquiry({
      fullName,
      phone,
      email,
      serviceType: selectedPackage ? 'Umrah' : (selectedService as any) || 'Custom Package',
      packageId: selectedPackage?.id,
      travelersCount,
      travelDate,
      roomPreference: roomSharing,
      notes: notes || (selectedPackage ? `Package: ${selectedPackage.title}` : `Service: ${selectedService}`),
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  const getWhatsAppDirect = () => {
    const pkgName = selectedPackage ? selectedPackage.title : selectedService;
    const text = `Salam Brothers International Travel & Tours! I would like to inquire about "${pkgName}" for ${travelersCount} traveler(s)${travelDate ? ` planned around ${travelDate}` : ''}.`;
    return `https://wa.me/${agencySettings.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-gray-200 overflow-hidden my-auto">
        
        {/* Header */}
        <div className="bg-[#4C0A14] text-white p-5 flex items-center justify-between border-b border-amber-500/30">
          <div className="flex items-center gap-3">
            <BrandLogo variant="compact" />
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#FFC709] font-black block">
                Direct Booking Desk
              </span>
              <h3 className="text-base sm:text-lg font-bold font-serif-luxury text-white">
                {selectedPackage ? selectedPackage.title : `Inquire: ${selectedService}`}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-amber-200 hover:text-white rounded-lg bg-[#38060E] hover:bg-[#5C0E1C] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 font-serif-luxury">
                Inquiry Received!
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 max-w-xs mx-auto">
                Thank you, <strong>{fullName}</strong>. A Brothers International travel consultant will contact you via WhatsApp/call shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ahmed Raza"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:border-[#4C0A14]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    WhatsApp / Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+966 ... or +92 ..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:border-[#4C0A14]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Number of Travelers
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={travelersCount}
                    onChange={(e) => setTravelersCount(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:border-[#4C0A14]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Target Travel Date
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:border-[#4C0A14]"
                  />
                </div>
              </div>

              {selectedPackage && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Room Sharing Preference
                  </label>
                  <select
                    value={roomSharing}
                    onChange={(e) => setRoomSharing(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:border-[#4C0A14]"
                  >
                    <option value="Quad Sharing">Quad Sharing (4 Pilgrims / Room)</option>
                    <option value="Triple Sharing">Triple Sharing (3 Pilgrims / Room)</option>
                    <option value="Double Sharing">Double Sharing (2 Pilgrims / Room)</option>
                    <option value="Single Room">Single Room (Solo)</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Additional Notes or Questions
                </label>
                <textarea
                  rows={2}
                  placeholder="Any dietary needs, elderly assistance, or airline preferences..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 focus:outline-none focus:border-[#4C0A14]"
                />
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#4C0A14] hover:bg-[#5C0E1C] text-[#FFC709] font-black rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inquiry</span>
                </button>

                <a
                  href={getWhatsAppDirect()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-[#25D366] hover:bg-[#20BA59] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Connect Immediately via WhatsApp</span>
                </a>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="bg-amber-50 p-3 border-t border-amber-200/60 text-[10px] text-gray-600 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>Brothers International Travel &amp; Tours (Since 2024) Guaranteed Privacy</span>
        </div>

      </div>
    </div>
  );
};

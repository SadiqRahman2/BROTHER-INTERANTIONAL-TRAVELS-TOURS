import React from 'react';
import { TourPackage, Currency, AgencySettings } from '../types';
import { Compass, CheckCircle2, MessageCircle, Calendar, Sparkles } from 'lucide-react';

interface WorldwideToursProps {
  tours: TourPackage[];
  currency: Currency;
  agencySettings: AgencySettings;
  onOpenInquiryModal: (service: string) => void;
}

export const WorldwideTours: React.FC<WorldwideToursProps> = ({
  tours,
  currency,
  agencySettings,
  onOpenInquiryModal,
}) => {
  const formatPrice = (priceSAR: number) => {
    const converted = Math.round(priceSAR * currency.rateFromSAR);
    return `${currency.symbol} ${converted.toLocaleString()}`;
  };

  const getTourWhatsApp = (tour: TourPackage) => {
    const price = formatPrice(tour.priceSAR);
    const text = `Salam Brothers International Travel & Tours! I am interested in the "${tour.title}" (${tour.destination}) package priced at ${price}. Please share upcoming departure dates and inclusions.`;
    return `https://wa.me/${agencySettings.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="tours" className="py-16 sm:py-24 bg-[#FDFBF7] text-[#18181B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4C0A14] text-[#FFC709] text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Worldwide Holiday Portfolios</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#4C0A14] tracking-tight font-serif-luxury">
            International Holiday Tours
          </h2>

          <p className="mt-3 text-base text-gray-700 leading-relaxed">
            Beyond pilgrimage, Brothers International Travel &amp; Tours curates unforgettable halal-friendly global vacation experiences with full visa and hotel coordination.
          </p>
        </div>

        {/* Tour Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Visual Header Banner */}
                <div className="bg-[#4C0A14] p-6 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFC709] rounded-full blur-2xl opacity-10 pointer-events-none" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#FFC709] block">
                    {tour.destination}
                  </span>
                  <h3 className="text-xl font-black text-white font-serif-luxury mt-1 leading-snug">
                    {tour.title}
                  </h3>
                  <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#35050D] text-amber-200 text-xs font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-[#FFC709]" />
                    <span>{tour.duration}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="p-6 space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                    Tour Highlights Included:
                  </span>
                  <ul className="space-y-2">
                    {tour.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-gray-100 flex items-baseline justify-between mb-4">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-gray-500 block">Starting From</span>
                    <div className="text-2xl font-black text-[#4C0A14]">
                      {formatPrice(tour.priceSAR)}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">Per Person</span>
                </div>

                <div className="flex gap-2">
                  <a
                    href={getTourWhatsApp(tour)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20BA59] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors shadow"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>WhatsApp Inquiry</span>
                  </a>

                  <button
                    onClick={() => onOpenInquiryModal(`Tour: ${tour.destination}`)}
                    className="py-2.5 px-3 rounded-xl bg-[#4C0A14] hover:bg-[#5C0E1C] text-[#FFC709] font-bold text-xs cursor-pointer"
                  >
                    Book Call
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

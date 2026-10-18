import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  FileText, 
  Heart, 
  HelpCircle, 
  ShieldCheck, 
  Sparkles,
  ChevronDown
} from 'lucide-react';

export const PilgrimageGuide: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const steps = [
    {
      step: '01',
      title: 'Ihram & Sacred Intention (Niyyah)',
      description: 'Enter the state of Ihram before or at the designated Miqat. For brothers, two seamless white sheets; for sisters, modest modest dress with face and hands uncovered. Recite the Talbiyah: "Labbayk Allahumma Labbayk".',
    },
    {
      step: '02',
      title: 'Tawaf Around the Holy Kaaba',
      description: 'Perform 7 counter-clockwise circumambulations of the Kaaba starting from the Black Stone (Hajar al-Aswad) corner. After completion, offer two rak’ahs behind Maqam Ibrahim if possible and drink blessed Zamzam water.',
    },
    {
      step: '03',
      title: 'Sa’i Between Safa & Marwah',
      description: 'Walk 7 laps between the hills of Safa and Marwah, commemorating the devotion of Lady Hajar (AS). Brothers jog gently between the green illuminated markers. Make sincere du’a at each hill.',
    },
    {
      step: '04',
      title: 'Halq (Shaving) or Taqsir (Trimming)',
      description: 'Conclude your Umrah by shaving the head (Halq, recommended for men) or trimming hair equally from all sides (Taqsir). Sisters trim approximately one fingertip length from the end of their hair. Ihram restrictions are now lifted.',
    },
  ];

  const faqs = [
    {
      q: 'How early should I book my Umrah package with Brothers International Travel & Tours?',
      a: 'We recommend booking 4 to 8 weeks in advance for regular season travel, and at least 3 to 4 months in advance for peak periods such as Ramadan, December holidays, and the opening of the Umrah season to guarantee premier hotel rooms close to the Haram.'
    },
    {
      q: 'Do you arrange Nusuk permits for praying in the Rawdah in Madinah?',
      a: 'Yes. Our ground team assists all pilgrims in setting up and securing their official Rawdah visit appointments via the Nusuk portal so that your sacred visit to the Prophet’s Mosque is seamless and verified.'
    },
    {
      q: 'What ground transportation is provided upon arrival at Jeddah or Madinah airport?',
      a: 'Depending on your package tier, you are greeted by our Brothers International representative with name placard. VIP travelers receive private luxury GMC Yukon XL transfers, while standard travelers receive modern high-speed Harmain Bullet Train tickets or air-conditioned luxury coach transport.'
    },
    {
      q: 'Can Brothers International Travel & Tours customize a private group or corporate itinerary?',
      a: 'Yes. We frequently organize customized packages for extended families, youth organizations, and company delegations, including private bus hires, customized historical Ziyarat tours, and catered meals.'
    },
    {
      q: 'What is your official relationship with airlines, hotels, and Saudi authorities?',
      a: 'Brothers International Travel & Tours is an independent travel agency established in 2024. We operate with authorized local Saudi destination management partners (DMCs) and global airline consolidators. We are an independent commercial entity and not a government body or official airline subsidiary.'
    }
  ];

  return (
    <section id="guide" className="py-16 sm:py-24 bg-[#F8FAFC] text-[#18181B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4C0A14] text-[#FFC709] text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Spiritual &amp; Practical Preparation</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#4C0A14] tracking-tight font-serif-luxury">
            The Pilgrim’s Essential Companion
          </h2>

          <p className="mt-3 text-base text-gray-700 leading-relaxed">
            Brothers International Travel &amp; Tours is devoted to ensuring every pilgrim undertakes their holy journey with tranquility, knowledge, and complete peace of mind.
          </p>
        </div>

        {/* 4 Steps of Umrah */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((st) => (
            <div
              key={st.step}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all relative flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl font-black text-[#FFC709] bg-[#4C0A14] w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow">
                  {st.step}
                </span>
                <h3 className="text-lg font-extrabold text-[#4C0A14] mb-2 font-serif-luxury">
                  {st.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {st.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Guidance included in welcome pack</span>
              </div>
            </div>
          ))}
        </div>

        {/* Packing Checklist & FAQ Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Packing Checklist (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-7 border border-gray-200 shadow-md space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
              <FileText className="w-5 h-5 text-[#4C0A14]" />
              <h3 className="text-lg font-bold text-[#4C0A14] font-serif-luxury">
                What to Pack for Your Umrah
              </h3>
            </div>

            <ul className="space-y-3 text-xs text-gray-700">
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#FFC709] mt-1 shrink-0" />
                <div>
                  <strong>Ihram sets:</strong> 2 sets of unstitched white towels for men, safety pins, and a durable waist belt for valuables.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#FFC709] mt-1 shrink-0" />
                <div>
                  <strong>Footwear:</strong> High-comfort walking slippers/sandals with ankle support and a drawstring shoe bag for entering the mosques.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#FFC709] mt-1 shrink-0" />
                <div>
                  <strong>Unscented toiletries:</strong> Unscented soap, sunscreen, lip balm, and wipes complying with Ihram prohibitions.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#FFC709] mt-1 shrink-0" />
                <div>
                  <strong>Travel documents:</strong> Passport with valid Saudi eVisa printout, Brothers International hotel voucher, and power bank.
                </div>
              </li>
            </ul>

            <div className="pt-3 border-t border-gray-100 bg-amber-50/80 p-3 rounded-xl border border-amber-200/50 flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#4C0A14] shrink-0" />
              <span className="text-xs text-gray-700">
                Every booked traveler receives the official <strong>Brothers International Pilgrim Kit</strong> with Ihram and luggage tags.
              </span>
            </div>
          </div>

          {/* Frequently Asked Questions (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 border border-gray-200 shadow-md">
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-gray-100">
              <HelpCircle className="w-5 h-5 text-[#4C0A14]" />
              <h3 className="text-lg font-bold text-[#4C0A14] font-serif-luxury">
                Frequently Asked Questions
              </h3>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 bg-gray-50/60 hover:bg-gray-100/60 transition-colors cursor-pointer"
                    >
                      <span className="text-xs sm:text-sm font-bold text-[#4C0A14]">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-500 transition-transform duration-200 shrink-0 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="p-4 bg-white text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { initialTestimonials } from '../data/initialData';
import { Star, Quote, Award, Heart } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#4C0A14] text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#731224] rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFC709] rounded-full blur-[140px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#36050D] border border-amber-400/40 text-[#FFC709] text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Pilgrim Experiences</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-serif-luxury">
            Trusted by Pilgrims Across the Globe
          </h2>

          <p className="mt-3 text-base text-amber-100/90 leading-relaxed">
            Since our launch in 2024, Brothers International Travel &amp; Tours has been privileged to serve guests of the Almighty with uncompromising integrity and warmth.
          </p>
        </div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {initialTestimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[#38060F] p-6 sm:p-7 rounded-2xl border border-amber-500/30 flex flex-col justify-between shadow-xl relative hover:border-amber-400/60 transition-colors"
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mb-4 text-[#FFC709]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFC709]" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-amber-500/30 mb-2" />

                <p className="text-xs sm:text-sm text-amber-50/90 leading-relaxed italic">
                  "{t.text}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-amber-500/20 flex flex-col">
                <span className="font-extrabold text-sm sm:text-base text-white">
                  {t.author}
                </span>
                <span className="text-xs text-[#FFC709] font-medium mt-0.5">
                  {t.origin} · {t.package}
                </span>
                <span className="text-[10px] text-amber-200/50 mt-1">
                  Travel Date: {t.date}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

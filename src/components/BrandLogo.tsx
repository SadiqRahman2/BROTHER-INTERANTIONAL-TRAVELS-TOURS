import React from 'react';

interface BrandLogoProps {
  variant?: 'navbar' | 'hero' | 'footer' | 'badge' | 'compact';
  className?: string;
  onClick?: () => void;
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'navbar',
  className = '',
  onClick,
  showTagline = true,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (variant === 'badge' || variant === 'hero') {
    // Majestic vertical framed crest logo
    return (
      <a
        href="#home"
        onClick={handleClick}
        className={`group relative inline-flex flex-col items-center justify-center transition-transform duration-300 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-2xl ${className}`}
        aria-label="Brothers International Travel & Tours - Since 2024 Homepage"
      >
        <div className="relative overflow-hidden rounded-2xl p-5 sm:p-6 shadow-2xl transition-shadow duration-300 group-hover:shadow-[0_20px_40px_rgba(76,10,20,0.6)]"
             style={{
               background: 'linear-gradient(145deg, #5B0D1B 0%, #4C0A14 55%, #34040C 100%)',
               border: '1.5px solid rgba(212, 175, 55, 0.45)',
               boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.2), 0 10px 25px -5px rgba(0, 0, 0, 0.5)'
             }}>
          
          {/* Subtle gold corner accents */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-amber-300/40 pointer-events-none" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-amber-300/40 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-amber-300/40 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-amber-300/40 pointer-events-none" />

          {/* Stylized White "B" Monogram Shield */}
          <div className="flex justify-center mb-3">
            <svg
              className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)]"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Inner shield backing */}
              <rect x="6" y="6" width="88" height="88" rx="18" fill="#3A050E" stroke="#D4AF37" strokeWidth="1.2" strokeOpacity="0.5" />
              
              {/* Stylized "B" Monogram with aerodynamic flight / journey swoosh */}
              {/* Left Stem */}
              <path d="M 28 22 L 28 78" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
              
              {/* Upper & Lower Loops with smooth curvature */}
              <path
                d="M 28 26 H 55 C 69 26 77 34 77 44 C 77 52 70 58 58 59 C 72 61 79 69 79 79 C 79 89 69 94 54 94 H 28"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(0, -8)"
              />
              
              {/* Golden Travel Flight divider */}
              <path d="M 28 51 L 62 51" stroke="#FFC709" strokeWidth="5" strokeLinecap="round" />
              
              {/* Yellow luxury accent dots */}
              <circle cx="56" cy="36" r="3.2" fill="#FFC709" />
              <circle cx="58" cy="71" r="3.2" fill="#FFC709" />
              <circle cx="80" cy="22" r="1.5" fill="#E5C07B" />
            </svg>
          </div>

          {/* Yellow "BROTHERS" lettering */}
          <div className="text-center">
            <span
              className="block font-black tracking-[0.22em] text-[#FFC709] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] text-2xl sm:text-3xl leading-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', 'Montserrat', sans-serif" }}
            >
              BROTHERS
            </span>

            {/* White "INTERNATIONAL TRAVEL & TOURS" */}
            <span
              className="block font-bold tracking-[0.18em] text-white text-[10px] sm:text-[11.5px] uppercase mt-1 leading-snug"
              style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
            >
              INTERNATIONAL TRAVEL &amp; TOURS
            </span>

            {/* Divider line and SINCE 2024 */}
            {showTagline && (
              <div className="flex items-center justify-center gap-2 mt-2 pt-2 border-t border-amber-300/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFC709]" />
                <span className="font-bold tracking-[0.26em] text-[#E5C07B] text-[10px] uppercase">
                  SINCE 2024
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFC709]" />
              </div>
            )}
          </div>
        </div>
      </a>
    );
  }

  if (variant === 'compact') {
    // Compact icon shield for mobile bar
    return (
      <a
        href="#home"
        onClick={handleClick}
        className={`group inline-flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg ${className}`}
        aria-label="Brothers International Travel & Tours"
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md transition-transform group-hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #580D18 0%, #460710 100%)',
            border: '1px solid rgba(212, 175, 55, 0.5)',
          }}
        >
          <svg className="w-6 h-6" viewBox="0 0 100 100" fill="none">
            <path d="M 28 20 L 28 80" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
            <path
              d="M 28 25 H 55 C 70 25 78 33 78 43 C 78 51 70 57 58 58 C 72 60 80 67 80 77 C 80 87 70 93 54 93 H 28"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(0, -6)"
            />
            <path d="M 28 52 L 60 52" stroke="#FFC709" strokeWidth="6" strokeLinecap="round" />
          </svg>
        </div>
        <div className="flex flex-col text-left">
          <span className="text-sm font-black tracking-wider text-[#FFC709] leading-none">
            BROTHERS
          </span>
          <span className="text-[8px] font-bold tracking-wider text-white uppercase leading-tight mt-0.5">
            TRAVEL &amp; TOURS
          </span>
        </div>
      </a>
    );
  }

  // Default 'navbar' & 'footer' horizontal lockup
  const isFooter = variant === 'footer';

  return (
    <a
      href="#home"
      onClick={handleClick}
      className={`group inline-flex items-center gap-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-xl p-1 transition-transform duration-200 hover:scale-[1.01] ${className}`}
      aria-label="Brothers International Travel & Tours - Since 2024"
    >
      {/* Brand Icon Shield */}
      <div
        className="relative flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shadow-lg transition-shadow group-hover:shadow-[0_4px_16px_rgba(76,10,20,0.5)]"
        style={{
          background: 'linear-gradient(145deg, #5C0E1C 0%, #4C0A14 60%, #34040C 100%)',
          border: '1.2px solid rgba(212, 175, 55, 0.5)',
          boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.25), 0 4px 10px rgba(0, 0, 0, 0.35)'
        }}
      >
        <svg
          className="w-8 h-8 sm:w-9 sm:h-9"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stylized White "B" Monogram */}
          <path d="M 28 22 L 28 78" stroke="#FFFFFF" strokeWidth="9" strokeLinecap="round" />
          <path
            d="M 28 26 H 54 C 68 26 76 34 76 43 C 76 50 69 56 57 58 C 70 60 77 67 77 77 C 77 87 68 93 53 93 H 28"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(0, -6)"
          />
          <path d="M 28 52 L 60 52" stroke="#FFC709" strokeWidth="6" strokeLinecap="round" />
          <circle cx="54" cy="37" r="3" fill="#FFC709" />
          <circle cx="56" cy="71" r="3" fill="#FFC709" />
        </svg>
      </div>

      {/* Brand Typographic Text */}
      <div className="flex flex-col text-left">
        <div className="flex items-baseline gap-2">
          <span
            className="font-black tracking-[0.16em] text-[#FFC709] leading-none text-xl sm:text-2xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]"
            style={{ fontFamily: "'Plus Jakarta Sans', 'Montserrat', sans-serif" }}
          >
            BROTHERS
          </span>
          {showTagline && (
            <span className="text-[10px] font-bold tracking-widest text-[#E5C07B] uppercase hidden md:inline">
              SINCE 2024
            </span>
          )}
        </div>

        <span
          className="font-bold tracking-[0.12em] text-white text-[9.5px] sm:text-[11px] uppercase mt-1 leading-none"
          style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
        >
          INTERNATIONAL TRAVEL &amp; TOURS
        </span>

        {showTagline && isFooter && (
          <span className="text-[10px] font-semibold tracking-wider text-amber-200/70 mt-1 md:hidden">
            ESTABLISHED 2024
          </span>
        )}
      </div>
    </a>
  );
};

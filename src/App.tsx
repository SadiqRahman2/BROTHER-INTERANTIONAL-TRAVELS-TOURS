import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { UmrahPackages } from './components/UmrahPackages';
import { PackageCalculator } from './components/PackageCalculator';
import { VisaAndFlights } from './components/VisaAndFlights';
import { WorldwideTours } from './components/WorldwideTours';
import { PilgrimageGuide } from './components/PilgrimageGuide';
import { Testimonials } from './components/Testimonials';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';
import { InquiryModal } from './components/InquiryModal';

import { 
  initialUmrahPackages, 
  initialVisaServices, 
  initialTourPackages, 
  initialAgencySettings, 
  currencies, 
  initialInquiries 
} from './data/initialData';
import { UmrahPackage, CustomerInquiry, AgencySettings, Currency } from './types';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies[0]);
  
  // Persistent or stateful agency settings
  const [agencySettings, setAgencySettings] = useState<AgencySettings>(() => {
    const saved = localStorage.getItem('brothers_agency_settings');
    return saved ? JSON.parse(saved) : initialAgencySettings;
  });

  // Packages list (can be edited in admin)
  const [packages, setPackages] = useState<UmrahPackage[]>(() => {
    const saved = localStorage.getItem('brothers_umrah_packages');
    return saved ? JSON.parse(saved) : initialUmrahPackages;
  });

  // Inquiries list
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>(() => {
    const saved = localStorage.getItem('brothers_inquiries');
    return saved ? JSON.parse(saved) : initialInquiries;
  });

  // Admin Dashboard modal state
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Inquiry modal state
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [modalService, setModalService] = useState<string>('Umrah');
  const [modalPackage, setModalPackage] = useState<UmrahPackage | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('brothers_agency_settings', JSON.stringify(agencySettings));
  }, [agencySettings]);

  useEffect(() => {
    localStorage.setItem('brothers_umrah_packages', JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem('brothers_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  // Handle new incoming inquiry
  const handleAddNewInquiry = (data: Partial<CustomerInquiry>) => {
    const newInquiry: CustomerInquiry = {
      id: `inq-${Date.now().toString().slice(-4)}`,
      fullName: data.fullName || 'Anonymous Traveler',
      phone: data.phone || '',
      email: data.email || '',
      city: data.city || '',
      serviceType: data.serviceType || 'Umrah',
      packageId: data.packageId,
      travelDate: data.travelDate,
      travelersCount: data.travelersCount || 2,
      roomPreference: data.roomPreference,
      notes: data.notes,
      status: 'New',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };

    setInquiries((prev) => [newInquiry, ...prev]);
  };

  const handleOpenInquiryModal = (service: string = 'Umrah', pkg?: UmrahPackage) => {
    setModalService(service);
    setModalPackage(pkg || null);
    setIsInquiryModalOpen(true);
  };

  const handleSelectPackageForInquiry = (pkg: UmrahPackage) => {
    handleOpenInquiryModal('Umrah', pkg);
  };

  const floatingWhatsAppUrl = `https://wa.me/${agencySettings.whatsappNumber}?text=${encodeURIComponent(
    'Salam Brothers International Travel & Tours! I would like to inquire about your Umrah and travel services.'
  )}`;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#18181B] flex flex-col antialiased selection:bg-[#4C0A14] selection:text-[#FFC709]">
      
      {/* Top Header & Sticky Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
        currencies={currencies}
        agencySettings={agencySettings}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenInquiryModal={(svc) => handleOpenInquiryModal(svc || 'General')}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Hero Section with Official Logo & Fast Booking */}
        <Hero
          agencySettings={agencySettings}
          onSelectTab={setActiveTab}
          onOpenInquiryModal={(svc) => handleOpenInquiryModal(svc || 'Umrah')}
        />

        {/* Featured Umrah Packages */}
        <UmrahPackages
          packages={packages}
          currency={selectedCurrency}
          agencySettings={agencySettings}
          onSelectPackageForInquiry={handleSelectPackageForInquiry}
        />

        {/* Bespoke Interactive Umrah Cost Estimator / Builder */}
        <PackageCalculator
          currency={selectedCurrency}
          agencySettings={agencySettings}
          onSubmitInquiry={handleAddNewInquiry}
        />

        {/* Flight Booking & Visa Assistance */}
        <VisaAndFlights
          visas={initialVisaServices}
          currency={selectedCurrency}
          agencySettings={agencySettings}
          onOpenInquiryModal={(svc) => handleOpenInquiryModal(svc)}
        />

        {/* Worldwide Leisure Tours */}
        <WorldwideTours
          tours={initialTourPackages}
          currency={selectedCurrency}
          agencySettings={agencySettings}
          onOpenInquiryModal={(svc) => handleOpenInquiryModal(svc)}
        />

        {/* Pilgrim Spiritual & Practical Guide */}
        <PilgrimageGuide />

        {/* Pilgrim Testimonials & Experiences */}
        <Testimonials />

        {/* Contact Section, Office Addresses & Inquiry Form */}
        <ContactSection
          agencySettings={agencySettings}
          onSubmitInquiry={handleAddNewInquiry}
          initialService={modalService}
        />

      </main>

      {/* Official Footer */}
      <Footer
        agencySettings={agencySettings}
        onSelectTab={setActiveTab}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Floating Instant WhatsApp Button (Corner action for pilgrims) */}
      <aside aria-label="Quick contact" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 pointer-events-auto">
        <a
          href={floatingWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA59] text-white pl-4 pr-5 py-3 rounded-full shadow-[0_8px_25px_rgba(37,211,102,0.45)] transition-all transform hover:scale-105"
          aria-label="Direct WhatsApp Chat with Brothers International Travel & Tours"
        >
          <MessageCircle className="w-6 h-6 fill-white" />
          <span className="text-xs sm:text-sm font-extrabold tracking-wide">
            Chat on WhatsApp
          </span>
        </a>
      </aside>

      {/* Admin Operations Desk Modal */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        packages={packages}
        onUpdatePackages={setPackages}
        inquiries={inquiries}
        onUpdateInquiries={setInquiries}
        agencySettings={agencySettings}
        onUpdateSettings={setAgencySettings}
      />

      {/* Quick Booking & Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        selectedPackage={modalPackage}
        selectedService={modalService}
        agencySettings={agencySettings}
        onSubmitInquiry={handleAddNewInquiry}
      />

    </div>
  );
}

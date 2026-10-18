import React, { useState } from 'react';
import { UmrahPackage, CustomerInquiry, AgencySettings } from '../types';
import { BrandLogo } from './BrandLogo';
import { 
  X, 
  Settings, 
  Users, 
  Package, 
  MessageCircle, 
  Save, 
  CheckCircle2, 
  Download, 
  Phone, 
  Mail, 
  ShieldCheck,
  Edit2
} from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  packages: UmrahPackage[];
  onUpdatePackages: (packages: UmrahPackage[]) => void;
  inquiries: CustomerInquiry[];
  onUpdateInquiries: (inquiries: CustomerInquiry[]) => void;
  agencySettings: AgencySettings;
  onUpdateSettings: (settings: AgencySettings) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  packages,
  onUpdatePackages,
  inquiries,
  onUpdateInquiries,
  agencySettings,
  onUpdateSettings,
}) => {
  const [activeTab, setActiveTab] = useState<'inquiries' | 'packages' | 'settings' | 'whatsapp'>('inquiries');
  const [tempSettings, setTempSettings] = useState<AgencySettings>(agencySettings);
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);
  const [packageList, setPackageList] = useState<UmrahPackage[]>(packages);
  const [saveNotification, setSaveNotification] = useState<string | null>(null);

  if (!isOpen) return null;

  const showNotification = (msg: string) => {
    setSaveNotification(msg);
    setTimeout(() => setSaveNotification(null), 3000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(tempSettings);
    showNotification('Agency settings & WhatsApp number updated successfully!');
  };

  const handleUpdateStatus = (inquiryId: string, newStatus: CustomerInquiry['status']) => {
    const updated = inquiries.map((inq) =>
      inq.id === inquiryId ? { ...inq, status: newStatus } : inq
    );
    onUpdateInquiries(updated);
    showNotification(`Inquiry status updated to ${newStatus}`);
  };

  const handlePackagePriceChange = (pkgId: string, field: keyof UmrahPackage, value: any) => {
    const updated = packageList.map((pkg) =>
      pkg.id === pkgId ? { ...pkg, [field]: value } : pkg
    );
    setPackageList(updated);
    onUpdatePackages(updated);
  };

  const exportInquiriesCSV = () => {
    const headers = ['ID', 'Date', 'Full Name', 'Phone', 'Email', 'City', 'Service', 'Travelers', 'Travel Date', 'Status', 'Notes'];
    const rows = inquiries.map((inq) => [
      inq.id,
      inq.createdAt,
      `"${inq.fullName}"`,
      `"${inq.phone}"`,
      inq.email,
      inq.city,
      inq.serviceType,
      inq.travelersCount,
      inq.travelDate || '',
      inq.status,
      `"${(inq.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `brothers_travel_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl border border-gray-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Top Header (Burgundy brand styling) */}
        <div className="bg-[#4C0A14] text-white p-4 sm:p-6 flex items-center justify-between border-b border-amber-500/30">
          <div className="flex items-center gap-3">
            <BrandLogo variant="compact" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-[#FFC709] font-black">
                  Agency Operations Desk
                </span>
                <span className="text-[10px] bg-[#32040B] text-amber-200 px-2 py-0.5 rounded border border-amber-500/30">
                  Since 2024
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold font-serif-luxury text-white">
                Brothers International Travel &amp; Tours Dashboard
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-amber-200 hover:text-white rounded-lg bg-[#38060E] hover:bg-[#5C0E1C] transition-colors"
            aria-label="Close Dashboard"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Strip */}
        <div className="bg-[#38060E] px-4 sm:px-6 flex items-center gap-2 border-b border-amber-500/20 overflow-x-auto py-2">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'inquiries'
                ? 'bg-[#FFC709] text-[#32040B]'
                : 'text-amber-100 hover:bg-[#4C0A14]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Customer Inquiries ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('packages')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'packages'
                ? 'bg-[#FFC709] text-[#32040B]'
                : 'text-amber-100 hover:bg-[#4C0A14]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Manage Umrah Rates ({packages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'settings'
                ? 'bg-[#FFC709] text-[#32040B]'
                : 'text-amber-100 hover:bg-[#4C0A14]'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Agency &amp; WhatsApp Settings</span>
          </button>

          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'whatsapp'
                ? 'bg-[#FFC709] text-[#32040B]'
                : 'text-amber-100 hover:bg-[#4C0A14]'
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp Quick Test</span>
          </button>
        </div>

        {/* Save Notification Toast */}
        {saveNotification && (
          <div className="bg-emerald-600 text-white text-xs font-bold py-2 px-4 text-center flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{saveNotification}</span>
          </div>
        )}

        {/* Tab Contents */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-gray-50 text-gray-900">
          
          {/* TAB 1: Inquiries */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">
                    Live Travel Inquiries
                  </h3>
                  <p className="text-xs text-gray-500">
                    Track requests received via the website and custom Umrah calculator.
                  </p>
                </div>

                <button
                  onClick={exportInquiriesCSV}
                  className="px-3.5 py-2 rounded-lg bg-[#4C0A14] text-[#FFC709] hover:bg-[#5C0E1C] text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Inquiries CSV</span>
                </button>
              </div>

              {inquiries.length === 0 ? (
                <div className="p-12 text-center text-gray-500 bg-white rounded-xl border border-gray-200">
                  No inquiries recorded yet. Test the custom calculator or inquiry form on the website!
                </div>
              ) : (
                <div className="space-y-3">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#4C0A14] text-sm">
                            {inq.fullName}
                          </span>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                            {inq.serviceType}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-gray-500">{inq.createdAt}</span>
                          <select
                            value={inq.status}
                            onChange={(e) => handleUpdateStatus(inq.id, e.target.value as any)}
                            className={`text-xs font-bold px-2 py-1 rounded border ${
                              inq.status === 'Confirmed'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : inq.status === 'Contacted'
                                ? 'bg-blue-50 text-blue-800 border-blue-300'
                                : inq.status === 'Quoted'
                                ? 'bg-amber-50 text-amber-800 border-amber-300'
                                : 'bg-red-50 text-red-800 border-red-300'
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Quoted">Quoted</option>
                            <option value="Confirmed">Confirmed</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-gray-700">
                        <div>
                          <strong>Phone:</strong> {inq.phone}
                        </div>
                        <div>
                          <strong>Travelers:</strong> {inq.travelersCount} Person(s)
                        </div>
                        <div>
                          <strong>Travel Date:</strong> {inq.travelDate || 'Flexible'}
                        </div>
                      </div>

                      {inq.notes && (
                        <div className="p-2.5 bg-gray-50 rounded text-xs text-gray-600 border border-gray-100">
                          <strong>Details:</strong> {inq.notes}
                        </div>
                      )}

                      <div className="flex items-center gap-2 pt-1">
                        <a
                          href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Salam ${inq.fullName}! This is Brothers International Travel & Tours following up on your ${inq.serviceType} inquiry.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-[#25D366] text-white text-xs font-bold inline-flex items-center gap-1.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-white" />
                          <span>Direct WhatsApp Reply</span>
                        </a>

                        <a
                          href={`tel:${inq.phone}`}
                          className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold inline-flex items-center gap-1.5"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Call Traveler</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Manage Umrah Packages */}
          {activeTab === 'packages' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-900 text-sm">
                  Live Umrah Package Pricing &amp; Hotel Proximity
                </h3>
                <p className="text-xs text-gray-500">
                  Adjust Saudi Riyal (SAR) rates. Multi-currency conversions update automatically on the website.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {packageList.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4"
                  >
                    <div className="flex items-center justify-between border-b pb-2">
                      <div>
                        <h4 className="font-bold text-[#4C0A14] text-base font-serif-luxury">
                          {pkg.title}
                        </h4>
                        <span className="text-xs text-gray-500">
                          {pkg.makkahHotel} &amp; {pkg.madinahHotel}
                        </span>
                      </div>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                        {pkg.durationNights} Nights
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div>
                        <label className="block text-gray-600 font-semibold mb-1">
                          Quad Rate (SAR)
                        </label>
                        <input
                          type="number"
                          value={pkg.quadPriceSAR}
                          onChange={(e) =>
                            handlePackagePriceChange(pkg.id, 'quadPriceSAR', Number(e.target.value))
                          }
                          className="w-full px-2.5 py-1.5 border rounded font-bold text-gray-900 focus:outline-none focus:border-[#4C0A14]"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-600 font-semibold mb-1">
                          Triple Rate (SAR)
                        </label>
                        <input
                          type="number"
                          value={pkg.triplePriceSAR}
                          onChange={(e) =>
                            handlePackagePriceChange(pkg.id, 'triplePriceSAR', Number(e.target.value))
                          }
                          className="w-full px-2.5 py-1.5 border rounded font-bold text-gray-900 focus:outline-none focus:border-[#4C0A14]"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-600 font-semibold mb-1">
                          Double Rate (SAR)
                        </label>
                        <input
                          type="number"
                          value={pkg.doublePriceSAR}
                          onChange={(e) =>
                            handlePackagePriceChange(pkg.id, 'doublePriceSAR', Number(e.target.value))
                          }
                          className="w-full px-2.5 py-1.5 border rounded font-bold text-gray-900 focus:outline-none focus:border-[#4C0A14]"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-600 font-semibold mb-1">
                          Single Rate (SAR)
                        </label>
                        <input
                          type="number"
                          value={pkg.singlePriceSAR}
                          onChange={(e) =>
                            handlePackagePriceChange(pkg.id, 'singlePriceSAR', Number(e.target.value))
                          }
                          className="w-full px-2.5 py-1.5 border rounded font-bold text-gray-900 focus:outline-none focus:border-[#4C0A14]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Agency Settings */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <div>
                <h3 className="font-bold text-gray-900 text-sm">
                  Official Business Details
                </h3>
                <p className="text-xs text-gray-500">
                  Update agency phone numbers, WhatsApp dispatch number, address, and license.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Agency Legal Name
                  </label>
                  <input
                    type="text"
                    value={tempSettings.agencyName}
                    disabled
                    className="w-full px-3 py-2 text-xs bg-gray-100 rounded border text-gray-600 cursor-not-allowed"
                  />
                  <span className="text-[10px] text-gray-400">Locked to official registered brand identity</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Official Tagline
                  </label>
                  <input
                    type="text"
                    value={tempSettings.tagline}
                    disabled
                    className="w-full px-3 py-2 text-xs bg-gray-100 rounded border text-gray-600 cursor-not-allowed"
                  />
                  <span className="text-[10px] text-gray-400">Preserved as "Since 2024"</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    WhatsApp Routing Number (No + or spaces) *
                  </label>
                  <input
                    type="text"
                    value={tempSettings.whatsappNumber}
                    onChange={(e) =>
                      setTempSettings({ ...tempSettings, whatsappNumber: e.target.value })
                    }
                    placeholder="e.g. 966548219904"
                    className="w-full px-3 py-2 text-xs border rounded focus:border-[#4C0A14]"
                  />
                  <span className="text-[10px] text-gray-500">Used for all WhatsApp enquiry links</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    WhatsApp Display Number *
                  </label>
                  <input
                    type="text"
                    value={tempSettings.whatsappDisplay}
                    onChange={(e) =>
                      setTempSettings({ ...tempSettings, whatsappDisplay: e.target.value })
                    }
                    placeholder="e.g. +966 54 821 9904"
                    className="w-full px-3 py-2 text-xs border rounded focus:border-[#4C0A14]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Helpline Phone Number
                  </label>
                  <input
                    type="text"
                    value={tempSettings.primaryPhone}
                    onChange={(e) =>
                      setTempSettings({ ...tempSettings, primaryPhone: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border rounded focus:border-[#4C0A14]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Official Email
                  </label>
                  <input
                    type="email"
                    value={tempSettings.email}
                    onChange={(e) =>
                      setTempSettings({ ...tempSettings, email: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs border rounded focus:border-[#4C0A14]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Office Address
                </label>
                <input
                  type="text"
                  value={tempSettings.address}
                  onChange={(e) =>
                    setTempSettings({ ...tempSettings, address: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs border rounded focus:border-[#4C0A14]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Operating Hours
                </label>
                <input
                  type="text"
                  value={tempSettings.operatingHours}
                  onChange={(e) =>
                    setTempSettings({ ...tempSettings, operatingHours: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs border rounded focus:border-[#4C0A14]"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#4C0A14] hover:bg-[#5C0E1C] text-[#FFC709] font-bold text-xs flex items-center gap-2 cursor-pointer shadow"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Configuration Changes</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 4: WhatsApp Message Preview */}
          {activeTab === 'whatsapp' && (
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <div>
                <h3 className="font-bold text-gray-900 text-sm">
                  WhatsApp Inquiry Format Live Preview
                </h3>
                <p className="text-xs text-gray-500">
                  Verify how customer quotation links render when pilgrims tap any WhatsApp enquiry button.
                </p>
              </div>

              <div className="bg-[#EFEAE2] p-4 rounded-xl border border-gray-300 max-w-md mx-auto space-y-2">
                <div className="bg-[#DCF8C6] p-3 rounded-lg text-xs text-gray-800 shadow-sm leading-relaxed">
                  <div className="font-bold text-emerald-900 mb-1">
                    Salam Brothers International Travel &amp; Tours!
                  </div>
                  <div>
                    I would like to book the <strong>"5-Star VIP Executive Umrah"</strong> (DOUBLE sharing at SAR 6,850 per person).
                  </div>
                  <div className="mt-1 text-[11px] text-gray-600">
                    Travel Window: December 2026<br />
                    Travelers: 2 Adults
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 text-right">
                  Delivered to: {agencySettings.whatsappDisplay}
                </div>
              </div>

              <div className="text-center pt-2">
                <a
                  href={`https://wa.me/${agencySettings.whatsappNumber}?text=${encodeURIComponent(
                    'Salam Brothers International Travel & Tours! Testing live WhatsApp integration from dashboard.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Test Send Message to {agencySettings.whatsappDisplay}</span>
                </a>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-3 sm:p-4 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
          <span>Brothers International Travel &amp; Tours Management Portal</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold"
          >
            Close Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};

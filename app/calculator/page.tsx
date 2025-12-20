'use client';

import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft,
  Check,
  Star,
  Award,
  Trophy,
  Clock,
  Send,
  Loader2,
  Download,
  Video,
  Mic,
  Share2,
  Globe,
  Sparkles,
  Users,
  Eye,
  Shield,
} from 'lucide-react';
import { CalculatorProvider, useCalculator } from '@/components/calculator/CalculatorContext';

// PDF will be generated on-demand when button is clicked

// Feature icon mapping
const featureIcons: Record<string, typeof Check> = {
  'ლოგო': Video,
  'ვიდეო': Video,
  'მოხსენიება': Mic,
  'სოციალური': Share2,
  'ვებსაიტ': Globe,
  'ინტერვიუ': Sparkles,
  'პრიორიტეტ': Star,
  'წუთი': Mic,
  'პოსტ': Share2,
};

const getFeatureIcon = (feature: string) => {
  const lowerFeature = feature.toLowerCase();
  for (const [key, Icon] of Object.entries(featureIcons)) {
    if (lowerFeature.includes(key)) return Icon;
  }
  return Check;
};

function CalculatorContent() {
  const {
    packages,
    durations,
    services,
    episodeCounts,
    loading,
    mode,
    selectedPackage,
    selectedDuration,
    selectedServices,
    selectedEpisodeCount,
    originalPrice,
    monthlyPrice,
    totalPrice,
    discountAmount,
    discountPercent,
    setMode,
    selectPackage,
    selectDuration,
    toggleService,
    selectEpisodeCount,
  } = useCalculator();

  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [generatingPdf, setGeneratingPdf] = useState(false);

  const packageSectionRef = useRef<HTMLDivElement>(null);
  const durationSectionRef = useRef<HTMLDivElement>(null);
  const summarySectionRef = useRef<HTMLDivElement>(null);
  const serviceSectionRef = useRef<HTMLDivElement>(null);
  const episodeSectionRef = useRef<HTMLDivElement>(null);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleModeSelect = (newMode: 'subscription' | 'one_time') => {
    setMode(newMode);
    if (newMode === 'subscription') {
      scrollToRef(packageSectionRef);
    } else {
      scrollToRef(serviceSectionRef);
    }
  };

  const handlePackageSelect = (pkg: typeof selectedPackage) => {
    selectPackage(pkg);
    scrollToRef(durationSectionRef);
  };

  const handleDurationSelect = (duration: typeof selectedDuration) => {
    selectDuration(duration);
    scrollToRef(summarySectionRef);
  };

  const handleEpisodeSelect = (episode: typeof selectedEpisodeCount) => {
    selectEpisodeCount(episode);
    scrollToRef(summarySectionRef);
  };

  const handleDownloadPdf = async () => {
    if (!mode) return;

    setGeneratingPdf(true);
    try {
      // Dynamically import PDF modules only when needed
      const [{ pdf }, { ProposalPDF, registerFonts }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('@/components/calculator/ProposalPDF'),
      ]);

      // Register fonts with full URL (required for @react-pdf/renderer in browser)
      const baseUrl = window.location.origin;
      registerFonts(baseUrl);

      const doc = (
        <ProposalPDF
          mode={mode as 'subscription' | 'one_time'}
          packageName={selectedPackage?.name}
          packageType={selectedPackage?.type}
          features={selectedPackage?.features?.map(f => f.feature) || []}
          durationLabel={selectedDuration?.label}
          durationMonths={selectedDuration?.months}
          services={selectedServices.map(s => s.name)}
          episodeCount={selectedEpisodeCount?.count}
          originalPrice={originalPrice}
          finalPrice={totalPrice}
          monthlyPrice={monthlyPrice}
          savings={discountAmount}
        />
      );

      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `KP-Sponsorship-Proposal-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('PDF generation error:', err);
    } finally {
      setGeneratingPdf(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const response = await fetch('/api/calculator/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          calculatorMode: mode,
          selectedPackage: selectedPackage?.type,
          selectedPackageName: selectedPackage?.name,
          durationMonths: selectedDuration?.months,
          selectedServices: selectedServices.map(s => s.name),
          episodeCount: selectedEpisodeCount?.count,
          monthlyPrice,
          totalPrice,
          discountAmount,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError(data.error || 'დაფიქსირდა შეცდომა');
      }
    } catch (err) {
      setError('დაფიქსირდა შეცდომა, გთხოვთ სცადოთ მოგვიანებით');
    } finally {
      setSubmitting(false);
    }
  };

  const formatPrice = (price: number) => price.toLocaleString('ka-GE');

  const getPackageIcon = (type: string) => {
    switch (type) {
      case 'bronze': return Star;
      case 'silver': return Award;
      case 'gold': return Trophy;
      default: return Star;
    }
  };

  // Sort packages to ensure silver is in the middle
  const sortedPackages = useMemo(() => {
    return [...packages].sort((a, b) => {
      const order = { bronze: 0, silver: 1, gold: 2 };
      return (order[a.type as keyof typeof order] ?? 0) - (order[b.type as keyof typeof order] ?? 0);
    });
  }, [packages]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
            <Check className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">მოთხოვნა გაგზავნილია!</h2>
          <p className="text-zinc-400 mb-8">
            გმადლობთ თქვენი ინტერესისთვის. მალე დაგიკავშირდებით.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            მთავარ გვერდზე დაბრუნება
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm hidden sm:inline">უკან</span>
          </Link>
          <h1 className="text-lg font-bold text-white">სპონსორობის კონფიგურატორი</h1>
          <div className="w-16"></div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-zinc-800/50 rounded-full border border-zinc-700">
              <Eye className="w-4 h-4 text-amber-500" />
              <span className="text-sm text-zinc-300">3.3M+ ნახვა</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-zinc-800/50 rounded-full border border-zinc-700">
              <Users className="w-4 h-4 text-amber-500" />
              <span className="text-sm text-zinc-300">Premium აუდიტორია</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            შექმენით თქვენი პარტნიორობა
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            აირჩიეთ თანამშრომლობის ტიპი და მიიღეთ პერსონალიზებული შეთავაზება
          </p>
        </motion.div>

        {/* Step 1: Mode Selection - Glossy Segmented Toggle */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="relative max-w-lg mx-auto">
            <div className="relative bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-2xl p-1.5">
              {/* Sliding Background */}
              <motion.div
                className="absolute inset-y-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30"
                initial={false}
                animate={{
                  left: mode === 'subscription' || mode === null ? '6px' : '50%',
                  right: mode === 'one_time' ? '6px' : '50%',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                style={{ display: mode ? 'block' : 'none' }}
              />

              <div className="relative grid grid-cols-2 gap-1">
                <button
                  onClick={() => handleModeSelect('subscription')}
                  className={`relative z-10 px-4 py-4 rounded-xl transition-all duration-300 ${
                    mode === 'subscription' ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-semibold">გრძელვადიანი პარტნიორი</span>
                    <span className={`text-xs ${mode === 'subscription' ? 'text-amber-400' : 'text-zinc-500'}`}>
                      საუკეთესო ღირებულება
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => handleModeSelect('one_time')}
                  className={`relative z-10 px-4 py-4 rounded-xl transition-all duration-300 ${
                    mode === 'one_time' ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-semibold">ერთჯერადი ფიჩერი</span>
                    <span className={`text-xs ${mode === 'one_time' ? 'text-amber-400' : 'text-zinc-500'}`}>
                      მოქნილი ვარიანტი
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Step 2: Package Selection (Subscription Mode) */}
        <AnimatePresence mode="wait">
          {mode === 'subscription' && (
            <motion.section
              ref={packageSectionRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-12"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">აირჩიეთ თქვენი პაკეტი</h3>
                <p className="text-zinc-500">სრული სპონსორობის პაკეტები ფასდაკლებით</p>
              </div>

              <div className="grid md:grid-cols-3 gap-4 md:gap-6 items-start pt-4">
                {sortedPackages.map((pkg, index) => {
                  const Icon = getPackageIcon(pkg.type);
                  const isSelected = selectedPackage?.id === pkg.id;
                  const isSilver = pkg.type === 'silver';
                  const isGold = pkg.type === 'gold';

                  return (
                    <motion.button
                      key={pkg.id}
                      onClick={() => handlePackageSelect(pkg)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: isSilver ? 1.03 : 1.01, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: index * 0.1 }}
                      className={`relative text-left rounded-2xl border-2 transition-all duration-300 ${
                        isSilver ? 'md:scale-105 md:z-10' : ''
                      } ${
                        isSelected
                          ? 'border-amber-500 shadow-lg shadow-amber-500/20'
                          : isSilver
                          ? 'border-zinc-500 hover:border-zinc-400 shadow-[0_0_40px_-10px_rgba(148,163,184,0.4)]'
                          : 'border-zinc-800 hover:border-zinc-700'
                      } ${
                        isGold
                          ? 'bg-gradient-to-br from-yellow-500/10 via-zinc-900 to-zinc-900'
                          : isSilver
                          ? 'bg-gradient-to-br from-zinc-700/30 via-zinc-900 to-zinc-900'
                          : 'bg-zinc-900'
                      }`}
                    >
                      {/* Recommended Badge for Silver */}
                      {isSilver && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full text-xs font-bold text-black z-10">
                          რეკომენდებული
                        </div>
                      )}

                      <div className="p-6">
                        {/* Tag */}
                        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 ${pkg.tag_classes}`}>
                          {pkg.tag}
                        </span>

                        {/* Icon & Name */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`p-2.5 rounded-xl ${
                            isSelected ? 'bg-amber-500/20 text-amber-500' : 'bg-zinc-800 text-zinc-400'
                          }`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <h4 className="text-xl font-bold text-white">{pkg.name}</h4>
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                          <span className="text-3xl font-bold text-amber-500">{formatPrice(Number(pkg.base_price))}</span>
                          <span className="text-zinc-500 ml-1">₾/თვე</span>
                        </div>

                        {/* Features with Icons */}
                        <ul className="space-y-3">
                          {pkg.features?.map((feature) => {
                            const FeatureIcon = getFeatureIcon(feature.feature);
                            return (
                              <li key={feature.id} className="flex items-start gap-3">
                                <FeatureIcon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                                  isSelected ? 'text-amber-500' : 'text-green-500'
                                }`} />
                                <span className="text-sm text-zinc-300">{feature.feature}</span>
                              </li>
                            );
                          })}
                        </ul>

                        {/* Selection Indicator */}
                        {isSelected && (
                          <div className="mt-6 flex items-center justify-center gap-2 text-amber-500 font-medium">
                            <Check className="w-5 h-5" />
                            არჩეულია
                          </div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Step 2: Service Selection (One-Time Mode) */}
        <AnimatePresence>
          {mode === 'one_time' && (
            <motion.section
              ref={serviceSectionRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-12"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">აირჩიეთ სერვისები</h3>
                <p className="text-zinc-500">შეარჩიეთ თქვენთვის სასურველი სერვისები</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {services.map((service, index) => {
                  const isSelected = selectedServices.some(s => s.id === service.id);

                  return (
                    <motion.button
                      key={service.id}
                      onClick={() => toggleService(service)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-5 rounded-xl border-2 transition-all text-left ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500/10'
                          : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-white mb-1">{service.name}</h4>
                          {service.description && (
                            <p className="text-sm text-zinc-500">{service.description}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-3 ml-4">
                          <span className="text-lg font-bold text-amber-500">{formatPrice(Number(service.price))} ₾</span>
                          <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                            isSelected ? 'border-amber-500 bg-amber-500' : 'border-zinc-600'
                          }`}>
                            {isSelected && <Check className="w-4 h-4 text-black" />}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Episode Count Selection */}
              {selectedServices.length > 0 && (
                <motion.div
                  ref={episodeSectionRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">რამდენი ეპიზოდი?</h3>
                    <p className="text-zinc-500 text-sm">მეტი ეპიზოდი = მეტი ფასდაკლება</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {episodeCounts.map((ep) => {
                      const isSelected = selectedEpisodeCount?.id === ep.id;

                      return (
                        <motion.button
                          key={ep.id}
                          onClick={() => handleEpisodeSelect(ep)}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                          className={`p-4 rounded-xl border-2 transition-all text-center ${
                            isSelected
                              ? 'border-amber-500 bg-amber-500/10'
                              : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
                          }`}
                        >
                          <p className="text-lg font-bold text-white">{ep.label}</p>
                          {ep.discount_percent > 0 && (
                            <span className="inline-block mt-2 px-2.5 py-1 text-xs font-bold bg-green-500/20 text-green-400 rounded-full">
                              დაზოგე {ep.discount_percent}%
                            </span>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </motion.section>
          )}
        </AnimatePresence>

        {/* Step 3: Duration Selection (Subscription only) */}
        <AnimatePresence>
          {mode === 'subscription' && selectedPackage && (
            <motion.section
              ref={durationSectionRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-12"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">აირჩიეთ ხანგრძლივობა</h3>
                <p className="text-zinc-500">გრძელვადიანი კონტრაქტი = მეტი დანაზოგი</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {durations.map((duration) => {
                  const isSelected = selectedDuration?.id === duration.id;
                  const basePrice = Number(selectedPackage.base_price);
                  const totalOriginal = basePrice * duration.months;
                  const discounted = totalOriginal - (totalOriginal * duration.discount_percent / 100);
                  const savings = totalOriginal - discounted;
                  const isBestValue = duration.months === 12;

                  return (
                    <motion.button
                      key={duration.id}
                      onClick={() => handleDurationSelect(duration)}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      className={`relative p-5 rounded-xl border-2 transition-all text-center ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500/10'
                          : isBestValue
                          ? 'border-green-500/50 bg-green-500/5 hover:border-green-500/70'
                          : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
                      }`}
                    >
                      {/* Best Value Badge */}
                      {isBestValue && (
                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-bold bg-green-500 text-black rounded-full whitespace-nowrap">
                            <Sparkles className="w-2.5 h-2.5" />
                            საუკეთესო
                          </span>
                        </div>
                      )}

                      <Clock className={`w-5 h-5 mx-auto mb-2 ${isSelected ? 'text-amber-500' : isBestValue ? 'text-green-400' : 'text-zinc-500'}`} />
                      <p className="text-lg font-bold text-white mb-2">{duration.label}</p>

                      {duration.discount_percent > 0 ? (
                        <>
                          <p className="text-sm text-red-400 line-through">{formatPrice(totalOriginal)} ₾</p>
                          <p className="text-lg font-bold text-green-400">{formatPrice(Math.round(discounted))} ₾</p>
                          <span className="inline-block mt-2 px-2 py-1 text-xs font-bold bg-green-500/20 text-green-400 rounded-full">
                            დაზოგავთ {formatPrice(Math.round(savings))} ₾
                          </span>
                        </>
                      ) : (
                        <p className="text-lg font-bold text-white">{formatPrice(totalOriginal)} ₾</p>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <p className="text-sm text-zinc-500 mt-4 text-center">
                1 თვე = 4 ეპიზოდი
              </p>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Price Summary - Custom Proposal Card */}
        <AnimatePresence>
          {totalPrice > 0 && (
            <motion.section
              ref={summarySectionRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-12"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800">
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-transparent to-amber-500/20 opacity-50" />

                <div className="relative p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-amber-500/20 rounded-lg">
                      <Shield className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">თქვენი პერსონალური შეთავაზება</h3>
                      <p className="text-sm text-zinc-500">Custom Proposal</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Selected Options */}
                    <div>
                      <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">არჩეული პარამეტრები</h4>
                      <ul className="space-y-3">
                        {mode === 'subscription' ? (
                          <>
                            <li className="flex items-center justify-between text-zinc-300">
                              <span className="text-zinc-500">პაკეტი:</span>
                              <span className="font-medium text-white">{selectedPackage?.name}</span>
                            </li>
                            <li className="flex items-center justify-between text-zinc-300">
                              <span className="text-zinc-500">ხანგრძლივობა:</span>
                              <span className="font-medium text-white">{selectedDuration?.label}</span>
                            </li>
                            <li className="flex items-center justify-between text-zinc-300">
                              <span className="text-zinc-500">თვიური ფასი:</span>
                              <span className="font-medium text-white">{formatPrice(monthlyPrice)} ₾</span>
                            </li>
                          </>
                        ) : (
                          <>
                            <li className="text-zinc-300">
                              <span className="text-zinc-500 block mb-2">სერვისები:</span>
                              <ul className="space-y-1 ml-2">
                                {selectedServices.map(s => (
                                  <li key={s.id} className="flex items-center gap-2 text-sm">
                                    <Check className="w-3 h-3 text-green-500" />
                                    {s.name}
                                  </li>
                                ))}
                              </ul>
                            </li>
                            <li className="flex items-center justify-between text-zinc-300">
                              <span className="text-zinc-500">ეპიზოდები:</span>
                              <span className="font-medium text-white">{selectedEpisodeCount?.label}</span>
                            </li>
                            <li className="flex items-center justify-between text-zinc-300">
                              <span className="text-zinc-500">ფასი/ეპიზოდი:</span>
                              <span className="font-medium text-white">{formatPrice(monthlyPrice)} ₾</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>

                    {/* Price Summary */}
                    <div className="bg-zinc-800/50 rounded-xl p-6">
                      <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">ჯამური ინვესტიცია</h4>

                      {discountAmount > 0 && (
                        <>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-zinc-500">ორიგინალი ფასი:</span>
                            <span className="text-lg text-red-400 line-through">{formatPrice(originalPrice)} ₾</span>
                          </div>
                          <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg text-sm font-bold">
                              დაზოგავთ {formatPrice(discountAmount)} ₾ ({discountPercent}%)
                            </span>
                          </div>
                        </>
                      )}

                      <div className="flex items-end justify-between mb-6">
                        <span className="text-zinc-400">ჯამი:</span>
                        <span className="text-4xl font-bold text-green-400">{formatPrice(totalPrice)} <span className="text-lg">₾</span></span>
                      </div>

                      {/* CTAs */}
                      <div className="space-y-3">
                        <motion.button
                          onClick={() => setShowContactForm(true)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold rounded-xl transition-all shadow-lg shadow-amber-500/25"
                        >
                          <Sparkles className="w-5 h-5" />
                          პარტნიორობის დაწყება
                        </motion.button>

                        <button
                          onClick={handleDownloadPdf}
                          disabled={generatingPdf}
                          className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {generatingPdf ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <>
                              <Download className="w-5 h-5" />
                              PDF-ის ჩამოტვირთვა
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="flex flex-wrap items-center justify-center gap-4 mt-8 pt-6 border-t border-zinc-800">
                    <div className="flex items-center gap-2 text-zinc-500 text-sm">
                      <Eye className="w-4 h-4" />
                      <span>3.3M+ ნახვა</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-500 text-sm">
                      <Users className="w-4 h-4" />
                      <span>100K+ აქტიური მომხმარებელი</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-500 text-sm">
                      <Shield className="w-4 h-4" />
                      <span>გარანტირებული ROI</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Contact Form Modal */}
        <AnimatePresence>
          {showContactForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={(e) => {
                if (e.target === e.currentTarget) setShowContactForm(false);
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-amber-500/20 rounded-lg">
                    <Send className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">დაასრულეთ მოთხოვნა</h3>
                    <p className="text-sm text-zinc-500">მალე დაგიკავშირდებით</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">სახელი *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-amber-500 transition-colors"
                        placeholder="თქვენი სახელი"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">კომპანია</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-amber-500 transition-colors"
                        placeholder="კომპანიის სახელი"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">ელ-ფოსტა *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-amber-500 transition-colors"
                        placeholder="email@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">ტელეფონი</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-amber-500 transition-colors"
                        placeholder="+995 XXX XXX XXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">დამატებითი ინფორმაცია</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
                      placeholder="თქვენი კომენტარი ან კითხვა..."
                    />
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm">{error}</p>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowContactForm(false)}
                      className="flex-1 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl transition-colors"
                    >
                      გაუქმება
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:opacity-50 text-black font-bold rounded-xl transition-all"
                    >
                      {submitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          გაგზავნა
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function CalculatorPage() {
  return (
    <CalculatorProvider>
      <CalculatorContent />
    </CalculatorProvider>
  );
}

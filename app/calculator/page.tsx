'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft,
  Package,
  Zap,
  Check,
  Star,
  Award,
  Trophy,
  Clock,
  Send,
  Loader2,
  ChevronRight
} from 'lucide-react';
import { CalculatorProvider, useCalculator } from '@/components/calculator/CalculatorContext';

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
    monthlyPrice,
    totalPrice,
    discountAmount,
    setMode,
    selectPackage,
    selectDuration,
    toggleService,
    selectEpisodeCount,
    reset,
  } = useCalculator();

  const [step, setStep] = useState(1);
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
    setStep(2);
    if (newMode === 'subscription') {
      scrollToRef(packageSectionRef);
    } else {
      scrollToRef(serviceSectionRef);
    }
  };

  const handlePackageSelect = (pkg: typeof selectedPackage) => {
    selectPackage(pkg);
    setStep(3);
    scrollToRef(durationSectionRef);
  };

  const handleDurationSelect = (duration: typeof selectedDuration) => {
    selectDuration(duration);
    setStep(4);
    scrollToRef(summarySectionRef);
  };

  const handleServiceToggle = (service: typeof services[0]) => {
    toggleService(service);
  };

  const handleEpisodeSelect = (episode: typeof selectedEpisodeCount) => {
    selectEpisodeCount(episode);
    setStep(4);
    scrollToRef(summarySectionRef);
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

  const formatPrice = (price: number) => {
    return price.toLocaleString('ka-GE');
  };

  const getPackageIcon = (type: string) => {
    switch (type) {
      case 'bronze': return Star;
      case 'silver': return Award;
      case 'gold': return Trophy;
      default: return Package;
    }
  };

  const getPackageGradient = (type: string) => {
    switch (type) {
      case 'bronze': return 'from-amber-700/20 to-amber-900/10 border-amber-700/30';
      case 'silver': return 'from-zinc-400/20 to-zinc-600/10 border-zinc-500/30';
      case 'gold': return 'from-yellow-500/20 to-yellow-700/10 border-yellow-500/30';
      default: return 'from-zinc-800 to-zinc-900 border-zinc-700';
    }
  };

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
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">უკან</span>
          </Link>
          <h1 className="text-lg font-bold text-white">სპონსორობის კალკულატორი</h1>
          <div className="w-16"></div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        {/* Intro Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-500 bg-amber-500/10 rounded-full mb-4">
            თანამშრომლობა
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            აირჩიეთ თქვენთვის სასურველი ვარიანტი
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            გამოთვალეთ თქვენი სპონსორობის ღირებულება და მიიღეთ პერსონალიზებული შეთავაზება
          </p>
        </motion.div>

        {/* Step 1: Mode Selection */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500 text-black font-bold text-sm">1</span>
            <h3 className="text-xl font-semibold text-white">აირჩიეთ თანამშრომლობის ტიპი</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={() => handleModeSelect('subscription')}
              className={`p-6 rounded-xl border-2 transition-all text-left ${
                mode === 'subscription'
                  ? 'border-amber-500 bg-amber-500/10'
                  : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-lg ${mode === 'subscription' ? 'bg-amber-500/20 text-amber-500' : 'bg-zinc-800 text-zinc-400'}`}>
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">სააბონემენტო პაკეტი</h4>
                  <p className="text-sm text-zinc-500">გრძელვადიანი თანამშრომლობა</p>
                </div>
              </div>
              <p className="text-zinc-400 text-sm">
                აირჩიეთ Bronze, Silver ან Gold პაკეტი და მიიღეთ ფასდაკლება გრძელვადიან კონტრაქტზე
              </p>
            </button>

            <button
              onClick={() => handleModeSelect('one_time')}
              className={`p-6 rounded-xl border-2 transition-all text-left ${
                mode === 'one_time'
                  ? 'border-amber-500 bg-amber-500/10'
                  : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-lg ${mode === 'one_time' ? 'bg-amber-500/20 text-amber-500' : 'bg-zinc-800 text-zinc-400'}`}>
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">ერთჯერადი სერვისები</h4>
                  <p className="text-sm text-zinc-500">ინდივიდუალური განთავსებები</p>
                </div>
              </div>
              <p className="text-zinc-400 text-sm">
                აირჩიეთ კონკრეტული სერვისები და ეპიზოდების რაოდენობა თქვენი საჭიროებისამებრ
              </p>
            </button>
          </div>
        </motion.section>

        {/* Step 2: Package/Service Selection */}
        <AnimatePresence mode="wait">
          {mode === 'subscription' && (
            <motion.section
              ref={packageSectionRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${step >= 2 ? 'bg-amber-500 text-black' : 'bg-zinc-800 text-zinc-400'}`}>2</span>
                <h3 className="text-xl font-semibold text-white">აირჩიეთ პაკეტი</h3>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {packages.map((pkg) => {
                  const Icon = getPackageIcon(pkg.type);
                  const isSelected = selectedPackage?.id === pkg.id;

                  return (
                    <button
                      key={pkg.id}
                      onClick={() => handlePackageSelect(pkg)}
                      className={`relative p-6 rounded-xl border-2 transition-all text-left bg-gradient-to-br ${getPackageGradient(pkg.type)} ${
                        isSelected ? 'border-amber-500 ring-2 ring-amber-500/30' : 'hover:border-zinc-600'
                      }`}
                    >
                      <span className={`absolute top-4 right-4 px-2 py-0.5 text-xs font-medium rounded-full ${pkg.tag_classes}`}>
                        {pkg.tag}
                      </span>

                      <div className={`p-3 rounded-lg inline-block mb-4 ${isSelected ? 'bg-amber-500/20 text-amber-500' : 'bg-zinc-800/50 text-zinc-400'}`}>
                        <Icon className="w-6 h-6" />
                      </div>

                      <h4 className="text-lg font-semibold text-white mb-2">{pkg.name}</h4>

                      <p className="text-2xl font-bold text-amber-500 mb-4">
                        {formatPrice(pkg.base_price)} <span className="text-sm font-normal text-zinc-500">₾/თვე</span>
                      </p>

                      <ul className="space-y-2">
                        {pkg.features.map((feature) => (
                          <li key={feature.id} className="flex items-start gap-2 text-sm text-zinc-400">
                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {feature.feature}
                          </li>
                        ))}
                      </ul>
                    </button>
                  );
                })}
              </div>
            </motion.section>
          )}

          {mode === 'one_time' && (
            <motion.section
              ref={serviceSectionRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${step >= 2 ? 'bg-amber-500 text-black' : 'bg-zinc-800 text-zinc-400'}`}>2</span>
                <h3 className="text-xl font-semibold text-white">აირჩიეთ სერვისები</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {services.map((service) => {
                  const isSelected = selectedServices.some(s => s.id === service.id);

                  return (
                    <button
                      key={service.id}
                      onClick={() => handleServiceToggle(service)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500/10'
                          : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-white mb-1">{service.name}</h4>
                          {service.description && (
                            <p className="text-sm text-zinc-500">{service.description}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-amber-500 font-semibold">{formatPrice(service.price)} ₾</span>
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            isSelected ? 'border-amber-500 bg-amber-500' : 'border-zinc-600'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 text-black" />}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedServices.length > 0 && (
                <motion.div
                  ref={episodeSectionRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${step >= 3 ? 'bg-amber-500 text-black' : 'bg-zinc-800 text-zinc-400'}`}>3</span>
                    <h3 className="text-xl font-semibold text-white">აირჩიეთ ეპიზოდების რაოდენობა</h3>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {episodeCounts.map((ep) => {
                      const isSelected = selectedEpisodeCount?.id === ep.id;

                      return (
                        <button
                          key={ep.id}
                          onClick={() => handleEpisodeSelect(ep)}
                          className={`p-4 rounded-xl border-2 transition-all text-center ${
                            isSelected
                              ? 'border-amber-500 bg-amber-500/10'
                              : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
                          }`}
                        >
                          <p className="text-lg font-semibold text-white">{ep.label}</p>
                          {ep.discount_percent > 0 && (
                            <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-green-500/20 text-green-400 rounded-full">
                              -{ep.discount_percent}%
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </motion.section>
          )}
        </AnimatePresence>

        {/* Step 3: Duration (Subscription only) */}
        <AnimatePresence>
          {mode === 'subscription' && selectedPackage && (
            <motion.section
              ref={durationSectionRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${step >= 3 ? 'bg-amber-500 text-black' : 'bg-zinc-800 text-zinc-400'}`}>3</span>
                <h3 className="text-xl font-semibold text-white">აირჩიეთ ხანგრძლივობა</h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {durations.map((duration) => {
                  const isSelected = selectedDuration?.id === duration.id;

                  return (
                    <button
                      key={duration.id}
                      onClick={() => handleDurationSelect(duration)}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500/10'
                          : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
                      }`}
                    >
                      <Clock className={`w-5 h-5 mx-auto mb-2 ${isSelected ? 'text-amber-500' : 'text-zinc-500'}`} />
                      <p className="text-lg font-semibold text-white">{duration.label}</p>
                      {duration.discount_percent > 0 && (
                        <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-green-500/20 text-green-400 rounded-full">
                          -{duration.discount_percent}%
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <p className="text-sm text-zinc-500 mt-4 text-center">
                1 თვე = 4 ეპიზოდი
              </p>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Price Summary */}
        <AnimatePresence>
          {totalPrice > 0 && (
            <motion.section
              ref={summarySectionRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-12"
            >
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500 text-black font-bold text-sm">
                    {mode === 'subscription' ? '4' : '4'}
                  </span>
                  <h3 className="text-xl font-semibold text-white">თქვენი შეთავაზება</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">არჩეული პარამეტრები</h4>
                    <ul className="space-y-3">
                      {mode === 'subscription' ? (
                        <>
                          <li className="flex items-center justify-between text-zinc-300">
                            <span>პაკეტი:</span>
                            <span className="font-medium text-white">{selectedPackage?.name}</span>
                          </li>
                          <li className="flex items-center justify-between text-zinc-300">
                            <span>ხანგრძლივობა:</span>
                            <span className="font-medium text-white">{selectedDuration?.label}</span>
                          </li>
                          <li className="flex items-center justify-between text-zinc-300">
                            <span>თვიური ფასი:</span>
                            <span className="font-medium text-white">{formatPrice(monthlyPrice)} ₾</span>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="text-zinc-300">
                            <span className="text-zinc-500">სერვისები:</span>
                            <ul className="mt-2 space-y-1">
                              {selectedServices.map(s => (
                                <li key={s.id} className="flex items-center gap-2 text-sm">
                                  <Check className="w-3 h-3 text-green-500" />
                                  {s.name}
                                </li>
                              ))}
                            </ul>
                          </li>
                          <li className="flex items-center justify-between text-zinc-300">
                            <span>ეპიზოდები:</span>
                            <span className="font-medium text-white">{selectedEpisodeCount?.label}</span>
                          </li>
                          <li className="flex items-center justify-between text-zinc-300">
                            <span>ფასი/ეპიზოდი:</span>
                            <span className="font-medium text-white">{formatPrice(monthlyPrice)} ₾</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>

                  <div className="bg-zinc-800/50 rounded-xl p-6">
                    <h4 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">ჯამური ღირებულება</h4>

                    {discountAmount > 0 && (
                      <div className="flex items-center justify-between text-green-400 mb-2">
                        <span>ფასდაკლება:</span>
                        <span>-{formatPrice(discountAmount)} ₾</span>
                      </div>
                    )}

                    <div className="flex items-end justify-between">
                      <span className="text-zinc-400">ჯამი:</span>
                      <span className="text-4xl font-bold text-amber-500">{formatPrice(totalPrice)} <span className="text-lg">₾</span></span>
                    </div>

                    <button
                      onClick={() => setShowContactForm(true)}
                      className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-lg transition-colors"
                    >
                      შეთავაზების მოთხოვნა
                      <ChevronRight className="w-4 h-4" />
                    </button>
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-2">მოთხოვნის გაგზავნა</h3>
                <p className="text-zinc-400 mb-6">შეავსეთ ფორმა და ჩვენ დაგიკავშირდებით</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-zinc-400 mb-1">სახელი *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors"
                        placeholder="თქვენი სახელი"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-400 mb-1">კომპანია</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors"
                        placeholder="კომპანიის სახელი"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-zinc-400 mb-1">ელ-ფოსტა *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors"
                        placeholder="example@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-400 mb-1">ტელეფონი</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors"
                        placeholder="+995 XXX XXX XXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-1">დამატებითი შეტყობინება</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
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
                      className="flex-1 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg transition-colors"
                    >
                      გაუქმება
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/50 text-black font-semibold rounded-lg transition-colors"
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

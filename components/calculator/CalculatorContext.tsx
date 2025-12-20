'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PackageFeature {
  id: number;
  feature: string;
  sort_order: number;
}

interface Package {
  id: number;
  type: string;
  name: string;
  base_price: number;
  tag: string;
  tag_classes: string;
  features: PackageFeature[];
}

interface Duration {
  id: number;
  months: number;
  discount_percent: number;
  label: string;
}

interface Service {
  id: number;
  name: string;
  price: number;
  description: string | null;
}

interface EpisodeCount {
  id: number;
  count: number;
  discount_percent: number;
  label: string;
}

type CalculatorMode = 'subscription' | 'one_time' | null;

interface CalculatorState {
  // Data
  packages: Package[];
  durations: Duration[];
  services: Service[];
  episodeCounts: EpisodeCount[];
  loading: boolean;

  // Selection state
  mode: CalculatorMode;
  selectedPackage: Package | null;
  selectedDuration: Duration | null;
  selectedServices: Service[];
  selectedEpisodeCount: EpisodeCount | null;

  // Calculated prices
  originalPrice: number;
  monthlyPrice: number;
  totalPrice: number;
  discountAmount: number;
  discountPercent: number;

  // Actions
  setMode: (mode: CalculatorMode) => void;
  selectPackage: (pkg: Package | null) => void;
  selectDuration: (duration: Duration | null) => void;
  toggleService: (service: Service) => void;
  selectEpisodeCount: (count: EpisodeCount | null) => void;
  reset: () => void;
}

const CalculatorContext = createContext<CalculatorState | null>(null);

export function CalculatorProvider({ children }: { children: ReactNode }) {
  // Data state
  const [packages, setPackages] = useState<Package[]>([]);
  const [durations, setDurations] = useState<Duration[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [episodeCounts, setEpisodeCounts] = useState<EpisodeCount[]>([]);
  const [loading, setLoading] = useState(true);

  // Selection state
  const [mode, setMode] = useState<CalculatorMode>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<Duration | null>(null);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedEpisodeCount, setSelectedEpisodeCount] = useState<EpisodeCount | null>(null);

  // Calculated prices
  const [originalPrice, setOriginalPrice] = useState(0);
  const [monthlyPrice, setMonthlyPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [packagesRes, durationsRes, servicesRes, episodesRes] = await Promise.all([
          fetch('/api/calculator/packages'),
          fetch('/api/calculator/durations'),
          fetch('/api/calculator/services'),
          fetch('/api/calculator/episode-counts'),
        ]);

        const [packagesData, durationsData, servicesData, episodesData] = await Promise.all([
          packagesRes.json(),
          durationsRes.json(),
          servicesRes.json(),
          episodesRes.json(),
        ]);

        setPackages(packagesData.packages || []);
        setDurations(durationsData.durations || []);
        setServices(servicesData.services || []);
        setEpisodeCounts(episodesData.episodeCounts || []);
      } catch (error) {
        console.error('Error fetching calculator data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate prices when selections change
  useEffect(() => {
    if (mode === 'subscription') {
      calculateSubscriptionPrice();
    } else if (mode === 'one_time') {
      calculateOneTimePrice();
    } else {
      setOriginalPrice(0);
      setMonthlyPrice(0);
      setTotalPrice(0);
      setDiscountAmount(0);
      setDiscountPercent(0);
    }
  }, [mode, selectedPackage, selectedDuration, selectedServices, selectedEpisodeCount]);

  const calculateSubscriptionPrice = () => {
    if (!selectedPackage || !selectedDuration) {
      setOriginalPrice(0);
      setMonthlyPrice(0);
      setTotalPrice(0);
      setDiscountAmount(0);
      setDiscountPercent(0);
      return;
    }

    const basePrice = Number(selectedPackage.base_price);
    const discPercent = selectedDuration.discount_percent;
    const months = selectedDuration.months;

    const original = basePrice * months;
    const discountedMonthly = basePrice - (basePrice * discPercent / 100);
    const total = discountedMonthly * months;
    const discount = original - total;

    setOriginalPrice(Math.round(original));
    setMonthlyPrice(Math.round(discountedMonthly));
    setTotalPrice(Math.round(total));
    setDiscountAmount(Math.round(discount));
    setDiscountPercent(discPercent);
  };

  const calculateOneTimePrice = () => {
    if (selectedServices.length === 0 || !selectedEpisodeCount) {
      setOriginalPrice(0);
      setMonthlyPrice(0);
      setTotalPrice(0);
      setDiscountAmount(0);
      setDiscountPercent(0);
      return;
    }

    const basePrice = selectedServices.reduce((sum, s) => sum + Number(s.price), 0);
    const discPercent = selectedEpisodeCount.discount_percent;
    const episodes = selectedEpisodeCount.count;

    const original = basePrice * episodes;
    const discountedPerEpisode = basePrice - (basePrice * discPercent / 100);
    const total = discountedPerEpisode * episodes;
    const discount = original - total;

    setOriginalPrice(Math.round(original));
    setMonthlyPrice(Math.round(discountedPerEpisode));
    setTotalPrice(Math.round(total));
    setDiscountAmount(Math.round(discount));
    setDiscountPercent(discPercent);
  };

  const handleSetMode = (newMode: CalculatorMode) => {
    setMode(newMode);
    // Reset selections when changing mode
    setSelectedPackage(null);
    setSelectedDuration(null);
    setSelectedServices([]);
    setSelectedEpisodeCount(null);
  };

  const toggleService = (service: Service) => {
    setSelectedServices((prev) => {
      const exists = prev.find((s) => s.id === service.id);
      if (exists) {
        return prev.filter((s) => s.id !== service.id);
      }
      return [...prev, service];
    });
  };

  const reset = () => {
    setMode(null);
    setSelectedPackage(null);
    setSelectedDuration(null);
    setSelectedServices([]);
    setSelectedEpisodeCount(null);
  };

  return (
    <CalculatorContext.Provider
      value={{
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
        setMode: handleSetMode,
        selectPackage: setSelectedPackage,
        selectDuration: setSelectedDuration,
        toggleService,
        selectEpisodeCount: setSelectedEpisodeCount,
        reset,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
}

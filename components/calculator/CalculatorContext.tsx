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
  monthlyPrice: number;
  totalPrice: number;
  discountAmount: number;

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
  const [monthlyPrice, setMonthlyPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);

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
      setMonthlyPrice(0);
      setTotalPrice(0);
      setDiscountAmount(0);
    }
  }, [mode, selectedPackage, selectedDuration, selectedServices, selectedEpisodeCount]);

  const calculateSubscriptionPrice = () => {
    if (!selectedPackage || !selectedDuration) {
      setMonthlyPrice(0);
      setTotalPrice(0);
      setDiscountAmount(0);
      return;
    }

    const basePrice = selectedPackage.base_price;
    const discountPercent = selectedDuration.discount_percent;
    const months = selectedDuration.months;

    const discountedMonthly = basePrice - (basePrice * discountPercent / 100);
    const total = discountedMonthly * months;
    const discount = (basePrice * months) - total;

    setMonthlyPrice(Math.round(discountedMonthly));
    setTotalPrice(Math.round(total));
    setDiscountAmount(Math.round(discount));
  };

  const calculateOneTimePrice = () => {
    if (selectedServices.length === 0 || !selectedEpisodeCount) {
      setMonthlyPrice(0);
      setTotalPrice(0);
      setDiscountAmount(0);
      return;
    }

    const basePrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
    const discountPercent = selectedEpisodeCount.discount_percent;
    const episodes = selectedEpisodeCount.count;

    const discountedPerEpisode = basePrice - (basePrice * discountPercent / 100);
    const total = discountedPerEpisode * episodes;
    const discount = (basePrice * episodes) - total;

    setMonthlyPrice(Math.round(discountedPerEpisode));
    setTotalPrice(Math.round(total));
    setDiscountAmount(Math.round(discount));
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
        monthlyPrice,
        totalPrice,
        discountAmount,
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

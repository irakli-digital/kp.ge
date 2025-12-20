'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, Clock, Wrench, Hash, Mail, ArrowLeft } from 'lucide-react';

interface Stats {
  packages: number;
  durations: number;
  services: number;
  episodeCounts: number;
  unreadSubmissions: number;
}

export default function CalculatorAdminPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({
    packages: 0,
    durations: 0,
    services: 0,
    episodeCounts: 0,
    unreadSubmissions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [packagesRes, durationsRes, servicesRes, episodesRes, submissionsRes] = await Promise.all([
        fetch('/api/admin/calculator/packages'),
        fetch('/api/admin/calculator/durations'),
        fetch('/api/admin/calculator/services'),
        fetch('/api/admin/calculator/episode-counts'),
        fetch('/api/admin/calculator/submissions?countOnly=true'),
      ]);

      if (packagesRes.status === 401) {
        router.push('/admin');
        return;
      }

      const [packagesData, durationsData, servicesData, episodesData, submissionsData] = await Promise.all([
        packagesRes.json(),
        durationsRes.json(),
        servicesRes.json(),
        episodesRes.json(),
        submissionsRes.json(),
      ]);

      setStats({
        packages: packagesData.packages?.length || 0,
        durations: durationsData.durations?.length || 0,
        services: servicesData.services?.length || 0,
        episodeCounts: episodesData.episodeCounts?.length || 0,
        unreadSubmissions: submissionsData.unreadCount || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  const sections = [
    {
      title: 'პაკეტები',
      description: 'Bronze, Silver, Gold პაკეტების მართვა',
      href: '/admin/calculator/packages',
      icon: Package,
      count: stats.packages,
      color: 'bg-amber-500/20 text-amber-500',
    },
    {
      title: 'ხანგრძლივობა',
      description: 'კონტრაქტის ხანგრძლივობის ვარიანტები',
      href: '/admin/calculator/durations',
      icon: Clock,
      count: stats.durations,
      color: 'bg-blue-500/20 text-blue-500',
    },
    {
      title: 'ერთჯერადი სერვისები',
      description: 'ინდივიდუალური სერვისების მართვა',
      href: '/admin/calculator/services',
      icon: Wrench,
      count: stats.services,
      color: 'bg-green-500/20 text-green-500',
    },
    {
      title: 'ეპიზოდების რაოდენობა',
      description: 'ეპიზოდების ვარიანტების მართვა',
      href: '/admin/calculator/episodes',
      icon: Hash,
      count: stats.episodeCounts,
      color: 'bg-purple-500/20 text-purple-500',
    },
    {
      title: 'მოთხოვნები',
      description: 'სპონსორობის მოთხოვნების ნახვა',
      href: '/admin/calculator/submissions',
      icon: Mail,
      count: stats.unreadSubmissions,
      badge: stats.unreadSubmissions > 0 ? 'წაუკითხავი' : undefined,
      color: 'bg-red-500/20 text-red-500',
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin/dashboard"
            className="p-2 text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">კალკულატორის მართვა</h1>
            <p className="text-zinc-400 text-sm mt-1">სპონსორობის კალკულატორის პარამეტრების რედაქტირება</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.href}
                href={section.href}
                className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-lg ${section.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2">
                    {section.badge && (
                      <span className="px-2 py-1 text-xs font-medium bg-red-500/20 text-red-400 rounded-full">
                        {section.badge}
                      </span>
                    )}
                    <span className="text-2xl font-bold text-white">{section.count}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mt-4 group-hover:text-amber-500 transition-colors">
                  {section.title}
                </h3>
                <p className="text-zinc-400 text-sm mt-1">{section.description}</p>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg">
          <h3 className="text-sm font-medium text-zinc-400 mb-2">კალკულატორის ბმული</h3>
          <Link
            href="/calculator"
            target="_blank"
            className="text-amber-500 hover:text-amber-400 transition-colors"
          >
            /calculator →
          </Link>
        </div>
      </div>
    </div>
  );
}

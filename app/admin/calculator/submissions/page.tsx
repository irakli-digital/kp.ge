'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail, MailOpen, Trash2, ExternalLink } from 'lucide-react';

interface Submission {
  id: number;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  message: string | null;
  calculator_mode: 'subscription' | 'one_time';
  selected_package: string | null;
  selected_package_name: string | null;
  duration_months: number | null;
  selected_services: string | null;
  episode_count: number | null;
  monthly_price: number | null;
  total_price: number | null;
  discount_amount: number | null;
  created_at: string;
  is_read: boolean;
}

export default function SubmissionsAdminPage() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/admin/calculator/submissions');
      if (response.status === 401) {
        router.push('/admin');
        return;
      }
      const data = await response.json();
      setSubmissions(data.submissions || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: number) => {
    try {
      await fetch('/api/admin/calculator/submissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, markAsRead: true }),
      });
      fetchSubmissions();
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('დარწმუნებული ხართ რომ გსურთ წაშლა?')) return;

    try {
      const response = await fetch(`/api/admin/calculator/submissions?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSelectedSubmission(null);
        fetchSubmissions();
      }
    } catch (error) {
      console.error('Error deleting submission:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ka-GE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPrice = (price: number | null) => {
    if (price === null) return '-';
    return `${price.toLocaleString('ka-GE')} ₾`;
  };

  const openSubmission = (submission: Submission) => {
    setSelectedSubmission(submission);
    if (!submission.is_read) {
      markAsRead(submission.id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/calculator" className="p-2 text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">მოთხოვნები</h1>
            <p className="text-zinc-400 text-sm mt-1">სპონსორობის მოთხოვნების ნახვა</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Submissions List */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-zinc-800">
              <h3 className="text-sm font-medium text-zinc-400">
                {submissions.filter(s => !s.is_read).length} წაუკითხავი მოთხოვნა
              </h3>
            </div>
            <div className="divide-y divide-zinc-800 max-h-[600px] overflow-y-auto">
              {submissions.map((submission) => (
                <button
                  key={submission.id}
                  onClick={() => openSubmission(submission)}
                  className={`w-full text-left p-4 hover:bg-zinc-800/50 transition-colors ${
                    selectedSubmission?.id === submission.id ? 'bg-zinc-800/50' : ''
                  } ${!submission.is_read ? 'bg-amber-500/5' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {submission.is_read ? (
                        <MailOpen className="w-4 h-4 text-zinc-500" />
                      ) : (
                        <Mail className="w-4 h-4 text-amber-500" />
                      )}
                      <div>
                        <p className={`font-medium ${submission.is_read ? 'text-zinc-300' : 'text-white'}`}>
                          {submission.name}
                        </p>
                        <p className="text-sm text-zinc-500">{submission.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        submission.calculator_mode === 'subscription'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-green-500/20 text-green-400'
                      }`}>
                        {submission.calculator_mode === 'subscription' ? 'აბონემენტი' : 'ერთჯერადი'}
                      </span>
                      <p className="text-xs text-zinc-500 mt-1">{formatDate(submission.created_at)}</p>
                    </div>
                  </div>
                  <p className="text-amber-500 font-medium text-sm mt-2">
                    {formatPrice(submission.total_price)}
                  </p>
                </button>
              ))}
              {submissions.length === 0 && (
                <p className="text-center text-zinc-500 py-8">მოთხოვნები არ მოიძებნა</p>
              )}
            </div>
          </div>

          {/* Submission Detail */}
          {selectedSubmission ? (
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedSubmission.name}</h2>
                  {selectedSubmission.company && (
                    <p className="text-zinc-400">{selectedSubmission.company}</p>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(selectedSubmission.id)}
                  className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <a
                    href={`mailto:${selectedSubmission.email}`}
                    className="flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors"
                  >
                    {selectedSubmission.email}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  {selectedSubmission.phone && (
                    <a
                      href={`tel:${selectedSubmission.phone}`}
                      className="flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors"
                    >
                      {selectedSubmission.phone}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <div className="border-t border-zinc-800 pt-4">
                  <h3 className="text-sm font-medium text-zinc-400 mb-3">არჩეული პარამეტრები</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">რეჟიმი:</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        selectedSubmission.calculator_mode === 'subscription'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-green-500/20 text-green-400'
                      }`}>
                        {selectedSubmission.calculator_mode === 'subscription' ? 'აბონემენტი' : 'ერთჯერადი'}
                      </span>
                    </div>

                    {selectedSubmission.calculator_mode === 'subscription' ? (
                      <>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">პაკეტი:</span>
                          <span className="text-white">{selectedSubmission.selected_package_name || selectedSubmission.selected_package || '-'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">ხანგრძლივობა:</span>
                          <span className="text-white">{selectedSubmission.duration_months ? `${selectedSubmission.duration_months} თვე` : '-'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">თვიური ფასი:</span>
                          <span className="text-white">{formatPrice(selectedSubmission.monthly_price)}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">სერვისები:</span>
                          <span className="text-white text-right">
                            {selectedSubmission.selected_services
                              ? JSON.parse(selectedSubmission.selected_services).join(', ')
                              : '-'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">ეპიზოდები:</span>
                          <span className="text-white">{selectedSubmission.episode_count || '-'}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="border-t border-zinc-800 pt-4">
                  <h3 className="text-sm font-medium text-zinc-400 mb-3">ფასები</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">ჯამური ფასი:</span>
                      <span className="text-2xl font-bold text-green-400">{formatPrice(selectedSubmission.total_price)}</span>
                    </div>
                    {selectedSubmission.discount_amount && selectedSubmission.discount_amount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-zinc-500">ფასდაკლება:</span>
                        <span className="text-green-400">-{formatPrice(selectedSubmission.discount_amount)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {selectedSubmission.message && (
                  <div className="border-t border-zinc-800 pt-4">
                    <h3 className="text-sm font-medium text-zinc-400 mb-3">შეტყობინება</h3>
                    <p className="text-white whitespace-pre-wrap bg-zinc-800/50 p-4 rounded-lg">
                      {selectedSubmission.message}
                    </p>
                  </div>
                )}

                <div className="border-t border-zinc-800 pt-4 text-sm text-zinc-500">
                  გაგზავნილია: {formatDate(selectedSubmission.created_at)}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 flex items-center justify-center">
              <p className="text-zinc-500">აირჩიეთ მოთხოვნა დეტალების სანახავად</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, Pencil, Trash2, Check, X } from 'lucide-react';

interface Duration {
  id: number;
  months: number;
  discount_percent: number;
  label: string;
  is_active: boolean;
  sort_order: number;
}

export default function DurationsAdminPage() {
  const router = useRouter();
  const [durations, setDurations] = useState<Duration[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Duration>>({});
  const [isCreating, setIsCreating] = useState(false);
  const [newDuration, setNewDuration] = useState({
    months: 1,
    discount_percent: 0,
    label: '',
    is_active: true,
    sort_order: 0,
  });

  useEffect(() => {
    fetchDurations();
  }, []);

  const fetchDurations = async () => {
    try {
      const response = await fetch('/api/admin/calculator/durations');
      if (response.status === 401) {
        router.push('/admin');
        return;
      }
      const data = await response.json();
      setDurations(data.durations || []);
    } catch (error) {
      console.error('Error fetching durations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch('/api/admin/calculator/durations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDuration),
      });

      if (response.ok) {
        setIsCreating(false);
        setNewDuration({ months: 1, discount_percent: 0, label: '', is_active: true, sort_order: 0 });
        fetchDurations();
      }
    } catch (error) {
      console.error('Error creating duration:', error);
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      const response = await fetch('/api/admin/calculator/durations', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...editForm }),
      });

      if (response.ok) {
        setEditingId(null);
        fetchDurations();
      }
    } catch (error) {
      console.error('Error updating duration:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('დარწმუნებული ხართ რომ გსურთ წაშლა?')) return;

    try {
      const response = await fetch(`/api/admin/calculator/durations?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchDurations();
      }
    } catch (error) {
      console.error('Error deleting duration:', error);
    }
  };

  const toggleActive = async (duration: Duration) => {
    try {
      const response = await fetch('/api/admin/calculator/durations', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: duration.id, is_active: !duration.is_active }),
      });

      if (response.ok) {
        fetchDurations();
      }
    } catch (error) {
      console.error('Error toggling active:', error);
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
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin/calculator" className="p-2 text-zinc-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">ხანგრძლივობა</h1>
              <p className="text-zinc-400 text-sm mt-1">კონტრაქტის ხანგრძლივობის ვარიანტები</p>
            </div>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-medium rounded-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            დამატება
          </button>
        </div>

        {isCreating && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">ახალი ხანგრძლივობა</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">თვეები</label>
                <input
                  type="number"
                  value={newDuration.months}
                  onChange={(e) => setNewDuration({ ...newDuration, months: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">ფასდაკლება (%)</label>
                <input
                  type="number"
                  value={newDuration.discount_percent}
                  onChange={(e) => setNewDuration({ ...newDuration, discount_percent: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">ლეიბლი</label>
                <input
                  type="text"
                  value={newDuration.label}
                  onChange={(e) => setNewDuration({ ...newDuration, label: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                  placeholder="1 თვე"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">რიგი</label>
                <input
                  type="number"
                  value={newDuration.sort_order}
                  onChange={(e) => setNewDuration({ ...newDuration, sort_order: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={handleCreate} className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors">
                <Check className="w-4 h-4" /> შენახვა
              </button>
              <button onClick={() => setIsCreating(false)} className="flex items-center gap-2 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white font-medium rounded-md transition-colors">
                <X className="w-4 h-4" /> გაუქმება
              </button>
            </div>
          </div>
        )}

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-zinc-800">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-zinc-400">ლეიბლი</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-zinc-400">თვეები</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-zinc-400">ფასდაკლება</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-zinc-400">სტატუსი</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-zinc-400">მოქმედებები</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {durations.map((duration) => (
                <tr key={duration.id} className={duration.is_active ? '' : 'opacity-50'}>
                  {editingId === duration.id ? (
                    <>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={editForm.label || ''}
                          onChange={(e) => setEditForm({ ...editForm, label: e.target.value })}
                          className="w-full px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-white text-sm"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={editForm.months || 0}
                          onChange={(e) => setEditForm({ ...editForm, months: parseInt(e.target.value) })}
                          className="w-20 px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-white text-sm"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={editForm.discount_percent || 0}
                          onChange={(e) => setEditForm({ ...editForm, discount_percent: parseInt(e.target.value) })}
                          className="w-20 px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-white text-sm"
                        />
                      </td>
                      <td className="px-4 py-3"></td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => handleUpdate(duration.id)} className="p-1 text-green-400 hover:text-green-300">
                          <Check className="w-4 h-4" />
                        </button>
                        <button onClick={() => setEditingId(null)} className="p-1 text-zinc-400 hover:text-white ml-2">
                          <X className="w-4 h-4" />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-3 text-white font-medium">{duration.label}</td>
                      <td className="px-4 py-3 text-zinc-400">{duration.months}</td>
                      <td className="px-4 py-3">
                        {duration.discount_percent > 0 ? (
                          <span className="text-green-400">{duration.discount_percent}%</span>
                        ) : (
                          <span className="text-zinc-500">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleActive(duration)}
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            duration.is_active
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-zinc-500/20 text-zinc-400'
                          }`}
                        >
                          {duration.is_active ? 'აქტიური' : 'გამორთული'}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => { setEditingId(duration.id); setEditForm(duration); }}
                          className="p-1 text-zinc-400 hover:text-white"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(duration.id)} className="p-1 text-zinc-400 hover:text-red-500 ml-2">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {durations.length === 0 && (
            <p className="text-center text-zinc-500 py-8">ხანგრძლივობები არ მოიძებნა</p>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, Pencil, Trash2, Check, X } from 'lucide-react';

interface Service {
  id: number;
  name: string;
  price: number;
  description: string | null;
  is_active: boolean;
  sort_order: number;
}

export default function ServicesAdminPage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Service>>({});
  const [isCreating, setIsCreating] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    price: 0,
    description: '',
    is_active: true,
    sort_order: 0,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/admin/calculator/services');
      if (response.status === 401) {
        router.push('/admin');
        return;
      }
      const data = await response.json();
      setServices(data.services || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch('/api/admin/calculator/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newService),
      });

      if (response.ok) {
        setIsCreating(false);
        setNewService({ name: '', price: 0, description: '', is_active: true, sort_order: 0 });
        fetchServices();
      }
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      const response = await fetch('/api/admin/calculator/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...editForm }),
      });

      if (response.ok) {
        setEditingId(null);
        fetchServices();
      }
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('დარწმუნებული ხართ რომ გსურთ წაშლა?')) return;

    try {
      const response = await fetch(`/api/admin/calculator/services?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchServices();
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const toggleActive = async (service: Service) => {
    try {
      const response = await fetch('/api/admin/calculator/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: service.id, is_active: !service.is_active }),
      });

      if (response.ok) {
        fetchServices();
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
              <h1 className="text-2xl font-bold text-white">ერთჯერადი სერვისები</h1>
              <p className="text-zinc-400 text-sm mt-1">ინდივიდუალური სერვისების მართვა</p>
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
            <h3 className="text-lg font-semibold text-white mb-4">ახალი სერვისი</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="block text-sm text-zinc-400 mb-1">სახელი</label>
                <input
                  type="text"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                  placeholder="ლოგოს განთავსება"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">ფასი (ეპიზოდზე)</label>
                <input
                  type="number"
                  value={newService.price}
                  onChange={(e) => setNewService({ ...newService, price: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">რიგი</label>
                <input
                  type="number"
                  value={newService.sort_order}
                  onChange={(e) => setNewService({ ...newService, sort_order: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-zinc-400 mb-1">აღწერა</label>
                <textarea
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white h-20"
                  placeholder="თქვენი ლოგო ვიდეოს დასაწყისში ან ბოლოს"
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

        <div className="space-y-4">
          {services.map((service) => (
            <div
              key={service.id}
              className={`bg-zinc-900 border rounded-lg p-4 ${
                service.is_active ? 'border-zinc-800' : 'border-zinc-800/50 opacity-60'
              }`}
            >
              {editingId === service.id ? (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        value={editForm.name || ''}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        value={editForm.price || 0}
                        onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) })}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                        placeholder="ფასი"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        value={editForm.sort_order || 0}
                        onChange={(e) => setEditForm({ ...editForm, sort_order: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                        placeholder="რიგი"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <textarea
                        value={editForm.description || ''}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white h-20"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleUpdate(service.id)} className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors">
                      <Check className="w-4 h-4" /> შენახვა
                    </button>
                    <button onClick={() => setEditingId(null)} className="flex items-center gap-2 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white font-medium rounded-md transition-colors">
                      <X className="w-4 h-4" /> გაუქმება
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                    {service.description && (
                      <p className="text-zinc-400 text-sm mt-1">{service.description}</p>
                    )}
                    <p className="text-amber-500 font-medium mt-2">{service.price.toLocaleString()} ₾/ეპიზოდი</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleActive(service)}
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        service.is_active
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-zinc-500/20 text-zinc-400'
                      }`}
                    >
                      {service.is_active ? 'აქტიური' : 'გამორთული'}
                    </button>
                    <button
                      onClick={() => { setEditingId(service.id); setEditForm(service); }}
                      className="p-2 text-zinc-400 hover:text-white transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(service.id)} className="p-2 text-zinc-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {services.length === 0 && (
          <p className="text-center text-zinc-500 py-8">სერვისები არ მოიძებნა</p>
        )}
      </div>
    </div>
  );
}

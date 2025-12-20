'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, Pencil, Trash2, Check, X, GripVertical } from 'lucide-react';

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
  is_active: boolean;
  sort_order: number;
  features: PackageFeature[];
}

export default function PackagesAdminPage() {
  const router = useRouter();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Package> & { featuresText?: string }>({});
  const [isCreating, setIsCreating] = useState(false);
  const [newPackage, setNewPackage] = useState({
    type: '',
    name: '',
    base_price: 0,
    tag: '',
    tag_classes: 'bg-zinc-500/20 text-zinc-400',
    is_active: true,
    sort_order: 0,
    featuresText: '',
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch('/api/admin/calculator/packages');
      if (response.status === 401) {
        router.push('/admin');
        return;
      }
      const data = await response.json();
      setPackages(data.packages || []);
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const features = newPackage.featuresText
        .split('\n')
        .map(f => f.trim())
        .filter(f => f.length > 0);

      const response = await fetch('/api/admin/calculator/packages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newPackage,
          features,
        }),
      });

      if (response.ok) {
        setIsCreating(false);
        setNewPackage({
          type: '',
          name: '',
          base_price: 0,
          tag: '',
          tag_classes: 'bg-zinc-500/20 text-zinc-400',
          is_active: true,
          sort_order: 0,
          featuresText: '',
        });
        fetchPackages();
      }
    } catch (error) {
      console.error('Error creating package:', error);
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      const features = editForm.featuresText
        ?.split('\n')
        .map(f => f.trim())
        .filter(f => f.length > 0) || [];

      const response = await fetch('/api/admin/calculator/packages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          ...editForm,
          features,
        }),
      });

      if (response.ok) {
        setEditingId(null);
        fetchPackages();
      }
    } catch (error) {
      console.error('Error updating package:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('დარწმუნებული ხართ რომ გსურთ წაშლა?')) return;

    try {
      const response = await fetch(`/api/admin/calculator/packages?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchPackages();
      }
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

  const startEditing = (pkg: Package) => {
    setEditingId(pkg.id);
    setEditForm({
      ...pkg,
      featuresText: pkg.features.map(f => f.feature).join('\n'),
    });
  };

  const toggleActive = async (pkg: Package) => {
    try {
      const response = await fetch('/api/admin/calculator/packages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: pkg.id,
          is_active: !pkg.is_active,
        }),
      });

      if (response.ok) {
        fetchPackages();
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
            <Link
              href="/admin/calculator"
              className="p-2 text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">პაკეტები</h1>
              <p className="text-zinc-400 text-sm mt-1">სპონსორობის პაკეტების მართვა</p>
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

        {/* Create Form */}
        {isCreating && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">ახალი პაკეტი</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">ტიპი (bronze/silver/gold)</label>
                <input
                  type="text"
                  value={newPackage.type}
                  onChange={(e) => setNewPackage({ ...newPackage, type: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                  placeholder="bronze"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">სახელი</label>
                <input
                  type="text"
                  value={newPackage.name}
                  onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                  placeholder="ბრინჯაოს პაკეტი"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">ფასი (თვიური)</label>
                <input
                  type="number"
                  value={newPackage.base_price}
                  onChange={(e) => setNewPackage({ ...newPackage, base_price: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">თეგი</label>
                <input
                  type="text"
                  value={newPackage.tag}
                  onChange={(e) => setNewPackage({ ...newPackage, tag: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                  placeholder="საბაზისო"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">თეგის კლასები</label>
                <input
                  type="text"
                  value={newPackage.tag_classes}
                  onChange={(e) => setNewPackage({ ...newPackage, tag_classes: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">რიგი</label>
                <input
                  type="number"
                  value={newPackage.sort_order}
                  onChange={(e) => setNewPackage({ ...newPackage, sort_order: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-zinc-400 mb-1">ფუნქციები (თითო ხაზზე)</label>
                <textarea
                  value={newPackage.featuresText}
                  onChange={(e) => setNewPackage({ ...newPackage, featuresText: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white h-32"
                  placeholder="ლოგოს განთავსება ვიდეოში&#10;მოხსენიება პოდკასტში&#10;სოციალური მედიის პოსტი"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleCreate}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors"
              >
                <Check className="w-4 h-4" />
                შენახვა
              </button>
              <button
                onClick={() => setIsCreating(false)}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white font-medium rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
                გაუქმება
              </button>
            </div>
          </div>
        )}

        {/* Packages List */}
        <div className="space-y-4">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-zinc-900 border rounded-lg p-6 ${
                pkg.is_active ? 'border-zinc-800' : 'border-zinc-800/50 opacity-60'
              }`}
            >
              {editingId === pkg.id ? (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm text-zinc-400 mb-1">ტიპი</label>
                      <input
                        type="text"
                        value={editForm.type || ''}
                        onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-400 mb-1">სახელი</label>
                      <input
                        type="text"
                        value={editForm.name || ''}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-400 mb-1">ფასი</label>
                      <input
                        type="number"
                        value={editForm.base_price || 0}
                        onChange={(e) => setEditForm({ ...editForm, base_price: parseFloat(e.target.value) })}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-400 mb-1">თეგი</label>
                      <input
                        type="text"
                        value={editForm.tag || ''}
                        onChange={(e) => setEditForm({ ...editForm, tag: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-400 mb-1">თეგის კლასები</label>
                      <input
                        type="text"
                        value={editForm.tag_classes || ''}
                        onChange={(e) => setEditForm({ ...editForm, tag_classes: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-400 mb-1">რიგი</label>
                      <input
                        type="number"
                        value={editForm.sort_order || 0}
                        onChange={(e) => setEditForm({ ...editForm, sort_order: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm text-zinc-400 mb-1">ფუნქციები</label>
                      <textarea
                        value={editForm.featuresText || ''}
                        onChange={(e) => setEditForm({ ...editForm, featuresText: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white h-32"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleUpdate(pkg.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      შენახვა
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex items-center gap-2 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white font-medium rounded-md transition-colors"
                    >
                      <X className="w-4 h-4" />
                      გაუქმება
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <GripVertical className="w-5 h-5 text-zinc-600" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-white">{pkg.name}</h3>
                          <span className={`px-2 py-0.5 text-xs rounded-full ${pkg.tag_classes}`}>
                            {pkg.tag}
                          </span>
                        </div>
                        <p className="text-zinc-400 text-sm">
                          ტიპი: {pkg.type} | ფასი: {pkg.base_price.toLocaleString()} ₾/თვე
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleActive(pkg)}
                        className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                          pkg.is_active
                            ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                            : 'bg-zinc-500/20 text-zinc-400 hover:bg-zinc-500/30'
                        }`}
                      >
                        {pkg.is_active ? 'აქტიური' : 'გამორთული'}
                      </button>
                      <button
                        onClick={() => startEditing(pkg)}
                        className="p-2 text-zinc-400 hover:text-white transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(pkg.id)}
                        className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {pkg.features.length > 0 && (
                    <div className="mt-4 pl-8">
                      <p className="text-sm text-zinc-500 mb-2">ფუნქციები:</p>
                      <ul className="space-y-1">
                        {pkg.features.map((feature) => (
                          <li key={feature.id} className="text-sm text-zinc-400 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                            {feature.feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {packages.length === 0 && (
          <p className="text-center text-zinc-500 py-8">პაკეტები არ მოიძებნა</p>
        )}
      </div>
    </div>
  );
}

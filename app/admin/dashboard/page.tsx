'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Article {
  id: number;
  title: string;
  title_ka: string;
  slug: string;
  published: boolean;
  published_at: string;
  updated_at: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/admin/articles');

      if (response.status === 401) {
        router.push('/admin');
        return;
      }

      const data = await response.json();
      setArticles(data.articles || []);
    } catch (err) {
      setError('Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    router.push('/admin');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ka-GE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const toggleSelect = (id: number) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === articles.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(articles.map(a => a.id)));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedIds.size} article(s)? This action cannot be undone.`
    );

    if (!confirmed) return;

    setDeleting(true);
    setError('');

    try {
      const response = await fetch('/api/admin/articles', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: Array.from(selectedIds) }),
      });

      if (response.ok) {
        setArticles(articles.filter(a => !selectedIds.has(a.id)));
        setSelectedIds(new Set());
      } else {
        setError('Failed to delete articles');
      }
    } catch (err) {
      setError('Failed to delete articles');
    } finally {
      setDeleting(false);
    }
  };

  const handleBulkPublish = async (publish: boolean) => {
    if (selectedIds.size === 0) return;

    setUpdating(true);
    setError('');

    try {
      const response = await fetch('/api/admin/articles', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: Array.from(selectedIds), published: publish }),
      });

      if (response.ok) {
        setArticles(articles.map(a =>
          selectedIds.has(a.id) ? { ...a, published: publish } : a
        ));
        setSelectedIds(new Set());
      } else {
        setError('Failed to update articles');
      }
    } catch (err) {
      setError('Failed to update articles');
    } finally {
      setUpdating(false);
    }
  };

  const togglePublish = async (id: number, currentStatus: boolean) => {
    setError('');

    try {
      const response = await fetch('/api/admin/articles/' + id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !currentStatus }),
      });

      if (response.ok) {
        setArticles(articles.map(a =>
          a.id === id ? { ...a, published: !currentStatus } : a
        ));
      } else {
        setError('Failed to update article');
      }
    } catch (err) {
      setError('Failed to update article');
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">Articles</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Logout
          </button>
        </div>

        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        {/* Bulk Actions Bar */}
        {selectedIds.size > 0 && (
          <div className="bg-zinc-800 rounded-lg p-4 mb-4 flex items-center justify-between">
            <span className="text-white">
              {selectedIds.size} article(s) selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkPublish(true)}
                disabled={updating}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white text-sm font-medium rounded-md transition-colors"
              >
                {updating ? 'Updating...' : 'Publish'}
              </button>
              <button
                onClick={() => handleBulkPublish(false)}
                disabled={updating}
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-800 disabled:cursor-not-allowed text-white text-sm font-medium rounded-md transition-colors"
              >
                {updating ? 'Updating...' : 'Unpublish'}
              </button>
              <button
                onClick={handleBulkDelete}
                disabled={deleting}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white text-sm font-medium rounded-md transition-colors"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        )}

        <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
          <table className="w-full">
            <thead className="bg-zinc-800">
              <tr>
                <th className="w-12 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={articles.length > 0 && selectedIds.size === articles.length}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-zinc-600 bg-zinc-700 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-zinc-400">Title</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-zinc-400">Slug</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-zinc-400">Status</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-zinc-400">Updated</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-zinc-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {articles.map((article) => (
                <tr
                  key={article.id}
                  className={
                    'hover:bg-zinc-800/50 ' +
                    (selectedIds.has(article.id) ? 'bg-zinc-800/30' : '')
                  }
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(article.id)}
                      onChange={() => toggleSelect(article.id)}
                      className="w-4 h-4 rounded border-zinc-600 bg-zinc-700 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-white font-medium">{article.title_ka || article.title}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-zinc-400 text-sm">{article.slug}</p>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => togglePublish(article.id, article.published)}
                      className={
                        'inline-flex px-2 py-1 text-xs rounded-full cursor-pointer transition-colors ' +
                        (article.published
                          ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                          : 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30')
                      }
                      title={article.published ? 'Click to unpublish' : 'Click to publish'}
                    >
                      {article.published ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-zinc-400 text-sm">{formatDate(article.updated_at)}</p>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={'/admin/edit/' + article.id}
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {articles.length === 0 && (
            <p className="text-center text-zinc-500 py-8">No articles found</p>
          )}
        </div>
      </div>
    </div>
  );
}

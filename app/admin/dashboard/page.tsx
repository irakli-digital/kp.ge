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

        <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
          <table className="w-full">
            <thead className="bg-zinc-800">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-zinc-400">Title</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-zinc-400">Slug</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-zinc-400">Status</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-zinc-400">Updated</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-zinc-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-zinc-800/50">
                  <td className="px-4 py-3">
                    <p className="text-white font-medium">{article.title_ka || article.title}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-zinc-400 text-sm">{article.slug}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={
                      'inline-flex px-2 py-1 text-xs rounded-full ' +
                      (article.published
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400')
                    }>
                      {article.published ? 'Published' : 'Draft'}
                    </span>
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

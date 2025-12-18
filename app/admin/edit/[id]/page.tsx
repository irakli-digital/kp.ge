'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import WysiwygEditor from '@/components/admin/WysiwygEditor';

interface Article {
  id: number;
  title: string;
  title_ka: string;
  slug: string;
  content: string;
  content_ka: string;
  excerpt: string | null;
  excerpt_ka: string | null;
  published: boolean;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditArticle({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      const response = await fetch('/api/admin/articles/' + id);
      
      if (response.status === 401) {
        router.push('/admin');
        return;
      }

      if (response.status === 404) {
        setError('Article not found');
        return;
      }

      const data = await response.json();
      setArticle(data.article);
    } catch (err) {
      setError('Failed to load article');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!article) return;

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/admin/articles/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: article.title,
          title_ka: article.title_ka,
          content: article.content,
          content_ka: article.content_ka,
          excerpt: article.excerpt,
          excerpt_ka: article.excerpt_ka,
          published: article.published,
        }),
      });

      if (response.ok) {
        setSuccess('Article saved successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError('Failed to save article');
      }
    } catch (err) {
      setError('Failed to save article');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <p className="text-red-500">{error || 'Article not found'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              &larr; Back
            </button>
            <h1 className="text-2xl font-bold text-white">Edit Article</h1>
          </div>
          <div className="flex items-center gap-4">
            {success && <span className="text-green-400 text-sm">{success}</span>}
            {error && <span className="text-red-400 text-sm">{error}</span>}
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium rounded-md transition-colors"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-white mb-4">Basic Info</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">
                  Title (English)
                </label>
                <input
                  type="text"
                  value={article.title}
                  onChange={(e) => setArticle({ ...article, title: e.target.value })}
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">
                  Title (Georgian)
                </label>
                <input
                  type="text"
                  value={article.title_ka}
                  onChange={(e) => setArticle({ ...article, title_ka: e.target.value })}
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">
                  Excerpt (English)
                </label>
                <textarea
                  value={article.excerpt || ''}
                  onChange={(e) => setArticle({ ...article, excerpt: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">
                  Excerpt (Georgian)
                </label>
                <textarea
                  value={article.excerpt_ka || ''}
                  onChange={(e) => setArticle({ ...article, excerpt_ka: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="published"
                checked={article.published}
                onChange={(e) => setArticle({ ...article, published: e.target.checked })}
                className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="published" className="text-sm text-zinc-400">
                Published
              </label>
            </div>
          </div>

          {/* Content */}
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6 space-y-6">
            <h2 className="text-lg font-semibold text-white mb-4">Content</h2>
            
            <WysiwygEditor
              label="Content (English)"
              value={article.content}
              onChange={(value) => setArticle({ ...article, content: value })}
            />

            <WysiwygEditor
              label="Content (Georgian)"
              value={article.content_ka}
              onChange={(value) => setArticle({ ...article, content_ka: value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

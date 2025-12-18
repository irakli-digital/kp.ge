'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface MediaImage {
  key: string;
  url: string;
  lastModified?: string;
  size?: number;
}

export default function MediaGallery() {
  const router = useRouter();
  const [images, setImages] = useState<MediaImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/admin/media');

      if (response.status === 401) {
        router.push('/admin');
        return;
      }

      const data = await response.json();
      setImages(data.images || []);
    } catch (err) {
      setError('Failed to load images');
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (file: File) => {
    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.url) {
        // Refresh the image list
        await fetchImages();
      } else {
        setError(data.error || 'Upload failed');
      }
    } catch (err) {
      setError('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      uploadFile(files[0]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        uploadFile(file);
      } else {
        setError('Please drop an image file');
      }
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (err) {
      setError('Failed to copy');
    }
  };

  const deleteImage = async (key: string, e: React.MouseEvent) => {
    e.stopPropagation();

    if (!confirm('Are you sure you want to delete this image?')) {
      return;
    }

    setDeleting(key);
    setError('');

    try {
      const response = await fetch('/api/admin/media', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }),
      });

      if (response.ok) {
        setImages((prev) => prev.filter((img) => img.key !== key));
      } else {
        setError('Failed to delete image');
      }
    } catch (err) {
      setError('Failed to delete image');
    } finally {
      setDeleting(null);
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
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
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              &larr; Back
            </button>
            <h1 className="text-2xl font-bold text-white">Media Library</h1>
          </div>
          <span className="text-zinc-500 text-sm">{images.length} images</span>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-800 rounded-lg text-red-400">
            {error}
          </div>
        )}

        {/* Upload Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={
            'mb-8 border-2 border-dashed rounded-lg p-8 text-center transition-colors ' +
            (dragOver
              ? 'border-blue-500 bg-blue-500/10'
              : 'border-zinc-700 hover:border-zinc-600')
          }
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {uploading ? (
            <div className="text-zinc-400">
              <div className="animate-spin w-8 h-8 border-2 border-zinc-500 border-t-blue-500 rounded-full mx-auto mb-2" />
              Uploading...
            </div>
          ) : (
            <div>
              <p className="text-zinc-400 mb-3">
                Drag & drop an image here, or
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
              >
                Choose File
              </button>
              <p className="text-zinc-500 text-sm mt-3">
                Images are automatically optimized and converted to WebP
              </p>
            </div>
          )}
        </div>

        {/* Image Grid */}
        {images.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-500">No images uploaded yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map((image) => (
              <div
                key={image.key}
                className="relative group cursor-pointer bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-colors"
                onClick={() => copyToClipboard(image.url)}
              >
                <div className="aspect-square">
                  <img
                    src={image.url}
                    alt={image.key.split('/').pop() || ''}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                  <span className="text-white text-sm font-medium">
                    {copiedUrl === image.url ? 'Copied!' : 'Click to copy URL'}
                  </span>

                  {/* Delete button */}
                  <button
                    onClick={(e) => deleteImage(image.key, e)}
                    disabled={deleting === image.key}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white text-xs rounded transition-colors"
                  >
                    {deleting === image.key ? 'Deleting...' : 'Delete'}
                  </button>
                </div>

                {/* File info */}
                <div className="p-2 text-xs text-zinc-500 truncate">
                  {image.key.split('/').pop()}
                  {image.size && (
                    <span className="ml-2 text-zinc-600">
                      {formatFileSize(image.size)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tip */}
        {images.length > 0 && (
          <p className="text-center text-zinc-500 text-sm mt-6">
            Click any image to copy its URL to clipboard
          </p>
        )}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';

interface MediaImage {
  key: string;
  url: string;
  lastModified?: string;
  size?: number;
}

interface MediaPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

export default function MediaPicker({ isOpen, onClose, onSelect }: MediaPickerProps) {
  const [images, setImages] = useState<MediaImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchImages();
    }
  }, [isOpen]);

  const fetchImages = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/media');

      if (!response.ok) {
        setError('Failed to load images');
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

  const handleSelect = (url: string) => {
    onSelect(url);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-zinc-900 rounded-lg border border-zinc-700 w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-700">
          <h2 className="text-lg font-semibold text-white">Select Image</h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-zinc-500 border-t-blue-500 rounded-full" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-400">{error}</p>
              <button
                onClick={fetchImages}
                className="mt-4 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white text-sm rounded-md"
              >
                Retry
              </button>
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-zinc-500">No images in media library</p>
              <p className="text-zinc-600 text-sm mt-2">
                Upload images from the Media page first
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {images.map((image) => (
                <button
                  key={image.key}
                  onClick={() => handleSelect(image.url)}
                  className="relative aspect-square bg-zinc-800 rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 transition-colors group"
                >
                  <img
                    src={image.url}
                    alt={image.key.split('/').pop() || ''}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      // Show placeholder on error
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.classList.add('flex', 'items-center', 'justify-center');
                      const placeholder = document.createElement('span');
                      placeholder.className = 'text-zinc-500 text-xs text-center p-2';
                      placeholder.textContent = image.key.split('/').pop() || 'Image';
                      target.parentElement!.appendChild(placeholder);
                    }}
                  />
                  <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white text-sm rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

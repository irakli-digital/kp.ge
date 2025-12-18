'use client';

import { useState, useRef, useCallback } from 'react';

interface UploadedImage {
  url: string;
  filename: string;
}

interface AssetUploaderProps {
  onImageUploaded?: (url: string) => void;
}

export default function AssetUploader({ onImageUploaded }: AssetUploaderProps) {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        const newImage = { url: data.url, filename: data.filename };
        setImages((prev) => [newImage, ...prev]);
        onImageUploaded?.(data.url);
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
    // Reset input
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

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={
          'border-2 border-dashed rounded-lg p-6 text-center transition-colors ' +
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
            <p className="text-zinc-400 mb-2">
              Drag & drop an image here, or
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white text-sm rounded-md transition-colors"
            >
              Choose File
            </button>
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative group cursor-pointer"
              onClick={() => copyToClipboard(image.url)}
            >
              <img
                src={image.url}
                alt={image.filename}
                className="w-full h-24 object-cover rounded-md border border-zinc-700"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  {copiedUrl === image.url ? 'Copied!' : 'Click to copy URL'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <p className="text-zinc-500 text-xs">
          Click any image to copy its URL to clipboard
        </p>
      )}
    </div>
  );
}

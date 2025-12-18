'use client';

import { useState, useRef, useEffect } from 'react';
import MediaPicker from './MediaPicker';

interface WysiwygEditorProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

export default function WysiwygEditor({ value, onChange, label }: WysiwygEditorProps) {
  const [mode, setMode] = useState<'code' | 'preview'>('code');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Update contentEditable div when switching to preview mode or when value changes externally
  useEffect(() => {
    if (mode === 'preview' && editorRef.current) {
      // Only update if the content is different to preserve cursor position
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value;
      }
    }
  }, [mode, value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    handleInput();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append('file', files[0]);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.url) {
        // Insert image at cursor position
        const imgHtml = '<img src="' + data.url + '" alt="" style="max-width: 100%;" />';

        if (mode === 'preview' && editorRef.current) {
          document.execCommand('insertHTML', false, imgHtml);
          handleInput();
        } else {
          // In code mode, append to end
          onChange(value + '\n' + imgHtml);
        }
      } else {
        alert(data.error || 'Failed to upload image');
      }
    } catch (err) {
      alert('Failed to upload image');
    } finally {
      setUploadingImage(false);
      // Reset input
      if (imageInputRef.current) {
        imageInputRef.current.value = '';
      }
    }
  };

  const handleMediaSelect = (url: string) => {
    const imgHtml = '<img src="' + url + '" alt="" style="max-width: 100%;" />';

    if (mode === 'preview' && editorRef.current) {
      editorRef.current.focus();
      document.execCommand('insertHTML', false, imgHtml);
      handleInput();
    } else {
      // In code mode, append to end
      onChange(value + '\n' + imgHtml);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-zinc-400">
          {label}
        </label>
        <div className="flex gap-1 bg-zinc-800 rounded-md p-1">
          <button
            type="button"
            onClick={() => setMode('code')}
            className={
              'px-3 py-1 text-sm rounded transition-colors ' +
              (mode === 'code'
                ? 'bg-blue-600 text-white'
                : 'text-zinc-400 hover:text-white')
            }
          >
            HTML
          </button>
          <button
            type="button"
            onClick={() => setMode('preview')}
            className={
              'px-3 py-1 text-sm rounded transition-colors ' +
              (mode === 'preview'
                ? 'bg-blue-600 text-white'
                : 'text-zinc-400 hover:text-white')
            }
          >
            Visual
          </button>
        </div>
      </div>

      {mode === 'preview' && (
        <div className="flex gap-1 flex-wrap bg-zinc-800/50 rounded-md p-2 border border-zinc-700">
          <button
            type="button"
            onClick={() => execCommand('bold')}
            className="px-2 py-1 text-sm text-zinc-300 hover:bg-zinc-700 rounded font-bold"
            title="Bold"
          >
            B
          </button>
          <button
            type="button"
            onClick={() => execCommand('italic')}
            className="px-2 py-1 text-sm text-zinc-300 hover:bg-zinc-700 rounded italic"
            title="Italic"
          >
            I
          </button>
          <button
            type="button"
            onClick={() => execCommand('underline')}
            className="px-2 py-1 text-sm text-zinc-300 hover:bg-zinc-700 rounded underline"
            title="Underline"
          >
            U
          </button>
          <span className="w-px bg-zinc-600 mx-1" />
          <button
            type="button"
            onClick={() => execCommand('formatBlock', 'h1')}
            className="px-2 py-1 text-sm text-zinc-300 hover:bg-zinc-700 rounded"
            title="Heading 1"
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => execCommand('formatBlock', 'h2')}
            className="px-2 py-1 text-sm text-zinc-300 hover:bg-zinc-700 rounded"
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => execCommand('formatBlock', 'h3')}
            className="px-2 py-1 text-sm text-zinc-300 hover:bg-zinc-700 rounded"
            title="Heading 3"
          >
            H3
          </button>
          <button
            type="button"
            onClick={() => execCommand('formatBlock', 'p')}
            className="px-2 py-1 text-sm text-zinc-300 hover:bg-zinc-700 rounded"
            title="Paragraph"
          >
            P
          </button>
          <span className="w-px bg-zinc-600 mx-1" />
          <button
            type="button"
            onClick={() => execCommand('insertUnorderedList')}
            className="px-2 py-1 text-sm text-zinc-300 hover:bg-zinc-700 rounded"
            title="Bullet List"
          >
            • List
          </button>
          <button
            type="button"
            onClick={() => execCommand('insertOrderedList')}
            className="px-2 py-1 text-sm text-zinc-300 hover:bg-zinc-700 rounded"
            title="Numbered List"
          >
            1. List
          </button>
          <span className="w-px bg-zinc-600 mx-1" />
          <button
            type="button"
            onClick={() => {
              const url = prompt('Enter link URL:');
              if (url) execCommand('createLink', url);
            }}
            className="px-2 py-1 text-sm text-zinc-300 hover:bg-zinc-700 rounded"
            title="Insert Link"
          >
            Link
          </button>
          <button
            type="button"
            onClick={() => execCommand('unlink')}
            className="px-2 py-1 text-sm text-zinc-300 hover:bg-zinc-700 rounded"
            title="Remove Link"
          >
            Unlink
          </button>
          <span className="w-px bg-zinc-600 mx-1" />
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => imageInputRef.current?.click()}
            disabled={uploadingImage}
            className="px-2 py-1 text-sm text-zinc-300 hover:bg-zinc-700 rounded disabled:opacity-50"
            title="Upload Image"
          >
            {uploadingImage ? 'Uploading...' : 'Upload'}
          </button>
          <button
            type="button"
            onClick={() => setShowMediaPicker(true)}
            className="px-2 py-1 text-sm text-zinc-300 hover:bg-zinc-700 rounded"
            title="Choose from Gallery"
          >
            Gallery
          </button>
        </div>
      )}

      <MediaPicker
        isOpen={showMediaPicker}
        onClose={() => setShowMediaPicker(false)}
        onSelect={handleMediaSelect}
      />

      {mode === 'code' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-96 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-md text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          placeholder="Enter HTML content..."
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          className="w-full min-h-96 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-md text-white prose prose-invert max-w-none overflow-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{ whiteSpace: 'pre-wrap' }}
        />
      )}
    </div>
  );
}

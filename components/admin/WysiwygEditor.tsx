'use client';

import { useState } from 'react';

interface WysiwygEditorProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

export default function WysiwygEditor({ value, onChange, label }: WysiwygEditorProps) {
  const [mode, setMode] = useState<'code' | 'preview'>('code');

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
            Preview
          </button>
        </div>
      </div>

      {mode === 'code' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-96 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-md text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          placeholder="Enter HTML content..."
        />
      ) : (
        <div
          className="w-full min-h-96 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-md text-white prose prose-invert max-w-none overflow-auto"
          dangerouslySetInnerHTML={{ __html: value }}
        />
      )}
    </div>
  );
}

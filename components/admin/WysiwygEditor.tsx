'use client';

import { useState, useRef, useEffect } from 'react';

interface WysiwygEditorProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

export default function WysiwygEditor({ value, onChange, label }: WysiwygEditorProps) {
  const [mode, setMode] = useState<'code' | 'preview'>('code');
  const editorRef = useRef<HTMLDivElement>(null);

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
        </div>
      )}

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

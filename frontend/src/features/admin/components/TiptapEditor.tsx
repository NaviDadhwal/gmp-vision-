import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import LinkExtension from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import DOMPurify from 'dompurify';
import { Bold, Italic, Underline as UnderlineIcon, Heading2, Heading3, List, ListOrdered, Quote, RotateCcw } from 'lucide-react';

interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export const TiptapEditor: React.FC<TiptapEditorProps> = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      LinkExtension.configure({
        openOnClick: false,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      const rawHtml = editor.getHTML();
      const sanitized = DOMPurify.sanitize(rawHtml);
      onChange(sanitized);
    },
  });

  if (!editor) return null;

  return (
    <div
      style={{
        border: '1.5px solid #CBD5E1',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.25rem',
          padding: '0.5rem',
          backgroundColor: '#F8FAFC',
          borderBottom: '1px solid #E2E8F0',
        }}
      >
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          style={{
            padding: '0.35rem 0.5rem',
            borderRadius: '4px',
            backgroundColor: editor.isActive('bold') ? '#0A3B85' : 'transparent',
            color: editor.isActive('bold') ? '#FFFFFF' : '#334155',
          }}
          title="Bold"
        >
          <Bold size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          style={{
            padding: '0.35rem 0.5rem',
            borderRadius: '4px',
            backgroundColor: editor.isActive('italic') ? '#0A3B85' : 'transparent',
            color: editor.isActive('italic') ? '#FFFFFF' : '#334155',
          }}
          title="Italic"
        >
          <Italic size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          style={{
            padding: '0.35rem 0.5rem',
            borderRadius: '4px',
            backgroundColor: editor.isActive('underline') ? '#0A3B85' : 'transparent',
            color: editor.isActive('underline') ? '#FFFFFF' : '#334155',
          }}
          title="Underline"
        >
          <UnderlineIcon size={16} />
        </button>

        <div className="tiptap-divider" style={{ width: '1px', backgroundColor: '#CBD5E1', margin: '0 0.25rem' }} />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          style={{
            padding: '0.35rem 0.5rem',
            borderRadius: '4px',
            backgroundColor: editor.isActive('heading', { level: 2 }) ? '#0A3B85' : 'transparent',
            color: editor.isActive('heading', { level: 2 }) ? '#FFFFFF' : '#334155',
          }}
          title="Heading 2"
        >
          <Heading2 size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          style={{
            padding: '0.35rem 0.5rem',
            borderRadius: '4px',
            backgroundColor: editor.isActive('heading', { level: 3 }) ? '#0A3B85' : 'transparent',
            color: editor.isActive('heading', { level: 3 }) ? '#FFFFFF' : '#334155',
          }}
          title="Heading 3"
        >
          <Heading3 size={16} />
        </button>

        <div className="tiptap-divider" style={{ width: '1px', backgroundColor: '#CBD5E1', margin: '0 0.25rem' }} />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          style={{
            padding: '0.35rem 0.5rem',
            borderRadius: '4px',
            backgroundColor: editor.isActive('bulletList') ? '#0A3B85' : 'transparent',
            color: editor.isActive('bulletList') ? '#FFFFFF' : '#334155',
          }}
          title="Bullet List"
        >
          <List size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          style={{
            padding: '0.35rem 0.5rem',
            borderRadius: '4px',
            backgroundColor: editor.isActive('orderedList') ? '#0A3B85' : 'transparent',
            color: editor.isActive('orderedList') ? '#FFFFFF' : '#334155',
          }}
          title="Numbered List"
        >
          <ListOrdered size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          style={{
            padding: '0.35rem 0.5rem',
            borderRadius: '4px',
            backgroundColor: editor.isActive('blockquote') ? '#0A3B85' : 'transparent',
            color: editor.isActive('blockquote') ? '#FFFFFF' : '#334155',
          }}
          title="Quote Block"
        >
          <Quote size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
          style={{
            padding: '0.35rem 0.5rem',
            borderRadius: '4px',
            color: '#64748B',
          }}
          title="Clear Formatting"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* Editor Content Area */}
      <div style={{ padding: '0.85rem 1rem', minHeight: '140px', color: '#1E293B', maxWidth: '100%', boxSizing: 'border-box' }}>
        <EditorContent editor={editor} />
      </div>

      <style>{`
        .ProseMirror { outline: none; min-height: 120px; word-break: break-word; overflow-wrap: break-word; max-width: 100%; }
        .ProseMirror p { margin-bottom: 0.5rem; }
        .ProseMirror h2 { font-size: 1.25rem; margin: 0.8rem 0 0.4rem; color: #051C42; }
        .ProseMirror h3 { font-size: 1.1rem; margin: 0.6rem 0 0.3rem; color: #051C42; }
        .ProseMirror ul, .ProseMirror ol { padding-left: 1.25rem; margin-bottom: 0.5rem; }
        .ProseMirror blockquote { border-left: 3px solid #3DAE2B; padding-left: 0.75rem; color: #475569; font-style: italic; }
      `}</style>
    </div>
  );
};

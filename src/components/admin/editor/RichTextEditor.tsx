'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Link,
  Image,
  Code,
  Undo,
  Redo,
  Type,
  Heading1,
  Heading2,
  Heading3,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const toolbarButtons = [
  {
    group: 'history',
    buttons: [
      { command: 'undo', icon: Undo, title: '실행 취소 (Ctrl+Z)' },
      { command: 'redo', icon: Redo, title: '다시 실행 (Ctrl+Y)' },
    ],
  },
  {
    group: 'headings',
    buttons: [
      { command: 'formatBlock', value: 'h1', icon: Heading1, title: '제목 1' },
      { command: 'formatBlock', value: 'h2', icon: Heading2, title: '제목 2' },
      { command: 'formatBlock', value: 'h3', icon: Heading3, title: '제목 3' },
      { command: 'formatBlock', value: 'p', icon: Type, title: '본문' },
    ],
  },
  {
    group: 'formatting',
    buttons: [
      { command: 'bold', icon: Bold, title: '굵게 (Ctrl+B)' },
      { command: 'italic', icon: Italic, title: '기울임 (Ctrl+I)' },
      { command: 'underline', icon: Underline, title: '밑줄 (Ctrl+U)' },
      { command: 'strikeThrough', icon: Strikethrough, title: '취소선' },
    ],
  },
  {
    group: 'alignment',
    buttons: [
      { command: 'justifyLeft', icon: AlignLeft, title: '왼쪽 정렬' },
      { command: 'justifyCenter', icon: AlignCenter, title: '가운데 정렬' },
      { command: 'justifyRight', icon: AlignRight, title: '오른쪽 정렬' },
      { command: 'justifyFull', icon: AlignJustify, title: '양쪽 정렬' },
    ],
  },
  {
    group: 'lists',
    buttons: [
      { command: 'insertUnorderedList', icon: List, title: '글머리 기호' },
      { command: 'insertOrderedList', icon: ListOrdered, title: '번호 매기기' },
      { command: 'formatBlock', value: 'blockquote', icon: Quote, title: '인용구' },
    ],
  },
  {
    group: 'media',
    buttons: [
      { command: 'createLink', icon: Link, title: '링크 삽입' },
      { command: 'insertImage', icon: Image, title: '이미지 삽입' },
      { command: 'formatBlock', value: 'pre', icon: Code, title: '코드 블록' },
    ],
  },
];

export function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = '내용을 입력하세요...', 
  className 
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  useEffect(() => {
    const updateActiveStates = () => {
      const newActiveStates: Record<string, boolean> = {};
      
      try {
        newActiveStates.bold = document.queryCommandState('bold');
        newActiveStates.italic = document.queryCommandState('italic');
        newActiveStates.underline = document.queryCommandState('underline');
        newActiveStates.strikeThrough = document.queryCommandState('strikeThrough');
        newActiveStates.justifyLeft = document.queryCommandState('justifyLeft');
        newActiveStates.justifyCenter = document.queryCommandState('justifyCenter');
        newActiveStates.justifyRight = document.queryCommandState('justifyRight');
        newActiveStates.justifyFull = document.queryCommandState('justifyFull');
        newActiveStates.insertUnorderedList = document.queryCommandState('insertUnorderedList');
        newActiveStates.insertOrderedList = document.queryCommandState('insertOrderedList');
      } catch (error) {
        // Some browsers may not support all commands
        console.warn('Error checking command state:', error);
      }
      
      setIsActive(newActiveStates);
    };

    const handleSelectionChange = () => {
      updateActiveStates();
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  const executeCommand = (command: string, value?: string) => {
    if (!editorRef.current) return;

    editorRef.current.focus();

    if (command === 'createLink') {
      const url = prompt('링크 URL을 입력하세요:');
      if (url) {
        document.execCommand('createLink', false, url);
      }
      return;
    }

    if (command === 'insertImage') {
      const url = prompt('이미지 URL을 입력하세요:');
      if (url) {
        document.execCommand('insertImage', false, url);
      }
      return;
    }

    if (command === 'formatBlock') {
      document.execCommand('formatBlock', false, `<${value}>`);
    } else {
      document.execCommand(command, false, value);
    }

    // Update content
    onChange(editorRef.current.innerHTML);
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault();
          executeCommand('bold');
          break;
        case 'i':
          e.preventDefault();
          executeCommand('italic');
          break;
        case 'u':
          e.preventDefault();
          executeCommand('underline');
          break;
        case 'z':
          e.preventDefault();
          executeCommand(e.shiftKey ? 'redo' : 'undo');
          break;
        case 'y':
          e.preventDefault();
          executeCommand('redo');
          break;
      }
    }
  };

  return (
    <div className={cn('border border-input rounded-md overflow-hidden', className)}>
      {/* Toolbar */}
      <div className="border-b border-input p-2 bg-muted/30">
        <div className="flex flex-wrap gap-1">
          {toolbarButtons.map((group, groupIndex) => (
            <div key={group.group} className="flex items-center">
              {group.buttons.map((button) => (
                <Button
                  key={`${button.command}-${button.value || ''}`}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    'h-8 w-8 p-0',
                    isActive[button.command] && 'bg-primary text-primary-foreground'
                  )}
                  onClick={() => executeCommand(button.command, button.value)}
                  title={button.title}
                  type="button"
                >
                  <button.icon className="h-4 w-4" />
                </Button>
              ))}
              {groupIndex < toolbarButtons.length - 1 && (
                <div className="w-px h-6 bg-border mx-1" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
        className="min-h-96 p-4 focus:outline-none prose prose-sm max-w-none"
        style={{
          fontFamily: 'Pretendard, system-ui, sans-serif',
          lineHeight: '1.6',
        }}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
      />

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        
        [contenteditable] h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.67em 0;
        }
        
        [contenteditable] h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.75em 0;
        }
        
        [contenteditable] h3 {
          font-size: 1.17em;
          font-weight: bold;
          margin: 0.83em 0;
        }
        
        [contenteditable] p {
          margin: 1em 0;
        }
        
        [contenteditable] blockquote {
          margin: 1em 0;
          padding: 0 1em;
          border-left: 4px solid #e5e7eb;
          color: #6b7280;
        }
        
        [contenteditable] pre {
          background: #f3f4f6;
          padding: 1em;
          border-radius: 0.375rem;
          overflow-x: auto;
          font-family: 'Geist Mono', monospace;
        }
        
        [contenteditable] ul, [contenteditable] ol {
          margin: 1em 0;
          padding-left: 2em;
        }
        
        [contenteditable] img {
          max-width: 100%;
          height: auto;
          border-radius: 0.375rem;
        }
        
        [contenteditable] a {
          color: #0ea5e9;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
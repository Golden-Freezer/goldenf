"use client";

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings from content
    const headingRegex = /^(#{2,4})\s+(.+)$/gm;
    const items: TocItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text.toLowerCase()
        .replace(/[^\w\s-가-힣]/g, '')
        .replace(/\s+/g, '-');
      
      items.push({ id, text, level });
    }

    setTocItems(items);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    tocItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [tocItems]);

  if (tocItems.length === 0) return null;

  return (
    <div className="toc-modern">
      <h3>목차</h3>
      <ul>
        {tocItems.map(({ id, text, level }) => (
          <li key={id} style={{ marginLeft: `${(level - 2) * 1}rem` }}>
            <a
              href={`#${id}`}
              className={cn(
                activeId === id && 'active'
              )}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
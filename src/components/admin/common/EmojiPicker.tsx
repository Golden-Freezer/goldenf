'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface EmojiPickerProps {
  emoji: string;
  onChange: (emoji: string) => void;
}

const categoryEmojis = [
  // Office & Business
  '📋', '📊', '📈', '📉', '📑', '📄', '📝', '🗂️', '📁', '📂',
  // People & Teams
  '👥', '👤', '🤝', '👔', '💼', '🏢', '🏛️', '🏭', '🏪', '🏬',
  // Tools & Equipment
  '🔧', '🔨', '⚙️', '🛠️', '⚡', '🔌', '💻', '🖥️', '📱', '☎️',
  // Finance & Money  
  '💰', '💳', '💸', '💵', '💴', '💶', '💷', '🏦', '📊', '📈',
  // Security & Safety
  '🛡️', '🔐', '🔑', '🚨', '⚠️', '🔒', '🔓', '🛡️', '👮', '🚔',
  // Documents & Files
  '📄', '📃', '📋', '📑', '📰', '📓', '📔', '📕', '📖', '📗',
  // Communication
  '📧', '📨', '📩', '📤', '📥', '📢', '📣', '📯', '📻', '📺',
  // General Categories
  '⚖️', '🎯', '🚀', '🎪', '🎨', '🎵', '🎭', '🎪', '🎲', '🎳',
];

export function EmojiPicker({ emoji, onChange }: EmojiPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <span className="text-xl mr-2">{emoji}</span>
          아이콘 선택
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-2">
          <div className="text-sm font-medium">아이콘 선택</div>
          <div className="grid grid-cols-8 gap-2 max-h-48 overflow-y-auto">
            {categoryEmojis.map((categoryEmoji) => (
              <button
                key={categoryEmoji}
                className="w-8 h-8 flex items-center justify-center text-lg hover:bg-gray-100 rounded transition-colors"
                onClick={() => {
                  onChange(categoryEmoji);
                  setIsOpen(false);
                }}
              >
                {categoryEmoji}
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
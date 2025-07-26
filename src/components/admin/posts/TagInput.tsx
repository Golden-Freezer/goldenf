'use client';

import { useState, KeyboardEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
  maxTags?: number;
}

export function TagInput({ 
  tags, 
  onChange, 
  placeholder = '태그를 입력하세요',
  className,
  maxTags = 10
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      // Remove last tag when backspace is pressed on empty input
      onChange(tags.slice(0, -1));
    }
  };

  const addTag = () => {
    const trimmedValue = inputValue.trim().replace(/,$/, ''); // Remove trailing comma
    
    if (trimmedValue && !tags.includes(trimmedValue) && tags.length < maxTags) {
      onChange([...tags, trimmedValue]);
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  const handleInputChange = (value: string) => {
    // Handle comma-separated input
    if (value.includes(',')) {
      const newTags = value
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag && !tags.includes(tag));
      
      if (newTags.length > 0 && tags.length + newTags.length <= maxTags) {
        onChange([...tags, ...newTags.slice(0, maxTags - tags.length)]);
        setInputValue('');
      }
    } else {
      setInputValue(value);
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex flex-wrap gap-2 min-h-10 p-3 border border-input rounded-md bg-background">
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="px-2 py-1 text-xs flex items-center gap-1 cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
            onClick={() => removeTag(tag)}
          >
            {tag}
            <X className="w-3 h-3" />
          </Badge>
        ))}
        
        <Input
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={tags.length === 0 ? placeholder : ''}
          className="border-0 shadow-none p-0 h-auto focus-visible:ring-0 flex-1 min-w-32"
          disabled={tags.length >= maxTags}
        />
      </div>
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>
          Enter 또는 쉼표로 태그를 추가할 수 있습니다
        </span>
        <span>
          {tags.length}/{maxTags}
        </span>
      </div>
      
      {tags.length >= maxTags && (
        <div className="text-xs text-amber-600">
          최대 {maxTags}개의 태그까지 추가할 수 있습니다
        </div>
      )}
    </div>
  );
}
"use client";

import { Share2, Twitter, Facebook, Linkedin, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface SocialShareProps {
  title: string;
  url: string;
  description?: string;
}

export function SocialShare({ title, url, description }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const shareData = {
    title,
    url,
    text: description || title,
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log('Failed to copy:', err);
    }
  };

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  };

  return (
    <div className="social-share">
      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">공유하기:</span>
      
      {/* Native Share (Mobile) */}
      {navigator.share && (
        <button
          onClick={handleNativeShare}
          className="social-share-btn"
          aria-label="공유하기"
        >
          <Share2 className="w-4 h-4" />
          공유
        </button>
      )}

      {/* Twitter */}
      <a
        href={shareUrls.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="social-share-btn twitter"
        aria-label="트위터에 공유"
      >
        <Twitter className="w-4 h-4" />
        트위터
      </a>

      {/* Facebook */}
      <a
        href={shareUrls.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="social-share-btn facebook"
        aria-label="페이스북에 공유"
      >
        <Facebook className="w-4 h-4" />
        페이스북
      </a>

      {/* LinkedIn */}
      <a
        href={shareUrls.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="social-share-btn linkedin"
        aria-label="링크드인에 공유"
      >
        <Linkedin className="w-4 h-4" />
        링크드인
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        className="social-share-btn"
        aria-label="링크 복사"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-green-500" />
            복사됨
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            링크 복사
          </>
        )}
      </button>
    </div>
  );
}
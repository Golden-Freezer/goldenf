'use client';

import { useEffect, useRef } from 'react';

interface AdSenseAdProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  fullWidthResponsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function AdSenseAd({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  className = '',
  style = {},
}: AdSenseAdProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const adPushed = useRef(false);

  useEffect(() => {
    // Check if AdSense is loaded and user has consented to marketing cookies
    const consentGiven = localStorage.getItem('cookie-consent');
    let hasMarketingConsent = false;

    if (consentGiven) {
      try {
        const preferences = JSON.parse(consentGiven);
        hasMarketingConsent = preferences.marketing === true;
      } catch (error) {
        console.error('Error parsing cookie preferences:', error);
      }
    }

    // Only load ads if marketing consent is given
    if (!hasMarketingConsent) {
      return;
    }

    // Check if AdSense script is loaded
    if (typeof window !== 'undefined' && window.adsbygoogle && !adPushed.current) {
      try {
        window.adsbygoogle.push({});
        adPushed.current = true;
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, []);

  // Don't render if no AdSense ID is configured
  if (!process.env.NEXT_PUBLIC_ADSENSE_ID) {
    return null;
  }

  return (
    <div className={`ad-container ${className}`} style={style}>
      {/* Ad label for Korean compliance */}
      <div className="ad-label text-xs text-muted-foreground mb-1 text-center">
        광고
      </div>
      
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          textAlign: 'center',
          ...style,
        }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive}
        data-ad-test={process.env.NODE_ENV === 'development' ? 'on' : 'off'}
      />
    </div>
  );
}

// Specific ad components for different placements

export function DisplayAd({ className }: { className?: string }) {
  return (
    <AdSenseAd
      adSlot="1234567890" // Replace with actual ad slot
      adFormat="auto"
      className={className}
      style={{ minHeight: '250px' }}
    />
  );
}

export function InArticleAd({ className }: { className?: string }) {
  return (
    <div className={`my-8 ${className}`}>
      <AdSenseAd
        adSlot="1234567891" // Replace with actual ad slot
        adFormat="auto"
        style={{ minHeight: '200px' }}
      />
    </div>
  );
}

export function SidebarAd({ className }: { className?: string }) {
  return (
    <div className={`sticky top-4 ${className}`}>
      <AdSenseAd
        adSlot="1234567892" // Replace with actual ad slot
        adFormat="vertical"
        style={{ minHeight: '600px', maxWidth: '300px' }}
      />
    </div>
  );
}

export function FooterAd({ className }: { className?: string }) {
  return (
    <div className={`mt-8 ${className}`}>
      <AdSenseAd
        adSlot="1234567893" // Replace with actual ad slot
        adFormat="horizontal"
        style={{ minHeight: '100px' }}
      />
    </div>
  );
}
'use client';

import { useEffect } from 'react';

export function AutoAds() {
  useEffect(() => {
    // Check if user has consented to marketing cookies
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

    // Only enable auto ads if marketing consent is given
    if (!hasMarketingConsent || !process.env.NEXT_PUBLIC_ADSENSE_ID) {
      return;
    }

    // Enable auto ads
    if (typeof window !== 'undefined' && window.adsbygoogle) {
      try {
        window.adsbygoogle.push({
          google_ad_client: process.env.NEXT_PUBLIC_ADSENSE_ID,
          enable_page_level_ads: true,
          overlays: {bottom: true},
          vignette: {conversion_id: process.env.NEXT_PUBLIC_ADSENSE_ID}
        });
      } catch (error) {
        console.error('Auto ads error:', error);
      }
    }
  }, []);

  // This component doesn't render anything visible
  return null;
}
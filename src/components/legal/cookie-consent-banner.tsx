'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consentGiven = localStorage.getItem('cookie-consent');
    if (!consentGiven) {
      setShowBanner(true);
    } else {
      // Load saved preferences
      try {
        const savedPreferences = JSON.parse(consentGiven);
        setPreferences(prev => ({ ...prev, ...savedPreferences }));
      } catch (error) {
        console.error('Error parsing cookie preferences:', error);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted));
    setShowBanner(false);

    // Enable all tracking
    enableTracking(allAccepted);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    setPreferences(onlyNecessary);
    localStorage.setItem('cookie-consent', JSON.stringify(onlyNecessary));
    setShowBanner(false);

    // Only enable necessary tracking
    enableTracking(onlyNecessary);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    setShowBanner(false);
    setShowSettings(false);

    // Enable tracking based on preferences
    enableTracking(preferences);
  };

  const enableTracking = (prefs: typeof preferences) => {
    // Google Analytics
    if (prefs.analytics && typeof window !== 'undefined') {
      // Enable Google Analytics
      (window as any).gtag?.('consent', 'update', {
        analytics_storage: 'granted',
      });
    }

    // Marketing cookies (AdSense)
    if (prefs.marketing && typeof window !== 'undefined') {
      (window as any).gtag?.('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      });
    }

    // Functional cookies
    if (prefs.functional) {
      // Enable functional tracking
    }
  };

  const handlePreferenceChange = (key: keyof typeof preferences) => {
    if (key === 'necessary') return; // Can't disable necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="max-w-4xl mx-auto shadow-lg border-2">
        <CardContent className="p-6">
          {!showSettings ? (
            // Main banner
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex-shrink-0 flex items-center justify-center">
                  <span className="text-sm">🍪</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">
                    쿠키 사용에 대한 동의
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    본 웹사이트는 서비스 향상을 위해 쿠키를 사용합니다. 
                    쿠키는 웹사이트 기능 제공, 사용자 경험 개선, 트래픽 분석, 
                    맞춤형 광고 제공을 위해 사용됩니다. 
                    자세한 내용은 <Link href="/cookies" className="text-primary hover:underline">쿠키 정책</Link>과 
                    <Link href="/privacy" className="text-primary hover:underline ml-1">개인정보처리방침</Link>을 참고해주세요.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={handleAcceptAll}
                      size="sm"
                      className="min-w-24"
                    >
                      모두 수락
                    </Button>
                    <Button
                      onClick={handleRejectAll}
                      variant="outline"
                      size="sm"
                      className="min-w-24"
                    >
                      필수만 허용
                    </Button>
                    <Button
                      onClick={() => setShowSettings(true)}
                      variant="ghost"
                      size="sm"
                    >
                      설정 변경
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Settings panel
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">
                  쿠키 설정
                </h3>
                <Button
                  onClick={() => setShowSettings(false)}
                  variant="ghost"
                  size="sm"
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-4">
                {/* Necessary Cookies */}
                <div className="flex items-start justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">
                      필수 쿠키
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      웹사이트 기본 기능을 위해 반드시 필요한 쿠키입니다. 
                      이 쿠키는 비활성화할 수 없습니다.
                    </p>
                  </div>
                  <div className="ml-4">
                    <div className="w-12 h-6 bg-primary rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-all duration-200" />
                    </div>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-start justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">
                      분석 쿠키
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      웹사이트 사용 패턴을 분석하여 서비스를 개선하는 데 사용됩니다.
                    </p>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={() => handlePreferenceChange('analytics')}
                      className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${
                        preferences.analytics ? 'bg-primary' : 'bg-muted'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-200 ${
                        preferences.analytics ? 'right-0.5' : 'left-0.5'
                      }`} />
                    </button>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-start justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">
                      마케팅 쿠키
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      사용자의 관심사에 맞는 맞춤형 광고를 제공하는 데 사용됩니다.
                    </p>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={() => handlePreferenceChange('marketing')}
                      className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${
                        preferences.marketing ? 'bg-primary' : 'bg-muted'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-200 ${
                        preferences.marketing ? 'right-0.5' : 'left-0.5'
                      }`} />
                    </button>
                  </div>
                </div>

                {/* Functional Cookies */}
                <div className="flex items-start justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">
                      기능성 쿠키
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      사용자 설정 저장 등 향상된 기능을 제공하는 데 사용됩니다.
                    </p>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={() => handlePreferenceChange('functional')}
                      className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${
                        preferences.functional ? 'bg-primary' : 'bg-muted'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-200 ${
                        preferences.functional ? 'right-0.5' : 'left-0.5'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  onClick={handleSavePreferences}
                  size="sm"
                >
                  설정 저장
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAVIGATION_MENU, SITE_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Moon, 
  Sun, 
  Menu, 
  X, 
  ChevronDown,
  Search
} from 'lucide-react';

interface ThemeProviderProps {
  children: React.ReactNode;
}

// Custom Theme Provider Component
function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' || 'system';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme: 'light' | 'dark' | 'system') => {
    const root = document.documentElement;
    
    if (newTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.setAttribute('data-theme', systemTheme);
    } else {
      root.setAttribute('data-theme', newTheme);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <div className="theme-provider">
      {React.cloneElement(children as React.ReactElement, { theme, toggleTheme })}
    </div>
  );
}

interface HeaderProps {
  theme?: 'light' | 'dark' | 'system';
  toggleTheme?: () => void;
}

function HeaderContent({ theme, toggleTheme }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200/60 dark:border-gray-800/60 shadow-sm" 
          : "bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
      )}
    >
      <div className="container-minimal">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 hover:opacity-80 transition-all duration-200 group"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-200">
              G
            </div>
            <span className="font-bold text-lg text-gray-900 dark:text-white hidden sm:block">
              {SITE_CONFIG.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {NAVIGATION_MENU.map((item) => (
              <div key={item.href} className="relative">
                {item.children ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className={cn(
                          "h-10 px-4 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-200",
                          pathname.startsWith('/categories') && "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
                        )}
                      >
                        {item.label}
                        <ChevronDown className="ml-1 h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="start" 
                      className="w-48 p-2 bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800/60 shadow-lg backdrop-blur-sm rounded-lg"
                    >
                      {item.children.map((child) => (
                        <DropdownMenuItem key={child.href} asChild>
                          <Link 
                            href={child.href}
                            className={cn(
                              "px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md transition-all duration-200",
                              pathname === child.href && "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
                            )}
                          >
                            {child.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link href={item.href}>
                    <Button 
                      variant="ghost"
                      className={cn(
                        "h-10 px-4 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-200",
                        pathname === item.href && "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
                      )}
                    >
                      {item.label}
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <Button 
              variant="ghost" 
              size="sm"
              className="hidden md:flex h-10 w-10 p-0 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-200"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="h-10 w-10 p-0 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-200"
              aria-label="테마 변경"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden h-10 w-10 p-0 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-200"
              aria-label="메뉴 열기"
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200/60 dark:border-gray-800/60">
            <nav className="container-minimal py-6">
              <div className="space-y-2">
                {NAVIGATION_MENU.map((item) => (
                  <div key={item.href}>
                    {item.children ? (
                      <div className="space-y-2">
                        <div className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                          {item.label}
                        </div>
                        <div className="pl-4 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setIsMenuOpen(false)}
                              className={cn(
                                "block px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md transition-all duration-200",
                                pathname === child.href && "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
                              )}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={cn(
                          "block px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md transition-all duration-200",
                          pathname === item.href && "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
                        )}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile Search */}
              <div className="mt-6 pt-4 border-t border-gray-200/60 dark:border-gray-800/60">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md transition-all duration-200"
                >
                  <Search className="h-4 w-4" />
                  검색
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export function Header() {
  return (
    <ThemeProvider>
      <HeaderContent />
    </ThemeProvider>
  );
}
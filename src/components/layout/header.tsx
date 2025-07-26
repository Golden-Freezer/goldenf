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
  Search,
  BookOpen,
  Home,
  FolderOpen,
  User,
  Mail
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

  const getNavIcon = (label: string) => {
    switch (label) {
      case '홈': return <Home className="w-4 h-4" />;
      case '카테고리': return <FolderOpen className="w-4 h-4" />;
      case '전체 글': return <BookOpen className="w-4 h-4" />;
      case '소개': return <User className="w-4 h-4" />;
      case '문의': return <Mail className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-lg" 
          : "bg-transparent"
      )}
    >
      <div className="container-modern">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 hover:opacity-80 transition-opacity group"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-xl transition-shadow">
                골
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-2 border-white dark:border-gray-900"></div>
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {SITE_CONFIG.name.split(' ')[0]}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {SITE_CONFIG.name.split(' ')[1]}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {NAVIGATION_MENU.map((item) => (
              <div key={item.href} className="relative group">
                {item.children ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className={cn(
                          "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200",
                          "hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 dark:hover:text-blue-400",
                          pathname.startsWith('/categories') && "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400"
                        )}
                      >
                        {getNavIcon(item.label)}
                        {item.label}
                        <ChevronDown className="w-4 h-4 transition-transform group-data-[state=open]:rotate-180" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="start" 
                      className="w-56 p-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 shadow-xl rounded-xl"
                    >
                      {item.children.map((child) => (
                        <DropdownMenuItem key={child.href} asChild>
                          <Link 
                            href={child.href}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                              "hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 dark:hover:text-blue-400",
                              pathname === child.href && "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400"
                            )}
                          >
                            <span className="text-lg">{item.label === '카테고리' ? '📁' : '📄'}</span>
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
                        "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200",
                        "hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 dark:hover:text-blue-400",
                        pathname === item.href && "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400"
                      )}
                    >
                      {getNavIcon(item.label)}
                      {item.label}
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Search Button */}
            <Button 
              variant="ghost" 
              size="sm"
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Search className="w-4 h-4" />
              <span className="text-sm">검색</span>
              <kbd className="hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-2">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="테마 변경"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-blue-600" />
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="메뉴 열기"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-xl">
            <nav className="container-modern py-4">
              <div className="space-y-1">
                {NAVIGATION_MENU.map((item) => (
                  <div key={item.href}>
                    {item.children ? (
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                          {getNavIcon(item.label)}
                          {item.label}
                        </div>
                        <div className="pl-6 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setIsMenuOpen(false)}
                              className={cn(
                                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                                "hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 dark:hover:text-blue-400",
                                pathname === child.href && "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400"
                              )}
                            >
                              <span className="text-base">📄</span>
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
                          "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                          "hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 dark:hover:text-blue-400",
                          pathname === item.href && "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400"
                        )}
                      >
                        {getNavIcon(item.label)}
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile Search */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-3 px-4 py-3 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Search className="w-4 h-4" />
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
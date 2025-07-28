import Link from 'next/link';
import { SITE_CONFIG, LEGAL_MENU, BLOG_CATEGORIES } from '@/lib/constants';
import { Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-green-50/50 to-green-100/30 dark:from-gray-800/30 dark:to-gray-900/50 border-t border-green-200/30 dark:border-gray-800">
      {/* Main Footer Content */}
      <div className="container-minimal py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                G
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                {SITE_CONFIG.name}
              </span>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-md text-base">
              {SITE_CONFIG.description}
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 group">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <Mail className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <a 
                  href={`mailto:${SITE_CONFIG.author.email}`} 
                  className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  {SITE_CONFIG.author.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <MapPin className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <span>대한민국 서울특별시</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-6 text-base">
              빠른 링크
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/blog" 
                  className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200 text-sm flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  전체 글
                </Link>
              </li>
              <li>
                <Link 
                  href="/categories" 
                  className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200 text-sm flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  카테고리
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200 text-sm flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  소개
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200 text-sm flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  문의
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-6 text-base">
              주요 카테고리
            </h3>
            <ul className="space-y-3">
              {BLOG_CATEGORIES.slice(0, 4).map((category) => (
                <li key={category.id}>
                  <Link 
                    href={`/categories/${category.slug}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200 text-sm flex items-center gap-3 group"
                  >
                    <div 
                      className="w-6 h-6 rounded-md flex items-center justify-center text-xs opacity-80 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: category.color + '20' }}
                    >
                      {category.icon}
                    </div>
                    <span className="flex-1">{category.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-green-200/50 dark:border-gray-700/50 bg-gradient-to-r from-green-50/30 to-emerald-50/30 dark:from-gray-900/30 dark:to-gray-800/30">
        <div className="container-minimal py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
              © {currentYear} {SITE_CONFIG.name}. All rights reserved.
            </div>
            
            <div className="flex items-center gap-8">
              {LEGAL_MENU.map((item, index) => (
                <div key={item.href} className="flex items-center gap-4">
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-200"></span>
                  </Link>
                  {index < LEGAL_MENU.length - 1 && (
                    <span className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
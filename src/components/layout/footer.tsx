import Link from 'next/link';
import { SITE_CONFIG, LEGAL_MENU, BLOG_CATEGORIES } from '@/lib/constants';
import { Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-800/30 border-t border-gray-200 dark:border-gray-800">
      {/* Main Footer Content */}
      <div className="container-minimal py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-md flex items-center justify-center text-white font-semibold text-sm">
                골
              </div>
              <span className="font-semibold text-lg text-gray-900 dark:text-white">
                {SITE_CONFIG.name}
              </span>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed max-w-md">
              {SITE_CONFIG.description}
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${SITE_CONFIG.author.email}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {SITE_CONFIG.author.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>대한민국 서울특별시</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm">
              빠른 링크
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/blog" 
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                >
                  전체 글
                </Link>
              </li>
              <li>
                <Link 
                  href="/categories" 
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                >
                  카테고리
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                >
                  소개
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                >
                  문의
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm">
              주요 카테고리
            </h3>
            <ul className="space-y-2">
              {BLOG_CATEGORIES.slice(0, 4).map((category) => (
                <li key={category.id}>
                  <Link 
                    href={`/categories/${category.slug}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="text-xs">{category.icon}</span>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="container-minimal py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} {SITE_CONFIG.name}. All rights reserved.
            </div>
            
            <div className="flex items-center gap-6">
              {LEGAL_MENU.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
import Link from 'next/link';
import { SITE_CONFIG, LEGAL_MENU, BLOG_CATEGORIES } from '@/lib/constants';
import { Mail, MapPin, Phone, ExternalLink } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      {/* Main Footer Content */}
      <div className="container-modern py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                골
              </div>
              <div>
                <div className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {SITE_CONFIG.name.split(' ')[0]}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {SITE_CONFIG.name.split(' ')[1]}
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed max-w-md">
              {SITE_CONFIG.description}
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4 text-blue-500" />
                <a href={`mailto:${SITE_CONFIG.author.email}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {SITE_CONFIG.author.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span>대한민국 서울특별시</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Phone className="w-4 h-4 text-blue-500" />
                <span>02-0000-0000</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              빠른 링크
            </h3>
            <ul className="space-y-3">
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
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              인기 카테고리
            </h3>
            <ul className="space-y-3">
              {BLOG_CATEGORIES.slice(0, 5).map((category) => (
                <li key={category.id}>
                  <Link 
                    href={`/categories/${category.slug}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm flex items-center gap-2"
                  >
                    <span>{category.icon}</span>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800">
        <div className="container-modern py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                최신 소식을 받아보세요
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                새로운 글과 총무 업무 팁을 이메일로 받아보세요.
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="이메일 주소"
                className="flex-1 md:w-64 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 text-sm font-medium whitespace-nowrap">
                구독하기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="container-modern py-6">
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
          
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-500">
              이 웹사이트는 총무 업무 전문가들을 위한 실용적인 정보를 제공합니다. 
              <br className="hidden sm:inline" />
              모든 정보는 참고용이며, 구체적인 법적 조언은 전문가와 상담하시기 바랍니다.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
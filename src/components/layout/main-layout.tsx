import { Header } from './header';
import { Footer } from './footer';
import { ReadingProgress } from '../blog/reading-progress';

interface MainLayoutProps {
  children: React.ReactNode;
  showReadingProgress?: boolean;
}

export function MainLayout({ children, showReadingProgress = false }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
      {showReadingProgress && <ReadingProgress />}
      <Header />
      
      <main className="flex-1 pt-16">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}
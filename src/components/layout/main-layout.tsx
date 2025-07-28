import { Header } from './header';
import { ReadingProgress } from '../blog/reading-progress';

interface MainLayoutProps {
  children: React.ReactNode;
  showReadingProgress?: boolean;
}

export function MainLayout({ children, showReadingProgress = false }: MainLayoutProps) {
  return (
    <>
      {showReadingProgress && <ReadingProgress />}
      {children}
    </>
  );
}
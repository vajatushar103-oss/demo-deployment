import TopBar from './TopBar';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollProgress from '../common/ScrollProgress';
import BackToTop from '../common/BackToTop';

export default function SiteLayout({ children }) {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <ScrollProgress />
      <TopBar />
      <Navbar />
      {children}
      <Footer />
      <BackToTop />
    </div>
  );
}

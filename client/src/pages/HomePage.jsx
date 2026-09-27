import SiteLayout from '../components/layout/SiteLayout';
import Hero from '../components/home/Hero';
import TrustStrip from '../components/home/TrustStrip';
import ProductGrid from '../components/products/ProductGrid';
import AboutSection from '../components/home/AboutSection';
import ProcessSection from '../components/home/ProcessSection';
import IndustriesSection from '../components/home/IndustriesSection';
import StatsSection from '../components/home/StatsSection';
import ClientsSection from '../components/home/ClientsSection';
import CTASection from '../components/home/CTASection';
import ContactSection from '../components/contact/ContactSection';
import { useProducts } from '../hooks/useProducts';

export default function HomePage() {
  const productState = useProducts();


  return (
    <SiteLayout>
      <main>
        <Hero />
        <TrustStrip />
        <ProductGrid {...productState} />
        <AboutSection />
        <ProcessSection />
        <IndustriesSection />
        <StatsSection />
        <ClientsSection />
        <CTASection />
        <ContactSection />
      </main>
    </SiteLayout>
  );
}

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Space from './components/Space';
import Location from './components/Location';
import CTA from './components/CTA';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import LivePresence from './components/LivePresence';

export default function App() {
  return (
    <div className="bg-cream text-charcoal overflow-x-hidden selection:bg-matcha selection:text-cream scroll-smooth">
      <Navbar />
      <main>
        <Hero />
        <Menu />
        <Space />
        <Location />
        <CTA />
      </main>
      <FloatingWhatsApp />
      <LivePresence />
    </div>
  );
}

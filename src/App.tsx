import Header from './sections/Header';
import Hero from './sections/Hero';
import FeatureGrid from './sections/FeatureGrid';
import CalorieStream from './sections/CalorieStream';
import FooterCTA from './sections/FooterCTA';

export default function App() {
  return (
    <div className="relative">
      <Header />
      <Hero />
      <FeatureGrid />
      <CalorieStream />
      <FooterCTA />
    </div>
  );
}

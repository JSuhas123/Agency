import AboutPage from './components/About us'; // Corrected import path
import CaseStudies from './components/CaseStudies';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import PortfolioPage from './components/PortfolioPage'; // Corrected import path
import Services from './components/Services';
import TeamPage from './components/TeamPag'; // Corrected import path

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <AboutPage />
      <Services />
      <TeamPage />
      <CaseStudies />
      <PortfolioPage />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;
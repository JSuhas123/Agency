import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AboutUs from './components/AboutUs';
import AiAuditPage from './components/ai-audit';
import AIMarketing from './components/AIMarketing';
import Blog from './components/Blog';
import ContactSection from './components/ContactSection';
import Forms from './components/forms';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import PortfolioPage from './components/PortfolioPage';
import Services from './components/Services';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path = "/navbar" element = {<Navbar />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/forms" element={<Forms />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/ai-audit" element={<AiAuditPage />} />
        <Route path="/ai-marketing" element={<AIMarketing />} />
        <Route path="/contact" element={<ContactSection />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AboutUs from './components/AboutUs';
import ContactSection from './components/ContactSection';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
//import PortfolioPage from './components/PortfolioPage';
import Services from './components/Services';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path = "/navbar" element = {<Navbar />} />
        <Route path="/contact" element={<ContactSection />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
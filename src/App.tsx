import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AboutUs from './components/AboutUs';
import ContactForm from './components/ContactForm';
//import DigitalMarketing from './components/DigitalMarketing';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import PortfolioPage from './components/PortfolioPage';
import Services from './components/Services';
import TeamPage from './components/TeamPage';
import Vision from './components/Vision';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path = "/navbar" element = {<Navbar />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/vision-mission" element={<Vision />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
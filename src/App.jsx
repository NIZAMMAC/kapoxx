import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Process from './components/Process';
import TrustBanner from './components/TrustBanner';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <TrustBanner />
      </main>
      <Footer />
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Classes from './pages/Classes';
import Membership from './pages/Membership';
import Contact from './pages/Contact';
import Join from './pages/Join';
import Exercises from './pages/Exercises';
import BMICalculator from "./pages/BMICalculator";
import AboutUs from './pages/about';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs/>} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/join" element={<Join />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/BMICalculator" element={<BMICalculator/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
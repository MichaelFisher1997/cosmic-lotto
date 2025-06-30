import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon, FaRocket, FaWallet, FaTwitter, FaTelegram, FaGithub } from 'react-icons/fa';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [stars, setStars] = useState<Array<{id: number, x: number, y: number, size: number, opacity: number}>>([]);

  // Add global styles
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      @keyframes twinkle {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 1; }
      }
      
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
    `;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Set initial dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Generate stars for the background
  useEffect(() => {
    const newStars = [];
    for (let i = 0; i < 100; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.8 + 0.2
      });
    }
    setStars(newStars);
  }, []);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
      {/* Animated Stars Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {stars.map(star => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white shadow-glow"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `twinkle ${Math.random() * 5 + 5}s infinite ${Math.random() * 5}s`,
              boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.8)'
            }}
          />
        ))}
      </div>
      
      {/* Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-600 bg-clip-text text-transparent">
                  Cosmic<span className="text-purple-400">Lotto</span>
                </span>
              </div>
              <nav className="hidden md:ml-10 md:flex space-x-8">
                <button 
                  onClick={() => scrollToSection('home')} 
                  className="nav-link"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('how-it-works')} 
                  className="nav-link"
                >
                  How It Works
                </button>
                <button 
                  onClick={() => scrollToSection('prizes')} 
                  className="nav-link"
                >
                  Prizes
                </button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="theme-toggle"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
              </button>
              <button className="btn-primary">
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" data-testid="home-section" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 pb-20 px-4">
        <div className="absolute inset-0 bg-radial-gradient opacity-20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Win Intergalactic
            <div className="inline-block relative">
              <span className="bg-gradient-to-r from-purple-400 to-indigo-600 bg-clip-text text-transparent">
                Prizes
              </span>
              <FaRocket className="absolute -right-16 -top-4 text-4xl text-purple-400 animate-float" />
            </div>
            <span className="block">with <span className="text-purple-400">CosmicLotto</span></span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            The first intergalactic lottery on the blockchain. Buy tickets with crypto and win out-of-this-world prizes!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="btn-primary">
              Buy Tickets
            </button>
            <button className="btn-secondary">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" data-testid="how-it-works-section" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 relative inline-block left-1/2 transform -translate-x-1/2">
            How It Works
            <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                number: '1', 
                title: 'Buy Tickets', 
                description: 'Purchase lottery tickets using your cryptocurrency wallet.' 
              },
              { 
                number: '2', 
                title: 'Wait for Draw', 
                description: 'Draws happen automatically on the blockchain at scheduled times.' 
              },
              { 
                number: '3', 
                title: 'Win Prizes', 
                description: 'If your ticket matches, you win! Prizes are distributed instantly.' 
              }
            ].map((step, index) => (
              <div key={index} className="card hover:shadow-purple-500/10">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-900/30 text-purple-400 text-xl font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prizes Section */}
      <section id="prizes" data-testid="prizes-section" className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 relative inline-block left-1/2 transform -translate-x-1/2">
            Win Amazing Prizes
            <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: 'Grand Prize',
                amount: '1 ETH',
                description: 'The ultimate prize for one lucky winner!',
                featured: true
              },
              {
                title: 'Second Prize',
                amount: '0.5 ETH',
                description: 'An amazing second place prize!'
              },
              {
                title: 'Third Prize',
                amount: '0.25 ETH',
                description: 'A great third place prize!'
              }
            ].map((prize, index) => (
              <div 
                key={index}
                className={`bg-gradient-to-br rounded-xl p-6 ${
                  prize.featured 
                    ? 'from-purple-600 to-indigo-600 scale-105' 
                    : 'from-gray-800 to-gray-900'
                }`}
              >
                <h3 className="text-2xl font-bold mb-2">{prize.title}</h3>
                <p className="text-4xl font-bold text-purple-300 mb-4">{prize.amount}</p>
                <p className="text-gray-300">{prize.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-600 bg-clip-text text-transparent">
                Cosmic<span className="text-purple-400">Lotto</span>
              </span>
              <p className="text-gray-400 mt-2">The first intergalactic lottery on the blockchain</p>
            </div>
            <div className="flex space-x-6">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                <FaTelegram className="w-6 h-6" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                <FaGithub className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} CosmicLotto. All rights reserved.</p>
            <div className="mt-2 space-x-4">
              <a href="#" className="hover:text-purple-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { 
  Loader2, 
  MapPin, 
  BookOpen, 
  Palette, 
  Globe,
  Sun,
  Moon,
  Mountain,
  Landmark,
  Film,
  Music,
  ArrowRight,
  ChevronDown,
  Calendar,
  Zap,
  Users,
  Handshake,
  Star,
  Heart,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Image imports
import diwaliImage from './assets/diwali2.jpg';
import holiImage from './assets/holi2.jpg';
import navarathriImage from './assets/navarathri2.jpg';
import durgotsavImage from './assets/durgotsav.jpg';
import onamImage from './assets/onam2.jpg';
import backgroundPattern from './assets/indian-pattern.png';

// Lazy load components with proper error boundaries
const withSuspense = (Component) => (props) => (
  <Suspense fallback={<GlobalLoader />}>
    <Component {...props} />
  </Suspense>
);

const Navigation = withSuspense(lazy(() => import('./components/Navigation')));
const Home = withSuspense(lazy(() => import('./components/Home')));
const CulturalMap = withSuspense(lazy(() => import('./components/CulturalMap')));
const FestivalFinder = withSuspense(lazy(() => import('./components/FestivalFinder')));
const LocationDetails = withSuspense(lazy(() => import('./components/LocationDetails')));
const UserSubmission = withSuspense(lazy(() => import('./components/UserSubmission')));
const CulturalQuiz = withSuspense(lazy(() => import('./components/CulturalQuiz')));
const NotFound = withSuspense(lazy(() => import('./components/NotFound')));

// Enhanced Global Loader with Cultural Themes
const GlobalLoader = () => {
  const culturalMotifs = [
    { icon: Sun, color: 'text-amber-400', bg: 'bg-amber-100' },
    { icon: Moon, color: 'text-indigo-400', bg: 'bg-indigo-100' },
    { icon: Star, color: 'text-yellow-300', bg: 'bg-yellow-100' },
    { icon: Heart, color: 'text-rose-400', bg: 'bg-rose-100' },
    { icon: Globe, color: 'text-emerald-400', bg: 'bg-emerald-100' }
  ];

  const [activeMotif, setActiveMotif] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMotif((prev) => (prev + 1) % culturalMotifs.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const ActiveIcon = culturalMotifs[activeMotif].icon;
  const activeColor = culturalMotifs[activeMotif].color;
  const activeBg = culturalMotifs[activeMotif].bg;

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${activeBg} z-50 transition-colors duration-1000`}>
      <div className="text-center px-4">
        <div className="relative inline-block mb-8">
          <ActiveIcon 
            className={`mx-auto ${activeColor} transition-all duration-500`} 
            size={72} 
            strokeWidth={1.5}
          />
          <div className="absolute inset-0 rounded-full border-4 border-current opacity-0 animate-ping-slow"></div>
        </div>
        <h2 className="text-4xl font-bold text-gray-800 mb-4 animate-fade-in">
          Exploring <span className="text-indigo-600">India's</span> Cultural Tapestry
        </h2>
        <div className="w-48 h-1 bg-gradient-to-r from-amber-400 via-rose-500 to-indigo-600 mx-auto mb-6 rounded-full"></div>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Connecting traditions across this vibrant nation...
        </p>
      </div>
    </div>
  );
};

// Animated Hero Section with Parallax Effect
const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const highlights = [
    { 
      icon: Zap, 
      title: 'Dynamic Insights', 
      description: 'Real-time cultural exploration powered by community contributions' 
    },
    { 
      icon: Users, 
      title: 'Community Driven', 
      description: 'Thousands of cultural enthusiasts sharing knowledge' 
    },
    { 
      icon: Handshake, 
      title: 'Interactive Learning', 
      description: 'Engage with immersive cultural narratives' 
    }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 to-purple-800 text-white min-h-screen flex items-center">
      {/* Animated background elements */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${backgroundPattern})`,
          backgroundSize: '600px',
          transform: `translateY(${scrollY * 0.3}px)`
        }}
      ></div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent z-0"></div>
      
      <div className="container mx-auto px-6 py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Discover the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-rose-400">Vibrant Soul</span> of India
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-2xl mx-auto leading-relaxed">
            Journey through centuries of traditions, festivals, and regional diversity in one immersive platform
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/map" 
              className="
                relative overflow-hidden group
                bg-gradient-to-r from-amber-500 to-rose-500 px-8 py-4 rounded-full 
                font-bold hover:shadow-xl hover:shadow-amber-500/20 transition-all
                flex items-center
              "
            >
              <span className="relative z-10 flex items-center">
                Explore Cultural Map
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-amber-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Link>
            <Link 
              to="/quiz" 
              className="
                relative overflow-hidden group
                border-2 border-white/30 text-white px-8 py-4 rounded-full 
                hover:border-white/60 hover:bg-white/10 transition-all
                flex items-center
              "
            >
              <span className="relative z-10 flex items-center">
                Take Cultural Quiz
                <Globe className="ml-2 group-hover:rotate-45 transition-transform" size={20} />
              </span>
              <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Floating decorative elements */}
      <div 
        className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-amber-400/20 blur-xl animate-float-slow"
        style={{ animationDelay: '0.5s' }}
      ></div>
      <div 
        className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-rose-400/20 blur-xl animate-float"
        style={{ animationDelay: '1s' }}
      ></div>
      <div 
        className="absolute bottom-1/4 right-1/3 w-20 h-20 rounded-full bg-indigo-400/20 blur-xl animate-float-slow"
        style={{ animationDelay: '1.5s' }}
      ></div>
      
      {/* Interactive Highlights Section */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="container mx-auto px-6 pb-16">
          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((highlight, index) => (
              <div 
                key={index}
                className="
                  bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 
                  transition-all duration-500 hover:bg-white/20 hover:border-white/40
                  hover:-translate-y-2 hover:shadow-lg
                "
              >
                <div className="flex items-start mb-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-amber-400/20 to-rose-400/20 mr-4">
                    <highlight.icon 
                      className="text-amber-300" 
                      size={28} 
                    />
                  </div>
                  <h3 className="text-xl font-bold mt-1">{highlight.title}</h3>
                </div>
                <p className="text-white/80 pl-16 -mt-5">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Featured Sections with Hover Effects
const FeaturedSections = () => {
  const sections = [
    {
      title: "Cultural Map",
      description: "Explore India's diverse regions and their unique traditions through our interactive map",
      icon: MapPin,
      to: "/map",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      title: "Festival Finder",
      description: "Discover vibrant celebrations across the country with our comprehensive festival guide",
      icon: Calendar,
      to: "/festivals",
      gradient: "from-amber-500 to-rose-500"
    },
    {
      title: "Cultural Quiz",
      description: "Test your knowledge about Indian heritage with our engaging quizzes",
      icon: Globe,
      to: "/quiz",
      gradient: "from-emerald-500 to-teal-600"
    }
  ];

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Explore Our <span className="text-indigo-600">Features</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full"></div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {sections.map((section, index) => (
          <Link 
            to={section.to} 
            key={index} 
            className="
              group relative overflow-hidden rounded-2xl shadow-xl
              h-64 flex items-end p-6
              transition-all duration-500 hover:shadow-2xl hover:-translate-y-2
            "
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-90`}></div>
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-white/20 backdrop-blur-sm mr-4 group-hover:rotate-12 transition-transform">
                  <section.icon className="text-white" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white">{section.title}</h3>
              </div>
              <p className="text-white/90 mb-4">{section.description}</p>
              <div className="flex items-center text-white font-medium group-hover:underline">
                Explore now
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </div>
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <ArrowRight className="text-white" size={20} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// Enhanced Festivals Carousel with Navigation Controls
const FestivalsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState('right');
  
  const festivals = [
    { 
      name: 'Diwali', 
      image: diwaliImage, 
      description: 'The Festival of Lights symbolizes the victory of good over evil and light over darkness',
      region: 'Celebrated nationwide',
      colors: 'bg-gradient-to-r from-amber-500 to-yellow-600'
    },
    { 
      name: 'Holi', 
      image: holiImage, 
      description: 'The colorful festival of spring celebrates love, joy and the triumph of good',
      region: 'Most vibrant in North India',
      colors: 'bg-gradient-to-r from-pink-500 to-purple-600'
    },
    { 
      name: 'Navarathri', 
      image: navarathriImage, 
      description: 'Nine nights of dance and worship dedicated to the divine feminine energy',
      region: 'Prominent in South India',
      colors: 'bg-gradient-to-r from-red-500 to-rose-600'
    },
    { 
      name: 'Durga Puja', 
      image: durgotsavImage, 
      description: 'Celebrating the victory of Goddess Durga over the buffalo demon Mahishasura',
      region: 'Most elaborate in West Bengal',
      colors: 'bg-gradient-to-r from-orange-500 to-amber-600'
    },
    { 
      name: 'Onam', 
      image: onamImage, 
      description: 'Kerala\'s harvest festival celebrating King Mahabali\'s annual return and prosperity',
      region: 'Kerala\'s grandest festival',
      colors: 'bg-gradient-to-r from-emerald-500 to-teal-600'
    }
  ];

  const goToNext = () => {
    setDirection('right');
    setCurrentSlide((prev) => (prev + 1) % festivals.length);
  };

  const goToPrev = () => {
    setDirection('left');
    setCurrentSlide((prev) => (prev - 1 + festivals.length) % festivals.length);
  };

  useEffect(() => {
    const timer = setInterval(goToNext, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative bg-gray-50 py-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Vibrant <span className="text-indigo-600">Festivals</span> of India
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore the colorful tapestry of celebrations across the country
          </p>
        </div>
        
        <div className="relative h-[600px] rounded-3xl shadow-2xl overflow-hidden">
          {/* Navigation arrows */}
          <button 
            onClick={goToPrev}
            className="
              absolute left-4 top-1/2 -translate-y-1/2 z-20
              w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm
              flex items-center justify-center text-white
              hover:bg-white/50 transition-all
              shadow-lg
            "
          >
            <ChevronLeft size={28} />
          </button>
          <button 
            onClick={goToNext}
            className="
              absolute right-4 top-1/2 -translate-y-1/2 z-20
              w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm
              flex items-center justify-center text-white
              hover:bg-white/50 transition-all
              shadow-lg
            "
          >
            <ChevronRight size={28} />
          </button>
          
          {/* Slides */}
          {festivals.map((festival, index) => (
            <div 
              key={festival.name}
              className={`
                absolute inset-0 transition-opacity duration-1000
                ${currentSlide === index ? 'opacity-100' : 'opacity-0'}
                flex items-end
              `}
            >
              <img 
                src={festival.image} 
                alt={festival.name} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
              
              <div className="relative z-10 p-12 w-full">
                <div className={`inline-block px-4 py-2 rounded-full ${festival.colors} text-white text-sm font-bold mb-4`}>
                  {festival.region}
                </div>
                <h3 className="text-4xl font-bold text-white mb-4">{festival.name}</h3>
                <p className="text-xl text-white/90 max-w-2xl">{festival.description}</p>
              </div>
            </div>
          ))}
          
          {/* Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
            {festivals.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`
                  w-3 h-3 rounded-full transition-all
                  ${currentSlide === index ? 'bg-white w-6' : 'bg-white/50'}
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Cultural Significance Section with Animated Cards
const CulturalSignificance = () => {
  const significancePoints = [
    {
      title: "Unity in Diversity",
      description: "India's culture celebrates the coexistence of multiple languages, religions, and traditions across its vast geography, creating a unique tapestry of human experience that has endured for millennia.",
      icon: Users,
      color: "text-indigo-500",
      bg: "bg-indigo-50"
    },
    {
      title: "Ancient Wisdom",
      description: "Home to profound philosophical traditions like Vedanta and Yoga, and centuries-old knowledge systems in medicine, mathematics and astronomy that continue to inspire global thought and practice.",
      icon: BookOpen,
      color: "text-amber-500",
      bg: "bg-amber-50"
    },
    {
      title: "Artistic Expression",
      description: "A rich heritage of classical dance forms, musical traditions, handicrafts, textiles, and visual arts that tell stories of generations and connect the past with the present.",
      icon: Palette,
      color: "text-rose-500",
      bg: "bg-rose-50"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-indigo-50 py-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-indigo-200 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-amber-200 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            The <span className="text-indigo-600">Essence</span> of Indian Culture
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            India's cultural heritage is one of the oldest and most diverse in the world, shaped by thousands of years of history
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {significancePoints.map((point, index) => (
            <div 
              key={index} 
              className={`
                ${point.bg} p-8 rounded-2xl shadow-lg relative overflow-hidden
                transition-all duration-500 hover:shadow-xl hover:-translate-y-2
                border border-white
              `}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
              <div className="flex items-start mb-6">
                <div className={`p-4 rounded-lg ${point.bg} shadow-sm mr-6`}>
                  <point.icon 
                    className={`${point.color}`} 
                    size={32} 
                    strokeWidth={1.5} 
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mt-2">{point.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{point.description}</p>
              <div className="mt-6">
                <Link 
                  to="/map" 
                  className={`
                    inline-flex items-center text-sm font-medium ${point.color}
                    hover:underline
                  `}
                >
                  Learn more
                  <ArrowRight className="ml-1" size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Enhanced Footer with Gradient
const Footer = () => {
  const footerLinks = [
    {
      title: "Explore",
      links: [
        { label: 'Cultural Map', to: '/map' },
        { label: 'Festivals', to: '/festivals' },
        { label: 'Cultural Quiz', to: '/quiz' },
        { label: 'User Contributions', to: '/contribute' }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: 'Cultural Database', to: '/resources' },
        { label: 'Research Papers', to: '/research' },
        { label: 'Educational Materials', to: '/education' }
      ]
    },
    {
      title: "Company",
      links: [
        { label: 'About Us', to: '/about' },
        { label: 'Our Mission', to: '/mission' },
        { label: 'Contact', to: '/contact' }
      ]
    }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-indigo-900 to-purple-900 text-white pt-20 pb-12 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-indigo-400 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-purple-400 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Globe className="mr-3" size={24} /> 
              <span className="bg-gradient-to-r from-amber-300 to-rose-400 bg-clip-text text-transparent">
                BharatVista
              </span>
            </h3>
            <p className="text-white/80 mb-6 leading-relaxed">
              Your gateway to exploring India's rich cultural heritage through immersive experiences and community knowledge.
            </p>
            <div className="flex space-x-4">
              {['Twitter', 'Facebook', 'Instagram', 'YouTube'].map((social) => (
                <a 
                  key={social} 
                  href="#" 
                  className="
                    w-10 h-10 rounded-full bg-white/10 flex items-center justify-center
                    hover:bg-white/20 transition-colors
                  "
                  aria-label={social}
                >
                  {social.charAt(0)}
                </a>
              ))}
            </div>
          </div>
          
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-bold mb-6 text-white/90">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.to} 
                      className="
                        text-white/70 hover:text-white hover:underline 
                        transition-colors flex items-center
                      "
                    >
                      <ChevronRight className="mr-2 text-white/50" size={16} />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div>
            <h4 className="text-lg font-bold mb-6 text-white/90">Newsletter</h4>
            <p className="text-white/70 mb-4">
              Subscribe to receive updates on new features and cultural insights
            </p>
            <form className="flex flex-col space-y-4">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="
                  px-4 py-3 rounded-lg bg-white/10 border border-white/20
                  focus:outline-none focus:ring-2 focus:ring-amber-400
                  placeholder-white/50 text-white
                "
              />
              <button 
                type="submit" 
                className="
                  bg-gradient-to-r from-amber-500 to-rose-500 px-6 py-3 rounded-lg
                  font-bold hover:shadow-lg hover:shadow-amber-500/20
                  transition-all flex items-center justify-center
                "
              >
                Subscribe
                <ArrowRight className="ml-2" size={18} />
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 mb-4 md:mb-0">
            © 2024 BharatVista. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-white/60 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component with Theme Management
function App() {
  const [theme, setTheme] = useState('default');

  // Theme configurations with enhanced gradients
  const themeConfigs = {
    default: 'bg-gradient-to-br from-gray-50 to-indigo-50',
    cultural: 'bg-gradient-to-br from-amber-50 to-indigo-50',
    festive: 'bg-gradient-to-br from-orange-50 to-purple-50'
  };

  return (
    <BrowserRouter>
      <div className={`min-h-screen ${themeConfigs[theme]} antialiased relative overflow-x-hidden`}>
        {/* Navigation */}
        <Navigation theme={theme} setTheme={setTheme} />
        
        {/* Main Content */}
        <main>
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <HeroSection />
                  <FeaturedSections />
                  <FestivalsCarousel />
                  <CulturalSignificance />
                </>
              } 
            />
            <Route path="/map" element={<CulturalMap />} />
            <Route path="/festivals" element={<FestivalFinder />} />
            <Route path="/location/:id" element={<LocationDetails />} />
            <Route path="/contribute" element={<UserSubmission />} />
            <Route path="/quiz" element={<CulturalQuiz />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
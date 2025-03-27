import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Map, 
  Calendar, 
  Home, 
  Plus, 
  Menu, 
  X,
  Globe 
} from 'lucide-react';
import logo from "../assets/logo.png"; // Adjust path if needed

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Navigation items with metadata
  const navItems = [
    { 
      to: '/', 
      icon: Home, 
      label: 'Home',
      description: 'Cultural Insights'
    },
    { 
      to: '/map', 
      icon: Map, 
      label: 'Cultural Map',
      description: 'Regional Diversity'
    },
    { 
      to: '/festivals', 
      icon: Calendar, 
      label: 'Festivals',
      description: 'Celebrate Traditions'
    },
    { 
      to: '/quiz', 
      icon: Globe, 
      label: 'Cultural Quiz',
      description: 'Test Knowledge'
    },
    { 
      to: '/contribute', 
      icon: Plus, 
      label: 'Contribute',
      description: 'Share Insights'
    }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Section with Link to Home */}
        <Link 
          to="/" 
          className="flex items-center space-x-4 group hover:opacity-80 transition-opacity"
        >
          <img 
  src={logo} 
  alt="BharatVista Logo" 
  className="w-10 h-10 rounded-full ring-2 ring-indigo-500 group-hover:ring-indigo-600 transition-all"
/>
          <h1 className="text-2xl font-bold text-indigo-800 tracking-tight group-hover:text-indigo-900 transition-colors">
            BharatVista
          </h1>
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="text-indigo-600 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `
                group flex items-center px-3 py-2 rounded-md 
                transition-all duration-300
                ${isActive 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-slate-700 hover:bg-indigo-50 hover:text-indigo-800'}
              `}
            >
              <item.icon className="mr-2" size={16} />
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="
            md:hidden absolute top-full left-0 right-0 
            bg-white shadow-lg border-t
            animate-slide-down
          ">
            {navItems.map((item) => (
              <NavLink 
                key={item.to}
                to={item.to} 
                onClick={toggleMenu}
                className={({ isActive }) => `
                  flex items-center px-4 py-3 
                  border-b last:border-b-0
                  transition-colors
                  ${isActive 
                    ? 'bg-indigo-50 text-indigo-800' 
                    : 'hover:bg-gray-50 text-slate-700'}
                `}
              >
                <item.icon className="mr-4 text-indigo-600" size={20} />
                <div>
                  <div className="font-semibold">{item.label}</div>
                  <div className="text-xs text-slate-500">{item.description}</div>
                </div>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
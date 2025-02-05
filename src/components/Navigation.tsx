import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Calendar, BookOpen, Settings, Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold text-primary">TradingJournal</span>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <Link 
                to="/" 
                className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
              >
                <Home size={20} />
                <span>Home</span>
              </Link>
              <Link 
                to="/calendar" 
                className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
              >
                <Calendar size={20} />
                <span>Calendar</span>
              </Link>
              <Link 
                to="/journal" 
                className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
              >
                <BookOpen size={20} />
                <span>Journal</span>
              </Link>
              <Link 
                to="/settings" 
                className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
              >
                <Settings size={20} />
                <span>Settings</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/" 
                className="block px-3 py-2 text-gray-600 hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <Home size={20} />
                  <span>Home</span>
                </div>
              </Link>
              <Link 
                to="/calendar" 
                className="block px-3 py-2 text-gray-600 hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <Calendar size={20} />
                  <span>Calendar</span>
                </div>
              </Link>
              <Link 
                to="/journal" 
                className="block px-3 py-2 text-gray-600 hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <BookOpen size={20} />
                  <span>Journal</span>
                </div>
              </Link>
              <Link 
                to="/settings" 
                className="block px-3 py-2 text-gray-600 hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <Settings size={20} />
                  <span>Settings</span>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
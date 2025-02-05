import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Calendar, BookOpen, Settings } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold text-primary">TradingJournal</span>
          </div>
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
      </div>
    </nav>
  );
};

export default Navigation;
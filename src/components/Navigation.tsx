import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Calendar, BookOpen, Settings } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold text-primary">TradingJournal</span>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-primary">
                <Home size={20} />
                <span>Home</span>
              </Link>
              <Link to="/calendar" className="flex items-center space-x-2 text-gray-600 hover:text-primary">
                <Calendar size={20} />
                <span>Calendar</span>
              </Link>
              <Link to="/journal" className="flex items-center space-x-2 text-gray-600 hover:text-primary">
                <BookOpen size={20} />
                <span>Journal</span>
              </Link>
              <Link to="/settings" className="flex items-center space-x-2 text-gray-600 hover:text-primary">
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
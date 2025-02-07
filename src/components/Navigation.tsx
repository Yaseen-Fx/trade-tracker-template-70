import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Calendar, BookOpen, Settings, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              RFT Academy
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link to="/calendar" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
              <Calendar size={20} />
              <span>Calendar</span>
            </Link>
            <Link to="/journal" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
              <BookOpen size={20} />
              <span>Journal</span>
            </Link>
            <Link to="/settings" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
              <Settings size={20} />
              <span>Settings</span>
            </Link>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-primary"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

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
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-full flex items-center space-x-2 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                <span>Toggle Theme</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

import React from 'react';
import { useTheme } from '@/components/theme-provider';
import { Sun, Moon, Monitor } from 'lucide-react';

const Settings = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Settings</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">Theme Preferences</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setTheme("light")}
            className={`p-4 rounded-lg flex flex-col items-center justify-center gap-2 ${
              theme === "light" 
                ? "bg-blue-100 dark:bg-blue-900 border-2 border-blue-500" 
                : "bg-gray-100 dark:bg-gray-700"
            }`}
          >
            <Sun size={24} className="text-yellow-500" />
            <span className="dark:text-white">Light</span>
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`p-4 rounded-lg flex flex-col items-center justify-center gap-2 ${
              theme === "dark" 
                ? "bg-blue-100 dark:bg-blue-900 border-2 border-blue-500" 
                : "bg-gray-100 dark:bg-gray-700"
            }`}
          >
            <Moon size={24} className="text-blue-500" />
            <span className="dark:text-white">Dark</span>
          </button>
          <button
            onClick={() => setTheme("system")}
            className={`p-4 rounded-lg flex flex-col items-center justify-center gap-2 ${
              theme === "system" 
                ? "bg-blue-100 dark:bg-blue-900 border-2 border-blue-500" 
                : "bg-gray-100 dark:bg-gray-700"
            }`}
          >
            <Monitor size={24} className="text-gray-500 dark:text-gray-400" />
            <span className="dark:text-white">System</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import Calendar from "./pages/Calendar";
import Journal from "./pages/Journal";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="app-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
              <Navigation />
              <div className="container mx-auto px-4 py-8 mt-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/calendar" element={<Calendar />} />
                      <Route path="/journal" element={<Journal />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                    <h2 className="text-xl font-semibold mb-4 dark:text-white">Trading Journal</h2>
                    <div className="space-y-4">
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded">
                        <h3 className="font-medium dark:text-white">Today's Summary</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Track your daily trading activities and notes here</p>
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded">
                        <h3 className="font-medium dark:text-white">Recent Trades</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">View your most recent trading activities</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
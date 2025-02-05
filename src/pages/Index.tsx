import React, { useState, useEffect } from 'react';
import TradeForm, { Trade } from '@/components/TradeForm';
import TradeList from '@/components/TradeList';
import Stats from '@/components/Stats';

const Index = () => {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    // Load trades from localStorage on component mount
    const savedTrades = localStorage.getItem('trades');
    if (savedTrades) {
      setTrades(JSON.parse(savedTrades));
    }
  }, []);

  const handleAddTrade = (trade: Trade) => {
    const updatedTrades = [trade, ...trades];
    setTrades(updatedTrades);
    // Save to localStorage
    localStorage.setItem('trades', JSON.stringify(updatedTrades));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Trading Dashboard</h1>
      
      <Stats trades={trades} />
      
      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Trade</h2>
          <TradeForm onSubmit={handleAddTrade} />
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Trades</h2>
          <TradeList trades={trades} />
        </div>
      </div>
    </div>
  );
};

export default Index;
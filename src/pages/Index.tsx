import React, { useState, useEffect } from 'react';
import TradeForm, { Trade } from '@/components/TradeForm';
import TradeList from '@/components/TradeList';
import Stats from '@/components/Stats';
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [editingTrade, setEditingTrade] = useState<Trade | null>(null);
  const { toast } = useToast();

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
    localStorage.setItem('trades', JSON.stringify(updatedTrades));
  };

  const handleUpdateTrade = (updatedTrade: Trade) => {
    const updatedTrades = trades.map(trade => 
      trade.id === updatedTrade.id ? updatedTrade : trade
    );
    setTrades(updatedTrades);
    localStorage.setItem('trades', JSON.stringify(updatedTrades));
    setEditingTrade(null);
  };

  const handleDeleteTrade = (tradeId: string) => {
    const updatedTrades = trades.filter(trade => trade.id !== tradeId);
    setTrades(updatedTrades);
    localStorage.setItem('trades', JSON.stringify(updatedTrades));
    toast({
      title: "Success",
      description: "Trade deleted successfully",
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Trading Dashboard</h1>
      
      <Stats trades={trades} />
      
      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {editingTrade ? 'Edit Trade' : 'Add New Trade'}
          </h2>
          <TradeForm 
            onSubmit={handleAddTrade}
            onUpdate={handleUpdateTrade}
            initialData={editingTrade || undefined}
            isEditing={!!editingTrade}
          />
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Trades</h2>
          <TradeList 
            trades={trades} 
            onEdit={setEditingTrade}
            onDelete={handleDeleteTrade}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
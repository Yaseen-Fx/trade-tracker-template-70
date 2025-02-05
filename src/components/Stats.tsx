import React from 'react';
import type { Trade } from './TradeForm';

const Stats = ({ trades }: { trades: Trade[] }) => {
  const totalTrades = trades.length;
  const winningTrades = trades.filter(t => t.outcome === 'Win').length;
  const totalPnL = trades.reduce((sum, trade) => sum + trade.pnl, 0);
  const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Total Trades</h3>
        <p className="text-2xl font-bold">{totalTrades}</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Win Rate</h3>
        <p className="text-2xl font-bold">{winRate.toFixed(1)}%</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Winning Trades</h3>
        <p className="text-2xl font-bold">{winningTrades}</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Total P/L</h3>
        <p className={`text-2xl font-bold ${totalPnL > 0 ? 'text-success' : totalPnL < 0 ? 'text-danger' : ''}`}>
          {totalPnL > 0 ? '+' : ''}{totalPnL.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default Stats;
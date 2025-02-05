import React from 'react';
import type { Trade } from './TradeForm';

const TradeList = ({ trades }: { trades: Trade[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-gray-50">
          <tr>
            <th className="px-6 py-3">Date & Time</th>
            <th className="px-6 py-3">Instrument</th>
            <th className="px-6 py-3">Type</th>
            <th className="px-6 py-3">Entry</th>
            <th className="px-6 py-3">SL</th>
            <th className="px-6 py-3">TP</th>
            <th className="px-6 py-3">Outcome</th>
            <th className="px-6 py-3">P/L ($)</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => (
            <tr key={trade.id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4">{new Date(trade.date).toLocaleString()}</td>
              <td className="px-6 py-4">{trade.instrument}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded ${
                  trade.type === 'Long' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                }`}>
                  {trade.type}
                </span>
              </td>
              <td className="px-6 py-4">{trade.entryPrice}</td>
              <td className="px-6 py-4">{trade.stopLoss}</td>
              <td className="px-6 py-4">{trade.takeProfit}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded ${
                  trade.outcome === 'Win' ? 'bg-success/10 text-success' :
                  trade.outcome === 'Loss' ? 'bg-danger/10 text-danger' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {trade.outcome}
                </span>
              </td>
              <td className={`px-6 py-4 ${
                trade.pnl > 0 ? 'text-success' :
                trade.pnl < 0 ? 'text-danger' :
                'text-gray-600'
              }`}>
                {trade.pnl > 0 ? '+' : ''}{trade.pnl}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TradeList;
import React from 'react';
import type { Trade } from './TradeForm';
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from 'lucide-react';

interface TradeListProps {
  trades: Trade[];
  onEdit: (trade: Trade) => void;
  onDelete: (tradeId: string) => void;
}

const TradeList = ({ trades, onEdit, onDelete }: TradeListProps) => {
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
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => (
            <tr key={trade.id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4">{new Date(trade.date).toLocaleString()}</td>
              <td className="px-6 py-4">{trade.instrument}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded ${
                  trade.type === 'Long' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {trade.type}
                </span>
              </td>
              <td className="px-6 py-4">{trade.entryPrice}</td>
              <td className="px-6 py-4">{trade.stopLoss}</td>
              <td className="px-6 py-4">{trade.takeProfit}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded ${
                  trade.outcome === 'Win' ? 'bg-green-100 text-green-800' :
                  trade.outcome === 'Loss' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {trade.outcome}
                </span>
              </td>
              <td className={`px-6 py-4 ${
                trade.pnl > 0 ? 'text-green-600' :
                trade.pnl < 0 ? 'text-red-600' :
                'text-gray-600'
              }`}>
                {trade.pnl > 0 ? '+' : ''}{trade.pnl}
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(trade)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(trade.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TradeList;
import React from 'react';
import { Calendar } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import type { Trade } from '@/components/TradeForm';

const TradingCalendar = () => {
  const [date, setDate] = React.useState<Date>(new Date());
  const [trades, setTrades] = React.useState<Trade[]>([]);

  React.useEffect(() => {
    // Load trades from localStorage
    const savedTrades = localStorage.getItem('trades');
    if (savedTrades) {
      setTrades(JSON.parse(savedTrades));
    }
  }, []);

  const getDayContent = (day: Date) => {
    const dayTrades = trades.filter(trade => 
      new Date(trade.date).toDateString() === day.toDateString()
    );
    
    if (dayTrades.length === 0) return null;
    
    const totalPnL = dayTrades.reduce((sum, trade) => sum + trade.pnl, 0);
    const tradesCount = dayTrades.length;
    
    return (
      <div className={`w-full h-full flex flex-col items-center justify-center p-1 ${
        totalPnL > 0 ? 'bg-green-100' : totalPnL < 0 ? 'bg-red-100' : 'bg-gray-50'
      }`}>
        <span className={`text-xs font-semibold ${
          totalPnL > 0 ? 'text-green-600' : totalPnL < 0 ? 'text-red-600' : 'text-gray-600'
        }`}>
          ${totalPnL.toLocaleString()}
        </span>
        <span className="text-[10px] text-gray-500">{tradesCount} trades</span>
      </div>
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Trading Calendar</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => setDate(newDate || new Date())}
          disabled={{ after: addDays(new Date(), 0) }}
          components={{
            DayContent: ({ date }) => getDayContent(date)
          }}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default TradingCalendar;
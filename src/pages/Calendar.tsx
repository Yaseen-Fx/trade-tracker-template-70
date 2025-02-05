import React from 'react';
import { Calendar } from "@/components/ui/calendar";
import { addDays } from "date-fns";
import type { Trade } from '@/components/TradeForm';

interface CalendarDayProps {
  date: Date;
  trades: Trade[];
}

const CalendarDay = ({ date, trades }: CalendarDayProps) => {
  const dayTrades = trades.filter(trade => 
    new Date(trade.date).toDateString() === date.toDateString()
  );
  
  if (dayTrades.length === 0) return null;
  
  const totalPnL = dayTrades.reduce((sum, trade) => sum + trade.pnl, 0);
  
  return (
    <div className={`w-full h-full flex items-center justify-center ${
      totalPnL > 0 ? 'text-success' : totalPnL < 0 ? 'text-danger' : 'text-muted'
    }`}>
      {totalPnL > 0 ? '+' : ''}{totalPnL.toFixed(2)}
    </div>
  );
};

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

  const footer = (
    <div className="mt-4 space-y-2">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-success" />
        <span className="text-sm">Profit</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-danger" />
        <span className="text-sm">Loss</span>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Trading Calendar</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => setDate(newDate || new Date())}
          disabled={{ after: addDays(new Date(), 0) }}
          modifiers={{ hasEntry: (date) => trades.some(trade => new Date(trade.date).toDateString() === date.toDateString()) }}
          modifiersStyles={{
            hasEntry: { fontWeight: 'bold' }
          }}
          components={{
            DayContent: ({ date }) => <CalendarDay date={date} trades={trades} />
          }}
          footer={footer}
        />
      </div>
    </div>
  );
};

export default TradingCalendar;
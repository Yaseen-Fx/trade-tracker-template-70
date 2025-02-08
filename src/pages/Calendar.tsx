
import React from 'react';
import { Calendar } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import type { Trade } from '@/components/TradeForm';

const TradingCalendar = () => {
  const [date, setDate] = React.useState<Date>(new Date());
  const [trades, setTrades] = React.useState<Trade[]>([]);

  React.useEffect(() => {
    const savedTrades = localStorage.getItem('trades');
    if (savedTrades) {
      setTrades(JSON.parse(savedTrades));
    }
  }, []);

  const getTextColor = (pnl: number) => {
    return pnl > 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400';
  };

  const getFontSize = (pnl: number) => {
    const absValue = Math.abs(pnl);
    if (absValue > 10000) return 'text-2xl font-bold';
    if (absValue > 5000) return 'text-xl font-bold';
    return 'text-lg font-semibold';
  };

  const getDayContent = (day: Date) => {
    const dayTrades = trades.filter(trade => 
      new Date(trade.date).toDateString() === day.toDateString()
    );
    
    const totalPnL = dayTrades.reduce((sum, trade) => sum + trade.pnl, 0);
    const tradesCount = dayTrades.length;
    
    return (
      <div className="h-full w-full p-2 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-start">
          <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
            {format(day, 'd')}
          </span>
          {dayTrades.length > 0 && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {tradesCount}
            </span>
          )}
        </div>
        
        {dayTrades.length > 0 && (
          <div className="mt-2">
            <span className={`${getFontSize(totalPnL)} ${getTextColor(totalPnL)}`}>
              ${Math.abs(totalPnL).toLocaleString()}
            </span>
            {dayTrades.map((trade, index) => (
              <div key={index} className="text-sm text-gray-600 dark:text-gray-400 flex justify-between mt-1">
                <span>{trade.type}</span>
                <span className={getTextColor(trade.pnl)}>
                  ${Math.abs(trade.pnl).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">
          Trading Calendar
        </h1>
        <div className="text-base text-gray-500 dark:text-gray-400">
          {format(date, 'MMMM yyyy')}
        </div>
      </div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={(newDate) => setDate(newDate || new Date())}
        disabled={{ after: addDays(new Date(), 0) }}
        components={{
          DayContent: ({ date }) => getDayContent(date)
        }}
        className="w-full"
        showOutsideDays={true}
      />
    </div>
  );
};

export default TradingCalendar;

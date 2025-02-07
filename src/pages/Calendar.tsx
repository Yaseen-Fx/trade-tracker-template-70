
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

  const getDayContent = (day: Date) => {
    const dayTrades = trades.filter(trade => 
      new Date(trade.date).toDateString() === day.toDateString()
    );
    
    const totalPnL = dayTrades.reduce((sum, trade) => sum + trade.pnl, 0);
    const tradesCount = dayTrades.length;
    
    return (
      <div 
        className={`w-full h-full min-h-[100px] flex flex-col items-start justify-start p-2 rounded-md transition-colors
          ${dayTrades.length > 0 
            ? totalPnL > 0 
              ? 'bg-green-100 dark:bg-green-900/30' 
              : 'bg-red-100 dark:bg-red-900/30'
            : 'hover:bg-gray-50 dark:hover:bg-gray-800/30'
          }`}
      >
        <span className="text-base font-medium text-gray-600 dark:text-gray-400">
          {format(day, 'd')}
        </span>
        
        {dayTrades.length > 0 && (
          <>
            <span className={`text-sm font-semibold mt-auto truncate w-full ${
              totalPnL > 0 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              ${Math.abs(totalPnL).toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              })}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {tradesCount} {tradesCount === 1 ? 'trade' : 'trades'}
            </span>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold dark:text-white mb-2 sm:mb-0">
          Trading Calendar
        </h1>
        <div className="text-base text-gray-500 dark:text-gray-400">
          {format(date, 'MMMM yyyy')}
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 sm:p-8">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => setDate(newDate || new Date())}
          disabled={{ after: addDays(new Date(), 0) }}
          components={{
            DayContent: ({ date }) => getDayContent(date)
          }}
          className="w-full calendar-container"
          showOutsideDays={true}
        />
      </div>
    </div>
  );
};

export default TradingCalendar;

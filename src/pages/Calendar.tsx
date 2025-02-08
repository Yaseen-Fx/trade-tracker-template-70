
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
    if (absValue > 10000) return 'text-xl md:text-2xl';
    if (absValue > 5000) return 'text-lg md:text-xl';
    return 'text-base md:text-lg';
  };

  const getDayContent = (day: Date) => {
    const dayTrades = trades.filter(trade => 
      new Date(trade.date).toDateString() === day.toDateString()
    );
    
    const totalPnL = dayTrades.reduce((sum, trade) => sum + trade.pnl, 0);
    const tradesCount = dayTrades.length;
    
    return (
      <div className="flex flex-col h-full min-h-[120px] w-full p-2 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-start mb-2">
          <span className="text-lg font-medium text-gray-600 dark:text-gray-400">
            {format(day, 'd')}
          </span>
          {dayTrades.length > 0 && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {tradesCount} {tradesCount === 1 ? 'trade' : 'trades'}
            </span>
          )}
        </div>
        
        {dayTrades.length > 0 && (
          <div className="flex flex-col space-y-1 mt-auto">
            <span className={`${getFontSize(totalPnL)} font-bold ${getTextColor(totalPnL)}`}>
              ${Math.abs(totalPnL).toLocaleString()}
            </span>
            {dayTrades.map((trade, index) => (
              <div key={index} className="text-sm text-gray-600 dark:text-gray-400">
                {trade.type}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold dark:text-white mb-2 sm:mb-0">
          Trading Calendar
        </h1>
        <div className="text-base text-gray-500 dark:text-gray-400">
          {format(date, 'MMMM yyyy')}
        </div>
      </div>
      <div className="calendar-wrapper">
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

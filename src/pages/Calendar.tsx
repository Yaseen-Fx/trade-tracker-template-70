
import React from 'react';
import { Calendar } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import type { Trade } from '@/components/TradeForm';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const TradingCalendar = () => {
  const [date, setDate] = React.useState<Date>(new Date());
  const [trades, setTrades] = React.useState<Trade[]>([]);

  React.useEffect(() => {
    const savedTrades = localStorage.getItem('trades');
    if (savedTrades) {
      setTrades(JSON.parse(savedTrades));
    }
  }, []);

  const getGradientClass = (pnl: number) => {
    const absValue = Math.abs(pnl);
    if (pnl > 0) {
      if (absValue > 10000) return 'bg-gradient-to-br from-green-50 to-green-200 dark:from-green-900/50 dark:to-green-800/50';
      if (absValue > 5000) return 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/40 dark:to-green-800/40';
      return 'bg-gradient-to-br from-green-50 to-green-50 dark:from-green-900/30 dark:to-green-800/30';
    }
    if (pnl < 0) {
      if (absValue > 10000) return 'bg-gradient-to-br from-red-50 to-red-200 dark:from-red-900/50 dark:to-red-800/50';
      if (absValue > 5000) return 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/40 dark:to-red-800/40';
      return 'bg-gradient-to-br from-red-50 to-red-50 dark:from-red-900/30 dark:to-red-800/30';
    }
    return '';
  };

  const getFontSize = (pnl: number) => {
    const absValue = Math.abs(pnl);
    if (absValue > 10000) return 'text-xl md:text-2xl';
    if (absValue > 5000) return 'text-lg md:text-xl';
    return 'text-base md:text-lg';
  };

  const getTradeStats = (dayTrades: Trade[]) => {
    if (!dayTrades.length) return null;
    const biggestWin = Math.max(...dayTrades.map(t => t.pnl));
    const biggestLoss = Math.min(...dayTrades.map(t => t.pnl));
    const assets = [...new Set(dayTrades.map(t => t.type))];
    return { biggestWin, biggestLoss, assets };
  };

  const getDayContent = (day: Date) => {
    const dayTrades = trades.filter(trade => 
      new Date(trade.date).toDateString() === day.toDateString()
    );
    
    const totalPnL = dayTrades.reduce((sum, trade) => sum + trade.pnl, 0);
    const tradesCount = dayTrades.length;
    const stats = getTradeStats(dayTrades);
    
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div 
              className={`w-full h-full min-h-[150px] md:min-h-[200px] flex flex-col items-start justify-start p-4 rounded-lg transition-all
                ${dayTrades.length > 0 
                  ? getGradientClass(totalPnL)
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800/30'
                }`}
            >
              <span className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                {format(day, 'd')}
              </span>
              
              {dayTrades.length > 0 && (
                <div className="flex flex-col w-full mt-auto space-y-2">
                  <span className={`${getFontSize(totalPnL)} font-semibold truncate w-full ${
                    totalPnL > 0 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    ${Math.abs(totalPnL).toLocaleString()}
                  </span>
                  {dayTrades.map((trade, index) => (
                    <div key={index} className="text-sm text-gray-600 dark:text-gray-400">
                      {trade.type}: ${trade.pnl.toLocaleString()}
                    </div>
                  ))}
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {tradesCount} {tradesCount === 1 ? 'trade' : 'trades'}
                  </span>
                </div>
              )}
            </div>
          </TooltipTrigger>
          {stats && (
            <TooltipContent className="p-3 max-w-xs">
              <div className="space-y-2">
                <p className="text-sm font-medium">Trade Summary</p>
                <p className="text-xs text-green-600">Biggest Win: ${stats.biggestWin.toLocaleString()}</p>
                <p className="text-xs text-red-600">Biggest Loss: ${stats.biggestLoss.toLocaleString()}</p>
                <p className="text-xs">Types: {stats.assets.join(', ')}</p>
              </div>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
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

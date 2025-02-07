import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

export interface Trade {
  id: string;
  date: string;
  instrument: string;
  timeframe: string;
  type: 'Long' | 'Short';
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  riskReward: string;
  positionSize: number;
  outcome: 'Win' | 'Loss' | 'Break-even';
  pnl: number;
  screenshot?: File;
}

interface TradeFormProps {
  onSubmit: (trade: Trade) => void;
  onUpdate?: (trade: Trade) => void;
  initialData?: Trade;
  isEditing?: boolean;
}

const TradeForm = ({ onSubmit, onUpdate, initialData, isEditing = false }: TradeFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<Trade>>({});

  useEffect(() => {
    if (initialData && isEditing) {
      setFormData(initialData);
    }
  }, [initialData, isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.date || !formData.instrument || !formData.type || !formData.entryPrice) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Automatically handle negative values for losses
    let adjustedPnL = formData.pnl || 0;
    if (formData.outcome === 'Loss' && adjustedPnL > 0) {
      adjustedPnL = -adjustedPnL;
    }

    const trade: Trade = {
      id: isEditing ? (formData.id || '') : Date.now().toString(),
      date: formData.date || '',
      instrument: formData.instrument || '',
      timeframe: formData.timeframe || '1H',
      type: formData.type as 'Long' | 'Short',
      entryPrice: formData.entryPrice || 0,
      stopLoss: formData.stopLoss || 0,
      takeProfit: formData.takeProfit || 0,
      riskReward: formData.riskReward || '',
      positionSize: formData.positionSize || 0,
      outcome: formData.outcome as 'Win' | 'Loss' | 'Break-even',
      pnl: adjustedPnL,
      screenshot: formData.screenshot,
    };

    if (isEditing && onUpdate) {
      onUpdate(trade);
      toast({
        title: "Success",
        description: "Trade updated successfully",
      });
    } else {
      onSubmit(trade);
      toast({
        title: "Success",
        description: "Trade added successfully",
      });
    }
    
    if (!isEditing) {
      setFormData({});
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, screenshot: e.target.files[0] });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date & Time</Label>
          <Input
            id="date"
            type="datetime-local"
            value={formData.date || ''}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="instrument">Instrument</Label>
          <Input
            id="instrument"
            placeholder="e.g., EUR/USD"
            value={formData.instrument || ''}
            onChange={(e) => setFormData({ ...formData, instrument: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeframe">Timeframe</Label>
          <Select
            value={formData.timeframe}
            onValueChange={(value) => setFormData({ ...formData, timeframe: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15m">15m</SelectItem>
              <SelectItem value="1H">1H</SelectItem>
              <SelectItem value="4H">4H</SelectItem>
              <SelectItem value="1D">1D</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Trade Type</Label>
          <Select
            value={formData.type}
            onValueChange={(value) => setFormData({ ...formData, type: value as 'Long' | 'Short' })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Long">Long</SelectItem>
              <SelectItem value="Short">Short</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="entryPrice">Entry Price</Label>
          <Input
            id="entryPrice"
            type="number"
            step="0.0001"
            value={formData.entryPrice || ''}
            onChange={(e) => setFormData({ ...formData, entryPrice: parseFloat(e.target.value) })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stopLoss">Stop Loss</Label>
          <Input
            id="stopLoss"
            type="number"
            step="0.0001"
            value={formData.stopLoss || ''}
            onChange={(e) => setFormData({ ...formData, stopLoss: parseFloat(e.target.value) })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="takeProfit">Take Profit</Label>
          <Input
            id="takeProfit"
            type="number"
            step="0.0001"
            value={formData.takeProfit || ''}
            onChange={(e) => setFormData({ ...formData, takeProfit: parseFloat(e.target.value) })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="positionSize">Position Size</Label>
          <Input
            id="positionSize"
            type="number"
            step="0.01"
            value={formData.positionSize || ''}
            onChange={(e) => setFormData({ ...formData, positionSize: parseFloat(e.target.value) })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="outcome">Outcome</Label>
          <Select
            value={formData.outcome}
            onValueChange={(value) => setFormData({ ...formData, outcome: value as 'Win' | 'Loss' | 'Break-even' })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select outcome" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Win">Win</SelectItem>
              <SelectItem value="Loss">Loss</SelectItem>
              <SelectItem value="Break-even">Break-even</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pnl">P/L ($)</Label>
          <Input
            id="pnl"
            type="number"
            step="0.01"
            value={formData.pnl || ''}
            onChange={(e) => setFormData({ ...formData, pnl: parseFloat(e.target.value) })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="screenshot">Chart Screenshot</Label>
          <Input
            id="screenshot"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>

      <Button type="submit" className="w-full">Add Trade</Button>
    </form>
  );
};

export default TradeForm;

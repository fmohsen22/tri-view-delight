
import React, { useState } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";

// Mock historical data for the chart
const generateHistoricalData = (baseCurrency: string) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  
  // Different exchange rate patterns for each currency
  const ratePatterns: Record<string, number[]> = {
    "USD": [1.08, 1.07, 1.09, 1.11, 1.10, 1.09],
    "GBP": [0.86, 0.85, 0.84, 0.85, 0.85, 0.85],
    "CAD": [1.46, 1.45, 1.47, 1.49, 1.50, 1.48],
    "AUD": [1.60, 1.61, 1.62, 1.63, 1.62, 1.62],
  };
  
  return months.map((month, idx) => ({
    month,
    value: ratePatterns[baseCurrency][idx]
  }));
};

const HistoricalChart = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const chartData = generateHistoricalData(selectedCurrency);
  
  const currencies = [
    { id: "USD", label: "US Dollar" },
    { id: "GBP", label: "British Pound" },
    { id: "CAD", label: "Canadian Dollar" },
    { id: "AUD", label: "Australian Dollar" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {currencies.map((currency) => (
          <Button
            key={currency.id}
            variant={selectedCurrency === currency.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCurrency(currency.id)}
          >
            {currency.label}
          </Button>
        ))}
      </div>
      
      <div className="h-[300px] w-full">
        <ChartContainer
          config={{
            area: {
              theme: {
                light: "#3b82f6",
                dark: "#3b82f6",
              },
            },
            grid: {
              color: "#e5e7eb",
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                domain={['auto', 'auto']}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="value"
                name={`EUR to ${selectedCurrency}`}
                stroke="#3b82f6"
                fill="url(#colorGradient)"
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      <div className="text-center text-sm text-muted-foreground">
        Historical EUR to {selectedCurrency} exchange rates over the last 6 months
      </div>
    </div>
  );
};

export default HistoricalChart;

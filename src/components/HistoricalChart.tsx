
import React, { useState, useEffect } from "react";
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
import { getHistoricalData, HistoricalData } from "@/services/currencyService";
import { Skeleton } from "@/components/ui/skeleton";

const HistoricalChart = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [chartData, setChartData] = useState<HistoricalData[]>([]);
  const [loading, setLoading] = useState(true);
  
  const currencies = [
    { id: "USD", label: "US Dollar" },
    { id: "GBP", label: "British Pound" },
    { id: "CAD", label: "Canadian Dollar" },
    { id: "AUD", label: "Australian Dollar" },
  ];

  useEffect(() => {
    // Load historical data when currency changes
    setLoading(true);
    // In a real app with a real API, this would be an async call
    const data = getHistoricalData(selectedCurrency);
    setChartData(data);
    // Add a small delay to simulate API call for better UX
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [selectedCurrency]);

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
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Skeleton className="h-full w-full rounded-md" />
          </div>
        ) : (
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
        )}
      </div>
      <div className="text-center text-sm text-muted-foreground">
        Historical EUR to {selectedCurrency} exchange rates over the last 6 months
      </div>
    </div>
  );
};

export default HistoricalChart;

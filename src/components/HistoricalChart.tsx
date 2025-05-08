
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
  ReferenceLine,
} from "recharts";
import { Button } from "@/components/ui/button";
import { getHistoricalData, HistoricalData } from "@/services/currencyService";
import { Skeleton } from "@/components/ui/skeleton";

// Properly typed market events to match HistoricalData impact type
const marketEvents = [
  { date: "Jan", description: "Central Bank Policy Meeting", impact: "positive" as "positive" },
  { date: "Mar", description: "Economic Sanctions Announced", impact: "negative" as "negative" },
  { date: "May", description: "Trade Agreement Signed", impact: "positive" as "positive" },
];

const HistoricalChart = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [chartData, setChartData] = useState<HistoricalData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEvents, setShowEvents] = useState(true);
  
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
    
    // Merge events with historical data - ensure proper typing
    const enhancedData: HistoricalData[] = data.map(dataPoint => {
      const event = marketEvents.find(event => event.date === dataPoint.month);
      return {
        ...dataPoint,
        event: event?.description,
        impact: event?.impact as "positive" | "negative" | undefined
      };
    });
    
    setChartData(enhancedData);
    // Add a small delay to simulate API call for better UX
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [selectedCurrency]);

  // EventLabel component for reference lines
  const EventLabel = ({ 
    x, 
    y, 
    stroke, 
    content 
  }: { 
    x?: number; 
    y?: number; 
    stroke?: string; 
    content?: string 
  }) => {
    if (!content) return null;
    
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={-10} fill="#666" fontSize={10} textAnchor="middle">
          {content}
        </text>
      </g>
    );
  };

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

      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Historical Data</div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowEvents(!showEvents)}
        >
          {showEvents ? "Hide Events" : "Show Events"}
        </Button>
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
                <ChartTooltip 
                  content={
                    <ChartTooltipContent 
                      formatter={(value, name, props) => {
                        const event = props.payload.event;
                        return (
                          <div>
                            <div>{value}</div>
                            {event && showEvents && (
                              <div className="mt-1 pt-1 text-xs border-t border-gray-200">
                                <span className="font-medium">Event:</span> {event}
                              </div>
                            )}
                          </div>
                        );
                      }}
                    />
                  } 
                />
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
                
                {/* Show event markers on the chart */}
                {showEvents && chartData.map((entry, index) => {
                  if (entry.event) {
                    return (
                      <ReferenceLine 
                        key={`ref-line-${index}`}
                        x={entry.month} 
                        stroke={entry.impact === 'positive' ? "#10b981" : "#ef4444"} 
                        strokeDasharray="3 3"
                        label={<EventLabel content="•" />}
                      />
                    );
                  }
                  return null;
                })}
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </div>
      
      {/* Event legend */}
      {showEvents && (
        <div className="text-xs mt-2 flex flex-wrap gap-4 justify-center">
          {marketEvents.map((event, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-1"
            >
              <span 
                className={`inline-block w-2 h-2 rounded-full ${
                  event.impact === 'positive' ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
              <span>{event.date}: {event.description}</span>
            </div>
          ))}
        </div>
      )}
      
      <div className="text-center text-sm text-muted-foreground">
        Historical EUR to {selectedCurrency} exchange rates over the last 6 months
      </div>
    </div>
  );
};

export default HistoricalChart;

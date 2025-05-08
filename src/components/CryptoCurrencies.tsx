
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, Bitcoin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ReferenceArea,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Updated mock data for crypto currencies with more accurate values
const cryptoData = [
  { name: "Bitcoin (BTC)", price: 84926, change: 3.24, trend: "up" },
  { name: "Ethereum (ETH)", price: 3120.75, change: 2.16, trend: "up" },
  { name: "Ripple (XRP)", price: 0.68, change: -0.03, trend: "down" },
  { name: "Cardano (ADA)", price: 0.52, change: 0.04, trend: "up" },
  { name: "Solana (SOL)", price: 178.65, change: 5.32, trend: "up" },
];

// Historical data with significant events
const historicalEvents = [
  { date: "2023-11", description: "US SEC approves Bitcoin ETFs", impact: "positive" },
  { date: "2024-01", description: "Global market uncertainty due to conflicts", impact: "negative" },
  { date: "2024-03", description: "Ethereum upgrades network", impact: "positive" },
  { date: "2024-04", description: "Major economy inflation reports", impact: "negative" },
  { date: "2024-05", description: "Institutional adoption increases", impact: "positive" }
];

// Mock historical data for the chart with events incorporated
const generateHistoricalCryptoData = (crypto: string) => {
  const months = ["Dec", "Jan", "Feb", "Mar", "Apr", "May"];
  
  // Different price patterns for each crypto with updated values and events
  const pricePatterns: Record<string, number[]> = {
    "BTC": [75000, 68000, 72000, 78000, 82000, 84926],
    "ETH": [2800, 2650, 2780, 2900, 3050, 3120],
    "XRP": [0.72, 0.65, 0.60, 0.67, 0.65, 0.68],
    "ADA": [0.47, 0.45, 0.48, 0.50, 0.51, 0.52],
    "SOL": [155, 142, 160, 168, 172, 178],
  };
  
  return months.map((month, idx) => {
    // Find if there's an event for this month
    const event = historicalEvents.find(e => {
      const eventMonth = e.date.split('-')[1];
      const monthIdx = parseInt(eventMonth) - 1;
      return monthIdx === idx;
    });
    
    return {
      month,
      value: pricePatterns[crypto][idx],
      event: event ? event.description : undefined,
      impact: event ? event.impact : undefined
    };
  });
};

interface EventLabelProps {
  x?: number;
  y?: number;
  stroke?: string;
  payload?: {
    value: string;
  };
  content?: string;
}

const EventLabel = ({ x, y, stroke, payload, content }: EventLabelProps) => {
  if (!content) return null;
  
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={-10} fill="#666" fontSize={10} textAnchor="middle">
        {content}
      </text>
    </g>
  );
};

const CryptoChart = ({ selectedCrypto }: { selectedCrypto: string }) => {
  const data = generateHistoricalCryptoData(selectedCrypto);
  
  return (
    <div className="h-[300px] w-full">
      <ChartContainer
        config={{
          area: {
            theme: {
              light: "#f97316",
              dark: "#f97316",
            },
          },
          grid: {
            color: "#e5e7eb",
          },
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
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
                        {event && (
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
              name={`${selectedCrypto} price (EUR)`}
              stroke="#f97316"
              fill="url(#colorGradient)"
              strokeWidth={2}
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            {/* Render event markers */}
            {data.map((entry, index) => {
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
      
      {/* Event legend */}
      <div className="text-xs mt-2 flex flex-wrap gap-4 justify-center">
        {historicalEvents.map((event, idx) => (
          <div 
            key={idx} 
            className="flex items-center gap-1"
          >
            <span 
              className={`inline-block w-2 h-2 rounded-full ${
                event.impact === 'positive' ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
            <span>{event.date.replace('-', ' ')}: {event.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const CryptoCurrencies = () => {
  const [activeView, setActiveView] = useState("current");
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-t-lg">
        <CardTitle className="text-2xl">Cryptocurrency Market</CardTitle>
        <CardDescription className="text-slate-100">
          Track top cryptocurrencies and their performance
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs defaultValue="current" onValueChange={setActiveView} value={activeView}>
          <TabsList className="w-full mb-4">
            <TabsTrigger value="current" className="flex-1">Current Prices</TabsTrigger>
            <TabsTrigger value="historical" className="flex-1">Historical Data</TabsTrigger>
          </TabsList>
          <TabsContent value="current" className="mt-0">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cryptocurrency</TableHead>
                    <TableHead className="text-right">Price (EUR)</TableHead>
                    <TableHead className="text-right">24h Change</TableHead>
                    <TableHead className="text-right">Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cryptoData.map((item) => (
                    <TableRow key={item.name}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Bitcoin size={18} className="text-orange-500" />
                          {item.name}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">€{item.price.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <span className={item.trend === "up" ? "text-green-600" : "text-red-600"}>
                          {item.change > 0 ? "+" : ""}
                          {item.change}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant={item.trend === "up" ? "default" : "destructive"} className="rounded-full">
                          {item.trend === "up" ? (
                            <ArrowUp size={14} />
                          ) : (
                            <ArrowDown size={14} />
                          )}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="historical" className="mt-0">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {cryptoData.map((crypto) => {
                  const symbol = crypto.name.split(" ")[1].replace(/[()]/g, "");
                  return (
                    <Badge
                      key={symbol}
                      variant={selectedCrypto === symbol ? "default" : "outline"}
                      className="cursor-pointer px-3 py-1"
                      onClick={() => setSelectedCrypto(symbol)}
                    >
                      {crypto.name.split(" ")[0]}
                    </Badge>
                  );
                })}
              </div>
              <CryptoChart selectedCrypto={selectedCrypto} />
              <div className="text-center text-sm text-muted-foreground">
                Historical {selectedCrypto} price over the last 6 months with major events
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CryptoCurrencies;

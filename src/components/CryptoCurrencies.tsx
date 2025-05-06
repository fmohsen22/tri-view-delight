import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, Bitcoin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Updated mock data for crypto currencies with more accurate values
const cryptoData = [
  { name: "Bitcoin (BTC)", price: 84926, change: 3.24, trend: "up" },
  { name: "Ethereum (ETH)", price: 3120.75, change: 2.16, trend: "up" },
  { name: "Ripple (XRP)", price: 0.68, change: -0.03, trend: "down" },
  { name: "Cardano (ADA)", price: 0.52, change: 0.04, trend: "up" },
  { name: "Solana (SOL)", price: 178.65, change: 5.32, trend: "up" },
];

// Mock historical data for the chart
const generateHistoricalCryptoData = (crypto: string) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  
  // Different price patterns for each crypto with updated values
  const pricePatterns: Record<string, number[]> = {
    "BTC": [75000, 68000, 72000, 78000, 82000, 84926],
    "ETH": [2800, 2650, 2780, 2900, 3050, 3120],
    "XRP": [0.72, 0.65, 0.60, 0.67, 0.65, 0.68],
    "ADA": [0.47, 0.45, 0.48, 0.50, 0.51, 0.52],
    "SOL": [155, 142, 160, 168, 172, 178],
  };
  
  return months.map((month, idx) => ({
    month,
    value: pricePatterns[crypto][idx]
  }));
};

const CryptoChart = ({ selectedCrypto }: { selectedCrypto: string }) => {
  // Re-use the same chart component logic from HistoricalChart but with crypto data
  // This is simplified for the mock version
  return (
    <div className="h-[300px] w-full bg-gray-50 rounded-md border flex items-center justify-center">
      <p className="text-gray-500">Historical {selectedCrypto} price chart would appear here</p>
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
                Historical {selectedCrypto} price over the last 6 months
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CryptoCurrencies;

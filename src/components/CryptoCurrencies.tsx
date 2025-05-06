
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, Bitcoin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for crypto currencies
const cryptoData = [
  { name: "Bitcoin (BTC)", price: 58432.21, change: 2.34, trend: "up" },
  { name: "Ethereum (ETH)", price: 3245.67, change: 1.56, trend: "up" },
  { name: "Ripple (XRP)", price: 0.57, change: -0.03, trend: "down" },
  { name: "Cardano (ADA)", price: 0.45, change: -0.02, trend: "down" },
  { name: "Solana (SOL)", price: 142.32, change: 4.21, trend: "up" },
];

// Mock historical data for the chart
const generateHistoricalCryptoData = (crypto: string) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  
  // Different price patterns for each crypto
  const pricePatterns: Record<string, number[]> = {
    "BTC": [52000, 48000, 51000, 58000, 56000, 58432],
    "ETH": [2800, 2600, 2900, 3100, 3000, 3245],
    "XRP": [0.62, 0.59, 0.55, 0.60, 0.58, 0.57],
    "ADA": [0.50, 0.48, 0.46, 0.49, 0.47, 0.45],
    "SOL": [120, 115, 125, 135, 138, 142],
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
                    <TableHead className="text-right">Price (USD)</TableHead>
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
                      <TableCell className="text-right">${item.price.toLocaleString()}</TableCell>
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

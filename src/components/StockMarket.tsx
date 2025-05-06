
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, TrendingUp } from "lucide-react";

// Mock data for stock markets
const stockMarketData = [
  { name: "S&P 500", location: "USA", value: 5228.42, change: 0.68, trend: "up" },
  { name: "Nasdaq", location: "USA", value: 16428.82, change: 1.12, trend: "up" },
  { name: "Dow Jones", location: "USA", value: 39134.76, change: 0.34, trend: "up" },
  { name: "FTSE 100", location: "UK", value: 8164.32, change: -0.23, trend: "down" },
  { name: "Nikkei 225", location: "Japan", value: 38487.62, change: -0.45, trend: "down" },
  { name: "DAX", location: "Germany", value: 18318.97, change: 0.51, trend: "up" },
];

const StockMarket = () => {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-t-lg">
        <CardTitle className="text-2xl">Global Stock Markets</CardTitle>
        <CardDescription className="text-slate-100">
          Track major stock indices around the world
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Index</TableHead>
                <TableHead>Region</TableHead>
                <TableHead className="text-right">Value</TableHead>
                <TableHead className="text-right">24h Change</TableHead>
                <TableHead className="text-right">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stockMarketData.map((item) => (
                <TableRow key={item.name}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <TrendingUp size={18} className="text-emerald-600" />
                      {item.name}
                    </div>
                  </TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell className="text-right">{item.value.toLocaleString()}</TableCell>
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
      </CardContent>
    </Card>
  );
};

export default StockMarket;

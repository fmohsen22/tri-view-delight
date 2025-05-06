
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, Gold, Oil, TrendingUp } from "lucide-react";

// Mock data for commodities
const commoditiesData = [
  { name: "Gold", icon: Gold, price: 2350.45, unit: "per oz", change: 0.75, trend: "up" },
  { name: "Silver", icon: Gold, price: 28.62, unit: "per oz", change: 0.32, trend: "up" },
  { name: "Oil (Crude)", icon: Oil, price: 78.24, unit: "per barrel", change: -1.23, trend: "down" },
  { name: "Copper", icon: TrendingUp, price: 4.52, unit: "per lb", change: 0.05, trend: "up" },
  { name: "Natural Gas", icon: TrendingUp, price: 2.14, unit: "per MMBtu", change: -0.08, trend: "down" },
];

const Commodities = () => {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="bg-gradient-to-r from-yellow-600 to-amber-500 text-white rounded-t-lg">
        <CardTitle className="text-2xl">Commodity Prices</CardTitle>
        <CardDescription className="text-slate-100">
          Track global commodity market prices
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Commodity</TableHead>
                <TableHead className="text-right">Price (USD)</TableHead>
                <TableHead className="text-right">Unit</TableHead>
                <TableHead className="text-right">24h Change</TableHead>
                <TableHead className="text-right">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {commoditiesData.map((item) => (
                <TableRow key={item.name}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <item.icon size={18} className="text-amber-600" />
                      {item.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{item.unit}</TableCell>
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

export default Commodities;

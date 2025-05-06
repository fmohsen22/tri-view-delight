
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, Gem, Droplet, Flower2, Bitcoin } from "lucide-react";

// Updated mock data for commodities with more accurate values
const commoditiesData = [
  { name: "Gold", price: 2423.80, change: 15.30, trend: "up", icon: <Gem className="text-yellow-500" /> },
  { name: "Silver", price: 31.75, change: 0.64, trend: "up", icon: <Gem className="text-gray-400" /> },
  { name: "Crude Oil", price: 82.45, change: -1.23, trend: "down", icon: <Droplet className="text-black" /> },
  { name: "Natural Gas", price: 2.32, change: 0.08, trend: "up", icon: <Droplet className="text-blue-500" /> },
  { name: "Copper", price: 4.85, change: 0.15, trend: "up", icon: <Flower2 className="text-orange-600" /> },
];

const Commodities = () => {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-t-lg">
        <CardTitle className="text-2xl">Commodities</CardTitle>
        <CardDescription className="text-slate-100">
          Current prices for major global commodities
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Commodity</TableHead>
                <TableHead className="text-right">Price (USD)</TableHead>
                <TableHead className="text-right">Change</TableHead>
                <TableHead className="text-right">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {commoditiesData.map((item) => (
                <TableRow key={item.name}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {item.icon}
                      {item.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <span className={item.trend === "up" ? "text-green-600" : "text-red-600"}>
                      {item.change > 0 ? "+" : ""}
                      {item.change.toFixed(2)}
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

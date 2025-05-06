
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, Euro } from "lucide-react";

// Mock data for current rates
const currencyData = [
  { currency: "US Dollar (USD)", rate: 1.09, change: 0.005, trend: "up" },
  { currency: "British Pound (GBP)", rate: 0.85, change: -0.002, trend: "down" },
  { currency: "Canadian Dollar (CAD)", rate: 1.48, change: 0.003, trend: "up" },
  { currency: "Australian Dollar (AUD)", rate: 1.62, change: -0.004, trend: "down" },
  { currency: "Japanese Yen (JPY)", rate: 161.24, change: 0.68, trend: "up" },
];

const CurrentRates = () => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Currency</TableHead>
            <TableHead className="text-right">Rate (1 EUR =)</TableHead>
            <TableHead className="text-right">Change</TableHead>
            <TableHead className="text-right">Trend</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currencyData.map((item) => (
            <TableRow key={item.currency}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <Euro size={18} className="text-blue-500" />
                  {item.currency}
                </div>
              </TableCell>
              <TableCell className="text-right">{item.rate.toFixed(2)}</TableCell>
              <TableCell className="text-right">
                <span className={item.trend === "up" ? "text-green-600" : "text-red-600"}>
                  {item.change > 0 ? "+" : ""}
                  {item.change.toFixed(3)}
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
  );
};

export default CurrentRates;

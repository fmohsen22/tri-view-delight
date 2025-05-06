
import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, Euro } from "lucide-react";
import { fetchCurrencyRates, CurrencyData } from "@/services/currencyService";
import { Skeleton } from "@/components/ui/skeleton";

const CurrentRates = () => {
  const [currencyData, setCurrencyData] = useState<CurrencyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCurrencyData = async () => {
      try {
        setLoading(true);
        const data = await fetchCurrencyRates();
        setCurrencyData(data);
        setError(null);
      } catch (err) {
        setError("Failed to load currency data. Please try again later.");
        console.error("Error loading currency data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCurrencyData();
  }, []);

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

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
          {loading ? (
            Array(5).fill(0).map((_, index) => (
              <TableRow key={index}>
                <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                <TableCell><Skeleton className="h-5 w-full" /></TableCell>
              </TableRow>
            ))
          ) : (
            currencyData.map((item) => (
              <TableRow key={item.code}>
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
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CurrentRates;


import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CurrentRates from "./CurrentRates";
import HistoricalChart from "./HistoricalChart";

const CurrencyTracker = () => {
  const [activeView, setActiveView] = useState("current");

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl">Euro Exchange Rates</CardTitle>
        <CardDescription className="text-slate-100">
          Track the Euro against major world currencies
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs defaultValue="current" onValueChange={setActiveView} value={activeView}>
          <TabsList className="w-full mb-4">
            <TabsTrigger value="current" className="flex-1">Current Rates</TabsTrigger>
            <TabsTrigger value="historical" className="flex-1">Historical Data</TabsTrigger>
          </TabsList>
          <TabsContent value="current" className="mt-0">
            <CurrentRates />
          </TabsContent>
          <TabsContent value="historical" className="mt-0">
            <HistoricalChart />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CurrencyTracker;

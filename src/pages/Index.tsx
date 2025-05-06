
import React from "react";
import CurrencyTracker from "@/components/CurrencyTracker";
import CryptoCurrencies from "@/components/CryptoCurrencies";
import Commodities from "@/components/Commodities";
import StockMarket from "@/components/StockMarket";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Financial Insights Dashboard
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Track real-time market data across currencies, cryptocurrencies, commodities, and global stock markets
          </p>
        </header>
        
        <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
          <CurrencyTracker />
          <CryptoCurrencies />
          <Commodities />
          <StockMarket />
        </div>
      </div>
    </div>
  );
};

export default Index;

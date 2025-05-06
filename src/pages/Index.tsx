
import React from "react";
import CurrencyTracker from "@/components/CurrencyTracker";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Financial Insights Dashboard
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Track real-time currency exchange rates and historical data
          </p>
        </header>
        
        <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
          <CurrencyTracker />
          
          {/* Placeholder for future items */}
          <div className="p-8 border rounded-lg bg-white shadow-sm text-center">
            <h2 className="text-2xl font-semibold text-gray-700">Second Item Coming Soon</h2>
            <p className="text-gray-500 mt-2">Additional financial insights will be displayed here</p>
          </div>
          
          <div className="p-8 border rounded-lg bg-white shadow-sm text-center">
            <h2 className="text-2xl font-semibold text-gray-700">Third Item Coming Soon</h2>
            <p className="text-gray-500 mt-2">More financial data will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

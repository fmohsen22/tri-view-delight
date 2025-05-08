
// API key from Open Exchange Rates (using a free public one for demo purposes)
// In a production app, this should be stored in environment variables
const API_URL = "https://open.er-api.com/v6/latest/EUR";

export interface CurrencyData {
  currency: string;
  code: string;
  rate: number;
  change: number;
  trend: "up" | "down";
}

export interface HistoricalData {
  month: string;
  value: number;
  event?: string;
  impact?: "positive" | "negative";
}

// Currency codes and their display names
const currencyNames: Record<string, string> = {
  USD: "US Dollar",
  GBP: "British Pound",
  CAD: "Canadian Dollar",
  AUD: "Australian Dollar",
  JPY: "Japanese Yen"
};

// Historical events that affected currency markets
const historicalEvents = [
  { date: "Jan", currency: "USD", description: "Federal Reserve Policy Meeting", impact: "positive" },
  { date: "Mar", currency: "USD", description: "Economic sanctions announced", impact: "negative" },
  { date: "Feb", currency: "GBP", description: "Bank of England rate decision", impact: "positive" },
  { date: "Apr", currency: "GBP", description: "UK economic report", impact: "negative" },
  { date: "Jan", currency: "CAD", description: "Oil price fluctuations", impact: "negative" },
  { date: "May", currency: "CAD", description: "Trade agreement signed", impact: "positive" },
  { date: "Feb", currency: "AUD", description: "China trade tensions", impact: "negative" },
  { date: "Apr", currency: "AUD", description: "Commodity price surge", impact: "positive" },
];

// Cache the currency data for 1 hour
let cachedData: CurrencyData[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

// Helper to generate mock change data (API doesn't provide change data)
const generateMockChange = (): { change: number; trend: "up" | "down" } => {
  const change = Math.random() * 0.01;
  const trend = Math.random() > 0.5 ? "up" : "down";
  return { 
    change: trend === "up" ? change : -change,
    trend
  };
};

// Fetch the latest currency rates
export const fetchCurrencyRates = async (): Promise<CurrencyData[]> => {
  // Use cached data if available and recent
  const now = Date.now();
  if (cachedData && now - lastFetchTime < CACHE_DURATION) {
    return cachedData;
  }
  
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch currency data');
    }
    
    const data = await response.json();
    const rates = data.rates;
    
    // Process the rates into our format
    const currencies = Object.keys(currencyNames);
    const result: CurrencyData[] = currencies.map(code => {
      const { change, trend } = generateMockChange();
      return {
        currency: `${currencyNames[code]} (${code})`,
        code,
        rate: rates[code],
        change,
        trend
      };
    });
    
    // Cache the results
    cachedData = result;
    lastFetchTime = now;
    
    return result;
  } catch (error) {
    console.error('Error fetching currency data:', error);
    
    // Fallback to mock data with updated rates if API fails
    return Object.keys(currencyNames).map(code => {
      const { change, trend } = generateMockChange();
      // Use more accurate fallback values for major currencies
      const fallbackRates: Record<string, number> = {
        USD: 1.13,
        GBP: 0.85,
        CAD: 1.56, 
        AUD: 1.74,
        JPY: 162.85
      };
      
      return {
        currency: `${currencyNames[code]} (${code})`,
        code,
        rate: fallbackRates[code] || 1.0,
        change,
        trend
      };
    });
  }
};

// Generate some mock historical data for a given currency
// In a real app, this would come from an API with historical data
export const getHistoricalData = (currencyCode: string): HistoricalData[] => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  
  // Updated patterns for each currency (mock data)
  const baseValues: Record<string, number[]> = {
    USD: [1.09, 1.10, 1.11, 1.12, 1.12, 1.13],
    GBP: [0.86, 0.85, 0.86, 0.85, 0.85, 0.85],
    CAD: [1.48, 1.50, 1.52, 1.54, 1.55, 1.56],
    AUD: [1.65, 1.67, 1.69, 1.71, 1.72, 1.74],
    JPY: [155, 157, 159, 160, 161, 162.85]
  };
  
  const values = baseValues[currencyCode] || Array(6).fill(1.0);
  
  return months.map((month, idx) => {
    // Check if there's an event for this currency and month
    const event = historicalEvents.find(
      e => e.date === month && e.currency === currencyCode
    );
    
    return {
      month,
      value: values[idx],
      event: event?.description,
      impact: event?.impact as "positive" | "negative" | undefined
    };
  });
};

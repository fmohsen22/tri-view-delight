
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
}

// Currency codes and their display names
const currencyNames: Record<string, string> = {
  USD: "US Dollar",
  GBP: "British Pound",
  CAD: "Canadian Dollar",
  AUD: "Australian Dollar",
  JPY: "Japanese Yen"
};

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
    
    // Fallback to mock data if API fails
    return Object.keys(currencyNames).map(code => {
      const { change, trend } = generateMockChange();
      return {
        currency: `${currencyNames[code]} (${code})`,
        code,
        rate: code === "USD" ? 1.13 : Math.random() + 0.5,
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
  
  // Different patterns for each currency (mock data)
  const baseValue = currencyCode === "USD" ? 1.13 : 
                    currencyCode === "GBP" ? 0.85 : 
                    currencyCode === "CAD" ? 1.48 : 
                    currencyCode === "AUD" ? 1.62 : 161.24;
  
  return months.map((month, idx) => {
    // Generate slightly different values for each month
    const variation = (Math.random() - 0.5) * 0.05;
    return {
      month,
      value: baseValue * (1 + variation)
    };
  });
};

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

export type TimeInterval = "5y" | "1y" | "6m" | "1m" | "1w";

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
  { date: "Jan 2020", currency: "USD", description: "Pre-pandemic economy", impact: "positive" },
  { date: "Mar 2020", currency: "USD", description: "COVID-19 outbreak", impact: "negative" },
  { date: "Nov 2020", currency: "USD", description: "US Election results", impact: "positive" },
  { date: "Jan 2021", currency: "GBP", description: "Brexit implementation", impact: "negative" },
  { date: "Mar 2021", currency: "USD", description: "Stimulus package approved", impact: "positive" },
  { date: "Apr 2021", currency: "CAD", description: "Oil price recovery", impact: "positive" },
  { date: "Feb 2022", currency: "EUR", description: "Russia-Ukraine conflict", impact: "negative" },
  { date: "Jul 2022", currency: "USD", description: "Interest rate hikes", impact: "positive" },
  { date: "Oct 2022", currency: "GBP", description: "UK fiscal policy crisis", impact: "negative" },
  { date: "Jan 2023", currency: "USD", description: "Central Bank policy meeting", impact: "positive" },
  { date: "Mar 2023", currency: "USD", description: "Banking sector concerns", impact: "negative" },
  { date: "May 2023", currency: "CAD", description: "Trade agreement signed", impact: "positive" },
  { date: "Aug 2023", currency: "AUD", description: "Chinese market slowdown", impact: "negative" },
  { date: "Nov 2023", currency: "USD", description: "Inflation rate decline", impact: "positive" },
  { date: "Jan 2024", currency: "EUR", description: "ECB policy announcement", impact: "positive" },
  { date: "Mar 2024", currency: "USD", description: "US economic data release", impact: "positive" },
  { date: "Apr 2024", currency: "GBP", description: "UK election speculation", impact: "negative" },
  { date: "May 2024", currency: "USD", description: "Fed interest rate decision", impact: "positive" },
  // Weekly events (more recent)
  { date: "30 Apr", currency: "USD", description: "Federal Reserve meeting", impact: "positive" },
  { date: "02 May", currency: "EUR", description: "ECB keeps rates unchanged", impact: "negative" },
  { date: "04 May", currency: "USD", description: "Strong jobs report", impact: "positive" },
  { date: "06 May", currency: "GBP", description: "Bank of England outlook", impact: "negative" },
  { date: "07 May", currency: "EUR", description: "Political tensions in EU", impact: "negative" },
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

// Generate historical data for a given currency and time interval
export const getHistoricalData = (currencyCode: string, interval: TimeInterval = "6m"): HistoricalData[] => {
  // Define what periods to show for each interval
  const periodFormats: Record<TimeInterval, { format: string, count: number }> = {
    "5y": { format: "year", count: 5 },
    "1y": { format: "month", count: 12 },
    "6m": { format: "month", count: 6 },
    "1m": { format: "week", count: 4 },
    "1w": { format: "day", count: 7 }
  };

  const { format, count } = periodFormats[interval];
  
  // Generate labels based on format and count
  const labels: string[] = [];
  const now = new Date();
  
  switch (format) {
    case "year":
      for (let i = 0; i < count; i++) {
        const year = new Date().getFullYear() - i;
        labels.unshift(year.toString());
      }
      break;
    case "month":
      for (let i = count - 1; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        labels.push(date.toLocaleString('default', { month: 'short' }) + (i === 0 || date.getMonth() === 0 ? ' ' + date.getFullYear().toString().substring(2) : ''));
      }
      break;
    case "week":
      for (let i = count - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - (i * 7));
        labels.push(date.toLocaleString('default', { month: 'short', day: 'numeric' }));
      }
      break;
    case "day":
      for (let i = count - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        labels.push(date.getDate() + ' ' + date.toLocaleString('default', { month: 'short' }).substring(0, 3));
      }
      break;
  }

  // Updated patterns for each currency (mock data)
  // Create more variations for different time periods
  const basePatterns: Record<string, Record<TimeInterval, number[]>> = {
    USD: {
      "5y": [1.23, 1.18, 1.14, 1.12, 1.09, 1.13],
      "1y": [1.18, 1.16, 1.14, 1.12, 1.11, 1.10, 1.09, 1.10, 1.11, 1.12, 1.13, 1.13],
      "6m": [1.09, 1.10, 1.11, 1.12, 1.12, 1.13],
      "1m": [1.115, 1.118, 1.125, 1.13],
      "1w": [1.128, 1.129, 1.13, 1.131, 1.129, 1.128, 1.13]
    },
    GBP: {
      "5y": [0.90, 0.89, 0.87, 0.86, 0.85, 0.85],
      "1y": [0.87, 0.87, 0.86, 0.86, 0.86, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85],
      "6m": [0.86, 0.85, 0.86, 0.85, 0.85, 0.85],
      "1m": [0.854, 0.852, 0.851, 0.85],
      "1w": [0.852, 0.851, 0.85, 0.851, 0.85, 0.849, 0.85]
    },
    CAD: {
      "5y": [1.59, 1.56, 1.54, 1.52, 1.50, 1.56],
      "1y": [1.52, 1.51, 1.50, 1.51, 1.52, 1.53, 1.54, 1.55, 1.55, 1.56, 1.56, 1.56],
      "6m": [1.48, 1.50, 1.52, 1.54, 1.55, 1.56],
      "1m": [1.55, 1.555, 1.56, 1.565],
      "1w": [1.562, 1.563, 1.564, 1.565, 1.563, 1.564, 1.565]
    },
    AUD: {
      "5y": [1.85, 1.80, 1.75, 1.70, 1.67, 1.74],
      "1y": [1.70, 1.69, 1.68, 1.69, 1.70, 1.71, 1.72, 1.73, 1.73, 1.74, 1.74, 1.74],
      "6m": [1.65, 1.67, 1.69, 1.71, 1.72, 1.74],
      "1m": [1.72, 1.725, 1.73, 1.74],
      "1w": [1.735, 1.738, 1.74, 1.741, 1.739, 1.738, 1.74]
    },
    JPY: {
      "5y": [130, 135, 140, 145, 152, 162.85],
      "1y": [152, 154, 156, 157, 158, 159, 160, 161, 161.5, 162, 162.5, 162.85],
      "6m": [155, 157, 159, 160, 161, 162.85],
      "1m": [161, 161.5, 162, 162.85],
      "1w": [162.5, 162.6, 162.7, 162.75, 162.8, 162.82, 162.85]
    }
  };

  // Use the appropriate set of values for the requested interval
  const values = basePatterns[currencyCode]?.[interval] || Array(labels.length).fill(1.0);
  
  // Filter events based on the currency and timeframe
  const filteredEvents = historicalEvents.filter(event => 
    event.currency === currencyCode || event.currency === "EUR"
  );

  return labels.map((month, idx) => {
    // Match events with the appropriate time format
    let matchingEvent;
    
    if (interval === "1w") {
      // For weekly view, match exact date format
      matchingEvent = filteredEvents.find(e => e.date.includes(month));
    } else if (interval === "1m") {
      // For monthly view, match month and day
      matchingEvent = filteredEvents.find(e => {
        const parts = month.split(' ');
        return e.date.includes(parts[0]) && (parts[1] ? e.date.includes(parts[1]) : true);
      });
    } else {
      // For longer periods, match month or year
      matchingEvent = filteredEvents.find(e => {
        // Check if the date starts with the month abbreviation or contains the year
        return e.date.startsWith(month.split(' ')[0]) || e.date.includes(month);
      });
    }
    
    return {
      month,
      value: values[idx],
      event: matchingEvent?.description,
      impact: matchingEvent?.impact as "positive" | "negative" | undefined
    };
  });
};

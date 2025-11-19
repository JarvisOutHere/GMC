
export interface QuarterData {
  id: string;
  quarter: string;
  year: number;
  
  financials: {
    revenue: number;
    grossProfit: number;
    operatingProfit: number;
    netAssets: number;
    cashBalance: number;
    sharePrice: number;
    cumulativeRetainedEarnings: number;
    cashFlow: {
      operating: number;
      investing: number;
      financing: number;
    };
  };

  production: {
    employees: number;
    inventoryValue: number;
    machines: number;
    efficiency: number;
    capacityUtilization: number; 
  };

  operations: {
    inventory: {
        productVal: number;
        materialVal: number;
        componentVal: number;
        competitorAvgVal: number;
    };
    materialFlow: {
        existing: number;
        received: number;
        consumed: number;
        closingLevel: number;
    };
    machining: {
        breakdownHours: number;
        maintenanceHours: number;
        efficiency: number;
    };
    personnel: {
        assembly: {
            total: number;
            hired: number;
            trained: number;
            left: number;
        };
        machining: {
            total: number;
            hired: number;
            trained: number;
            left: number;
        };
        cumulativeCost: number;
    };
  };

  market: {
    sharePriceComparison: Record<string, number>;
    
    // Geographic Market Shares (User vs Top Competitor)
    geoShare: {
      europe: { user: number; top: number; topName: string };
      nafta: { user: number; top: number; topName: string };
      internet: { user: number; top: number; topName: string };
    };

    // Product Market Shares (User vs Top Competitor)
    productShare: {
      p1: { user: number; top: number; topName: string };
      p2: { user: number; top: number; topName: string };
      p3: { user: number; top: number; topName: string };
    };

    // Weighted Average Sales Price (User vs Market Avg)
    weightedPrices: {
      p1: { user: number; marketAvg: number };
      p2: { user: number; marketAvg: number };
      p3: { user: number; marketAvg: number };
    };
  };

  decisions: {
    adSpend: number;
    rdSpend: number;
    prices: {
      p1_eu: number;
      p2_eu: number;
      p3_eu: number;
    }
  };
}

export type CompanyCode = 'C1' | 'C2' | 'C3' | 'C4' | 'C5' | 'C6' | 'C7';

export interface CompetitorRevenues {
  quarterId: string;
  revenues: Record<CompanyCode, number>;
}

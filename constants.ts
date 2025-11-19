
import { QuarterData, CompetitorRevenues } from './types';

export const COMPANY_NAME = "Company 5.0";

// Estimated Competitor Revenues based on market share volume and average prices from the prompt data
export const COMPETITOR_REVENUE_DATA: CompetitorRevenues[] = [
  {
    quarterId: '2018_Q4',
    revenues: {
      C1: 3150000, C2: 3400000, C3: 3100000, C4: 3180000, C5: 3213285, C6: 1500000, C7: 3350000
    }
  },
  {
    quarterId: '2019_Q1',
    revenues: {
      C1: 3200000, C2: 3550000, C3: 3250000, C4: 3300000, C5: 3411075, C6: 1600000, C7: 3450000
    }
  },
  {
    quarterId: '2019_Q2',
    revenues: {
      C1: 3100000, C2: 3700000, C3: 3400000, C4: 3250000, C5: 3587207, C6: 2100000, C7: 3300000
    }
  },
  {
    quarterId: '2019_Q3',
    revenues: {
      C1: 3250000, C2: 3850000, C3: 3600000, C4: 3300000, C5: 3778783, C6: 2400000, C7: 3350000
    }
  }
];

export const QUARTERLY_DATA: QuarterData[] = [
  {
    id: '2018_Q4',
    quarter: 'Q4',
    year: 2018,
    financials: {
      revenue: 3213285,
      grossProfit: 1071823,
      operatingProfit: -272238,
      netAssets: 3523923,
      cashBalance: -1693715,
      sharePrice: 76.93,
      cumulativeRetainedEarnings: -476077,
      cashFlow: { operating: -856334, investing: -311500, financing: -27428 }
    },
    production: {
      employees: 130,
      inventoryValue: 1714411,
      machines: 11,
      efficiency: 89.4,
      capacityUtilization: (10403 / 11748) * 100,
    },
    operations: {
        inventory: {
            productVal: 37230,
            materialVal: 1677181,
            componentVal: 0,
            // Avg of C1, C2, C3, C4, C6, C7 inventories
            competitorAvgVal: (53053 + 1322828 + 842339 + 43056 + 180193 + 515088) / 6
        },
        materialFlow: {
            existing: 1051, // Opening stock available excluding spot buy
            received: 13000, // Bought spot 
            consumed: -11954, // Used
            closingLevel: 2097
        },
        machining: {
            breakdownHours: 176,
            maintenanceHours: 22,
            efficiency: 89.4
        },
        personnel: {
            assembly: { total: 43, hired: 2, trained: 2, left: 3 },
            machining: { total: 76, hired: 19, trained: 0, left: 12 },
            cumulativeCost: (19 * 1000) + (2 * 500) // Approx cost
        }
    },
    market: {
      sharePriceComparison: { C1: 97.41, C2: 82.78, C3: 88.7, C4: 94.74, C5: 76.93, C6: 61.77, C7: 88.69 },
      geoShare: {
        europe: { user: 9.2, top: 9.9, topName: 'C7' },
        nafta: { user: 9.8, top: 10.3, topName: 'C7' }, 
        internet: { user: 11.5, top: 13.0, topName: 'C7' } 
      },
      productShare: {
        p1: { user: 10.2, top: 11.0, topName: 'C7' },
        p2: { user: 9.6, top: 10.1, topName: 'C2' },
        p3: { user: 10.8, top: 11.5, topName: 'C7' }
      },
      weightedPrices: {
        p1: { user: 295, marketAvg: 293 },
        p2: { user: 497, marketAvg: 490 },
        p3: { user: 777, marketAvg: 770 }
      }
    },
    decisions: {
      adSpend: 295000,
      rdSpend: 100000,
      prices: { p1_eu: 291, p2_eu: 486, p3_eu: 767 },
    }
  },
  {
    id: '2019_Q1',
    quarter: 'Q1',
    year: 2019,
    financials: {
      revenue: 3411075,
      grossProfit: 1439445,
      operatingProfit: 45761,
      netAssets: 3506163,
      cashBalance: -2389514,
      sharePrice: 80.38,
      cumulativeRetainedEarnings: -493837,
      cashFlow: { operating: -1132278, investing: 0, financing: 436479 }
    },
    production: {
      employees: 139,
      inventoryValue: 1919775,
      machines: 12,
      efficiency: 88.0,
      capacityUtilization: (12403 / 12816) * 100,
    },
    operations: {
        inventory: {
            productVal: 170238,
            materialVal: 1749537,
            componentVal: 0,
            competitorAvgVal: (437019 + 1910526 + 1362539 + 34521 + 356082 + 1220213) / 6
        },
        materialFlow: {
            existing: 2097, // Carry over from Q4 2018 Closing
            received: 14000, // Contract delivery (Ordered Q4 2018)
            consumed: -14135,
            closingLevel: 1962
        },
        machining: {
            breakdownHours: 241,
            maintenanceHours: 0, 
            efficiency: 88.0
        },
        personnel: {
            assembly: { total: 49, hired: 4, trained: 2, left: 0 },
            machining: { total: 83, hired: 20, trained: 0, left: 13 },
            cumulativeCost: 20000 + 44000 // Accumulated
        }
    },
    market: {
      sharePriceComparison: { C1: 93.77, C2: 78.07, C3: 86.07, C4: 91.17, C5: 80.38, C6: 64.7, C7: 81.41 },
      geoShare: {
        europe: { user: 10.7, top: 10.8, topName: 'C2' },
        nafta: { user: 11.7, top: 11.7, topName: 'C2' },
        internet: { user: 12.5, top: 13.1, topName: 'C7' }
      },
      productShare: {
        p1: { user: 11.4, top: 11.6, topName: 'C2' },
        p2: { user: 11.1, top: 11.8, topName: 'C2' },
        p3: { user: 12.5, top: 13.1, topName: 'C7' }
      },
      weightedPrices: {
        p1: { user: 305, marketAvg: 298 },
        p2: { user: 505, marketAvg: 495 },
        p3: { user: 783, marketAvg: 775 }
      }
    },
    decisions: {
      adSpend: 295000,
      rdSpend: 95000,
      prices: { p1_eu: 300, p2_eu: 490, p3_eu: 775 },
    }
  },
  {
    id: '2019_Q2',
    quarter: 'Q2',
    year: 2019,
    financials: {
      revenue: 3587207,
      grossProfit: 1461315,
      operatingProfit: 3834,
      netAssets: 3424505,
      cashBalance: -2513849,
      sharePrice: 76.25,
      cumulativeRetainedEarnings: -575495,
      cashFlow: { operating: -38843, investing: 0, financing: -85492 }
    },
    production: {
      employees: 145,
      inventoryValue: 2095987,
      machines: 12,
      efficiency: 85.2,
      capacityUtilization: (11312 / 12816) * 100,
    },
    operations: {
        inventory: {
            productVal: 49672,
            materialVal: 1868895,
            componentVal: 177420,
            competitorAvgVal: (475413 + 1686241 + 1539949 + 16644 + 1060746 + 1532039) / 6
        },
        materialFlow: {
            existing: 1962, // Carry over from Q1 2019 Closing
            received: 15000, // Contract delivery (Ordered Q4 2018 for Q2)
            consumed: -12413,
            closingLevel: 4549
        },
        machining: {
            breakdownHours: 227,
            maintenanceHours: 133,
            efficiency: 85.2
        },
        personnel: {
            assembly: { total: 49, hired: 0, trained: 0, left: 0 },
            machining: { total: 83, hired: 13, trained: 0, left: 13 },
            cumulativeCost: 64000 + 13000
        }
    },
    market: {
      sharePriceComparison: { C1: 92.9, C2: 80.09, C3: 87.8, C4: 86.34, C5: 76.25, C6: 55.95, C7: 78.86 },
      geoShare: {
        europe: { user: 10.1, top: 11.3, topName: 'C2' },
        nafta: { user: 10.9, top: 11.1, topName: 'C3' },
        internet: { user: 12.6, top: 12.6, topName: 'C5' }
      },
      productShare: {
        p1: { user: 10.7, top: 11.3, topName: 'C2' },
        p2: { user: 10.6, top: 11.1, topName: 'C2' },
        p3: { user: 12.4, top: 12.4, topName: 'C5' }
      },
      weightedPrices: {
        p1: { user: 307, marketAvg: 299 },
        p2: { user: 507, marketAvg: 496 },
        p3: { user: 784, marketAvg: 780 }
      }
    },
    decisions: {
      adSpend: 310000,
      rdSpend: 85000,
      prices: { p1_eu: 302, p2_eu: 492, p3_eu: 777 },
    }
  },
  {
    id: '2019_Q3',
    quarter: 'Q3',
    year: 2019,
    financials: {
      revenue: 3778783,
      grossProfit: 1699635,
      operatingProfit: 258447,
      netAssets: 3600871,
      cashBalance: -2156858,
      sharePrice: 87.07,
      cumulativeRetainedEarnings: -399129,
      cashFlow: { operating: 439072, investing: 0, financing: -82081 }
    },
    production: {
      employees: 145,
      inventoryValue: 1453152,
      machines: 12,
      efficiency: 86.4,
      capacityUtilization: (12105 / 12816) * 100,
    },
    operations: {
        inventory: {
            productVal: 153611,
            materialVal: 1123681,
            componentVal: 175860,
            competitorAvgVal: (396278 + 1007325 + 1932632 + 0 + 1447624 + 1011920) / 6
        },
        materialFlow: {
            existing: 4549, // Carry over from Q2 2019 Closing
            received: 15000, // Contract delivery (Ordered Q1 2019)
            consumed: -13526,
            closingLevel: 6023
        },
        machining: {
            breakdownHours: 211,
            maintenanceHours: 149,
            efficiency: 86.4
        },
        personnel: {
            assembly: { total: 49, hired: 0, trained: 0, left: 0 },
            machining: { total: 83, hired: 13, trained: 0, left: 13 },
            cumulativeCost: 77000 + 13000
        }
    },
    market: {
      sharePriceComparison: { C1: 90.87, C2: 78.94, C3: 90.15, C4: 80.72, C5: 87.07, C6: 47.94, C7: 84.78 },
      geoShare: {
        europe: { user: 10.4, top: 11.3, topName: 'C2' },
        nafta: { user: 10.9, top: 11.6, topName: 'C2' },
        internet: { user: 12.9, top: 12.9, topName: 'C2' } 
      },
      productShare: {
        p1: { user: 10.8, top: 11.4, topName: 'C2' },
        p2: { user: 11.1, top: 11.9, topName: 'C2' },
        p3: { user: 12.5, top: 12.5, topName: 'C5' }
      },
      weightedPrices: {
        p1: { user: 307, marketAvg: 300 },
        p2: { user: 507, marketAvg: 498 },
        p3: { user: 785, marketAvg: 782 }
      }
    },
    decisions: {
      adSpend: 310000,
      rdSpend: 75000,
      prices: { p1_eu: 302, p2_eu: 492, p3_eu: 777 },
    }
  },
];

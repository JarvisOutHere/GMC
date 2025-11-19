
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Overview from './components/Overview';
import MarketAnalysis from './components/MarketAnalysis';
import Operations from './components/Operations';
import FinancialTable from './components/FinancialTable';

const App: React.FC = () => {
  const activeTabState = useState('overview');
  const activeTab = activeTabState[0];
  const setActiveTab = activeTabState[1];

  const renderContent = () => {
    // Handle Market Sub-tabs
    if (activeTab.startsWith('market')) {
        const view = activeTab.split('-')[1] as 'revenue' | 'shares' | 'pricing';
        return <MarketAnalysis view={view} />;
    }

    // Handle Operations Sub-tabs
    if (activeTab.startsWith('ops')) {
        const view = activeTab.split('-')[1] as 'inventory' | 'machining' | 'personnel';
        return <Operations view={view} />;
    }

    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'operations':
        // Default to inventory if just clicked
        return <Operations view="inventory" />;
      case 'financials':
        return (
            <div className="space-y-6 overflow-y-auto h-full pb-10">
                <div className="bg-white p-6 rounded-xl border border-stone-200 mb-6 shadow-sm">
                    <h2 className="text-2xl font-bold text-stone-800">Financial Performance</h2>
                    <p className="text-stone-500 mt-1">Quarterly breakdown of Income Statement and Balance Sheet highlights.</p>
                </div>
                <FinancialTable />
            </div>
        );
      default:
        return <Overview />;
    }
  };

  const getHeaderTitle = () => {
      if (activeTab === 'market-revenue') return 'Market: Revenue Analysis';
      if (activeTab === 'market-shares') return 'Market: Share Analysis';
      if (activeTab === 'market-pricing') return 'Market: Pricing Strategy';
      if (activeTab === 'ops-inventory') return 'Operations: Inventories';
      if (activeTab === 'ops-machining') return 'Operations: Machining';
      if (activeTab === 'ops-personnel') return 'Operations: Personnel';
      return activeTab;
  };

  return (
    <div className="flex h-screen bg-[#f3f2eb] text-stone-800 font-sans selection:bg-blue-200 selection:text-blue-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-[#f3f2eb]/80 backdrop-blur-md border-b border-stone-200 flex items-center justify-between px-8 sticky top-0 z-10">
           <div>
             <h2 className="text-xl font-bold text-stone-800 capitalize">
                {getHeaderTitle()}
             </h2>
             <p className="text-xs text-stone-500">Last Updated: Year 2019 Q3</p>
           </div>
           <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end">
                  <span className="text-sm font-medium text-stone-700">Company 5</span>
                  <span className="text-xs text-stone-500">Director</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white border border-stone-200 shadow-sm flex items-center justify-center">
                <span className="text-sm font-bold text-blue-600">C5</span>
              </div>
           </div>
        </header>

        <div className="flex-1 overflow-hidden p-4 lg:p-8">
            {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;

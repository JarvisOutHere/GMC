
import React from 'react';
import { LayoutDashboard, DollarSign, PieChart, Activity, Settings, Box, ChevronRight, ChevronDown } from 'lucide-react';
import { COMPANY_NAME } from '../constants';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  // Helper to check if a tab is active (including sub-tabs)
  const isMarketActive = activeTab.startsWith('market');
  const isOpsActive = activeTab.startsWith('ops');

  return (
    <div className="w-20 lg:w-64 h-full bg-[#eae8e4] border-r border-stone-300 flex flex-col flex-shrink-0 transition-all duration-300">
      <div className="p-6 flex items-center justify-center lg:justify-start gap-3 border-b border-stone-300 h-20">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-blue-600/20">
            <Box size={24} />
        </div>
        <div className="hidden lg:block">
            <h1 className="text-stone-800 font-bold text-lg tracking-tight">SimuManager</h1>
            <p className="text-stone-500 text-xs uppercase tracking-widest">{COMPANY_NAME}</p>
        </div>
      </div>

      <nav className="flex-1 py-6 space-y-2 px-3 overflow-y-auto">
        {/* Overview */}
        <button
          onClick={() => setActiveTab('overview')}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
            activeTab === 'overview'
              ? 'bg-white text-blue-700 shadow-sm ring-1 ring-stone-200' 
              : 'text-stone-500 hover:bg-stone-200 hover:text-stone-800'
          }`}
        >
          <LayoutDashboard size={22} className={activeTab === 'overview' ? 'text-blue-600' : 'text-stone-400 group-hover:text-stone-600'} />
          <span className="hidden lg:block font-medium">Overview</span>
        </button>

        {/* Market & Sales Group */}
        <div className="space-y-1">
            <button
            onClick={() => setActiveTab('market-revenue')}
            className={`w-full flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-200 group ${
                isMarketActive
                ? 'bg-stone-200/50 text-stone-800' 
                : 'text-stone-500 hover:bg-stone-200 hover:text-stone-800'
            }`}
            >
            <div className="flex items-center gap-3">
                <PieChart size={22} className={isMarketActive ? 'text-blue-600' : 'text-stone-400 group-hover:text-stone-600'} />
                <span className="hidden lg:block font-medium">Market & Sales</span>
            </div>
            <div className="hidden lg:block">
                {isMarketActive ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </div>
            </button>

            {/* Sub Panes */}
            {isMarketActive && (
                <div className="pl-11 pr-2 space-y-1 hidden lg:block animate-in slide-in-from-top-2 duration-200">
                    <button
                        onClick={() => setActiveTab('market-revenue')}
                        className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                            activeTab === 'market-revenue' ? 'bg-white text-blue-700 font-medium shadow-sm' : 'text-stone-500 hover:text-stone-800 hover:bg-stone-200/50'
                        }`}
                    >
                        Revenue Analysis
                    </button>
                    <button
                        onClick={() => setActiveTab('market-shares')}
                        className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                            activeTab === 'market-shares' ? 'bg-white text-blue-700 font-medium shadow-sm' : 'text-stone-500 hover:text-stone-800 hover:bg-stone-200/50'
                        }`}
                    >
                        Market Shares
                    </button>
                    <button
                        onClick={() => setActiveTab('market-pricing')}
                        className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                            activeTab === 'market-pricing' ? 'bg-white text-blue-700 font-medium shadow-sm' : 'text-stone-500 hover:text-stone-800 hover:bg-stone-200/50'
                        }`}
                    >
                        Pricing Strategy
                    </button>
                </div>
            )}
        </div>

        {/* Operations Group */}
        <div className="space-y-1">
            <button
            onClick={() => setActiveTab('ops-inventory')}
            className={`w-full flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-200 group ${
                isOpsActive
                ? 'bg-stone-200/50 text-stone-800' 
                : 'text-stone-500 hover:bg-stone-200 hover:text-stone-800'
            }`}
            >
            <div className="flex items-center gap-3">
                <Activity size={22} className={isOpsActive ? 'text-blue-600' : 'text-stone-400 group-hover:text-stone-600'} />
                <span className="hidden lg:block font-medium">Operations</span>
            </div>
            <div className="hidden lg:block">
                {isOpsActive ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </div>
            </button>

            {/* Ops Sub Panes */}
            {isOpsActive && (
                <div className="pl-11 pr-2 space-y-1 hidden lg:block animate-in slide-in-from-top-2 duration-200">
                    <button
                        onClick={() => setActiveTab('ops-inventory')}
                        className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                            activeTab === 'ops-inventory' ? 'bg-white text-blue-700 font-medium shadow-sm' : 'text-stone-500 hover:text-stone-800 hover:bg-stone-200/50'
                        }`}
                    >
                        Inventories
                    </button>
                    <button
                        onClick={() => setActiveTab('ops-machining')}
                        className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                            activeTab === 'ops-machining' ? 'bg-white text-blue-700 font-medium shadow-sm' : 'text-stone-500 hover:text-stone-800 hover:bg-stone-200/50'
                        }`}
                    >
                        Machining
                    </button>
                    <button
                        onClick={() => setActiveTab('ops-personnel')}
                        className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                            activeTab === 'ops-personnel' ? 'bg-white text-blue-700 font-medium shadow-sm' : 'text-stone-500 hover:text-stone-800 hover:bg-stone-200/50'
                        }`}
                    >
                        Personnel
                    </button>
                </div>
            )}
        </div>

        {/* Financials */}
        <button
          onClick={() => setActiveTab('financials')}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
            activeTab === 'financials' 
              ? 'bg-white text-blue-700 shadow-sm ring-1 ring-stone-200' 
              : 'text-stone-500 hover:bg-stone-200 hover:text-stone-800'
          }`}
        >
          <DollarSign size={22} className={activeTab === 'financials' ? 'text-blue-600' : 'text-stone-400 group-hover:text-stone-600'} />
          <span className="hidden lg:block font-medium">Financials</span>
        </button>
      </nav>

      <div className="p-4 border-t border-stone-300">
         <button className="w-full flex items-center gap-3 px-3 py-3 text-stone-500 hover:text-stone-800 hover:bg-stone-200 rounded-xl transition-colors">
            <Settings size={22} />
            <span className="hidden lg:block font-medium">Settings</span>
         </button>
         <div className="mt-4 pt-4 border-t border-stone-300 hidden lg:block">
            <div className="text-xs text-stone-500 text-center">
                Simulation Year 2019 Q3
            </div>
         </div>
      </div>
    </div>
  );
};

export default Sidebar;

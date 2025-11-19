
import React, { useState, useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { QUARTERLY_DATA, COMPETITOR_REVENUE_DATA } from '../constants';
import { CompanyCode } from '../types';

type ViewType = 'revenue' | 'shares' | 'pricing';
type GeoFilter = 'all' | 'europe' | 'nafta' | 'internet';
type ProductFilter = 'all' | 'p1' | 'p2' | 'p3';
type SingleProductFilter = 'p1' | 'p2' | 'p3';

interface MarketAnalysisProps {
    view: ViewType;
}

const MarketAnalysis: React.FC<MarketAnalysisProps> = ({ view }) => {
  const [showAllTeams, setShowAllTeams] = useState(false);
  
  // Filters
  const [geoFilter, setGeoFilter] = useState<GeoFilter>('all');
  const [prodShareFilter, setProdShareFilter] = useState<ProductFilter>('all');
  const [pricingFilter, setPricingFilter] = useState<SingleProductFilter>('p1');

  // Common props
  const axisStyle = { stroke: '#78716c', fontSize: 12 };
  const gridStyle = { stroke: '#e7e5e4', strokeDasharray: '3 3' };
  const tooltipStyle = { backgroundColor: '#ffffff', borderColor: '#e7e5e4', color: '#1c1917', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' };

  // Latest data for dynamic legends
  const latest = QUARTERLY_DATA[QUARTERLY_DATA.length - 1];

  // ------------------------------------------------------
  // Data Processing
  // ------------------------------------------------------
  
  // 1. Cumulative Revenue
  const cumulativeRevenueData = useMemo(() => {
    let cumTotals: Record<string, number> = { C1: 0, C2: 0, C3: 0, C4: 0, C5: 0, C6: 0, C7: 0 };
    
    return QUARTERLY_DATA.map((q) => {
      const revData = COMPETITOR_REVENUE_DATA.find(c => c.quarterId === q.id)?.revenues;
      if (!revData) return null;

      Object.keys(cumTotals).forEach(key => {
        cumTotals[key] += revData[key as CompanyCode];
      });

      const entries = Object.entries(cumTotals);
      const sorted = [...entries].sort((a, b) => b[1] - a[1]);
      const topTeam = sorted[0];
      const worstTeam = sorted[sorted.length - 1];
      const avg = entries.reduce((acc, curr) => acc + curr[1], 0) / entries.length;

      return {
        name: q.id.replace('_', ' '),
        C5: cumTotals['C5'],
        TopTeam: topTeam[1],
        TopTeamName: topTeam[0],
        WorstTeam: worstTeam[1],
        Average: avg,
        C1: cumTotals['C1'],
        C2: cumTotals['C2'],
        C3: cumTotals['C3'],
        C4: cumTotals['C4'],
        C6: cumTotals['C6'],
        C7: cumTotals['C7'],
      };
    }).filter(Boolean);
  }, []);

  const currentTopPerformer = cumulativeRevenueData.length > 0 
    ? cumulativeRevenueData[cumulativeRevenueData.length - 1]?.TopTeamName 
    : 'N/A';

  // 2. Geo Share Data
  const geoShareData = QUARTERLY_DATA.map(d => ({
    name: d.id.replace('_', ' '),
    EU_User: d.market.geoShare.europe.user,
    EU_Top: d.market.geoShare.europe.top,
    NA_User: d.market.geoShare.nafta.user,
    NA_Top: d.market.geoShare.nafta.top,
    INT_User: d.market.geoShare.internet.user,
    INT_Top: d.market.geoShare.internet.top,
  }));

  // 3. Product Share Data
  const productShareData = QUARTERLY_DATA.map(d => ({
    name: d.id.replace('_', ' '),
    P1_User: d.market.productShare.p1.user,
    P1_Top: d.market.productShare.p1.top,
    P2_User: d.market.productShare.p2.user,
    P2_Top: d.market.productShare.p2.top,
    P3_User: d.market.productShare.p3.user,
    P3_Top: d.market.productShare.p3.top,
  }));

  // 4. Pricing Data
  const priceData = QUARTERLY_DATA.map(d => ({
    name: d.id.replace('_', ' '),
    P1_User: d.market.weightedPrices.p1.user,
    P1_Avg: d.market.weightedPrices.p1.marketAvg,
    P2_User: d.market.weightedPrices.p2.user,
    P2_Avg: d.market.weightedPrices.p2.marketAvg,
    P3_User: d.market.weightedPrices.p3.user,
    P3_Avg: d.market.weightedPrices.p3.marketAvg,
  }));

  const formatMillions = (val: number) => `€${(val / 1000000).toFixed(1)}M`;

  // Helper for Pricing Insight
  const getLatestPricingInsight = () => {
    const user = latest.market.weightedPrices[pricingFilter].user;
    const avg = latest.market.weightedPrices[pricingFilter].marketAvg;
    const diff = ((user - avg) / avg) * 100;
    return { user, avg, diff };
  };
  
  const insight = getLatestPricingInsight();

  // Segmented Control Component
  const SegmentedControl = <T extends string>({ 
    options, 
    active, 
    onChange 
  }: { 
    options: { value: T; label: string }[], 
    active: T, 
    onChange: (val: T) => void 
  }) => (
    <div className="flex bg-stone-100 p-1 rounded-lg self-start md:self-auto">
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
            active === opt.value 
              ? 'bg-white text-stone-800 shadow-sm' 
              : 'text-stone-500 hover:text-stone-700'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="space-y-6 h-full overflow-y-auto pb-10">
      
      {/* ------------------- REVENUE PANE ------------------- */}
      {view === 'revenue' && (
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h3 className="text-lg font-semibold text-stone-800">Cumulative Revenue Leaderboard</h3>
                    <p className="text-stone-500 text-sm">Tracking performance against Top, Average and Worst teams</p>
                </div>
                <SegmentedControl 
                    options={[
                        { value: 'false', label: 'Summary View' }, 
                        { value: 'true', label: 'All Teams' }
                    ]}
                    active={String(showAllTeams)}
                    onChange={(v) => setShowAllTeams(v === 'true')}
                />
            </div>
            <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cumulativeRevenueData}>
                <CartesianGrid {...gridStyle} vertical={false} />
                <XAxis dataKey="name" {...axisStyle} />
                <YAxis {...axisStyle} tickFormatter={formatMillions} width={60} />
                <Tooltip contentStyle={tooltipStyle} formatter={(val: number) => formatMillions(val)} />
                <Legend />
                
                <Line type="monotone" dataKey="C5" stroke="#3b82f6" strokeWidth={4} name="Company 5" dot={{r:5, fill: '#3b82f6'}} />

                {!showAllTeams ? (
                    <>
                        <Line type="monotone" dataKey="TopTeam" stroke="#10b981" strokeWidth={2} name={`Top Performer (${currentTopPerformer})`} legendType="plainline" />
                        <Line type="monotone" dataKey="Average" stroke="#a8a29e" strokeWidth={2} strokeDasharray="5 5" name="Market Avg" legendType="plainline" />
                        <Line type="monotone" dataKey="WorstTeam" stroke="#ef4444" strokeWidth={2} name="Worst Performer" legendType="plainline" />
                    </>
                ) : (
                    <>
                        {['C1', 'C2', 'C3', 'C4', 'C6', 'C7'].map(c => (
                             <Line key={c} type="monotone" dataKey={c} stroke="#d6d3d1" strokeWidth={1} name={c} dot={false} legendType="plainline" />
                        ))}
                    </>
                )}
                </LineChart>
            </ResponsiveContainer>
            </div>
        </div>
      )}

      {/* ------------------- MARKET SHARES PANE ------------------- */}
      {view === 'shares' && (
        <div className="space-y-6">
            {/* Geographic Shares */}
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h3 className="text-lg font-semibold text-stone-800">Geographic Market Share (%)</h3>
                    <SegmentedControl<GeoFilter>
                        options={[
                            { value: 'all', label: 'All Regions' },
                            { value: 'europe', label: 'Europe' },
                            { value: 'nafta', label: 'Nafta' },
                            { value: 'internet', label: 'Internet' },
                        ]}
                        active={geoFilter}
                        onChange={setGeoFilter}
                    />
                </div>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={geoShareData}>
                            <CartesianGrid {...gridStyle} />
                            <XAxis dataKey="name" {...axisStyle} />
                            <YAxis {...axisStyle} domain={[0, 'auto']} />
                            <Tooltip contentStyle={tooltipStyle} />
                            <Legend />
                            
                            {(geoFilter === 'all' || geoFilter === 'europe') && (
                                <>
                                    <Line type="monotone" dataKey="EU_User" stroke="#3b82f6" strokeWidth={3} name="Europe: Company 5" dot={{r:3}} />
                                    <Line type="monotone" dataKey="EU_Top" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" name={`Europe: Market Leader (${latest.market.geoShare.europe.topName})`} dot={false} legendType="plainline" />
                                </>
                            )}

                            {(geoFilter === 'all' || geoFilter === 'nafta') && (
                                <>
                                    <Line type="monotone" dataKey="NA_User" stroke="#f59e0b" strokeWidth={3} name="Nafta: Company 5" dot={{r:3}} />
                                    <Line type="monotone" dataKey="NA_Top" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" name={`Nafta: Market Leader (${latest.market.geoShare.nafta.topName})`} dot={false} legendType="plainline" />
                                </>
                            )}

                            {(geoFilter === 'all' || geoFilter === 'internet') && (
                                <>
                                    <Line type="monotone" dataKey="INT_User" stroke="#8b5cf6" strokeWidth={3} name="Internet: Company 5" dot={{r:3}} />
                                    <Line type="monotone" dataKey="INT_Top" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="5 5" name={`Internet: Market Leader (${latest.market.geoShare.internet.topName})`} dot={false} legendType="plainline" />
                                </>
                            )}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Product Shares */}
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h3 className="text-lg font-semibold text-stone-800">Product Market Share (%)</h3>
                    <SegmentedControl<ProductFilter>
                        options={[
                            { value: 'all', label: 'All Products' },
                            { value: 'p1', label: 'Product 1' },
                            { value: 'p2', label: 'Product 2' },
                            { value: 'p3', label: 'Product 3' },
                        ]}
                        active={prodShareFilter}
                        onChange={setProdShareFilter}
                    />
                </div>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={productShareData}>
                            <CartesianGrid {...gridStyle} />
                            <XAxis dataKey="name" {...axisStyle} />
                            <YAxis {...axisStyle} domain={[0, 'auto']} />
                            <Tooltip contentStyle={tooltipStyle} />
                            <Legend />
                            
                            {(prodShareFilter === 'all' || prodShareFilter === 'p1') && (
                                <>
                                    <Line type="monotone" dataKey="P1_User" stroke="#0ea5e9" strokeWidth={3} name="P1: Company 5" dot={{r:3}} />
                                    <Line type="monotone" dataKey="P1_Top" stroke="#0ea5e9" strokeWidth={2} strokeDasharray="5 5" name={`P1: Market Leader (${latest.market.productShare.p1.topName})`} dot={false} legendType="plainline" />
                                </>
                            )}

                            {(prodShareFilter === 'all' || prodShareFilter === 'p2') && (
                                <>
                                    <Line type="monotone" dataKey="P2_User" stroke="#ec4899" strokeWidth={3} name="P2: Company 5" dot={{r:3}} />
                                    <Line type="monotone" dataKey="P2_Top" stroke="#ec4899" strokeWidth={2} strokeDasharray="5 5" name={`P2: Market Leader (${latest.market.productShare.p2.topName})`} dot={false} legendType="plainline" />
                                </>
                            )}

                            {(prodShareFilter === 'all' || prodShareFilter === 'p3') && (
                                <>
                                    <Line type="monotone" dataKey="P3_User" stroke="#14b8a6" strokeWidth={3} name="P3: Company 5" dot={{r:3}} />
                                    <Line type="monotone" dataKey="P3_Top" stroke="#14b8a6" strokeWidth={2} strokeDasharray="5 5" name={`P3: Market Leader (${latest.market.productShare.p3.topName})`} dot={false} legendType="plainline" />
                                </>
                            )}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
      )}

      {/* ------------------- PRICING PANE ------------------- */}
      {view === 'pricing' && (
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h3 className="text-lg font-semibold text-stone-800">Pricing vs Field Average</h3>
                    <div className={`text-sm mt-1 font-medium ${insight.diff > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {insight.diff > 0 ? '+' : ''}{insight.diff.toFixed(1)}% {insight.diff > 0 ? 'above' : 'below'} remaining field average
                    </div>
                </div>
                <SegmentedControl<SingleProductFilter>
                    options={[
                        { value: 'p1', label: 'Product 1' },
                        { value: 'p2', label: 'Product 2' },
                        { value: 'p3', label: 'Product 3' },
                    ]}
                    active={pricingFilter}
                    onChange={setPricingFilter}
                />
            </div>
            <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={priceData}>
                        <CartesianGrid {...gridStyle} vertical={false} />
                        <XAxis dataKey="name" {...axisStyle} />
                        <YAxis 
                            {...axisStyle} 
                            domain={[0, 'auto']} 
                        />
                        <Tooltip contentStyle={tooltipStyle} formatter={(val: number) => `€${val}`} />
                        <Legend />
                        
                        {pricingFilter === 'p1' && (
                            <>
                                <Line type="monotone" dataKey="P1_User" stroke="#0ea5e9" strokeWidth={3} name="Product 1: Company 5" dot={{r:4}} />
                                <Line type="monotone" dataKey="P1_Avg" stroke="#a8a29e" strokeWidth={2} strokeDasharray="5 5" name="Product 1: Field Average" dot={false} legendType="plainline" />
                            </>
                        )}
                         {pricingFilter === 'p2' && (
                            <>
                                <Line type="monotone" dataKey="P2_User" stroke="#ec4899" strokeWidth={3} name="Product 2: Company 5" dot={{r:4}} />
                                <Line type="monotone" dataKey="P2_Avg" stroke="#a8a29e" strokeWidth={2} strokeDasharray="5 5" name="Product 2: Field Average" dot={false} legendType="plainline" />
                            </>
                        )}
                         {pricingFilter === 'p3' && (
                            <>
                                <Line type="monotone" dataKey="P3_User" stroke="#14b8a6" strokeWidth={3} name="Product 3: Company 5" dot={{r:4}} />
                                <Line type="monotone" dataKey="P3_Avg" stroke="#a8a29e" strokeWidth={2} strokeDasharray="5 5" name="Product 3: Field Average" dot={false} legendType="plainline" />
                            </>
                        )}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
      )}

    </div>
  );
};

export default MarketAnalysis;

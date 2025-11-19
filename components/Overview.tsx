
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Legend, LineChart, Line, ComposedChart, ReferenceLine
} from 'recharts';
import { QUARTERLY_DATA } from '../constants';
import KPICard from './KPICard';

const Overview: React.FC = () => {
  const latest = QUARTERLY_DATA[QUARTERLY_DATA.length - 1];
  const previous = QUARTERLY_DATA[QUARTERLY_DATA.length - 2];

  const formatMoney = (val: number) => {
    if (Math.abs(val) >= 1000000) return `${(val / 1000000).toFixed(2)}M`;
    if (Math.abs(val) >= 1000) return `${(val / 1000).toFixed(1)}k`;
    return val.toString();
  };

  // 1. Financial Trajectory Data (Profit removed)
  const trendData = QUARTERLY_DATA.map(d => ({
    name: `${d.year} ${d.quarter}`,
    Revenue: d.financials.revenue,
    SharePrice: d.financials.sharePrice,
  }));

  // 2. Sorted Competitor Share Prices
  const shareComparisonData = Object.entries(latest.market.sharePriceComparison)
    .map(([key, value]) => ({
      name: key,
      price: value,
      fill: key === 'C5' ? '#3b82f6' : '#a8a29e' // Blue for us, Stone for others
    }))
    .sort((a, b) => b.price - a.price); // Descending order

  // 3. Gross Margin Stack Data
  // Break down Revenue into: Cost of Sales (Rev - GP), Operating Expenses (GP - OP), Operating Profit
  const marginData = QUARTERLY_DATA.map(d => {
    const rev = d.financials.revenue;
    const gp = d.financials.grossProfit;
    const op = d.financials.operatingProfit;
    
    const costOfSales = rev - gp;
    // If OP is positive, Expenses = GP - OP. 
    // If OP is negative, we can't visually stack it easily as a component of Revenue.
    // We will assume "Expenses" covers the GP portion if OP is negative, and OP is 0 for the stack.
    const expenses = gp - (op > 0 ? op : 0);
    const profit = op > 0 ? op : 0;

    return {
      name: `${d.year} ${d.quarter}`,
      CostOfSales: costOfSales,
      Expenses: expenses,
      Profit: profit,
      Revenue: rev
    };
  });

  // 4. Cash Flow Data
  const cashFlowData = QUARTERLY_DATA.map(d => ({
    name: `${d.year} ${d.quarter}`,
    Operating: d.financials.cashFlow.operating,
    Investing: d.financials.cashFlow.investing,
    Financing: d.financials.cashFlow.financing,
    NetPosition: d.financials.cashBalance // Plotted as line
  }));

  // Common chart props
  const axisStyle = { stroke: '#78716c', fontSize: 12 };
  const gridStyle = { stroke: '#e7e5e4', strokeDasharray: '3 3' };
  const tooltipStyle = { backgroundColor: '#ffffff', borderColor: '#e7e5e4', color: '#1c1917', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' };

  return (
    <div className="space-y-6 overflow-y-auto pb-10 h-full">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard 
          title="Sales Revenue" 
          value={formatMoney(latest.financials.revenue)} 
          prefix="€"
          trend={latest.financials.revenue > previous.financials.revenue ? 'up' : 'down'}
          color="blue"
        />
        <KPICard 
          title="Operating Profit" 
          value={formatMoney(latest.financials.operatingProfit)} 
          prefix="€"
          trend={latest.financials.operatingProfit > previous.financials.operatingProfit ? 'up' : 'down'}
          color={latest.financials.operatingProfit > 0 ? 'emerald' : 'rose'}
        />
        <KPICard 
          title="Share Price" 
          value={latest.financials.sharePrice} 
          suffix="c"
          trend={latest.financials.sharePrice > previous.financials.sharePrice ? 'up' : 'down'}
          color="amber"
        />
        <KPICard 
          title="Cash Balance" 
          value={formatMoney(latest.financials.cashBalance)} 
          prefix="€"
          trend={latest.financials.cashBalance > previous.financials.cashBalance ? 'up' : 'down'}
          color={latest.financials.cashBalance >= 0 ? 'emerald' : 'rose'}
        />
      </div>

      {/* Main Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
          <h3 className="text-lg font-semibold text-stone-800 mb-4">Financial Trajectory (Revenue & Share Price)</h3>
          <ResponsiveContainer width="100%" height="85%">
            <ComposedChart data={trendData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid {...gridStyle} vertical={false} />
              <XAxis dataKey="name" {...axisStyle} />
              <YAxis yAxisId="left" {...axisStyle} tickFormatter={formatMoney} />
              <YAxis yAxisId="right" orientation="right" {...axisStyle} />
              <Tooltip 
                contentStyle={tooltipStyle}
                formatter={(value: number, name: string) => [
                   name === 'SharePrice' ? `${value}c` : `€${formatMoney(value)}`, name
                ]}
              />
              <Legend />
              <Area yAxisId="left" type="monotone" dataKey="Revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" />
              <Line yAxisId="right" type="monotone" dataKey="SharePrice" stroke="#f59e0b" strokeWidth={3} dot={{r: 4, fill: '#f59e0b'}} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
           <h3 className="text-lg font-semibold text-stone-800 mb-4">Competitor Share Prices (Q3)</h3>
           <ResponsiveContainer width="100%" height="85%">
             <BarChart data={shareComparisonData} layout="vertical">
               <CartesianGrid {...gridStyle} horizontal={true} vertical={false} />
               <XAxis type="number" hide />
               <YAxis dataKey="name" type="category" {...axisStyle} width={30} />
               <Tooltip cursor={{fill: '#f5f5f4'}} contentStyle={tooltipStyle} />
               <Bar dataKey="price" radius={[0, 4, 4, 0]}>
                {shareComparisonData.map((entry, index) => (
                  <cell key={`cell-${index}`} fill={entry.fill} />
                ))}
               </Bar>
             </BarChart>
           </ResponsiveContainer>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gross Margin Breakdown */}
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
             <h3 className="text-lg font-semibold text-stone-800 mb-2">Revenue Breakdown</h3>
             <p className="text-stone-500 text-sm mb-4">Cost of Sales vs Expenses vs Net Profit</p>
             <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={marginData}>
                  <CartesianGrid {...gridStyle} vertical={false}/>
                  <XAxis dataKey="name" {...axisStyle} />
                  <YAxis {...axisStyle} tickFormatter={formatMoney} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(val: number) => `€${formatMoney(val)}`} />
                  <Legend />
                  <Bar dataKey="CostOfSales" stackId="a" fill="#94a3b8" name="Cost of Sales" />
                  <Bar dataKey="Expenses" stackId="a" fill="#fcd34d" name="Op. Expenses" />
                  <Bar dataKey="Profit" stackId="a" fill="#10b981" name="Net Profit" />
                </BarChart>
              </ResponsiveContainer>
             </div>
          </div>

          {/* Cash Flow Status */}
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
             <h3 className="text-lg font-semibold text-stone-800 mb-2">Cash Flow Status</h3>
             <p className="text-stone-500 text-sm mb-4">Flows vs Net Cash Position</p>
             <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={cashFlowData}>
                  <CartesianGrid {...gridStyle} />
                  <XAxis dataKey="name" {...axisStyle} />
                  <YAxis {...axisStyle} tickFormatter={formatMoney} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(val: number) => `€${formatMoney(val)}`}/>
                  <Legend />
                  <ReferenceLine y={0} stroke="#a8a29e" />
                  <Bar dataKey="Operating" fill="#3b82f6" name="Op. Flow" barSize={15} />
                  <Bar dataKey="Investing" fill="#a855f7" name="Inv. Flow" barSize={15} />
                  <Bar dataKey="Financing" fill="#f97316" name="Fin. Flow" barSize={15} />
                  <Line type="monotone" dataKey="NetPosition" stroke="#ef4444" strokeWidth={2} dot={{r:4}} name="Cash Balance" />
                </ComposedChart>
              </ResponsiveContainer>
             </div>
          </div>
      </div>
    </div>
  );
};

export default Overview;

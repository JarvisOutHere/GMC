
import React from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, ReferenceLine 
} from 'recharts';
import { QUARTERLY_DATA } from '../constants';
import KPICard from './KPICard';

type OpsViewType = 'inventory' | 'machining' | 'personnel';

interface OperationsProps {
  view: OpsViewType;
}

const Operations: React.FC<OperationsProps> = ({ view }) => {
  const latest = QUARTERLY_DATA[QUARTERLY_DATA.length - 1];
  const previous = QUARTERLY_DATA[QUARTERLY_DATA.length - 2];

  // Common chart props
  const axisStyle = { stroke: '#78716c', fontSize: 12 };
  const gridStyle = { stroke: '#e7e5e4', strokeDasharray: '3 3' };
  const tooltipStyle = { backgroundColor: '#ffffff', borderColor: '#e7e5e4', color: '#1c1917', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' };
  const formatMoney = (val: number) => {
      if (Math.abs(val) >= 1000000) return `${(val/1000000).toFixed(1)}M`;
      if (Math.abs(val) >= 1000) return `${(val/1000).toFixed(0)}k`;
      return val.toString();
  };

  // -------------------------------------
  // Data Preparation
  // -------------------------------------

  // 1. Inventory
  const inventoryData = QUARTERLY_DATA.map(d => ({
      name: d.id.replace('_', ' '),
      Product: d.operations.inventory.productVal,
      Material: d.operations.inventory.materialVal,
      Component: d.operations.inventory.componentVal,
      AvgCompetitor: d.operations.inventory.competitorAvgVal
  }));

  const materialFlowData = QUARTERLY_DATA.map(d => ({
      name: d.id.replace('_', ' '),
      Existing: d.operations.materialFlow.existing,
      Received: d.operations.materialFlow.received,
      // Ensure Consumed is negative for the chart
      Consumed: -Math.abs(d.operations.materialFlow.consumed), 
      Level: d.operations.materialFlow.closingLevel
  }));

  // 2. Machining
  const machiningData = QUARTERLY_DATA.map(d => ({
      name: d.id.replace('_', ' '),
      Breakdown: d.operations.machining.breakdownHours,
      Maintenance: d.operations.machining.maintenanceHours,
      Efficiency: d.operations.machining.efficiency
  }));

  // 3. Personnel
  const personnelData = QUARTERLY_DATA.map(d => ({
      name: d.id.replace('_', ' '),
      
      Machinist_Gain: d.operations.personnel.machining.hired + d.operations.personnel.machining.trained,
      Machinist_Loss: -d.operations.personnel.machining.left,
      
      Assembly_Gain: d.operations.personnel.assembly.hired + d.operations.personnel.assembly.trained,
      Assembly_Loss: -d.operations.personnel.assembly.left,
  }));

  return (
    <div className="space-y-6 h-full overflow-y-auto pb-10">
       
       {/* ---------------- INVENTORY PANE ---------------- */}
       {view === 'inventory' && (
           <div className="space-y-6">
               <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                   <h3 className="text-lg font-semibold text-stone-800 mb-1">Inventory Composition vs Market Average</h3>
                   <p className="text-sm text-stone-500 mb-4">Breakdown of inventory value (€) compared to competitor average.</p>
                   <div className="h-80">
                       <ResponsiveContainer width="100%" height="100%">
                           <ComposedChart data={inventoryData}>
                               <CartesianGrid {...gridStyle} />
                               <XAxis dataKey="name" {...axisStyle} />
                               <YAxis {...axisStyle} tickFormatter={(v) => `€${formatMoney(v)}`} />
                               <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => `€${v.toLocaleString()}`} />
                               <Legend />
                               <Bar dataKey="Product" stackId="a" fill="#3b82f6" name="Product Inv." />
                               <Bar dataKey="Material" stackId="a" fill="#f59e0b" name="Material Inv." />
                               <Bar dataKey="Component" stackId="a" fill="#a855f7" name="Component Inv." />
                               <Line type="monotone" dataKey="AvgCompetitor" stroke="#ef4444" strokeWidth={2} dot={{r:4}} name="Competitor Avg" />
                           </ComposedChart>
                       </ResponsiveContainer>
                   </div>
               </div>

               <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                   <h3 className="text-lg font-semibold text-stone-800 mb-1">Raw Material Flow (Units)</h3>
                   <p className="text-sm text-stone-500 mb-4">Existing stock and deliveries (Top) vs Consumption (Bottom).</p>
                   <div className="h-80">
                       <ResponsiveContainer width="100%" height="100%">
                           <ComposedChart data={materialFlowData} stackOffset="sign">
                               <CartesianGrid {...gridStyle} />
                               <XAxis dataKey="name" {...axisStyle} />
                               <YAxis {...axisStyle} />
                               <Tooltip 
                                 contentStyle={tooltipStyle} 
                                 formatter={(value: number, name: string) => [
                                   Math.abs(value).toLocaleString(), 
                                   name
                                 ]}
                               />
                               <Legend />
                               <ReferenceLine y={0} stroke="#a8a29e" strokeWidth={1.5} />
                               <Bar dataKey="Existing" stackId="stack_pos" fill="#94a3b8" name="Existing Stock" />
                               <Bar dataKey="Received" stackId="stack_pos" fill="#10b981" name="Received" />
                               <Bar dataKey="Consumed" stackId="stack_neg" fill="#ef4444" name="Consumed" />
                               <Line type="monotone" dataKey="Level" stroke="#0f172a" strokeWidth={2} dot={{r:4}} name="Closing Level" />
                           </ComposedChart>
                       </ResponsiveContainer>
                   </div>
               </div>
           </div>
       )}

       {/* ---------------- MACHINING PANE ---------------- */}
       {view === 'machining' && (
           <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <KPICard title="Avg Efficiency" value={latest.operations.machining.efficiency} suffix="%" trend="neutral" color="blue" />
                    <KPICard title="Breakdown Hours" value={latest.operations.machining.breakdownHours} trend={latest.operations.machining.breakdownHours < previous.operations.machining.breakdownHours ? 'up' : 'down'} color="rose" />
                    <KPICard title="Total Machines" value={latest.production.machines} color="slate" />
                </div>
                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                   <h3 className="text-lg font-semibold text-stone-800 mb-4">Machining Hours & Efficiency</h3>
                   <div className="h-96">
                       <ResponsiveContainer width="100%" height="100%">
                           <ComposedChart data={machiningData}>
                               <CartesianGrid {...gridStyle} vertical={false} />
                               <XAxis dataKey="name" {...axisStyle} />
                               <YAxis yAxisId="left" {...axisStyle} label={{ value: 'Hours', angle: -90, position: 'insideLeft', style: {textAnchor: 'middle', fill: '#78716c', fontSize: 12} }} />
                               <YAxis yAxisId="right" orientation="right" domain={[70, 100]} {...axisStyle} label={{ value: 'Efficiency %', angle: 90, position: 'insideRight', style: {textAnchor: 'middle', fill: '#78716c', fontSize: 12} }} />
                               <Tooltip contentStyle={tooltipStyle} />
                               <Legend />
                               <Bar yAxisId="left" dataKey="Breakdown" stackId="c" fill="#ef4444" name="Breakdown Hours" barSize={40} />
                               <Bar yAxisId="left" dataKey="Maintenance" stackId="c" fill="#fcd34d" name="Maintenance Hours" barSize={40} />
                               <Line yAxisId="right" type="monotone" dataKey="Efficiency" stroke="#3b82f6" strokeWidth={3} dot={{r:5}} name="Efficiency %" />
                           </ComposedChart>
                       </ResponsiveContainer>
                   </div>
               </div>
           </div>
       )}

       {/* ---------------- PERSONNEL PANE ---------------- */}
       {view === 'personnel' && (
           <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl">
                         <h4 className="text-blue-800 font-semibold text-lg">Cumulative HR Costs</h4>
                         <div className="text-3xl font-bold text-blue-900 mt-2">
                            €{latest.operations.personnel.cumulativeCost.toLocaleString()}
                         </div>
                         <p className="text-blue-600/80 text-sm mt-1">Total hiring & training expenses since 2018 Q4</p>
                    </div>
                    <div className="bg-stone-50 border border-stone-200 p-6 rounded-xl flex flex-col justify-center">
                         <div className="flex justify-between items-center mb-2">
                            <span className="text-stone-600 font-medium">Total Machinists</span>
                            <span className="text-2xl font-bold text-stone-800">{latest.operations.personnel.machining.total}</span>
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="text-stone-600 font-medium">Total Assembly</span>
                            <span className="text-2xl font-bold text-stone-800">{latest.operations.personnel.assembly.total}</span>
                         </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                   <h3 className="text-lg font-semibold text-stone-800 mb-1">Workforce Movement</h3>
                   <p className="text-sm text-stone-500 mb-4">Recruitment/Training (Positive) vs Departures (Negative) by role.</p>
                   <div className="h-96">
                       <ResponsiveContainer width="100%" height="100%">
                           <BarChart data={personnelData}>
                               <CartesianGrid {...gridStyle} />
                               <XAxis dataKey="name" {...axisStyle} />
                               <YAxis {...axisStyle} />
                               <Tooltip contentStyle={tooltipStyle} />
                               <Legend />
                               <ReferenceLine y={0} stroke="#d6d3d1" />
                               
                               <Bar dataKey="Machinist_Gain" fill="#3b82f6" name="Machinist In" stackId="m" />
                               <Bar dataKey="Machinist_Loss" fill="#93c5fd" name="Machinist Out" stackId="m" />
                               
                               <Bar dataKey="Assembly_Gain" fill="#10b981" name="Assembly In" stackId="a" />
                               <Bar dataKey="Assembly_Loss" fill="#6ee7b7" name="Assembly Out" stackId="a" />
                           </BarChart>
                       </ResponsiveContainer>
                   </div>
               </div>
           </div>
       )}
    </div>
  );
};

export default Operations;

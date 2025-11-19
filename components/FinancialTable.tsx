
import React from 'react';
import { QUARTERLY_DATA } from '../constants';

const FinancialTable: React.FC = () => {
  const format = (num: number) => {
      return new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(num);
  };

  const rows = [
    { label: 'Sales Revenue', key: 'revenue' as const, bold: true },
    { label: 'Gross Profit', key: 'grossProfit' as const, bold: false },
    { label: 'Operating Profit', key: 'operatingProfit' as const, bold: true, colorScale: true },
    { label: 'Net Assets', key: 'netAssets' as const, bold: false },
    { label: 'Cash Balance', key: 'cashBalance' as const, bold: true, colorScale: true },
    { label: 'Retained Earnings', key: 'cumulativeRetainedEarnings' as const, bold: false },
  ];

  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
      <div className="p-6 border-b border-stone-200 bg-stone-50">
        <h3 className="text-lg font-semibold text-stone-800">Detailed Financial Statements</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-stone-600">
            <thead className="text-xs uppercase bg-stone-100 text-stone-500">
                <tr>
                    <th scope="col" className="px-6 py-4">Metric</th>
                    {QUARTERLY_DATA.map(q => (
                        <th key={q.id} scope="col" className="px-6 py-4 text-right text-stone-700 font-bold">{q.year} {q.quarter}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, idx) => (
                    <tr key={row.key} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-stone-50'} border-b border-stone-100 hover:bg-stone-100/80 transition-colors`}>
                        <td className={`px-6 py-4 ${row.bold ? 'font-bold text-stone-800' : ''}`}>
                            {row.label}
                        </td>
                        {QUARTERLY_DATA.map(q => {
                            const val = q.financials[row.key];
                            let colorClass = 'text-stone-600';
                            if (row.colorScale) {
                                if (val > 0) colorClass = 'text-emerald-600 font-medium';
                                if (val < 0) colorClass = 'text-rose-600 font-medium';
                            }
                            return (
                                <td key={q.id} className={`px-6 py-4 text-right font-mono ${colorClass}`}>
                                    {format(val)}
                                </td>
                            );
                        })}
                    </tr>
                ))}
                <tr className="bg-stone-100 border-t border-stone-200">
                    <td className="px-6 py-4 font-bold text-stone-800">Share Price (Cents)</td>
                    {QUARTERLY_DATA.map(q => (
                        <td key={q.id} className="px-6 py-4 text-right font-mono text-amber-600 font-bold">
                            {q.financials.sharePrice}
                        </td>
                    ))}
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialTable;

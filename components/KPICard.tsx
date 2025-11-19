
import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  prevValue?: number;
  prefix?: string;
  suffix?: string;
  trend?: 'up' | 'down' | 'neutral';
  color?: 'slate' | 'blue' | 'emerald' | 'rose' | 'amber';
}

const KPICard: React.FC<KPICardProps> = ({ 
  title, 
  value, 
  prefix = '', 
  suffix = '', 
  trend,
  color = 'slate'
}) => {
  const getColorClasses = () => {
    switch (color) {
      case 'blue': return 'bg-blue-50 border-blue-100 text-blue-700';
      case 'emerald': return 'bg-emerald-50 border-emerald-100 text-emerald-700';
      case 'rose': return 'bg-rose-50 border-rose-100 text-rose-700';
      case 'amber': return 'bg-amber-50 border-amber-100 text-amber-700';
      default: return 'bg-stone-50 border-stone-200 text-stone-700';
    }
  };

  const getTrendColor = () => {
      if (trend === 'up') return 'text-emerald-600';
      if (trend === 'down') return 'text-rose-600';
      return 'text-stone-400';
  };

  return (
    <div className={`p-5 rounded-xl border ${getColorClasses()} flex flex-col justify-between transition-all hover:shadow-md hover:scale-[1.01] shadow-sm`}>
      <div className="text-sm font-medium text-stone-500 mb-2 uppercase tracking-wider">
        {title}
      </div>
      <div className="flex items-end justify-between">
        <div className="text-2xl font-bold text-stone-800">
          {prefix}{value}{suffix}
        </div>
        {trend && (
          <div className={`flex items-center ${getTrendColor()}`}>
            {trend === 'up' && <ArrowUpRight size={20} />}
            {trend === 'down' && <ArrowDownRight size={20} />}
            {trend === 'neutral' && <Minus size={20} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default KPICard;

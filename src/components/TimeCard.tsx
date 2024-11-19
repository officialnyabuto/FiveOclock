import React from 'react';
import { Clock } from 'lucide-react';

interface TimeCardProps {
  cities: string[];
  offset: string;
  currentTime: string;
  minutesTo5PM: number;
}

export const TimeCard: React.FC<TimeCardProps> = ({
  cities,
  offset,
  currentTime,
  minutesTo5PM,
}) => {
  const formattedOffset = parseFloat(offset) >= 0 
    ? `GMT+${offset}` 
    : `GMT${offset}`;

  const minutesText = Math.abs(minutesTo5PM) === 0
    ? "It's exactly 5:00 PM"
    : minutesTo5PM > 0
    ? `${Math.abs(minutesTo5PM)} minutes until 5:00 PM`
    : `${Math.abs(minutesTo5PM)} minutes since 5:00 PM`;

  return (
    <div className="backdrop-blur-md bg-white/80 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-full bg-blue-500/10">
          <Clock className="w-6 h-6 text-blue-500" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {cities.join(', ')}
          </h2>
          <p className="text-sm text-gray-500">{formattedOffset}</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <p className="text-3xl font-mono font-bold text-gray-900">
          {currentTime}
        </p>
        <p className="text-sm text-blue-600 font-medium">
          {minutesText}
        </p>
      </div>
    </div>
  );
};
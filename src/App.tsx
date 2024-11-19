import React, { useState, useEffect } from 'react';
import { AnalogClock } from './components/AnalogClock';
import { TimeCard } from './components/TimeCard';
import { findClosestTo5PM, getTimeForOffset } from './utils/timezones';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [closest5PM, setClosest5PM] = useState(findClosestTo5PM());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setClosest5PM(findClosestTo5PM());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const localTime = getTimeForOffset(parseFloat(closest5PM.offset));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col items-center justify-center space-y-8">
          <h1 className="text-2xl font-semibold text-gray-800 text-center">
            World Clock
          </h1>
          
          <div className="relative p-8">
            <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full" />
            <div className="relative transform hover:scale-105 transition-transform duration-300">
              <AnalogClock time={localTime} />
            </div>
          </div>

          <div className="w-full transform hover:scale-102 transition-transform duration-300">
            <TimeCard
              cities={closest5PM.cities}
              offset={closest5PM.offset}
              currentTime={closest5PM.currentTime}
              minutesTo5PM={closest5PM.minutesTo5PM}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
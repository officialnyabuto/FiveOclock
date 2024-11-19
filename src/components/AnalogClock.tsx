import React, { useEffect, useState } from 'react';

interface AnalogClockProps {
  time: Date;
}

export const AnalogClock: React.FC<AnalogClockProps> = ({ time: propTime }) => {
  const [time, setTime] = useState(propTime);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setTime(new Date(propTime.getTime()));
    });
    return () => cancelAnimationFrame(frame);
  }, [propTime]);

  const milliseconds = time.getMilliseconds();
  const seconds = (time.getSeconds() * 1000 + milliseconds) / 1000;
  const minutes = (time.getMinutes() * 60 + seconds) / 60;
  const hours = ((time.getHours() % 12) * 60 + minutes) / 60;

  const secondDegrees = seconds * 6;
  const minuteDegrees = minutes * 6;
  const hourDegrees = hours * 30;

  return (
    <div className="relative w-64 h-64 rounded-full bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-[inset_0_2px_15px_rgba(0,0,0,0.1)] border border-gray-100">
      {/* Minute markers */}
      {[...Array(60)].map((_, i) => (
        <div
          key={i}
          className={`absolute left-1/2 -translate-x-1/2 ${
            i % 5 === 0 ? 'h-4 w-1' : 'h-2 w-0.5'
          } bg-gray-300`}
          style={{
            top: '12px',
            transformOrigin: '50% 120px',
            transform: `rotate(${i * 6}deg)`,
          }}
        />
      ))}

      {/* Hour markers */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute left-1/2 -translate-x-1/2 h-5 w-1.5"
          style={{
            top: '12px',
            background: 'linear-gradient(to bottom, #4B5563, #6B7280)',
            borderRadius: '1px',
            transformOrigin: '50% 120px',
            transform: `rotate(${i * 30}deg)`,
          }}
        />
      ))}

      {/* Hour hand */}
      <div
        className="absolute left-1/2 top-1/2 w-2 h-[28%] rounded-full origin-bottom bg-gradient-to-b from-gray-800 to-gray-600 transition-transform duration-100"
        style={{
          transform: `translate(-50%, -100%) rotate(${hourDegrees}deg)`,
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}
      />

      {/* Minute hand */}
      <div
        className="absolute left-1/2 top-1/2 w-1.5 h-[38%] rounded-full origin-bottom bg-gradient-to-b from-gray-700 to-gray-500 transition-transform duration-75"
        style={{
          transform: `translate(-50%, -100%) rotate(${minuteDegrees}deg)`,
          boxShadow: '0 0 8px rgba(0,0,0,0.1)',
        }}
      />

      {/* Second hand */}
      <div
        className="absolute left-1/2 top-1/2 w-1 h-[42%] rounded-full origin-bottom bg-gradient-to-b from-red-500 to-red-600"
        style={{
          transform: `translate(-50%, -100%) rotate(${secondDegrees}deg)`,
          transition: 'transform 0.1s cubic-bezier(0.4, 2.08, 0.55, 0.44)',
        }}
      />

      {/* Center pieces */}
      <div className="absolute left-1/2 top-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 shadow-sm" />
      <div className="absolute left-1/2 top-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500" />
    </div>
  );
};
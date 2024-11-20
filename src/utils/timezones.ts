export const timezoneData: Record<string, string[]> = {
  '-12': ['Baker Island'],
  '-11': ['American Samoa', 'Niue'],
  '-10': ['Hawaii', 'Cook Islands'],
  '-9.5': ['Marquesas Islands'],
  '-9': ['Alaska'],
  '-8': ['Los Angeles', 'Vancouver'],
  '-7': ['Denver', 'Phoenix'],
  '-6': ['Chicago', 'Mexico City'],
  '-5': ['New York', 'Toronto'],
  '-4.5': ['Caracas'],
  '-4': ['Halifax', 'Santiago'],
  '-3.5': ["St. John's"],
  '-3': ['São Paulo', 'Buenos Aires'],
  '-2': ['South Georgia Islands'],
  '-1': ['Cape Verde', 'Azores'],
  '0': ['London', 'Dublin', 'Lisbon'],
  '1': ['Paris', 'Berlin', 'Rome'],
  '2': ['Cairo', 'Athens', 'Jerusalem'],
  '3': ['Nairobi', 'Moscow', 'Istanbul', 'Riyadh'],
  '3.5': ['Tehran'],
  '4': ['Dubai', 'Baku'],
  '4.5': ['Kabul'],
  '5': ['Karachi', 'Tashkent'],
  '5.5': ['New Delhi', 'Mumbai'],
  '5.75': ['Kathmandu'],
  '6': ['Dhaka', 'Almaty'],
  '6.5': ['Yangon'],
  '7': ['Bangkok', 'Jakarta'],
  '8': ['Singapore', 'Beijing', 'Hong Kong'],
  '8.75': ['Eucla'],
  '9': ['Tokyo', 'Seoul'],
  '9.5': ['Adelaide', 'Darwin'],
  '10': ['Sydney', 'Melbourne'],
  '10.5': ['Lord Howe Island'],
  '11': ['Solomon Islands', 'New Caledonia'],
  '12': ['Auckland', 'Fiji'],
  '12.75': ['Chatham Islands'],
  '13': ['Samoa', 'Tonga'],
  '14': ['Line Islands', 'Kiritimati']
};

export const getTimeForOffset = (offset: number): Date => {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + offset * 3600000);
};

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

export const getMinutesTo5PM = (date: Date): number => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const totalMinutes = hours * 60 + minutes;
  const target = 17 * 60; // 5 PM in minutes
  let diff = target - totalMinutes;
  
  if (diff > 720) diff -= 1440; // More than 12 hours ahead, subtract 24 hours
  if (diff <= -720) diff += 1440; // More than 12 hours behind, add 24 hours
  
  return diff;
};

export const findClosestTo5PM = (): { 
  offset: string; 
  cities: string[]; 
  minutesTo5PM: number;
  currentTime: string;
} => {
  let closestOffset = '0';
  let minDifference = Infinity;
  
  Object.entries(timezoneData).forEach(([offset, cities]) => {
    const time = getTimeForOffset(parseFloat(offset));
    const diff = Math.abs(getMinutesTo5PM(time));
    
    if (diff < minDifference) {
      minDifference = diff;
      closestOffset = offset;
    }
  });
  
  const time = getTimeForOffset(parseFloat(closestOffset));
  
  return {
    offset: closestOffset,
    cities: timezoneData[closestOffset],
    minutesTo5PM: getMinutesTo5PM(time),
    currentTime: formatTime(time)
  };
};

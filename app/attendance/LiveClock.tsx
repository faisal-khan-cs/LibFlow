'use client';
import { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';

export default function LiveClock() {
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    // Har 1 second baad time update karne ka timer
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    

    // Jab component band ho to timer ko khatam karna (Memory leak se bachne ke liye)
    return () => clearInterval(timer);
  }, []);
  if (!mounted) {
    return <div className="h-10 w-48 bg-slate-50 animate-pulse rounded-2xl" />; 
  }

  // Time format: 10:45:02 AM
  const formattedTime = time.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });

  // Date format: Saturday, May 09
  const formattedDate = time.toLocaleDateString([], { 
    weekday: 'long', 
    month: 'long', 
    day: '2-digit' 
  });

  return (
    <div className="flex items-center gap-6 bg-white/50 backdrop-blur-sm border border-slate-100 px-6 py-3 rounded-2xl shadow-sm">
      {/* Date Part */}
      <div className="flex items-center gap-2 text-slate-500 border-r border-slate-200 pr-6">
        <Calendar size={16} className="text-indigo-500" />
        <span className="text-sm font-bold tracking-tight">{formattedDate}</span>
      </div>

      {/* Time Part */}
      <div className="flex items-center gap-2 text-slate-800">
        <Clock size={16} className="text-indigo-500" />
        <span className="text-sm font-black tabular-nums">{formattedTime}</span>
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RefreshCw, Flag } from 'lucide-react';
import { cn } from '@/lib/utils';

// Helper function to format time
const formatTime = (time: number) => {
  const milliseconds = `0${Math.floor(time % 1000) / 10}`.slice(-2);
  const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
  const minutes = `0${Math.floor((time / 60000) % 60)}`.slice(-2);
  return { minutes, seconds, milliseconds };
};

export function TimerStopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now() - time;
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, time]);

  const handleStartPause = () => setIsRunning(!isRunning);
  const handleReset = useCallback(() => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  }, []);
  const handleLap = useCallback(() => {
    if (isRunning) setLaps(prevLaps => [time, ...prevLaps]);
  }, [isRunning, time]);

  const { minutes, seconds, milliseconds } = formatTime(time);

  const lapData = useMemo(() => {
    if (laps.length === 0) return [];
    const currentLapTime = time - (laps[0] || 0);
    
    const lapDiffs = laps.map((lap, i) => {
        const prevLap = laps[i + 1] || 0;
        return lap - prevLap;
    });

    if (lapDiffs.length < 2) return [{diff: currentLapTime, type: 'normal'}, ...lapDiffs.map(diff => ({ diff, type: 'normal' }))];
    
    const completedLaps = lapDiffs.slice(0, lapDiffs.length);
    const minLap = Math.min(...completedLaps);
    const maxLap = Math.max(...completedLaps);
    
    return [
        { diff: currentLapTime, type: 'normal' },
        ...lapDiffs.map(diff => ({
            diff,
            type: diff === minLap ? 'fastest' : diff === maxLap ? 'slowest' : 'normal'
        }))
    ];
  }, [laps, time, isRunning]);


  return (
    <Card className="w-full max-w-md mx-auto shadow-none bg-transparent border-0">
      <CardContent className="p-4 sm:p-6 flex flex-col items-center justify-center space-y-8">
        {/* Time Display */}
        <div className="w-full text-center">
          <p className="text-8xl font-light font-mono tracking-tighter text-zinc-900 dark:text-zinc-50">
            <span>{minutes}</span>
            <span className="text-zinc-400 dark:text-zinc-500">:</span>
            <span>{seconds}</span>
            <span className="text-6xl text-zinc-400 dark:text-zinc-500">.{milliseconds}</span>
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center w-full max-w-xs">
          <Button onClick={handleReset} variant="outline" className="w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-800 border-0 disabled:opacity-50" disabled={time === 0 && !isRunning}>
            <RefreshCw size={24} />
          </Button>
          <Button 
            onClick={handleStartPause}
            className={cn("w-24 h-24 rounded-full text-white shadow-lg transition-all", isRunning ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600")}>
            {isRunning ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
          </Button>
          <Button onClick={handleLap} variant="outline" className="w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-800 border-0 disabled:opacity-50" disabled={!isRunning}>
            <Flag size={24} />
          </Button>
        </div>

        {/* Laps List */}
        {laps.length > 0 && (
          <div className="w-full space-y-2 pt-4 border-t border-zinc-200 dark:border-zinc-700">
            <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {lapData.map((lap, index) => (
                <li key={index} className="flex justify-between items-baseline text-lg px-2 py-1 rounded-md">
                  <span className="font-medium text-zinc-500">Lap {laps.length - index}</span>
                  <span className={cn("font-mono",
                      lap.type === 'fastest' && 'text-green-500',
                      lap.type === 'slowest' && 'text-red-500',
                  )}>
                    {formatTime(lap.diff).minutes}:{formatTime(lap.diff).seconds}.{formatTime(lap.diff).milliseconds}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
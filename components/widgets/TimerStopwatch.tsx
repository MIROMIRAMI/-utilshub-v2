"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Play, Pause, RefreshCw, Flag } from 'lucide-react';

const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((time % 60000) / 1000).toString().padStart(2, '0');
    const milliseconds = Math.floor((time % 1000) / 10).toString().padStart(2, '0');
    return `${minutes}:${seconds}.${milliseconds}`;
};

const Stopwatch = () => {
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
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isRunning]);

    const handleStartStop = () => setIsRunning(!isRunning);
    const handleLap = () => { if (isRunning) setLaps(prev => [...prev, time]); };
    const handleReset = () => { setIsRunning(false); setTime(0); setLaps([]); };

    return (
        <div className="flex flex-col items-center space-y-6 p-4">
            <div className="font-mono text-7xl tracking-tighter w-full text-center bg-muted p-4 rounded-lg">{formatTime(time)}</div>
            <div className="flex gap-4">
                <Button onClick={handleReset} variant="destructive" className="w-24"><RefreshCw className="mr-2 h-4 w-4"/>Reset</Button>
                <Button onClick={handleStartStop} className="w-36 text-lg">{isRunning ? <><Pause className="mr-2 h-5 w-5"/>Pause</> : <><Play className="mr-2 h-5 w-5"/>Start</>}</Button>
                <Button onClick={handleLap} variant="outline" className="w-24" disabled={!isRunning}><Flag className="mr-2 h-4 w-4"/>Lap</Button>
            </div>
            <div className="w-full h-48 overflow-y-auto space-y-2 border p-2 rounded-lg">
                {laps.map((lap, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                        <span className="font-semibold">Lap {index + 1}</span>
                        <span className="font-mono">{formatTime(lap)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Timer = () => {
    const [initialTime, setInitialTime] = useState({ h: '0', m: '5', s: '0' });
    const [timeLeft, setTimeLeft] = useState(300);
    const [isRunning, setIsRunning] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const totalSeconds = useMemo(() => {
        const h = parseInt(initialTime.h) || 0;
        const m = parseInt(initialTime.m) || 0;
        const s = parseInt(initialTime.s) || 0;
        return (h * 3600) + (m * 60) + s;
    }, [initialTime]);

    useEffect(() => {
        if (!isRunning) setTimeLeft(totalSeconds);
    }, [totalSeconds, isRunning]);

    useEffect(() => {
        if (!isRunning || timeLeft <= 0) return;
        const intervalId = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [isRunning, timeLeft]);
    
    useEffect(() => {
        if (timeLeft === 0 && isRunning) {
            setIsRunning(false);
            audioRef.current?.play().catch(e => console.error("Audio play failed:", e));
        }
    }, [timeLeft, isRunning]);

    const handleStartStop = () => setIsRunning(!isRunning);
    const handleReset = () => { setIsRunning(false); setTimeLeft(totalSeconds); };
    const handleInputChange = (unit: 'h' | 'm' | 's', value: string) => {
        const numValue = parseInt(value) || 0;
        if (numValue >= 0) setInitialTime(prev => ({ ...prev, [unit]: value }));
    };

    const displayMinutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const displaySeconds = (timeLeft % 60).toString().padStart(2, '0');

    return (
        <div className="flex flex-col items-center space-y-6 p-4">
            <audio ref={audioRef} src="/notification.mp3.mp3" preload="auto" />
            <div className="font-mono text-8xl tracking-tighter w-full text-center">{`${displayMinutes}:${displaySeconds}`}</div>
            <div className="flex gap-4">
                <Button onClick={handleReset} variant="destructive" className="w-24"><RefreshCw className="mr-2 h-4 w-4"/>Reset</Button>
                <Button onClick={handleStartStop} className="w-36 text-lg">{isRunning ? <><Pause className="mr-2 h-5 w-5"/>Pause</> : <><Play className="mr-2 h-5 w-5"/>Start</>}</Button>
            </div>
            <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Label>Set Time:</Label>
                <Input type="number" value={initialTime.h} onChange={e => handleInputChange('h', e.target.value)} className="w-20" aria-label="Hours" />
                <span>:</span>
                <Input type="number" value={initialTime.m} onChange={e => handleInputChange('m', e.target.value)} className="w-20" aria-label="Minutes" />
                <span>:</span>
                <Input type="number" value={initialTime.s} onChange={e => handleInputChange('s', e.target.value)} className="w-20" aria-label="Seconds" />
            </div>
        </div>
    );
};

export function TimerStopwatch() {
    return (
        <Card className="w-full max-w-lg mx-auto shadow-xl shadow-gray-300/20 rounded-2xl border">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight">Timer & Stopwatch</CardTitle>
                <CardDescription className="text-lg pt-1">Precise timing for your needs.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="stopwatch" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="stopwatch">Stopwatch</TabsTrigger>
                        <TabsTrigger value="timer">Timer</TabsTrigger>
                    </TabsList>
                    <TabsContent value="stopwatch" className="pt-6"><Stopwatch /></TabsContent>
                    <TabsContent value="timer" className="pt-6"><Timer /></TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
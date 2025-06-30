"use client";

import { useState, useMemo, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button, buttonVariants } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from '@/lib/utils';
import { PlusCircle, X } from 'lucide-react';

// --- Sub-component 1: Age Calculator ---
const AgeCalculator = () => {
    const [birthDate, setBirthDate] = useState("1990-06-15");
    const age = useMemo(() => {
        if (!birthDate) return null;
        const today = new Date();
        const dob = new Date(birthDate);
        let years = today.getFullYear() - dob.getFullYear();
        let months = today.getMonth() - dob.getMonth();
        let days = today.getDate() - dob.getDate();

        if (months < 0 || (months === 0 && days < 0)) {
            years--;
            months += 12;
        }
        if (days < 0) {
            months--;
            const prevMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
            days += prevMonthLastDay;
        }
        if (months < 0) {
            months += 12;
            years--;
        }
        return { years, months, days };
    }, [birthDate]);

    return (
        <div className="p-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div><Label htmlFor="birthdate">Your Date of Birth</Label><Input id="birthdate" type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} className="h-12 text-lg" /></div>
                </div>
                {age && (<div className="flex items-center justify-center text-center bg-muted p-6 rounded-lg"><div className="grid grid-cols-3 gap-4 w-full"><div><p className="text-4xl font-bold text-primary">{age.years}</p><p className="text-sm text-muted-foreground">Years</p></div><div><p className="text-4xl font-bold text-primary">{age.months}</p><p className="text-sm text-muted-foreground">Months</p></div><div><p className="text-4xl font-bold text-primary">{age.days}</p><p className="text-sm text-muted-foreground">Days</p></div></div></div>)}
            </div>
        </div>
    );
};

// --- Sub-component 2: Countdown Timer ---
const CountdownTimer = () => {
    const [targetDate, setTargetDate] = useState(() => { const nextYear = new Date().getFullYear() + 1; return `${nextYear}-01-01T00:00`; });
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        if (!targetDate) return;
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const target = new Date(targetDate).getTime();
            const difference = target - now;
            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                clearInterval(timer);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="p-2">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div><Label htmlFor="targetdate">Countdown Target</Label><Input id="targetdate" type="datetime-local" value={targetDate} onChange={e => setTargetDate(e.target.value)} className="h-12 text-lg" /></div>
                </div>
                <div className="flex items-center justify-center text-center bg-muted p-6 rounded-lg">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                        <div><p className="text-4xl font-bold text-primary">{timeLeft.days}</p><p className="text-sm text-muted-foreground">Days</p></div>
                        <div><p className="text-4xl font-bold text-primary">{timeLeft.hours}</p><p className="text-sm text-muted-foreground">Hours</p></div>
                        <div><p className="text-4xl font-bold text-primary">{timeLeft.minutes}</p><p className="text-sm text-muted-foreground">Minutes</p></div>
                        <div><p className="text-4xl font-bold text-primary">{timeLeft.seconds}</p><p className="text-sm text-muted-foreground">Seconds</p></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Sub-component 3: Date Calculator ---
const DateCalculator = () => {
    const [mode, setMode] = useState<'difference' | 'add'>('difference');
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(() => { const today = new Date(); today.setMonth(today.getMonth() + 1); return today.toISOString().split('T')[0]; });
    const [fromDate, setFromDate] = useState(new Date().toISOString().split('T')[0]);
    const [years, setYears] = useState(0);
    const [months, setMonths] = useState(0);
    const [days, setDays] = useState(10);
    const [operation, setOperation] = useState<'add' | 'subtract'>('add');

    const differenceResult = useMemo(() => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;
        if (end < start) return { years: 0, months: 0, days: 0, totalDays: 0, error: 'End date must be after start date.'};
        let yearDiff = end.getFullYear() - start.getFullYear();
        let monthDiff = end.getMonth() - start.getMonth();
        let dayDiff = end.getDate() - start.getDate();
        if (dayDiff < 0) {
            monthDiff--;
            dayDiff += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
        }
        if (monthDiff < 0) {
            yearDiff--;
            monthDiff += 12;
        }
        const totalDays = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        return { years: yearDiff, months: monthDiff, days: dayDiff, totalDays, error: null };
    }, [startDate, endDate]);

    const addSubtractResult = useMemo(() => {
        const date = new Date(`${fromDate}T00:00:00`);
        if (isNaN(date.getTime())) return 'Invalid Date';
        const sign = operation === 'add' ? 1 : -1;
        if (years !== 0) date.setFullYear(date.getFullYear() + (years * sign));
        if (months !== 0) date.setMonth(date.getMonth() + (months * sign));
        if (days !== 0) date.setDate(date.getDate() + (days * sign));
        return date.toLocaleDateString('en-CA');
    }, [fromDate, years, months, days, operation]);

    return (
        <div className="p-2">
            <RadioGroup defaultValue="difference" onValueChange={(v: 'difference' | 'add') => setMode(v)} className="mb-4 flex flex-wrap gap-4">
                <div className="flex items-center space-x-2"><RadioGroupItem value="difference" id="r1" /><Label htmlFor="r1">Difference Between Dates</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="add" id="r2" /><Label htmlFor="r2">Add / Subtract from Date</Label></div>
            </RadioGroup>
            <div className="border-t my-4"></div>
            {mode === 'difference' && (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div><Label>Start Date</Label><Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} /></div>
                        <div><Label>End Date</Label><Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} /></div>
                    </div>
                    {differenceResult && !differenceResult.error && <div className="p-4 bg-muted rounded-lg text-center"><p className="text-sm text-muted-foreground">Difference is</p><p className="text-xl font-bold">{differenceResult.years} years, {differenceResult.months} months, {differenceResult.days} days ({differenceResult.totalDays.toLocaleString()} total days)</p></div>}
                    {differenceResult?.error && <p className="text-red-500 text-sm text-center">{differenceResult.error}</p>}
                </div>
            )}
            {mode === 'add' && (
                 <div className="space-y-4">
                    <div><Label>Start From Date</Label><Input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} /></div>
                    <div className="grid grid-cols-3 gap-2">
                        <div><Label>Years</Label><Input type="number" value={years} onChange={e => setYears(Number(e.target.value))} /></div>
                        <div><Label>Months</Label><Input type="number" value={months} onChange={e => setMonths(Number(e.target.value))} /></div>
                        <div><Label>Days</Label><Input type="number" value={days} onChange={e => setDays(Number(e.target.value))} /></div>
                    </div>
                    <RadioGroup defaultValue="add" onValueChange={(v: 'add' | 'subtract') => setOperation(v)} className="flex space-x-4">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="add" id="op1" /><Label htmlFor="op1">Add</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="subtract" id="op2" /><Label htmlFor="op2">Subtract</Label></div>
                    </RadioGroup>
                    <div className="p-4 bg-muted rounded-lg text-center"><p className="text-sm text-muted-foreground">Resulting Date</p><p className="text-2xl font-bold">{addSubtractResult}</p></div>
                </div>
            )}
        </div>
    );
};

// --- Sub-component 4: Timezone Converter ---
const TimezoneConverter = () => {
    const [timezones, setTimezones] = useState<string[]>([]);
    const [sourceDate, setSourceDate] = useState(() => new Date().toISOString().slice(0, 16));
    const [sourceTz, setSourceTz] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const [targetTz, setTargetTz] = useState('Europe/London');

    useEffect(() => {
        if (typeof Intl.supportedValuesOf === 'function') {
            setTimezones(Intl.supportedValuesOf('timeZone'));
        } else {
            setTimezones(['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo', 'Australia/Sydney']);
        }
    }, []);
    
    const convertedTime = useMemo(() => {
        if (!sourceDate || !sourceTz || !targetTz) return '...';
        try {
            const dateInSourceTz = new Date(sourceDate);
            return new Intl.DateTimeFormat('en-US', {
                year: 'numeric', month: 'long', day: 'numeric',
                hour: '2-digit', minute: '2-digit', second: '2-digit',
                timeZone: targetTz,
                hour12: false
            }).format(dateInSourceTz);
        } catch (e) {
            return 'Invalid Date or Timezone';
        }
    }, [sourceDate, sourceTz, targetTz]);

    return (
        <div className="p-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-4">
                    <div><Label>Date & Time</Label><Input type="datetime-local" value={sourceDate} onChange={e => setSourceDate(e.target.value)} /></div>
                    <div><Label>From Timezone</Label><Select value={sourceTz} onValueChange={setSourceTz}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent className="max-h-60">{timezones.map(tz => <SelectItem key={tz} value={tz}>{tz}</SelectItem>)}</SelectContent></Select></div>
                    <div><Label>To Timezone</Label><Select value={targetTz} onValueChange={setTargetTz}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent className="max-h-60">{timezones.map(tz => <SelectItem key={tz} value={tz}>{tz}</SelectItem>)}</SelectContent></Select></div>
                </div>
                <div className="flex items-center justify-center text-center bg-muted p-6 rounded-lg">
                    <div>
                        <p className="text-sm text-muted-foreground">Converted Time</p>
                        <p className="text-2xl font-bold text-primary">{convertedTime}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Sub-component 5: World Clock ---
const WorldClock = () => {
    type City = { name: string, tz: string };
    
    const defaultCities: City[] = [
        { name: 'New York', tz: 'America/New_York' }, { name: 'London', tz: 'Europe/London' },
        { name: 'Tokyo', tz: 'Asia/Tokyo' }, { name: 'Sydney', tz: 'Australia/Sydney' },
    ];

    const [time, setTime] = useState(new Date());
    const [cities, setCities] = useState<City[]>(defaultCities);
    const [allTimezones, setAllTimezones] = useState<string[]>([]);
    const [isAddOpen, setAddOpen] = useState(false);

    useEffect(() => {
        try {
            const savedCities = localStorage.getItem('worldClockCities');
            if (savedCities) {
                setCities(JSON.parse(savedCities));
            }
        } catch (error) {
            console.error("Failed to parse cities from localStorage", error);
            setCities(defaultCities);
        }
        if (typeof Intl.supportedValuesOf === 'function') {
            setAllTimezones(Intl.supportedValuesOf('timeZone'));
        }
    }, []);

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    const addCity = (tz: string) => {
        if (!tz || cities.some(c => c.tz === tz)) return;
        const name = tz.split('/').pop()?.replace(/_/g, ' ') || tz;
        const newCities = [...cities, { name, tz }];
        setCities(newCities);
        localStorage.setItem('worldClockCities', JSON.stringify(newCities));
        setAddOpen(false);
    };

    const removeCity = (tzToRemove: string) => {
        const newCities = cities.filter(c => c.tz !== tzToRemove);
        setCities(newCities);
        localStorage.setItem('worldClockCities', JSON.stringify(newCities));
    };

    const formatTime = (tz: string) => time.toLocaleTimeString('en-US', { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    const formatDate = (tz: string) => time.toLocaleDateString('en-US', { timeZone: tz, weekday: 'short', month: 'short', day: 'numeric' });

    return (
        <div className="p-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cities.map(city => (
                    <div key={city.tz} className="p-4 bg-muted rounded-lg flex items-center justify-between group">
                        <div>
                            <p className="font-semibold text-lg">{city.name}</p>
                            <p className="text-sm text-muted-foreground">{formatDate(city.tz)}</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <p className="font-mono text-2xl font-bold">{formatTime(city.tz)}</p>
                             <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeCity(city.tz)}>
                                 <X className="h-4 w-4"/>
                             </Button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center pt-4">
                <Popover open={isAddOpen} onOpenChange={setAddOpen}>
                    <PopoverTrigger className={cn(buttonVariants({ variant: "outline" }), "flex items-center")}>
                         <PlusCircle className="mr-2 h-4 w-4" />
                         <span>Add City</span>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                        <Command>
                            <CommandInput placeholder="Search timezone..." />
                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup>
                                    {allTimezones.map(tz => (
                                        <CommandItem key={tz} value={tz} onSelect={() => addCity(tz)}>
                                            {tz}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
};

// --- Main Hub Component ---
export function DateTimeHub() {
    return (
        <Card className="w-full max-w-4xl mx-auto shadow-xl shadow-gray-300/20 rounded-2xl border">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight">Date & Time Tools</CardTitle>
                <CardDescription className="text-lg pt-1">Calculate ages, countdowns, and time differences.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="age-calculator" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto">
                        <TabsTrigger value="age-calculator">Age</TabsTrigger>
                        <TabsTrigger value="countdown">Countdown</TabsTrigger>
                        <TabsTrigger value="date-calculator">Date Calc</TabsTrigger>
                        <TabsTrigger value="timezone">Timezone</TabsTrigger>
                        <TabsTrigger value="world-clock">World Clock</TabsTrigger>
                    </TabsList>
                    <div className="pt-6">
                        <TabsContent value="age-calculator"><AgeCalculator /></TabsContent>
                        <TabsContent value="countdown"><CountdownTimer /></TabsContent>
                        <TabsContent value="date-calculator"><DateCalculator /></TabsContent>
                        <TabsContent value="timezone"><TimezoneConverter /></TabsContent>
                        <TabsContent value="world-clock"><WorldClock /></TabsContent>
                    </div>
                </Tabs>
            </CardContent>
        </Card>
    );
}
"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { Route, Timer as TimerIcon, Dumbbell, Repeat } from 'lucide-react';

// --- BMR Calculator Component ---
const BmrCalculator = ({ gender, setGender, age, setAge, weight, setWeight, height, setHeight, bmr }: any) => {
    return (
        <div className="space-y-4 p-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Gender</Label><Select value={gender} onValueChange={setGender}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent></Select></div>
                <div className="space-y-2"><Label htmlFor="age">Age</Label><Input id="age" type="number" value={age} onChange={e => setAge(Number(e.target.value))} /></div>
                <div className="space-y-2"><Label htmlFor="weight">Weight (kg)</Label><Input id="weight" type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} /></div>
                <div className="space-y-2"><Label htmlFor="height">Height (cm)</Label><Input id="height" type="number" value={height} onChange={e => setHeight(Number(e.target.value))} /></div>
            </div>
            <div className="mt-6 text-center bg-blue-500 text-white p-4 rounded-lg"><p className="text-sm opacity-80">Basal Metabolic Rate (BMR)</p><p className="text-3xl font-bold tracking-tight">{bmr.toFixed(0)} Calories/day</p><p className="text-xs opacity-80 mt-1">Energy needed for your body at rest.</p></div>
        </div>
    );
};

// --- Daily Calorie Needs Calculator Component ---
const CalorieCalculator = ({ bmr }: { bmr: number }) => {
    const [activityLevel, setActivityLevel] = useState(1.375);
    const activityFactors = [
        { label: 'Sedentary (office job)', value: 1.2 }, { label: 'Light Exercise (1-2 days/wk)', value: 1.375 },
        { label: 'Moderate Exercise (3-5 days/wk)', value: 1.55 }, { label: 'Heavy Exercise (6-7 days/wk)', value: 1.725 },
        { label: 'Athlete (2x per day)', value: 1.9 },
    ];
    const maintenanceCalories = useMemo(() => bmr * activityLevel, [bmr, activityLevel]);
    if (bmr === 0) return <div className="p-4 text-center text-muted-foreground">Please calculate your BMR first.</div>;
    return (
        <div className="space-y-4 p-2">
            <div><Label>Activity Level</Label><Select value={String(activityLevel)} onValueChange={(val) => setActivityLevel(Number(val))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{activityFactors.map(factor => <SelectItem key={factor.value} value={String(factor.value)}>{factor.label}</SelectItem>)}</SelectContent></Select></div>
            <div className="mt-6 space-y-3">
                <div className="text-center bg-green-600 text-white p-4 rounded-lg"><p className="text-sm opacity-80">Maintenance Calories</p><p className="text-3xl font-bold tracking-tight">{maintenanceCalories.toFixed(0)} Calories/day</p></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-center">
                    <div className="bg-yellow-500 text-white p-3 rounded-lg"><p className="text-xs opacity-80">For Weight Loss</p><p className="text-xl font-bold">~{(maintenanceCalories - 500).toFixed(0)}</p></div>
                    <div className="bg-purple-500 text-white p-3 rounded-lg"><p className="text-xs opacity-80">For Weight Gain</p><p className="text-xl font-bold">~{(maintenanceCalories + 500).toFixed(0)}</p></div>
                </div>
            </div>
        </div>
    );
};

// --- Body Fat Calculator Component ---
const BodyFatCalculator = ({ gender, height, neck, setNeck, waist, setWaist, hip, setHip }: any) => {
    const bodyFatPercentage = useMemo(() => {
        if (!height || !neck || !waist || (gender === 'female' && !hip)) return 0;
        if (gender === 'male') return 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
        return 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
    }, [gender, height, neck, waist, hip]);
    return (
        <div className="space-y-4 p-2">
            <p className="text-sm text-center text-muted-foreground">Based on the U.S. Navy formula. Please use a measuring tape.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="neck">Neck (cm)</Label><Input id="neck" type="number" placeholder="e.g., 38" value={neck} onChange={e => setNeck(Number(e.target.value))} /></div>
                <div className="space-y-2"><Label htmlFor="waist">Waist (cm)</Label><Input id="waist" type="number" placeholder="e.g., 85" value={waist} onChange={e => setWaist(Number(e.target.value))} /></div>
                {gender === 'female' && (<motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }} className="space-y-2 sm:col-span-2"><Label htmlFor="hip">Hip (cm)</Label><Input id="hip" type="number" placeholder="e.g., 97" value={hip} onChange={e => setHip(Number(e.target.value))} /></motion.div>)}
            </div>
            <div className="mt-6 text-center bg-indigo-500 text-white p-4 rounded-lg"><p className="text-sm opacity-80">Estimated Body Fat</p><p className="text-3xl font-bold tracking-tight">{bodyFatPercentage > 0 ? bodyFatPercentage.toFixed(1) + '%' : '...'}</p></div>
        </div>
    );
};

// --- Pace Calculator Component ---
const PaceCalculator = () => {
    const [distance, setDistance] = useState('10'); const [hours, setHours] = useState('0'); const [minutes, setMinutes] = useState('55'); const [seconds, setSeconds] = useState('0'); const [unit, setUnit] = useState('km');
    const paceResult = useMemo(() => {
        const dist = parseFloat(distance); const h = parseInt(hours) || 0; const m = parseInt(minutes) || 0; const s = parseInt(seconds) || 0;
        if (!dist || dist <= 0) return { pace: '00:00', speed: '0.0' }; const totalTimeInSeconds = (h * 3600) + (m * 60) + s;
        if (totalTimeInSeconds === 0) return { pace: '00:00', speed: '0.0' }; const secondsPerUnit = totalTimeInSeconds / dist;
        const speed = dist / (totalTimeInSeconds / 3600); const paceMinutes = Math.floor(secondsPerUnit / 60); const paceSeconds = Math.round(secondsPerUnit % 60);
        return { pace: `${String(paceMinutes).padStart(2, '0')}:${String(paceSeconds).padStart(2, '0')}`, speed: speed.toFixed(2) };
    }, [distance, hours, minutes, seconds, unit]);
    return (
        <div className="space-y-4 p-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="distance" className="flex items-center"><Route className="w-4 h-4 mr-2" /> Distance</Label><div className="flex items-center gap-2"><Input id="distance" type="number" value={distance} onChange={e => setDistance(e.target.value)} /><Select value={unit} onValueChange={setUnit}><SelectTrigger className="w-[80px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="km">km</SelectItem><SelectItem value="miles">mi</SelectItem></SelectContent></Select></div></div>
                <div className="space-y-2"><Label className="flex items-center"><TimerIcon className="w-4 h-4 mr-2" /> Time</Label><div className="grid grid-cols-3 gap-2"><Input type="number" placeholder="hh" value={hours} onChange={e => setHours(e.target.value)} aria-label="Hours" /><Input type="number" placeholder="mm" value={minutes} onChange={e => setMinutes(e.target.value)} aria-label="Minutes" /><Input type="number" placeholder="ss" value={seconds} onChange={e => setSeconds(e.target.value)} aria-label="Seconds" /></div></div>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                <div className="bg-cyan-500 text-white p-4 rounded-lg"><p className="text-sm opacity-80">Pace</p><p className="text-3xl font-bold tracking-tight">{paceResult.pace} <span className="text-lg">/ {unit}</span></p></div>
                <div className="bg-sky-500 text-white p-4 rounded-lg"><p className="text-sm opacity-80">Speed</p><p className="text-3xl font-bold tracking-tight">{paceResult.speed} <span className="text-lg">{unit}/h</span></p></div>
            </div>
        </div>
    );
};

// --- One Rep Max Calculator Component ---
const OneRepMaxCalculator = () => {
    const [weight, setWeight] = useState('100'); const [reps, setReps] = useState('5');
    const oneRepMax = useMemo(() => {
        const w = parseFloat(weight); const r = parseInt(reps);
        if (!w || w <= 0 || !r || r <= 0) return 0; if (r === 1) return w;
        return w / (1.0278 - (0.0278 * r));
    }, [weight, reps]);
    const trainingZones = [
        { percentage: 95, reps: '2-3', goal: 'Max Strength' }, { percentage: 85, reps: '6-8', goal: 'Hypertrophy' },
        { percentage: 75, reps: '10-12', goal: 'Endurance' }, { percentage: 60, reps: '15+', goal: 'Muscular Stamina' },
    ];
    return (
        <div className="space-y-4 p-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="lift-weight" className="flex items-center"><Dumbbell className="w-4 h-4 mr-2" /> Weight Lifted (kg)</Label><Input id="lift-weight" type="number" placeholder="e.g., 100" value={weight} onChange={e => setWeight(e.target.value)} /></div>
                <div className="space-y-2"><Label htmlFor="reps" className="flex items-center"><Repeat className="w-4 h-4 mr-2" /> Repetitions</Label><Input id="reps" type="number" placeholder="e.g., 5" value={reps} onChange={e => setReps(e.target.value)} /></div>
            </div>
            <p className="text-xs text-center text-muted-foreground pt-2">Formula is most accurate for reps between 2-10.</p>
            <div className="mt-4 text-center bg-red-500 text-white p-4 rounded-lg"><p className="text-sm opacity-80">Estimated One-Rep Max (1RM)</p><p className="text-4xl font-bold tracking-tight">{oneRepMax.toFixed(1)} kg</p></div>
            {oneRepMax > 0 && (<div className="pt-4"><h3 className="text-center font-semibold mb-2">Training Zones based on your 1RM</h3><div className="space-y-2">{trainingZones.map(zone => (<div key={zone.percentage} className="grid grid-cols-3 items-center p-2 bg-muted rounded-md text-sm"><div className="font-bold">{zone.percentage}%</div><div className="text-center font-semibold text-primary">{ (oneRepMax * (zone.percentage / 100)).toFixed(1) } kg</div><div className="text-right text-muted-foreground">{zone.reps} reps ({zone.goal})</div></div>))}</div></div>)}
        </div>
    );
};

export function HealthHub() {
    // --- State lifted to the parent component ---
    const [gender, setGender] = useState('male'); const [age, setAge] = useState(30); const [weight, setWeight] = useState(70);
    const [height, setHeight] = useState(175); const [neck, setNeck] = useState(38); const [waist, setWaist] = useState(85); const [hip, setHip] = useState(97);
    const bmr = useMemo(() => {
        if (!age || !weight || !height) return 0; if (gender === 'male') return (10 * weight) + (6.25 * height) - (5 * age) + 5;
        return (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }, [gender, age, weight, height]);

    return (
        <Card className="w-full max-w-4xl mx-auto shadow-xl shadow-gray-300/20 rounded-2xl border">
            <CardHeader className="text-center"><CardTitle className="text-3xl md:text-4xl font-bold tracking-tight">Health & Fitness Hub</CardTitle><CardDescription className="text-lg pt-1">Your all-in-one suite for health and fitness calculations.</CardDescription></CardHeader>
            <CardContent>
                <Tabs defaultValue="bmr" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto"><TabsTrigger value="bmr" className="py-2">BMR</TabsTrigger><TabsTrigger value="calories" className="py-2">Calories</TabsTrigger><TabsTrigger value="body-fat" className="py-2">Body Fat</TabsTrigger><TabsTrigger value="pace" className="py-2">Pace</TabsTrigger><TabsTrigger value="one-rep-max" className="py-2">1-Rep Max</TabsTrigger></TabsList>
                    <div className="pt-6">
                        <TabsContent value="bmr"><BmrCalculator gender={gender} setGender={setGender} age={age} setAge={setAge} weight={weight} setWeight={setWeight} height={height} setHeight={setHeight} bmr={bmr} /></TabsContent>
                        <TabsContent value="calories"><CalorieCalculator bmr={bmr} /></TabsContent>
                        <TabsContent value="body-fat"><BodyFatCalculator gender={gender} height={height} neck={neck} setNeck={setNeck} waist={waist} setWaist={setWaist} hip={hip} setHip={setHip} /></TabsContent>
                        <TabsContent value="pace"><PaceCalculator /></TabsContent>
                        <TabsContent value="one-rep-max"><OneRepMaxCalculator /></TabsContent>
                    </div>
                </Tabs>
            </CardContent>
        </Card>
    );
}
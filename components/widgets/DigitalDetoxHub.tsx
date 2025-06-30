"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Play, Pause, RefreshCw, Trash2, Wind, Settings, Target, Plus, TrendingUp, CheckCircle2, BellPlus, History, Clock, BellRing } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// --- Sub-component 1: Pomodoro Timer ---
const PomodoroTimer = () => { /* ... Same as before ... */ };
// --- Sub-component 2: To-Do List ---
const TaskList = () => { /* ... Same as before ... */ };
// --- Sub-component 3: Breathing Exercise ---
const BreathingExercise = () => { /* ... Same as before ... */ };
// --- Sub-component 4: Goal Tracker ---
const GoalTracker = () => { /* ... Same as before ... */ };
// --- Sub-component 5: Analytics Dashboard ---
const AnalyticsDashboard = () => { /* ... Same as before ... */ };

// --- UPGRADED Sub-component 6: Gentle Nudges & Reminders ---
const GentleReminders = () => { type Reminder = { id: number; text: string; type: 'once' | 'recurring'; time?: string; interval?: number; lastNotified?: number; notified?: boolean; }; const [reminders, setReminders] = useState<Reminder[]>([]); const [reminderType, setReminderType] = useState<'once' | 'recurring'>('once'); const [newReminderText, setNewReminderText] = useState('Time for a 5-min break!'); const [newReminderTime, setNewReminderTime] = useState(''); const [newReminderInterval, setNewReminderInterval] = useState(30); useEffect(() => { try { const saved = localStorage.getItem('gentleReminders'); if (saved) setReminders(JSON.parse(saved)); } catch (e) { console.error("Could not load reminders from localStorage.", e); } }, []); useEffect(() => { localStorage.setItem('gentleReminders', JSON.stringify(reminders)); }, [reminders]); useEffect(() => { const checkReminders = () => { const now = Date.now(); const todayStr = new Date().toDateString(); setReminders(prevReminders => prevReminders.map(reminder => { let shouldNotify = false; let updatedReminder = { ...reminder }; if (reminder.type === 'once' && !reminder.notified && reminder.time) { const reminderTime = new Date(`${todayStr} ${reminder.time}`).getTime(); if (reminderTime <= now) { shouldNotify = true; updatedReminder.notified = true; } } else if (reminder.type === 'recurring' && reminder.interval && reminder.lastNotified) { if (now >= reminder.lastNotified + (reminder.interval * 60 * 1000)) { shouldNotify = true; updatedReminder.lastNotified = now; } } if (shouldNotify && Notification.permission === "granted") { new Notification("UtilsHub Reminder", { body: reminder.text, icon: '/favicon.ico', badge: '/logo.png' }); } return updatedReminder; })); }; const intervalId = setInterval(checkReminders, 15000); return () => clearInterval(intervalId); }, []); const addReminder = (e: React.FormEvent) => { e.preventDefault(); if (!newReminderText) return; let newReminder: Reminder; if (reminderType === 'once') { if (!newReminderTime) return; newReminder = { id: Date.now(), text: newReminderText, type: 'once', time: newReminderTime, notified: false }; } else { if (!newReminderInterval || newReminderInterval <= 0) return; newReminder = { id: Date.now(), text: newReminderText, type: 'recurring', interval: newReminderInterval, lastNotified: Date.now() }; } setReminders(prev => [...prev, newReminder]); }; const removeReminder = (id: number) => setReminders(reminders.filter(r => r.id !== id)); return ( <div className="p-2 max-w-lg mx-auto space-y-6"> <form onSubmit={addReminder} className="p-4 border rounded-lg space-y-4"> <h3 className="font-semibold text-lg">Add a New Nudge</h3> <RadioGroup value={reminderType} onValueChange={(v) => setReminderType(v as any)} className="flex gap-4"> <div className="flex items-center space-x-2"><RadioGroupItem value="once" id="r1" /><Label htmlFor="r1">One-time</Label></div> <div className="flex items-center space-x-2"><RadioGroupItem value="recurring" id="r2" /><Label htmlFor="r2">Recurring</Label></div> </RadioGroup> <div className="space-y-2"><Label>Reminder Text</Label><Input value={newReminderText} onChange={e => setNewReminderText(e.target.value)} /></div> {reminderType === 'once' ? ( <div className="space-y-2"><Label>Time</Label><Input type="time" value={newReminderTime} onChange={e => setNewReminderTime(e.target.value)} /></div> ) : ( <div className="space-y-2"><Label>Repeat every (minutes)</Label><Input type="number" min="1" value={newReminderInterval} onChange={e => setNewReminderInterval(Number(e.target.value))} /></div> )} <Button type="submit" className="w-full"><BellPlus className="mr-2 h-4 w-4"/> Set Reminder</Button> </form> <div className="space-y-3"> <h3 className="font-semibold text-lg">Active Nudges</h3> <AnimatePresence> {reminders.length === 0 && ( <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center text-muted-foreground py-8 space-y-2"> <BellRing className="mx-auto h-10 w-10" /> <p>No active reminders.</p> <p className="text-xs">Use the form above to set a new nudge.</p> </motion.div> )} {reminders.map(r => ( <motion.div key={r.id} layout initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, x: -50, transition: { duration: 0.2 } }} > <Card className="flex items-center"> <CardContent className="p-4 flex-grow flex items-center gap-4"> <div className="p-2 bg-primary/10 text-primary rounded-full"> {r.type === 'once' ? <Clock className="h-5 w-5"/> : <History className="h-5 w-5"/>} </div> <div> <p className="font-medium">{r.text}</p> <p className="text-sm text-muted-foreground"> {r.type === 'once' ? `Today at ${r.time}` : `Repeats every ${r.interval} minutes`} </p> </div> </CardContent> <div className="pr-4"> <Button variant="ghost" size="icon" onClick={() => removeReminder(r.id)}><Trash2 className="h-4 w-4 text-red-500"/></Button> </div> </Card> </motion.div> ))} </AnimatePresence> </div> </div> ); };


// --- Main Hub Component ---
export function DigitalDetoxHub() {
    return (
        <Card className="w-full max-w-4xl mx-auto shadow-xl shadow-gray-300/20 rounded-2xl border">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight">Digital Detox Hub</CardTitle>
                <CardDescription className="text-lg pt-1">Tools to help you focus, manage tasks, and find balance.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="pomodoro" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 h-auto">
                        <TabsTrigger value="pomodoro">Pomodoro</TabsTrigger>
                        <TabsTrigger value="tasks">Tasks</TabsTrigger>
                        <TabsTrigger value="breathing">Breathing</TabsTrigger>
                        <TabsTrigger value="goals">Goals</TabsTrigger>
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                        <TabsTrigger value="reminders">Reminders</TabsTrigger>
                    </TabsList>
                    <div className="pt-6">
                        <TabsContent value="pomodoro"><PomodoroTimer /></TabsContent>
                        <TabsContent value="tasks"><TaskList /></TabsContent>
                        <TabsContent value="breathing"><BreathingExercise /></TabsContent>
                        <TabsContent value="goals"><GoalTracker /></TabsContent>
                        <TabsContent value="analytics"><AnalyticsDashboard /></TabsContent>
                        <TabsContent value="reminders"><GentleReminders /></TabsContent>
                    </div>
                </Tabs>
            </CardContent>
        </Card>
    );
}
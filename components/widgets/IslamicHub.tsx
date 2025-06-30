"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertCircle, MapPin, CalendarDays, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Sub-component 1: Prayer Times ---
const PrayerTimes = () => { const [prayerTimes, setPrayerTimes] = useState<any>(null); const [location, setLocation] = useState<{ city: string; country: string } | null>(null); const [method, setMethod] = useState('5'); const [loading, setLoading] = useState(true); const [error, setError] = useState(''); const calculationMethods = [ { id: 2, name: "ISNA (North America)" }, { id: 4, name: "MWL (Muslim World League)" }, { id: 5, name: "Umm al-Qura, Makkah" }, { id: 3, name: "Egyptian General Authority" }, { id: 1, name: "University of Islamic Sciences, Karachi" }, ]; const fetchPrayerTimes = useCallback((latitude: number, longitude: number, calcMethod: string) => { setLoading(true); setError(''); fetch(`https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=${calcMethod}`).then(res => res.json()).then(data => { if (data.code === 200) { setPrayerTimes(data.data.timings); fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`).then(res => res.json()).then(locData => { setLocation({ city: locData.city, country: locData.countryName }); }); } else { setError(data.status || 'Could not fetch prayer times.'); } }).catch(() => setError('Failed to connect to the prayer times service.')).finally(() => setLoading(false)); }, []); useEffect(() => { navigator.geolocation.getCurrentPosition( (position) => { fetchPrayerTimes(position.coords.latitude, position.coords.longitude, method); }, (err) => { console.warn(`Geolocation error: ${err.message}`); setError("Location access denied. Showing times for Kenitra, Morocco."); fetchPrayerTimes(34.2610, -6.5802, method); } ); }, [method, fetchPrayerTimes]); const prayerOrder = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']; if (loading) { return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>; } if (error) { return <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>; } return ( <div className="p-2 space-y-4"> <div className="flex justify-between items-center bg-muted p-3 rounded-lg"> <div> <Label>Calculation Method</Label> <Select value={method} onValueChange={setMethod}><SelectTrigger className="w-[280px] mt-1"><SelectValue placeholder="Select method" /></SelectTrigger><SelectContent>{calculationMethods.map(m => <SelectItem key={m.id} value={String(m.id)}>{m.name}</SelectItem>)}</SelectContent></Select> </div> {location && <div className="text-right"><p className="font-semibold flex items-center justify-end"><MapPin className="w-4 h-4 mr-1"/>{location.city}</p><p className="text-sm text-muted-foreground">{location.country}</p></div>} </div> <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"> {prayerOrder.map(prayer => ( <div key={prayer} className="p-4 text-center border rounded-lg"> <p className="font-semibold">{prayer}</p> <p className="font-mono text-2xl font-bold text-primary">{prayerTimes?.[prayer]}</p> </div> ))} </div> </div> ); };

// --- Sub-component 2: Hijri Calendar ---
const HijriCalendar = () => {
    const today = new Date();
    const gregorianDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(today);
    const hijriDate = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', { day: 'numeric', month: 'long', year: 'numeric' }).format(today);
    const hijriMonth = Number(new Intl.DateTimeFormat('ar-SA-u-ca-islamic', { month: 'numeric' }).format(today));
    const islamicEvents: { [key: string]: string } = { '1-1': 'رأس السنة الهجرية', '1-10': 'يوم عاشوراء', '3-12': 'المولد النبوي الشريف', '7-27': 'الإسراء والمعراج', '8-15': 'النصف من شعبان', '9-1': 'بداية رمضان', '9-27': 'ليلة القدر (تقريبي)', '10-1': 'عيد الفطر', '12-9': 'يوم عرفة', '12-10': 'عيد الأضحى', };
    const eventsThisMonth = Object.keys(islamicEvents).filter(key => parseInt(key.split('-')[0]) === hijriMonth).map(key => ({ day: key.split('-')[1], event: islamicEvents[key] }));
    return (
        <div className="p-2 space-y-6">
            <div className="text-center p-6 bg-muted rounded-lg">
                <p className="text-lg font-semibold">{gregorianDate}</p>
                <p className="text-2xl font-bold text-primary mt-1">{hijriDate}</p>
            </div>
            <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center"><CalendarDays className="w-5 h-5 mr-2" /> Events this month</h3>
                {eventsThisMonth.length > 0 ? ( <div className="space-y-2">{eventsThisMonth.map(event => ( <div key={event.day} className="flex items-center justify-between p-3 border rounded-md"><span className="font-medium">{event.event}</span><span className="font-mono text-muted-foreground">{event.day}</span></div> ))}</div> ) : ( <p className="text-muted-foreground text-sm">No major Islamic events this month.</p> )}
            </div>
        </div>
    );
};

// --- Sub-component 3: Islamic Reminders ---
const IslamicReminders = () => {
    const reminders = [ { type: "ذكر", text: "سبحان الله وبحمده، سبحان الله العظيم." }, { type: "نصيحة", text: "تبسمك في وجه أخيك صدقة." }, { type: "دافع", text: "لا تدري لعل الله يحدث بعد ذلك أمرا." }, { type: "ذكر", text: "أستغفر الله الذي لا إله إلا هو الحي القيوم وأتوب إليه." }, { type: "نصيحة", text: "من كان يؤمن بالله واليوم الآخر فليقل خيراً أو ليصمت." }, { type: "دافع", text: "إن مع العسر يسرا." }, ];
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => { const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000); setCurrentIndex(dayOfYear % reminders.length); }, []);
    const showNextReminder = () => { setCurrentIndex(prev => (prev + 1) % reminders.length); };
    const currentReminder = reminders[currentIndex];
    return (
        <div className="p-2 flex flex-col items-center space-y-4">
             <AnimatePresence mode="wait">
                <motion.div key={currentIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="w-full">
                    <Card className="min-h-[150px] flex flex-col justify-center items-center text-center p-6 bg-gradient-to-br from-primary/10 to-transparent">
                        <CardDescription className="mb-2 font-semibold">{currentReminder.type}</CardDescription>
                        <CardTitle className="text-2xl">"{currentReminder.text}"</CardTitle>
                    </Card>
                </motion.div>
             </AnimatePresence>
            <Button onClick={showNextReminder} variant="outline"><RefreshCcw className="mr-2 h-4 w-4"/> تذكير آخر</Button>
        </div>
    );
};

// --- Main Hub Component ---
export function IslamicHub() {
    return (
        <Card className="w-full max-w-6xl mx-auto shadow-xl shadow-gray-300/20 rounded-2xl border">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight">Islamic Hub</CardTitle>
                <CardDescription className="text-lg pt-1">A companion for your daily Islamic practices.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="prayer-times" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="prayer-times">Prayer Times</TabsTrigger>
                        <TabsTrigger value="hijri-calendar">Hijri Calendar</TabsTrigger>
                        <TabsTrigger value="reminders">Reminders</TabsTrigger>
                    </TabsList>
                    <div className="pt-6">
                        <TabsContent value="prayer-times"><PrayerTimes /></TabsContent>
                        <TabsContent value="hijri-calendar"><HijriCalendar /></TabsContent>
                        <TabsContent value="reminders"><IslamicReminders /></TabsContent>
                    </div>
                </Tabs>
            </CardContent>
        </Card>
    );
}
"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Ruler, Weight } from 'lucide-react';
import { cn } from '@/lib/utils';

// BMI categories and their corresponding styles
const bmiCategories = {
    underweight: { label: 'Underweight', color: 'bg-blue-500', range: [0, 18.5] },
    normal: { label: 'Normal weight', color: 'bg-green-500', range: [18.5, 24.9] },
    overweight: { label: 'Overweight', color: 'bg-yellow-500', range: [25, 29.9] },
    obese: { label: 'Obese', color: 'bg-red-500', range: [30, Infinity] }
};

export function BmiCalculator() {
    const [weight, setWeight] = useState(70); // in kg
    const [height, setHeight] = useState(175); // in cm

    const bmi = useMemo(() => {
        if (weight > 0 && height > 0) {
            const heightInMeters = height / 100;
            return weight / (heightInMeters * heightInMeters);
        }
        return 0;
    }, [weight, height]);

    const categoryInfo = useMemo(() => {
        if (bmi < 18.5) return bmiCategories.underweight;
        if (bmi >= 18.5 && bmi < 25) return bmiCategories.normal;
        if (bmi >= 25 && bmi < 30) return bmiCategories.overweight;
        return bmiCategories.obese;
    }, [bmi]);

    return (
        <Card className="w-full max-w-4xl mx-auto shadow-xl shadow-gray-300/20 grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl border">
            {/* Input Section */}
            <div className="p-8 space-y-8">
                <CardHeader className="p-0">
                    <CardTitle className="text-3xl font-bold tracking-tight">BMI Calculator</CardTitle>
                    <CardDescription className="text-gray-500 pt-1">Calculate your Body Mass Index.</CardDescription>
                </CardHeader>
                <div className="space-y-6">
                    <div>
                        <Label htmlFor="weight" className="flex items-center mb-2 text-gray-600">
                            <Weight className="w-4 h-4 mr-2" /> Weight (kg)
                        </Label>
                        <Input id="weight" type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="h-12 text-lg font-semibold" />
                        <Slider value={[weight]} onValueChange={(v) => setWeight(v[0])} max={200} step={1} className="mt-2" />
                    </div>
                    <div>
                        <Label htmlFor="height" className="flex items-center mb-2 text-gray-600">
                            <Ruler className="w-4 h-4 mr-2" /> Height (cm)
                        </Label>
                        <Input id="height" type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="h-12 text-lg font-semibold" />
                        <Slider value={[height]} onValueChange={(v) => setHeight(v[0])} max={220} step={1} className="mt-2" />
                    </div>
                </div>
            </div>
            {/* Output Section */}
            <div className={cn("text-white p-8 flex flex-col justify-center items-center rounded-r-2xl transition-colors duration-500", categoryInfo.color)}>
                <div className="text-center">
                    <h3 className="text-xl font-medium text-white/80">Your BMI is</h3>
                    <p className="text-6xl font-extrabold tracking-tighter my-2">{bmi.toFixed(1)}</p>
                    <p className="text-2xl font-semibold px-4 py-1 bg-white/20 rounded-full">{categoryInfo.label}</p>
                    <p className="text-sm mt-4 text-white/80">A healthy BMI range is 18.5 to 24.9.</p>
                </div>
            </div>
        </Card>
    );
}
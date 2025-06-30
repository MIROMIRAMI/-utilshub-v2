"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Banknote, Users, Percent, RotateCcw } from 'lucide-react';

const formatCurrency = (value: number) => {
    if (isNaN(value) || !isFinite(value)) return '$0.00';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export function TipCalculator() {
    const [bill, setBill] = useState('50.00');
    const [tipPercent, setTipPercent] = useState(18);
    const [people, setPeople] = useState(2);

    const billAmount = parseFloat(bill);
    
    const tipAmount = billAmount * (tipPercent / 100);
    const totalAmount = billAmount + tipAmount;
    const perPersonAmount = totalAmount / people;

    const resetAll = () => {
        setBill('50.00');
        setTipPercent(18);
        setPeople(2);
    }

    return (
        <Card className="w-full max-w-4xl mx-auto shadow-xl shadow-gray-300/20 grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl border">
            {/* Input Section */}
            <div className="p-8 space-y-8">
                <CardHeader className="p-0">
                    <CardTitle className="text-3xl font-bold tracking-tight">Tip Calculator</CardTitle>
                    <CardDescription className="text-gray-500 pt-1">Split the bill with ease.</CardDescription>
                </CardHeader>

                <div className="space-y-6">
                    <div>
                        <Label htmlFor="bill" className="flex items-center mb-2 text-gray-600"><Banknote className="w-4 h-4 mr-2" /> Bill Amount</Label>
                        <Input id="bill" type="number" value={bill} onChange={(e) => setBill(e.target.value)} className="h-12 text-lg font-semibold" />
                    </div>
                    <div>
                        <Label htmlFor="tip" className="flex items-center mb-2 text-gray-600"><Percent className="w-4 h-4 mr-2" /> Tip Percentage</Label>
                        <Input id="tip" type="number" value={tipPercent} onChange={(e) => setTipPercent(Number(e.target.value))} className="h-12 text-lg font-semibold" />
                        <Slider value={[tipPercent]} onValueChange={(v) => setTipPercent(v[0])} max={50} step={1} className="mt-2" />
                    </div>
                    <div>
                        <Label htmlFor="people" className="flex items-center mb-2 text-gray-600"><Users className="w-4 h-4 mr-2" /> Number of People</Label>
                        <Input id="people" type="number" min={1} value={people} onChange={(e) => setPeople(Number(e.target.value) || 1)} className="h-12 text-lg font-semibold" />
                    </div>
                </div>
            </div>

            {/* Output Section */}
            <div className="bg-green-600 text-white p-8 flex flex-col justify-between rounded-r-2xl">
                <div className='space-y-6'>
                    <div className="flex justify-between items-center opacity-80">
                        <span>Tip Amount</span>
                        <span className="font-semibold text-xl">{formatCurrency(tipAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center opacity-80">
                        <span>Total Bill</span>
                        <span className="font-semibold text-xl">{formatCurrency(totalAmount)}</span>
                    </div>

                    <div className="border-t border-green-500 my-6"></div>

                    <div className="text-center">
                        <p className="font-medium text-green-200">Each Person Pays</p>
                        <p className="text-5xl font-extrabold tracking-tighter my-2">{formatCurrency(perPersonAmount)}</p>
                    </div>
                </div>
                <Button onClick={resetAll} variant="secondary" className="w-full h-12 text-lg bg-green-700 hover:bg-green-800 text-white mt-8">
                    <RotateCcw className="w-4 h-4 mr-2" /> Reset
                </Button>
            </div>
        </Card>
    );
}
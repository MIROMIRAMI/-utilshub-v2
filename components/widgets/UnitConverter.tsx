"use client";

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ArrowRightLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Conversion Data and Logic ---
const conversionFactors: Record<string, Record<string, number>> = {
  length: { meters: 1, kilometers: 1000, centimeters: 0.01, miles: 1609.34, feet: 0.3048, inches: 0.0254 },
  mass: { kilograms: 1, grams: 0.001, pounds: 0.453592, ounces: 0.0283495, tonnes: 1000 },
  temperature: { celsius: 1, fahrenheit: 1, kelvin: 1 } // Special logic handled separately
};

const unitLabels: Record<string, string> = {
  meters: 'Meters', kilometers: 'Kilometers', centimeters: 'Centimeters', miles: 'Miles', feet: 'Feet', inches: 'Inches',
  kilograms: 'Kilograms', grams: 'Grams', pounds: 'Pounds', ounces: 'Ounces', tonnes: 'Tonnes',
  celsius: 'Celsius', fahrenheit: 'Fahrenheit', kelvin: 'Kelvin',
};

type Category = 'length' | 'mass' | 'temperature';

export function UnitConverter() {
  const [category, setCategory] = useState<Category>('length');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('feet');
  const [inputValue, setInputValue] = useState('1');

  const unitsForCategory = useMemo(() => Object.keys(conversionFactors[category]), [category]);

  useEffect(() => {
    setFromUnit(unitsForCategory[0]);
    setToUnit(unitsForCategory[1] || unitsForCategory[0]);
    setInputValue('1');
  }, [category, unitsForCategory]);

  const convertedValue = useMemo(() => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) return '...';
    if (fromUnit === toUnit) return value.toLocaleString();

    if (category === 'temperature') {
      if (fromUnit === 'celsius' && toUnit === 'fahrenheit') return (value * 9 / 5 + 32).toFixed(2);
      if (fromUnit === 'fahrenheit' && toUnit === 'celsius') return ((value - 32) * 5 / 9).toFixed(2);
      if (fromUnit === 'celsius' && toUnit === 'kelvin') return (value + 273.15).toFixed(2);
      if (fromUnit === 'kelvin' && toUnit === 'celsius') return (value - 273.15).toFixed(2);
      if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') return ((value - 32) * 5 / 9 + 273.15).toFixed(2);
      if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') return ((value - 273.15) * 9 / 5 + 32).toFixed(2);
      return value.toFixed(2);
    }

    const valueInBase = value * conversionFactors[category][fromUnit];
    const result = valueInBase / conversionFactors[category][toUnit];
    return result.toLocaleString(undefined, { maximumFractionDigits: 5 });
  }, [inputValue, fromUnit, toUnit, category]);

  const handleSwap = () => {
    const newFrom = toUnit;
    const newTo = fromUnit;
    setFromUnit(newFrom);
    setToUnit(newTo);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl shadow-gray-300/20 rounded-2xl border">
      <CardHeader>
        <CardTitle>Unit Converter</CardTitle>
        <CardDescription>Convert between length, mass, temperature, and more.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={category} onValueChange={(val: Category) => setCategory(val)}>
            <SelectTrigger className="h-12 text-base"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="length">Length</SelectItem>
              <SelectItem value="mass">Mass</SelectItem>
              <SelectItem value="temperature">Temperature</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="from-value">From</Label>
            <Input id="from-value" type="number" value={inputValue} onChange={e => setInputValue(e.target.value)} className="h-12 text-xl font-semibold" />
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{unitsForCategory.map(u => <SelectItem key={u} value={u}>{unitLabels[u]}</SelectItem>)}</SelectContent>
            </Select>
          </div>

          <div className="flex justify-center items-center">
            <Button onClick={handleSwap} variant="ghost" size="icon" className="w-12 h-12" aria-label="Swap units">
              <ArrowRightLeft className="w-6 h-6 text-muted-foreground" />
            </Button>
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label>To</Label>
            <div className="h-12 text-2xl font-bold flex items-center px-3 bg-muted rounded-md w-full overflow-x-auto">
                <AnimatePresence mode="wait">
                    <motion.span key={convertedValue} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }}>
                        {convertedValue}
                    </motion.span>
                </AnimatePresence>
            </div>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{unitsForCategory.map(u => <SelectItem key={u} value={u}>{unitLabels[u]}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
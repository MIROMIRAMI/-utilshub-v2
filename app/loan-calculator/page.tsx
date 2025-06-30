"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Banknote, CalendarDays, Percent } from 'lucide-react';

const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

export default function LoanCalculatorPage() {
  const [principal, setPrincipal] = useState(250000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [term, setTerm] = useState(30);

  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = term * 12;
  
  const monthlyPayment = principal * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - principal;
  
  const isValid = principal > 0 && interestRate > 0 && term > 0;

  return (
    <main className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl mx-auto shadow-2xl shadow-gray-300/30 grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl border">
        
        {/* Input Section */}
        <div className="p-8 space-y-8">
          <CardHeader className="p-0">
            <CardTitle className="text-3xl font-bold tracking-tight">Loan Calculator</CardTitle>
            <CardDescription className="text-gray-500 pt-1">Estimate your monthly mortgage payments.</CardDescription>
          </CardHeader>

          <div className="space-y-6">
            <div>
              <Label htmlFor="principal" className="flex items-center mb-2 text-gray-600">
                <Banknote className="w-4 h-4 mr-2" /> Loan Amount
              </Label>
              <Input 
                id="principal" 
                value={formatCurrency(principal).replace(/\D/g,'')}
                onChange={(e) => setPrincipal(Number(e.target.value.replace(/\D/g,'')) || 0)} 
                className="h-12 text-lg font-semibold" 
              />
              <Slider value={[principal]} onValueChange={(v) => setPrincipal(v[0])} max={1000000} step={1000} className="mt-2" />
            </div>

            <div>
              <Label htmlFor="interest" className="flex items-center mb-2 text-gray-600">
                <Percent className="w-4 h-4 mr-2" /> Interest Rate (%)
              </Label>
              <Input id="interest" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value) || 0)} className="h-12 text-lg font-semibold" />
              <Slider value={[interestRate]} onValueChange={(v) => setInterestRate(v[0])} max={20} step={0.1} className="mt-2" />
            </div>
            
            <div>
              <Label htmlFor="term" className="flex items-center mb-2 text-gray-600">
                <CalendarDays className="w-4 h-4 mr-2" /> Loan Term (Years)
              </Label>
              <Input id="term" value={term} onChange={(e) => setTerm(Number(e.target.value) || 0)} className="h-12 text-lg font-semibold" />
              <Slider value={[term]} onValueChange={(v) => setTerm(v[0])} max={40} step={1} className="mt-2" />
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-gray-900 text-white p-8 flex flex-col justify-center rounded-r-2xl">
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-400">Your Estimated Payment</h3>
            <p className="text-5xl font-bold tracking-tighter">{isValid ? formatCurrency(monthlyPayment) : '$0.00'}<span className="text-2xl font-medium text-gray-400">/month</span></p>
            
            <div className="border-t border-gray-700 my-6"></div>

            <div className="space-y-4 text-gray-300">
              <div className="flex justify-between"><span>Total Loan Amount</span> <span className="font-semibold">{formatCurrency(principal)}</span></div>
              <div className="flex justify-between"><span>Total Interest Paid</span> <span className="font-semibold">{isValid ? formatCurrency(totalInterest) : '$0.00'}</span></div>
              <div className="flex justify-between text-white text-lg font-bold"><span>Total Cost of Loan</span> <span>{isValid ? formatCurrency(totalPayment) : '$0.00'}</span></div>
            </div>
          </div>
        </div>

      </Card>
    </main>
  );
}
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Helper component for displaying results
function ResultDisplay({ label, value }: { label: string; value: string }) {
    return (
        <div className="mt-6 text-center bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-3xl font-bold tracking-tight">{value}</p>
        </div>
    );
}

// Tab 1: Calculate "What is X% of Y?"
function GeneralPercentCalc() {
  const [percent, setPercent] = useState("");
  const [num, setNum] = useState("");
  const result = (parseFloat(percent) / 100) * parseFloat(num);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="percent1">Percentage (%)</Label>
          <Input id="percent1" type="number" placeholder="e.g., 15" value={percent} onChange={(e) => setPercent(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="num1">Of Number</Label>
          <Input id="num1" type="number" placeholder="e.g., 250" value={num} onChange={(e) => setNum(e.target.value)} />
        </div>
      </div>
      <ResultDisplay label="Result" value={!isNaN(result) ? result.toLocaleString() : "..."} />
    </div>
  );
}

// Tab 2: Calculate "X is what % of Y?"
function IsWhatPercentCalc() {
  const [numA, setNumA] = useState("");
  const [numB, setNumB] = useState("");
  const result = (parseFloat(numA) / parseFloat(numB)) * 100;

  return (
    <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="numA">Value</Label>
              <Input id="numA" type="number" placeholder="e.g., 40" value={numA} onChange={(e) => setNumA(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="numB">Is what percent of</Label>
              <Input id="numB" type="number" placeholder="e.g., 200" value={numB} onChange={(e) => setNumB(e.target.value)} />
            </div>
        </div>
        <ResultDisplay label="Result" value={!isNaN(result) ? `${result.toLocaleString()}%` : "..."} />
    </div>
  );
}

// Tab 3: Calculate Percentage Change
function PercentChangeCalc() {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const result = ((parseFloat(to) - parseFloat(from)) / parseFloat(from)) * 100;

    return(
        <div className="space-y-4">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="from">Initial Value</Label>
                    <Input id="from" type="number" placeholder="e.g., 100" value={from} onChange={(e) => setFrom(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="to">Final Value</Label>
                    <Input id="to" type="number" placeholder="e.g., 125" value={to} onChange={(e) => setTo(e.target.value)} />
                </div>
            </div>
            <ResultDisplay label="Percentage Change" value={!isNaN(result) ? `${result.toFixed(2)}%` : "..."} />
        </div>
    );
}

export function PercentageCalculator() {
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl shadow-gray-300/20 rounded-2xl border">
      <CardHeader>
        <CardTitle>Percentage Toolkit</CardTitle>
        <CardDescription>All your percentage calculation needs in one place.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">X% of Y</TabsTrigger>
            <TabsTrigger value="is-what">X is what % of Y</TabsTrigger>
            <TabsTrigger value="change">% Change</TabsTrigger>
          </TabsList>
          <div className="pt-6">
            <TabsContent value="general"><GeneralPercentCalc /></TabsContent>
            <TabsContent value="is-what"><IsWhatPercentCalc /></TabsContent>
            <TabsContent value="change"><PercentChangeCalc /></TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
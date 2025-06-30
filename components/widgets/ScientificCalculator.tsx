"use client";

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { evaluate } from 'mathjs';
import { cn } from '@/lib/utils';

const CalcButton = ({ children, onClick, className }: { children: React.ReactNode; onClick: () => void; className?: string }) => ( <Button variant="outline" className={`h-16 text-xl font-semibold rounded-lg shadow-sm hover:bg-muted/80 ${className}`} onClick={onClick}> {children} </Button> );

export function ScientificCalculator() {
    const [expression, setExpression] = useState('');
    const [history, setHistory] = useState('');
    const [result, setResult] = useState('');
    const [displayFontSize, setDisplayFontSize] = useState('text-5xl');

    const clearAll = useCallback(() => { setExpression(''); setResult(''); setHistory(''); }, []);
    const deleteLast = useCallback(() => { if (result) { setResult(''); setExpression(history.replace(/=$/, '')); setHistory(''); } else { setExpression(prev => prev.slice(0, -1)); } }, [result, history]);
    const handleButtonClick = useCallback((value: string) => { if (result && !['+', '-', '*', '/', '^'].includes(value)) { setExpression(value); setResult(''); setHistory(''); } else if (result && ['+', '-', '*', '/', '^'].includes(value)) { setExpression(result + value); setResult(''); setHistory(''); } else { setExpression(prev => prev + value); } }, [result]);
    const calculateResult = useCallback(() => { if (!expression) return; try { const evalExpression = expression.replace(/√/g, 'sqrt').replace(/%/g, '/100').replace(/π/g, 'pi'); const calculation = evaluate(evalExpression); const finalResult = calculation.toString(); setResult(finalResult); setHistory(expression + '='); setExpression(finalResult); } catch { setResult('Error'); setHistory(expression + '='); } }, [expression, result]);
    useEffect(() => { const handleKeyDown = (event: KeyboardEvent) => { const key = event.key; if (key >= '0' && key <= '9') handleButtonClick(key); if (['+', '-', '*', '/', '.', '(', ')', '%', '^'].includes(key)) handleButtonClick(key); if (key === 'Enter' || key === '=') { event.preventDefault(); calculateResult(); } if (key === 'Backspace') deleteLast(); if (key === 'Escape') clearAll(); }; window.addEventListener('keydown', handleKeyDown); return () => window.removeEventListener('keydown', handleKeyDown); }, [handleButtonClick, calculateResult, deleteLast, clearAll]);
    useEffect(() => { const displayedText = result || expression || '0'; const len = displayedText.length; if (len > 16) { setDisplayFontSize('text-2xl'); } else if (len > 12) { setDisplayFontSize('text-3xl'); } else if (len > 9) { setDisplayFontSize('text-4xl'); } else { setDisplayFontSize('text-5xl'); } }, [result, expression]);

    return (
        <Card className="w-full max-w-md mx-auto shadow-2xl shadow-gray-400/20 rounded-2xl border p-4">
            <CardContent className="p-2">
                <div className="bg-muted w-full h-28 rounded-lg mb-4 p-4 flex flex-col justify-between items-end text-right overflow-hidden">
                    <div className="text-muted-foreground text-xl h-8 break-all">{history || ' '}</div>
                    <div className={cn("font-bold h-12 break-all text-right w-full transition-all duration-200", displayFontSize)}>{result || expression || '0'}</div>
                </div>
                <div className="grid grid-cols-5 gap-2">
                    <CalcButton onClick={() => handleButtonClick('(')} className="bg-gray-200 dark:bg-gray-700">(</CalcButton>
                    <CalcButton onClick={() => handleButtonClick(')')} className="bg-gray-200 dark:bg-gray-700">)</CalcButton>
                    <CalcButton onClick={() => handleButtonClick('sqrt(')} className="bg-gray-200 dark:bg-gray-700">√</CalcButton>
                    <CalcButton onClick={() => handleButtonClick('^')} className="bg-gray-200 dark:bg-gray-700">xʸ</CalcButton>
                    <CalcButton onClick={deleteLast} className="bg-red-200 dark:bg-red-800">DEL</CalcButton>
                    <CalcButton onClick={() => handleButtonClick('sin(')} className="bg-gray-200 dark:bg-gray-700">sin</CalcButton>
                    <CalcButton onClick={() => handleButtonClick('cos(')} className="bg-gray-200 dark:bg-gray-700">cos</CalcButton>
                    <CalcButton onClick={() => handleButtonClick('tan(')} className="bg-gray-200 dark:bg-gray-700">tan</CalcButton>
                    <CalcButton onClick={() => handleButtonClick('log(')} className="bg-gray-200 dark:bg-gray-700">log</CalcButton>
                    <CalcButton onClick={clearAll} className="bg-red-200 dark:bg-red-800">AC</CalcButton>
                    <CalcButton onClick={() => handleButtonClick('7')}>7</CalcButton>
                    <CalcButton onClick={() => handleButtonClick('8')}>8</CalcButton>
                    <CalcButton onClick={() => handleButtonClick('9')}>9</CalcButton>
                    <CalcButton onClick={() => handleButtonClick('/')} className="bg-orange-400 text-white">/</CalcButton>
                    <CalcButton onClick={() => handleButtonClick('%')} className="bg-orange-400 text-white">%</CalcButton>
                    <CalcButton onClick={() => handleButtonClick('4')}>4</CalcButton>
                    <CalcButton onClick={() => handleButtonClick('5')}>5</CalcButton>
                    <CalcButton onClick={() => handleButtonClick('6')}>6</CalcButton>
                    <CalcButton onClick={() => handleButtonClick('*')} className="bg-orange-400 text-white">*</CalcButton>
                    <CalcButton onClick={() => handleButtonClick('π')} className="bg-orange-400 text-white">π</CalcButton>
                    <CalcButton onClick={() => handleButtonClick('1')}>1</CalcButton>
                    <CalcButton onClick={() => handleButtonClick('2')}>2</CalcButton>
                    <CalcButton onClick={() => handleButtonClick('3')}>3</CalcButton>
                    <CalcButton onClick={() => handleButtonClick('-')} className="bg-orange-400 text-white">-</CalcButton>
                    <CalcButton onClick={calculateResult} className="row-span-2 bg-blue-500 text-white text-3xl">=</CalcButton>
                    <CalcButton onClick={() => handleButtonClick('0')} className="col-span-2">0</CalcButton>
                    <CalcButton onClick={() => handleButtonClick('.')}>.</CalcButton>
                    <CalcButton onClick={() => handleButtonClick('+')} className="bg-orange-400 text-white">+</CalcButton>
                </div>
            </CardContent>
        </Card>
    );
}
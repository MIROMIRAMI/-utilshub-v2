"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { RefreshCw, Award, PawPrint, Cat, Bird, Fish, Rabbit, Squirrel, Turtle, Snail, Hand, Scissors, Gem, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// --- Sub-component 1: Tic-Tac-Toe ---
const TicTacToe = () => { const [board, setBoard] = useState(Array(9).fill(null)); const [xIsNext, setXIsNext] = useState(true); const calculateWinner = (squares: any[]) => { const lines = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6], ]; for (let i = 0; i < lines.length; i++) { const [a, b, c] = lines[i]; if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a]; } return null; }; const winner = calculateWinner(board); const isDraw = !winner && board.every(square => square !== null); let status; if (winner) { status = `Winner: ${winner}`; } else if (isDraw) { status = "It's a Draw!"; } else { status = `Next player: ${xIsNext ? 'X' : 'O'}`; } const handleClick = (i: number) => { if (winner || board[i]) return; const newBoard = board.slice(); newBoard[i] = xIsNext ? 'X' : 'O'; setBoard(newBoard); setXIsNext(!xIsNext); }; const resetGame = () => { setBoard(Array(9).fill(null)); setXIsNext(true); }; const Square = ({ value, onClick }: { value: string | null, onClick: () => void }) => ( <Button variant="outline" className="w-24 h-24 text-5xl font-bold" onClick={onClick}> {value} </Button> ); return ( <div className="flex flex-col items-center space-y-4 p-4"> <div className="text-2xl font-semibold">{status}</div> <div className="grid grid-cols-3 gap-2"> {board.map((_, i) => <Square key={i} value={board[i]} onClick={() => handleClick(i)} />)} </div> <Button onClick={resetGame}><RefreshCw className="mr-2 h-4 w-4" /> New Game</Button> </div> ); };
// --- Sub-component 2: Memory Game ---
const MemoryGame = () => { const initialIcons = [PawPrint, Cat, Bird, Fish, Rabbit, Squirrel, Turtle, Snail]; const createShuffledDeck = useCallback(() => { return [...initialIcons, ...initialIcons].map((Icon, i) => ({ id: i, Icon, isFlipped: false, isMatched: false })).sort(() => Math.random() - 0.5); }, []); const [cards, setCards] = useState(() => createShuffledDeck()); const [flippedIndices, setFlippedIndices] = useState<number[]>([]); const [moves, setMoves] = useState(0); const [isChecking, setIsChecking] = useState(false); useEffect(() => { if (flippedIndices.length === 2) { setIsChecking(true); const [firstIndex, secondIndex] = flippedIndices; if (cards[firstIndex].Icon === cards[secondIndex].Icon) { setCards(prev => prev.map(card => card.Icon === cards[firstIndex].Icon ? { ...card, isMatched: true } : card)); setFlippedIndices([]); setIsChecking(false); } else { setTimeout(() => { setCards(prev => prev.map((card, index) => index === firstIndex || index === secondIndex ? { ...card, isFlipped: false } : card)); setFlippedIndices([]); setIsChecking(false); }, 1000); } } }, [flippedIndices, cards]); const handleCardClick = (index: number) => { if (isChecking || cards[index].isFlipped || flippedIndices.length === 2) return; setMoves(m => m + 1); const newCards = cards.map((card, i) => i === index ? { ...card, isFlipped: true } : card); setCards(newCards); setFlippedIndices(prev => [...prev, index]); }; const resetGame = () => { setFlippedIndices([]); setMoves(0); setCards(prev => prev.map(c => ({...c, isFlipped: false, isMatched: true}))); setTimeout(() => { setCards(createShuffledDeck()); }, 300); }; const isGameWon = cards.every(card => card.isMatched); return ( <div className="flex flex-col items-center space-y-4 p-4"> <div className="flex justify-between items-center w-full max-w-md"> <div className="font-semibold text-lg">Moves: {moves}</div> <Button onClick={resetGame} size="sm"><RefreshCw className="mr-2 h-4 w-4" /> Reset Game</Button> </div> <div className="grid grid-cols-4 gap-4"> <AnimatePresence>{cards.map((card, index) => ( <motion.div key={card.id} layout initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} transition={{ duration: 0.3 }} className="w-20 h-24 perspective-1000" onClick={() => handleCardClick(index)}> <motion.div className="relative w-full h-full preserve-3d cursor-pointer" animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }} transition={{ duration: 0.5 }}> <div className="absolute w-full h-full backface-hidden bg-primary rounded-lg flex items-center justify-center"><Award className="w-8 h-8 text-primary-foreground" /></div> <div className="absolute w-full h-full backface-hidden bg-muted rounded-lg flex items-center justify-center text-4xl transform-rotate-y-180"><card.Icon className="w-10 h-10" /></div> </motion.div> </motion.div> ))}</AnimatePresence> </div> {isGameWon && <div className="font-bold text-2xl text-green-500 flex items-center mt-4"><Award className="mr-2 h-6 w-6"/> Congratulations, You Won!</div>} </div> ); };
// --- Sub-component 3: Rock Paper Scissors ---
const RockPaperScissors = () => { const choices = [ { name: 'rock', icon: Gem, beats: 'scissors' }, { name: 'paper', icon: Hand, beats: 'rock' }, { name: 'scissors', icon: Scissors, beats: 'paper' }, ]; const [userChoice, setUserChoice] = useState<any>(null); const [computerChoice, setComputerChoice] = useState<any>(null); const [result, setResult] = useState(''); const [scores, setScores] = useState({ user: 0, computer: 0 }); const handlePlay = (choiceName: string) => { const user = choices.find(c => c.name === choiceName); const computer = choices[Math.floor(Math.random() * choices.length)]; setUserChoice(user); setComputerChoice(computer); if (user?.beats === computer.name) { setResult('You Win!'); setScores(s => ({ ...s, user: s.user + 1 })); } else if (computer.beats === user?.name) { setResult('You Lose!'); setScores(s => ({ ...s, computer: s.computer + 1 })); } else { setResult("It's a Draw!"); } }; return ( <div className="flex flex-col items-center space-y-6 p-4"> <div className="text-2xl font-semibold">Choose your weapon!</div> <div className="flex gap-4"> {choices.map(choice => ( <Button key={choice.name} onClick={() => handlePlay(choice.name)} size="lg" variant="outline" className="w-24 h-24"> <choice.icon className="w-12 h-12" /> </Button> ))} </div> <div className="text-xl font-bold">Your Score: {scores.user} - Computer: {scores.computer}</div> {userChoice && computerChoice && ( <div className="flex items-center gap-8 text-center"> <div><p>You</p><userChoice.icon className="w-16 h-16"/></div> <div className="text-3xl font-bold">vs</div> <div><p>CPU</p><computerChoice.icon className="w-16 h-16"/></div> </div> )} <div className="text-3xl font-bold text-blue-500">{result}</div> </div> ); };
// --- UPGRADED Sub-component 4: Reaction Time Test with Best Time ---
const ReactionTimeTest = () => {
    type GameState = 'idle' | 'waiting' | 'ready' | 'clicked';
    const [gameState, setGameState] = useState<GameState>('idle');
    const [reactionTime, setReactionTime] = useState(0);
    const [bestTime, setBestTime] = useState<number | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef(0);
    
    useEffect(() => {
        try {
            const savedBestTime = localStorage.getItem('reactionBestTime');
            if (savedBestTime) setBestTime(JSON.parse(savedBestTime));
        } catch(e) { console.error(e); }
    }, []);

    const startGame = useCallback(() => {
        setGameState('waiting');
        setReactionTime(0);
        const randomDelay = Math.random() * 3000 + 2000;
        timerRef.current = setTimeout(() => {
            setGameState('ready');
            startTimeRef.current = Date.now();
        }, randomDelay);
    }, []);
    
    const handleInteraction = useCallback(() => {
        if (gameState === 'waiting') {
            if(timerRef.current) clearTimeout(timerRef.current);
            setGameState('clicked');
            setReactionTime(-1);
        } else if (gameState === 'ready') {
            const newTime = Date.now() - startTimeRef.current;
            setReactionTime(newTime);
            setGameState('clicked');
            if (bestTime === null || newTime < bestTime) {
                setBestTime(newTime);
                localStorage.setItem('reactionBestTime', JSON.stringify(newTime));
            }
        } else if(gameState === 'idle' || gameState === 'clicked') {
            startGame();
        }
    }, [gameState, startGame, bestTime]);
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === 'Space') {
                event.preventDefault();
                handleInteraction();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => { window.removeEventListener('keydown', handleKeyDown); };
    }, [handleInteraction]);

    const getScreenContent = () => {
        switch (gameState) {
            case 'idle': return { text: "Click or Press Space to Start", color: "bg-gray-200 dark:bg-gray-800" };
            case 'waiting': return { text: "Wait for green...", color: "bg-red-500" };
            case 'ready': return { text: "CLICK NOW!", color: "bg-green-500" };
            case 'clicked':
                if (reactionTime === -1) return { text: `Too soon!\nClick or Press Space to try again`, color: "bg-yellow-500" };
                return { text: `${reactionTime} ms\nClick or Press Space to play again`, color: "bg-blue-500" };
        }
    };
    
    const { text, color } = getScreenContent();

    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="text-lg font-semibold text-muted-foreground flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Best Time: {bestTime ? `${bestTime} ms` : 'N/A'}
            </div>
            <div 
                className={cn("w-full h-80 rounded-lg flex items-center justify-center text-center text-white font-bold text-4xl cursor-pointer select-none whitespace-pre-wrap transition-colors duration-200", color)}
                onClick={handleInteraction}
            >
                {text}
            </div>
        </div>
    );
};

// --- Main Hub Component ---
export function GameHub() {
    return (
        <Card className="w-full max-w-4xl mx-auto shadow-xl shadow-gray-300/20 rounded-2xl border">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight">Game Hub</CardTitle>
                <CardDescription className="text-lg pt-1">A collection of simple and fun games to relax and have fun.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="tic-tac-toe" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
                        <TabsTrigger value="tic-tac-toe">Tic-Tac-Toe</TabsTrigger>
                        <TabsTrigger value="memory-game">Memory Game</TabsTrigger>
                        <TabsTrigger value="rock-paper-scissors">Rock Paper Scissors</TabsTrigger>
                        <TabsTrigger value="reaction-test">Reaction Test</TabsTrigger>
                    </TabsList>
                    <div className="pt-6">
                        <TabsContent value="tic-tac-toe"><TicTacToe /></TabsContent>
                        <TabsContent value="memory-game"><MemoryGame /></TabsContent>
                        <TabsContent value="rock-paper-scissors"><RockPaperScissors /></TabsContent>
                        <TabsContent value="reaction-test"><ReactionTimeTest /></TabsContent>
                    </div>
                </Tabs>
            </CardContent>
        </Card>
    );
}
import {
    LayoutDashboard, Home, Calculator, Timer, Ruler, Percent, HeartPulse, Landmark,
    Code, Calendar, Gamepad2, Sun, Moon, Wind, BrainCircuit, BookOpen, Newspaper,
    Contact, Info, ShieldQuestion, FileText, Settings, Palette
} from 'lucide-react';

export const navigationData = [
    { type: 'link' as const, href: "/", label: "Dashboard", description: "Overview of all tools.", icon: LayoutDashboard },
    { type: 'heading' as const, label: 'Hubs' },
    { type: 'link' as const, href: "/health-hub", label: "Health Hub", description: "BMR, Calories, Body Fat, Pace...", icon: HeartPulse },
    { type: 'link' as const, href: "/real-estate-hub", label: "Real Estate Hub", description: "Mortgage, Affordability, Rent vs. Buy...", icon: Landmark },
    { type: 'link' as const, href: "/dev-hub", label: "Developer Hub", description: "JSON, JWT, Base64, Hashing...", icon: Code },
    { type: 'link' as const, href: "/date-time-hub", label: "Date & Time Hub", description: "Timezone, Duration, Age...", icon: Calendar },
    { type: 'link' as const, href: "/game-hub", label: "Game Hub", description: "Simple and fun games to relax.", icon: Gamepad2 },
    { type: 'link' as const, href: "/islamic-hub", label: "Islamic Hub", description: "Prayer times, Hijri calendar, and Du'as.", icon: Moon },
    { type: 'link' as const, href: "/digital-detox-hub", label: "Digital Detox Hub", description: "Pomodoro, Tasks, Breathing...", icon: Wind },
    { type: 'heading' as const, label: 'General Tools' },
    { type: 'link' as const, href: "/scientific-calculator", label: "Scientific Calculator", description: "Advanced mathematical calculations.", icon: Calculator },
    { type: 'link' as const, href: "/timer", label: "Timer & Stopwatch", description: "Precise timing for your needs.", icon: Timer },
    { type: 'link' as const, href: "/unit-converter", label: "Unit Converter", description: "Convert between various units.", icon: Ruler },
    { type: 'link' as const, href: "/percentage", label: "Percentage Calculator", description: "Calculate percentages easily.", icon: Percent },
    { type: 'heading' as const, label: 'Information' },
    { type: 'link' as const, href: "/blog", label: "Blog", description: "News, updates, and guides.", icon: Newspaper },
    { type: 'link' as const, href: "/about", label: "About", description: "Learn more about UtilsHub.", icon: Info },
    { type: 'link' as const, href: "/contact", label: "Contact", description: "Get in touch with us.", icon: Contact },
    { type: 'link' as const, href: "/faq", label: "FAQ", description: "Frequently asked questions.", icon: ShieldQuestion },
    { type: 'link' as const, href: "/terms", label: "Terms", description: "Terms and conditions.", icon: FileText },
];
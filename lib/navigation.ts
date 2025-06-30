import { 
    Home, 
    HeartPulse, 
    Landmark, 
    Terminal, 
    CalendarClock, 
    Calculator, 
    Clock, 
    Info, 
    HelpCircle, 
    Mail, 
    FileText,
    ListOrdered,
    BrainCircuit,
    Gamepad2,
    MoonStar,
    Newspaper,
} from "lucide-react";

export const navigationData = [
    // Main Links
    { 
        type: 'link' as const, 
        href: "/blog",
        label: "Blog", 
        description: "News, updates, and guides from our team.",
        icon: Newspaper
    },
    { 
        type: 'heading' as const, 
        label: 'Hubs' 
    },
    { 
        type: 'link' as const, 
        href: "/", 
        label: "Dashboard", 
        description: "An overview of all available tools and hubs.",
        icon: Home 
    },
    { 
        type: 'link' as const, 
        href: "/tools",
        label: "All Tools", 
        description: "Explore the complete suite of our tools.",
        icon: ListOrdered
    },
    { 
        type: 'heading' as const, 
        label: 'Hubs' 
    },
    
    // Hubs
    { 
        type: 'heading' as const, 
        label: 'Hubs' 
    },
    { 
        type: 'link' as const, 
        href: "/islamic-hub", 
        label: "Islamic Hub", 
        description: "Prayer times, Hijri calendar, and Du'as.",
        icon: MoonStar 
    },
    { 
        type: 'link' as const, 
        href: "/health-hub", 
        label: "Health Hub", 
        description: "All-in-one health & fitness calculators.",
        icon: HeartPulse 
    },
    { 
        type: 'link' as const, 
        href: "/real-estate-hub", 
        label: "Real Estate Hub", 
        description: "Mortgage, affordability, and investment tools.",
        icon: Landmark 
    },
    { 
        type: 'link' as const, 
        href: "/dev-hub", 
        label: "Developer Hub", 
        description: "JSON, JWT, and other essential dev tools.",
        icon: Terminal 
    },
    { 
        type: 'link' as const, 
        href: "/date-time-hub", 
        label: "Date & Time Hub", 
        description: "Age, countdowns, and date calculators.",
        icon: CalendarClock 
    },
    { 
        type: 'link' as const, 
        href: "/digital-detox-hub", 
        label: "Digital Detox Hub", 
        description: "Focus, manage tasks, and find balance.",
        icon: BrainCircuit 
    },
    { 
        type: 'link' as const, 
        href: "/game-hub", 
        label: "Game Hub", 
        description: "Simple and fun games to relax.",
        icon: Gamepad2 
    },

    // General Tools
    { 
        type: 'heading' as const, 
        label: 'General Tools' 
    },
    { 
        type: 'link' as const, 
        href: "/scientific-calculator", 
        label: "Scientific Calculator", 
        description: "For complex mathematical calculations.",
        icon: Calculator 
    },
    { 
        type: 'link' as const, 
        href: "/timer", 
        label: "Stopwatch", 
        description: "Time anything with precision and laps.",
        icon: Clock 
    },
    
    // Info Pages
    { 
        type: 'heading' as const, 
        label: 'Information' 
    },
    { 
        type: 'link' as const, 
        href: "/about", 
        label: "About Us", 
        description: "Learn more about the UtilsHub project.",
        icon: Info 
    },
    { 
        type: 'link' as const, 
        href: "/faq", 
        label: "FAQ", 
        description: "Find answers to common questions.",
        icon: HelpCircle 
    },
    { 
        type: 'link' as const, 
        href: "/contact", 
        label: "Contact Us", 
        description: "Get in touch with the team.",
        icon: Mail
    },
    { 
        type: 'link' as const, 
        href: "/terms", 
        label: "Terms & Conditions", 
        description: "Read our terms of service.",
        icon: FileText
    },
];
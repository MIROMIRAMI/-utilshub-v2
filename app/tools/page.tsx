import { navigationData } from "@/lib/navigation";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Tools | UtilsHub",
  description: "Explore the complete suite of tools and hubs available on UtilsHub.",
};

// Filter out non-tool links like Dashboard, About, etc.
const allTools = navigationData.filter(item => 
    item.type === 'link' && item.href !== '/' && item.href !== '/about' && item.href !== '/contact' && item.href !== '/faq' && item.href !== '/terms'
);

const hubs = allTools.filter(tool => tool.href.includes('-hub'));
const generalTools = allTools.filter(tool => !tool.href.includes('-hub'));

export default function ToolsPage() {
    return (
        <div className="container py-10">
            <div className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-4">Our Complete Toolkit</h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Discover a powerful suite of utilities organized into specialized hubs and general-purpose tools, designed for speed and simplicity.
                </p>
            </div>

            {/* Hubs Section */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold mb-6">Tool Hubs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {hubs.map(hub => (
                        <Link href={hub.href!} key={hub.href} className="group">
                            <Card className="h-full hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <hub.icon className="w-10 h-10 text-primary" />
                                    <div>
                                        <CardTitle>{hub.label}</CardTitle>
                                        <CardDescription>{hub.description}</CardDescription>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 ml-auto" />
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>

             {/* General Tools Section */}
            <section>
                <h2 className="text-3xl font-bold mb-6">General Tools</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {generalTools.map(tool => (
                        <Link href={tool.href!} key={tool.href} className="group">
                            <Card className="h-full hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <tool.icon className="w-8 h-8 text-primary" />
                                    <div>
                                        <CardTitle>{tool.label}</CardTitle>
                                        <CardDescription>{tool.description}</CardDescription>
                                    </div>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
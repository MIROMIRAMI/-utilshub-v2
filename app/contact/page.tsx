"use client"; // This page needs to be a client component because it uses state

import { useState } from 'react';
import { StaticPageLayout } from "@/components/layout/StaticPageLayout";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Send } from 'lucide-react';

export default function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !message) {
            setStatus('Please fill out all fields.');
            return;
        }

        // --- In a real application, you would handle form submission here ---
        // For example, using a service like Resend, SendGrid, or a custom API route.
        // For now, we will just simulate a success message.
        console.log({ name, email, message });
        setStatus('Thank you for your message! We will get back to you soon.');
        
        // Clear form
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <StaticPageLayout title="Contact Us">
            <p className="mb-8">
                We'd love to hear from you! Whether you have a question, a suggestion for a new tool, or just want to say hello, please feel free to reach out using the form below.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input id="name" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Your Email</Label>
                        <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="john.doe@example.com" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" value={message} onChange={e => setMessage(e.target.value)} placeholder="Your message..." className="min-h-[150px]" />
                </div>
                <div className="flex items-center justify-between">
                    <Button type="submit" size="lg">
                        <Send className="mr-2 h-4 w-4" /> Send Message
                    </Button>
                    {status && <p className="text-sm text-muted-foreground">{status}</p>}
                </div>
            </form>
        </StaticPageLayout>
    );
}
import { StaticPageLayout } from "@/components/layout/StaticPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | UtilsHub",
  description: "Learn more about UtilsHub, the all-in-one toolkit for your daily needs.",
};

export default function AboutPage() {
    return (
        <StaticPageLayout title="About UtilsHub">
            <p>
                Welcome to UtilsHub, your new favorite destination for a suite of fast, clean, and minimalist web utilities. 
                Our mission is to provide a distraction-free environment where you can quickly access the tools you need without the noise of ads, sign-ups, or complicated interfaces.
            </p>
            <h2>Our Philosophy</h2>
            <p>
                In a web cluttered with complexity, we believe in the power of simplicity. Every tool on UtilsHub is designed with three core principles in mind:
            </p>
            <ul>
                <li><strong>Speed:</strong> Get your results instantly. Our tools are optimized for performance.</li>
                <li><strong>Simplicity:</strong> Clean, intuitive interfaces that are easy to use from the moment you land on the page.</li>
                <li><strong>Utility:</strong> We focus on tools that provide real, tangible value for your daily tasks, whether you&apos;re a student, a professional, or a developer.</li>
            </ul>
            <h2>Our Journey</h2>
            <p>
                This project was born out of a desire for a single, reliable place to access common utilities without friction. From a simple idea, it has grown into a comprehensive toolkit featuring hubs for health, finance, development, and more, all built with modern technology to ensure a seamless experience.
            </p>
            <p>
                Thank you for being a part of our journey. We&apos;re constantly working on improving and adding new tools to make your life a little bit easier.
            </p>
        </StaticPageLayout>
    );
}
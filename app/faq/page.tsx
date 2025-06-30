import { StaticPageLayout } from "@/components/layout/StaticPageLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | UtilsHub",
  description: "Frequently asked questions about UtilsHub.",
};

const faqs = [
    {
        question: "Is UtilsHub completely free to use?",
        answer: "Yes, absolutely. All tools on UtilsHub are 100% free to use with no hidden costs. Our goal is to provide value without barriers."
    },
    {
        question: "Do I need to create an account to use the tools?",
        answer: "No account is necessary. All our utilities are accessible immediately without any need for registration or login, ensuring a fast and frictionless experience."
    },
    {
        question: "How is my data handled? Is it secure?",
        answer: "Your privacy is our top priority. All calculations are performed directly in your browser (client-side). We do not send or store any of the data you enter into the tools on our servers."
    },
    {
        question: "Can I suggest a new tool or feature?",
        answer: "Of course! We love hearing ideas from our users. Please use the form on our 'Contact Us' page to send us your suggestions."
    },
    {
        question: "Is this website mobile-friendly?",
        answer: "Yes. UtilsHub is designed to be fully responsive, providing a seamless experience whether you are on a desktop, tablet, or smartphone."
    }
];

export default function FaqPage() {
    return (
        <StaticPageLayout title="Frequently Asked Questions (FAQ)">
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent>
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </StaticPageLayout>
    );
}
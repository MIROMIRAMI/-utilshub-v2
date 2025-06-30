import { StaticPageLayout } from "@/components/layout/StaticPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | UtilsHub",
  description: "Read the terms and conditions for using the UtilsHub website and its tools.",
};

export default function TermsPage() {
    return (
        <StaticPageLayout title="Terms and Conditions">
            <p className="text-sm text-muted-foreground">Last updated: June 30, 2025</p>
            <h2>1. Introduction</h2>
            <p>Welcome to UtilsHub! These terms and conditions outline the rules and regulations for the use of our website. By accessing this website, we assume you accept these terms and conditions. Do not continue to use UtilsHub if you do not agree to all of the terms and conditions stated on this page.</p>
            <h2>2. Use of Our Services</h2>
            <p>All tools provided on UtilsHub are for personal, non-commercial use. The calculations and data generated are for informational purposes only and should not be considered professional advice. All processing and calculations are performed on your local device (client-side); we do not store your input data.</p>
            <h2>3. Intellectual Property</h2>
            <p>The website and its original content, features, and functionality are and will remain the exclusive property of UtilsHub and its licensors. The service is protected by copyright, trademark, and other laws of both foreign and domestic countries.</p>
            <h2>4. Disclaimer of Warranties</h2>
            <p>Our Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. UtilsHub makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            <h2>5. Limitation of Liability</h2>
            <p>In no event shall UtilsHub, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
            <hr/>
            <p className="text-sm text-muted-foreground"><em>Disclaimer: This is a template for terms and conditions and not legal advice. You should consult with a legal professional to create terms and conditions that are appropriate for your specific situation.</em></p>
        </StaticPageLayout>
    );
}
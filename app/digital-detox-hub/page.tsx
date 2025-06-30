import { DigitalDetoxHub } from "@/components/widgets/DigitalDetoxHub";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Detox Hub | UtilsHub",
  description: "Tools to help you focus, manage tasks, and find balance in your digital life.",
};

export default function DigitalDetoxHubPage() {
    return (
        <ToolPageLayout
            title="Digital Detox Hub"
            description="Focus more, procrastinate less. Use these tools to build a healthier relationship with technology."
        >
            <DigitalDetoxHub />
        </ToolPageLayout>
    );
}
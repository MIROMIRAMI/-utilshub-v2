import { DeveloperHub } from "@/components/widgets/DeveloperHub";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";

export default function DevHubPage() {
    return (
        <ToolPageLayout
            title="Developer Tools Hub"
            description="A collection of essential utilities to help with day-to-day development tasks."
        >
            <DeveloperHub />
        </ToolPageLayout>
    );
}
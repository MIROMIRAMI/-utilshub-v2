import { DateTimeHub } from "@/components/widgets/DateTimeHub";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";

export default function DateTimeHubPage() {
    return (
        <ToolPageLayout
            title="Date & Time Tools"
            description="All your needs for date and time calculations in one place."
        >
            <DateTimeHub />
        </ToolPageLayout>
    );
}
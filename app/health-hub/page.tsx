import { HealthHub } from "@/components/widgets/HealthHub";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";

export default function HealthHubPage() {
    return (
        <ToolPageLayout
            title="Health & Fitness Hub"
            description="An all-in-one suite for your health calculations, from calories to body fat and performance metrics."
        >
            <HealthHub />
        </ToolPageLayout>
    );
}
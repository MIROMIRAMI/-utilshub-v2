import { PercentageCalculator } from "@/components/widgets/PercentageCalculator";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";

export default function PercentagePage() {
    return (
        <ToolPageLayout
            title="Percentage Calculator"
            description="A versatile toolkit for all common percentage calculations."
        >
            <PercentageCalculator />
        </ToolPageLayout>
    );
}
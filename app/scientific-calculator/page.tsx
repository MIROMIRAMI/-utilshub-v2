import { ScientificCalculator } from "@/components/widgets/ScientificCalculator";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";

export default function ScientificCalculatorPage() {
    return (
        <ToolPageLayout
            title="Scientific Calculator"
            description="A powerful calculator for complex mathematical expressions."
        >
            <ScientificCalculator />
        </ToolPageLayout>
    );
}
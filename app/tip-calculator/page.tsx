import { TipCalculator } from "@/components/widgets/TipCalculator";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";

export default function TipCalculatorPage() {
    return (
        <ToolPageLayout
            title="Tip & Bill Split Calculator"
            description="Quickly calculate the tip and split the total bill between friends."
        >
            <TipCalculator />
        </ToolPageLayout>
    );
}
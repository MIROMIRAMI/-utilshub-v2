import { BmiCalculator } from "@/components/widgets/BmiCalculator";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";

export default function BmiPage() {
    return (
        <ToolPageLayout
            title="Body Mass Index (BMI) Calculator"
            description="Use this calculator to check your Body Mass Index (BMI) and see if you are in a healthy weight range."
        >
            <BmiCalculator />
        </ToolPageLayout>
    );
}
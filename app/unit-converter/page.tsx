import { UnitConverter } from "@/components/widgets/UnitConverter";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";

export default function UnitConverterPage() {
    return (
        <ToolPageLayout
            title="Universal Unit Converter"
            description="A versatile tool to convert between various units for length, mass, temperature, and more."
        >
            <UnitConverter />
        </ToolPageLayout>
    );
}
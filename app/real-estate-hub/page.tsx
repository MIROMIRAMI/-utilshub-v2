import { RealEstateHub } from "@/components/widgets/RealEstateHub";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";

export default function RealEstateHubPage() {
    return (
        <ToolPageLayout
            title="Mortgage & Real Estate Hub"
            description="From calculating monthly payments to determining what you can afford, find all the tools you need."
        >
            <RealEstateHub />
        </ToolPageLayout>
    );
}
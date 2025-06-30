import { IslamicHub } from "@/components/widgets/IslamicHub";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Islamic Hub | UtilsHub",
  description: "A companion for your daily Islamic practices, including prayer times, Hijri calendar, and more.",
};

export default function IslamicHubPage() {
    return (
        <ToolPageLayout
            title="Islamic Hub"
            description="Your daily companion for prayer times, Hijri dates, and spiritual reminders."
        >
            <IslamicHub />
        </ToolPageLayout>
    );
}
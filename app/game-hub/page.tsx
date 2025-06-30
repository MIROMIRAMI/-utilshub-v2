import { GameHub } from "@/components/widgets/GameHub";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Game Hub | UtilsHub",
  description: "A collection of simple and fun games to pass the time.",
};

export default function GameHubPage() {
    return (
        <ToolPageLayout
            title="Game Hub"
            description="Take a break and have some fun with these classic games."
        >
            <GameHub />
        </ToolPageLayout>
    );
}
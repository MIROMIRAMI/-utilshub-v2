import { TimerStopwatch } from "@/components/widgets/TimerStopwatch";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";

export default function TimerPage() {
    return (
        <ToolPageLayout
            title="Stopwatch"
            description="A precise and easy-to-use stopwatch to time anything, with lap functionality."
        >
            <TimerStopwatch />
        </ToolPageLayout>
    );
}
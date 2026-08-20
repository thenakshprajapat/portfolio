import { TelemetryPulse } from "@/components/sections/telemetry-pulse";

export const metadata = {
  title: "Activity & Signal — Naksh",
  description: "Live development telemetry, GitHub activity, and coordinates.",
};

export default function SignalPage() {
  return (
    <main className="pt-20 sm:pt-28 min-h-screen">
      <TelemetryPulse />
    </main>
  );
}

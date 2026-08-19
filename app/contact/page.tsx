import { TransmissionTerminal } from "@/components/sections/transmission-terminal";

export const metadata = {
  title: "Contact — Naksh",
  description: "Say hi. I try to reply to everything.",
};

export default function ContactPage() {
  return (
    <main className="pt-14 sm:pt-16 min-h-screen">
      <TransmissionTerminal />
    </main>
  );
}

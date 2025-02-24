import { AgeConsentModal } from "@/components/age-consent-modal";
import { OkySafeIframe } from "@/components/okysafe-iframe";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <AgeConsentModal>
        <OkySafeIframe className="w-full h-full" />
      </AgeConsentModal>
      <header className="p-4 bg-blue-700 text-white">
        <Link className="text-4xl font-bold" href="/" prefetch={false}>
          OkySafe Demo
        </Link>
      </header>
      <main className="p-4">
        <p>Protected content goes here</p>
      </main>
    </>
  );
}

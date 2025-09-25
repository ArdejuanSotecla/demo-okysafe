import { AgeConsentModal } from "@/components/age-consent-modal";
import { OkySafeIframe } from "@/components/okysafe-iframe";

export default function Home() {
  return (
    <>
      <AgeConsentModal>
        <OkySafeIframe className="w-full h-full" />
      </AgeConsentModal>

      <main className="p-4">
        <p>Protected content goes here</p>
      </main>
    </>
  );
}

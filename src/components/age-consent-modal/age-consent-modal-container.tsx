import { ReactNode } from "react";
import { Blur } from "../blur";
import { useAgeConsentModal } from "./age-consent-modal-context";

export const AgeConsentModalContainer = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => {
  const { isOpen } = useAgeConsentModal();

  if (!isOpen) return null;

  return (
    <Blur>
      <div className="w-[600px] h-[500px] bg-zinc-800 rounded-lg p-4 grid grid-rows-[auto_1fr] gap-4 items-stretch">
        <h1 className="text-2xl font-bold">Age Consent</h1>
        <div>{children}</div>
      </div>
    </Blur>
  );
};

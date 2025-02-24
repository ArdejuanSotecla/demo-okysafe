"use client";

import { ReactNode } from "react";
import { AgeConsentModalProvider } from "./age-consent-modal-context";
import { AgeConsentModalContainer } from "./age-consent-modal-container";

export const AgeConsentModal = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => {
  return (
    <AgeConsentModalProvider>
      <AgeConsentModalContainer>{children}</AgeConsentModalContainer>
    </AgeConsentModalProvider>
  );
};

"use client";

import { closeModalCookiesAction } from "@/actions/close-modal-cookies.action";
import { isShowModalAction } from "@/actions/is-show-modal.action";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface AgeConsentModalValue {
  isOpen: boolean;
  closeModal: () => void;
}

export const AgeConsentModalContext =
  createContext<AgeConsentModalValue | null>(null);

interface AgeConsentModalProviderProps {
  children: ReactNode;
}

export const AgeConsentModalProvider = ({
  children,
}: AgeConsentModalProviderProps): ReactNode => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(function closeModalIfCookiePresent() {
    isShowModalAction().then((isShowModal) => {
      setIsOpen(isShowModal);
    });
  }, []);

  const closeModal = (): void => {
    closeModalCookiesAction().then(() => {
      setIsOpen(false);
    });
  };

  return (
    <AgeConsentModalContext.Provider
      value={{
        isOpen,
        closeModal,
      }}
    >
      {children}
    </AgeConsentModalContext.Provider>
  );
};

export const useAgeConsentModal = (): AgeConsentModalValue => {
  const context = useContext(AgeConsentModalContext);

  if (context === null) {
    throw new Error(
      "useAgeConsentModal must be used within a AgeConsentModalProvider"
    );
  }

  return context;
};

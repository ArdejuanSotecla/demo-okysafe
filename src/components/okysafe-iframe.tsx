"use client";

import { okysafeEventDataSchema } from "@/zod-schemas/okysafe-event-data.schema";
import {
  ComponentPropsWithoutRef,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { useAgeConsentModal } from "./age-consent-modal/age-consent-modal-context";
import { verifyOkysafeResponseAction } from "@/actions/verify-okysafe-response.action";
import toast from "react-hot-toast";
import { OKYSAFE_ORIGIN } from "@/lib/constants";
import { createIdentificationTokenAction } from "@/actions/create-identification-token.action";
import { Spinner } from "./ui/spinner";

type OkySafeIframeProps = Pick<ComponentPropsWithoutRef<"iframe">, "className">;

export const OkySafeIframe = (props: OkySafeIframeProps): ReactNode => {
  const [iframeElement, setIframeElement] = useState<HTMLIFrameElement | null>(
    null
  );

  const { closeModal, isOpen } = useAgeConsentModal();

  const [idToken, setIdToken] = useState<string | null>(null);

  useEffect(
    function createIdentificationToken() {
      if (!isOpen) return;

      createIdentificationTokenAction().then((token) => {
        setIdToken(token);
      });
    },
    [isOpen]
  );

  useEffect(
    function attachIframeEvents() {
      if (iframeElement == null) return;

      const iframeMessagesEventHandler = async (
        event: MessageEvent
      ): Promise<void> => {
        if (
          event.origin !== "null" ||
          event.source !== iframeElement.contentWindow
        )
          return;

        const parsedEventDataResult = okysafeEventDataSchema.safeParse(
          event.data
        );

        if (!parsedEventDataResult.success) return;

        const okysafeEvent = parsedEventDataResult.data;

        switch (okysafeEvent.code) {
          case "okysafe.age-consent-ok": {
            toast.success("Age consent ok");
            closeModal(); // IF IS VERIFICATION REQUIRED, NOOP
            break;
          }
          case "okysafe.already-verified": {
            await verifyOkysafeResponseAction({
              nonce: okysafeEvent.payload.nonce,
              signature: okysafeEvent.payload.signature,
            });
            toast.success("User already verified");
            closeModal();
            break;
          }
        }
      };

      window.addEventListener("message", iframeMessagesEventHandler);

      return () => {
        window.removeEventListener("message", iframeMessagesEventHandler);
      };
    },
    [iframeElement, closeModal]
  );

  if (idToken === null) return <Spinner />;

  const okysafeUrl = new URL(OKYSAFE_ORIGIN);
  okysafeUrl.searchParams.set("identification-token", idToken);
  okysafeUrl.searchParams.set("optional-verification", "true");

  return (
    <iframe
      onLoad={(e) => setIframeElement(e.target as HTMLIFrameElement)}
      src={okysafeUrl.toString()}
      sandbox="allow-scripts allow-top-navigation"
      {...props}
    />
  );
};

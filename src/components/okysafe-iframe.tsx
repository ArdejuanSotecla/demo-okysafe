"use client";

import { env } from "@/lib/env";
import { okysafeEventDataSchema } from "@/zod-schemas/okysafe-event-data.schema";
import { ComponentPropsWithoutRef, ReactNode, useEffect, useRef } from "react";
import { useAgeConsentModal } from "./age-consent-modal/age-consent-modal-context";
import { verifyOkysafeResponseAction } from "@/actions/verify-okysafe-response.action";
import toast from "react-hot-toast";
import { OKYSAFE_ORIGIN } from "@/lib/constants";

type OkySafeIframeProps = Pick<ComponentPropsWithoutRef<"iframe">, "className">;

export const OkySafeIframe = (props: OkySafeIframeProps): ReactNode => {
  const ref = useRef<HTMLIFrameElement>(null);

  const { closeModal } = useAgeConsentModal();

  useEffect(
    function attachIframeEvents() {
      if (ref.current === null) return;

      const iframeMessagesEventHandler = async (
        event: MessageEvent
      ): Promise<void> => {
        if (event.origin !== OKYSAFE_ORIGIN) return;
        if (event.target !== ref.current) return;

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
    [ref, closeModal]
  );

  const okysafeUrl = new URL(OKYSAFE_ORIGIN);
  okysafeUrl.searchParams.set(
    "client-public-key",
    env.NEXT_PUBLIC_OKYSAFE_CLIENT_PUBLIC_KEY
  );
  okysafeUrl.searchParams.set("domain", env.NEXT_PUBLIC_DOMAIN);
  okysafeUrl.searchParams.set("optional-verification", "true");

  return (
    <iframe
      ref={ref}
      src={okysafeUrl.toString()}
      sandbox="allow-scripts allow-top-navigation"
      {...props}
    />
  );
};

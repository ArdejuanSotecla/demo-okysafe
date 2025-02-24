"use server";

import { IS_MODAL_OPEN_COOKIE_KEY } from "@/lib/constants";
import { cookies } from "next/headers";

export const closeModalCookiesAction = async (): Promise<void> => {
  (await cookies()).set(IS_MODAL_OPEN_COOKIE_KEY, "false");
};

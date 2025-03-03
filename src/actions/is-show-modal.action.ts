"use server";

import { IS_MODAL_OPEN_COOKIE_KEY } from "@/lib/constants";
import { cookies } from "next/headers";

export const isShowModalAction = async (): Promise<boolean> => {
  const isShowModal =
    (await cookies()).get(IS_MODAL_OPEN_COOKIE_KEY)?.value !== "false";

  return isShowModal;
};

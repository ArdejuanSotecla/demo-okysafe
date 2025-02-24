"use server";

import { cookies } from "next/headers";

export const isShowModalAction = async (): Promise<boolean> => {
  const isShowModal =
    (await cookies()).get("okysafe-show-modal")?.value !== "false";

  return isShowModal;
};

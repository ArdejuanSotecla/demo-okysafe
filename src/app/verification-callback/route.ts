import { OKYSAFE_RESULT_TOKEN_SEARCH_PARAM_KEY } from "@/lib/constants";
import { type NextRequest } from "next/server";
import { JsonWebTokenError, verify } from "jsonwebtoken";
import { env } from "@/lib/env";
import { redirect } from "next/navigation";
import { okysafeResultTokenPayloadSchema } from "@/zod-schemas/okysafe-result-token-payload.schema";
import { ZodError } from "zod";
import { closeModalCookiesAction } from "@/actions/close-modal-cookies.action";

export const GET = async (request: NextRequest): Promise<void> => {
  const resultToken = request.nextUrl.searchParams.get(
    OKYSAFE_RESULT_TOKEN_SEARCH_PARAM_KEY
  );

  if (resultToken == null) {
    redirect("/");
  }

  const newSearchParams = new URLSearchParams();

  try {
    const payload = verify(resultToken, env.OKYSAFE_CLIENT_SECRET_KEY);

    const payloadResult = okysafeResultTokenPayloadSchema.parse(payload);

    if (
      ("isVerified" in payloadResult && !payloadResult.isVerified) ||
      "errorCode" in payloadResult
    ) {
      newSearchParams.set("error", "no-verified");
    } else {
      // THERE IS NO ERROR AND VERIFICATION IS CORRECT

      newSearchParams.set("is-verified", "true");
      await closeModalCookiesAction();
    }
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      newSearchParams.set("error", "invalid-token");
    } else if (error instanceof ZodError) {
      newSearchParams.set("error", "invalid-payload");
    }
  }

  redirect(`/?${newSearchParams.toString()}`);
};

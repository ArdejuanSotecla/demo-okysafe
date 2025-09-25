"use client";

import { getVerificationUrlAction } from "@/actions/get-verification-url.action";
import { redirect } from "next/navigation";
import { useState } from "react";

const RegisterPage = () => {
  const [email, setEmail] = useState<string>();

  const handleRegister = async () => {
    if (email == null) return;

    const url = await getVerificationUrlAction({ email });
    redirect(url);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-10 w-full h-full">
      <input
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input type="password" placeholder="Password" />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterPage;

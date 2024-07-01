"use client";

import { GoogleLogin } from "@react-oauth/google";

export default function GoogleLoginComponent() {
  return (
    <GoogleLogin onSuccess={(cred) => console.log(cred)} />
  );
}

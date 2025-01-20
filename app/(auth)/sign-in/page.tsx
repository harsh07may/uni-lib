"use client";

import { signInWithCredentials } from "@/lib/actions";
import { signInSchema } from "@/lib/validations";
import AuthForm from "@/components/AuthForm";

const page = () => (
  <AuthForm
    type="SIGN_IN"
    schema={signInSchema}
    defaultValues={{
      email: "",
      password: "",
    }}
    onSubmit={signInWithCredentials}
  />
);
export default page;

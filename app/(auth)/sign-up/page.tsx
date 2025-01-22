"use client";

import { University } from "lucide-react";

import { signUp } from "@/lib/actions/auth";
import { signUpSchema } from "@/lib/validations";
import AuthForm from "@/components/AuthForm";

const page = () => (
  <AuthForm
    type="SIGN_UP"
    schema={signUpSchema}
    defaultValues={{
      email: "",
      password: "",
      fullName: "",
      universityID: 0,
      universityCard: "",
    }}
    onSubmit={signUp}
  />
);
export default page;

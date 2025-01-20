"use server";

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";

export const signInWithCredentials = async (
  //* LEARNING: Typescript Omit/Pick
  params: Pick<AuthCredentials, "email" | "password">,
) => {
  const { email, password } = params;
  try {
    //sign-in user
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) return { success: false, message: result.error };
    return { success: true };
  } catch (error) {
    console.log(error, "SIGN_IN_ERROR");
    return { success: false, message: "SIGN_IN_ERROR" };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { fullName, email, password, universityCard, universityID } = params;

  // Check if user already exists
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  if (existingUser.length > 0)
    return { success: false, message: "User already exists" };

  // Hash password and insert user into db
  const hashedPassword = await hash(password, 10);
  try {
    await db.insert(users).values({
      email,
      fullName,
      universityID,
      password: hashedPassword,
      universityCard,
    });
    //Sign-in User
    await signInWithCredentials({ email, password });
    return { success: true, message: "User created successfully" };
  } catch (error) {
    console.log(error, "SIGN_UP_ERROR");
    return { success: false, message: "SIGN_UP_ERROR" };
  }
};

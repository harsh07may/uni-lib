import { University } from "lucide-react";
import { number, z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3, "Name is too short"),
  email: z.string().email("Invalid email address"),
  universityID: z.coerce.number(),
  universityCard: z.string().nonempty("University Card is required"),
  password: z.string().min(8, "Password is too short"),
});

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password is too short"),
});

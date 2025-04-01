"use server";

import { Credentials } from "@/lib/schema/authentication";
import { AuthError } from "next-auth";
import { signIn } from "../../auth";

export const login = async (
  credentials: Credentials & { redirectTo?: string },
) => {
  try {
    await signIn("credentials", credentials);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid username or password";
        default:
          return "Something wrong, please contact admin";
      }
    }
    throw error;
  }
};

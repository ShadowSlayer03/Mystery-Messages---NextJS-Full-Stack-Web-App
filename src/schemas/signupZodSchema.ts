import { z } from "zod";

export const usernameValidate = z
  .string()
  .min(5, "Username must be at least 5 characters.")
  .max(20, "Username must be no more than 20 characters.")
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Username can only contain letters, numbers, and underscores."
  );

export const signUpZodSchema = z.object({
  username: usernameValidate,
  email: z.string().trim().email({ message: "Invalid email address." }),
  password: z
    .string()
    .toLowerCase()
    .min(6, { message: "Password must have a minimum of 6 characters." }),
});

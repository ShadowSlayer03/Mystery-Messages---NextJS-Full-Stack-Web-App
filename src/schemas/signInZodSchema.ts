import { z } from "zod";

export const signInZodSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});

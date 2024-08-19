import { z } from "zod";

export const verifyZodSchema = z.object({
  code: z
    .string()
    .trim()
    .length(8, { message: "Verification code must be 8 digits long." }),
});

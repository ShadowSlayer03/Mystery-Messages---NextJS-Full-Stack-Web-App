import { z } from 'zod';

export const acceptMessageZodSchema = z.object({
  acceptMessages: z.boolean(),
});

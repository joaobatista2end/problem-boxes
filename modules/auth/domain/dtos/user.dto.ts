import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  role: z.string(),
  last_sign_in_at: z.string().time(),
});

export type UserDto = z.infer<typeof UserSchema>;

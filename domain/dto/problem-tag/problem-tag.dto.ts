import { z } from "zod";

export const ProblemTagSchema = z.object({
  id: z.string().optional(),
  name: z.string().max(50),
});

export type ProblemTagDto = z.infer<typeof ProblemTagSchema>;

import { z } from "zod";

import { ProblemSchema } from "../problem/problem.dto";

export const ProblemBoxSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  thumbnail_url: z.string(),
  problems: z.array(ProblemSchema),
});

export type ProblemBoxDto = z.infer<typeof ProblemBoxSchema>;

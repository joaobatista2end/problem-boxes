import { z } from "zod";

import { ProblemSchema } from "../problem/problem.dto";

export const ProblemBoxSchema = z.object({
  id: z.string().optional(),
  thumbnail: z.string(),
  description: z.string(),
  problems: z.array(ProblemSchema),
});

export type ProblemBoxDto = z.infer<typeof ProblemBoxSchema>;

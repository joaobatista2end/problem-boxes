import { z } from "zod";

import { ProblemBoxWithoutProblemsSchema } from "../problem-box/problem-box.dto";

export const RegisterProblemSchema = z.object({
  title: z.string().max(180),
  description: z.string(),
  problem_box_id: z.number().optional(),
  attachments: z.array(z.instanceof(File)).optional(),
  tags: z.string(),
});

export const ProblemSchema = z.object({
  id: z.number(),
  title: z.string().max(180),
  description: z.string(),
  attachments: z.array(z.string()),
  tags: z.array(z.string()),
  problemBox: ProblemBoxWithoutProblemsSchema,
  created_at: z.string(),
});

export type ProblemDto = z.infer<typeof ProblemSchema>;
export type RegisterProblemDto = z.infer<typeof RegisterProblemSchema>;

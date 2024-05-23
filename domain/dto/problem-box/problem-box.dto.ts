import { z } from "zod";

import { ProblemSchema } from "../problem/problem.dto";

export const ProblemBoxSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  thumbnail_url: z.string(),
  problems: z.array(ProblemSchema),
});

export const ProblemBoxWithoutProblemsSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  thumbnail_url: z.string(),
});

export type ProblemBoxDto = z.infer<typeof ProblemBoxSchema>;
export type ProblemBoxWithoutProblemsDto = z.infer<
  typeof ProblemBoxWithoutProblemsSchema
>;

import { z } from "zod";

import { ProblemTagSchema } from "../problem-tag/problem-tag.dto";

export const CreateProblemSchema = z.object({
  title: z.string().max(180),
  description: z.string(),
  attachments: z.array(z.instanceof(File)),
  tags: z.array(z.string()),
});

export const ProblemSchema = z.object({
  id: z.string(),
  title: z.string().max(180),
  description: z.string(),
  attachments: z.array(z.string()),
  tags: z.array(ProblemTagSchema),
});

export type ProblemDto = z.infer<typeof ProblemSchema>;
export type CreateProblemDto = z.infer<typeof CreateProblemSchema>;

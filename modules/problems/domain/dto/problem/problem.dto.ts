import { z } from 'zod';
import { ProblemBoxWithoutProblemsSchema } from '../problem-box/problem-box.dto';
import { UserSchema } from '~/modules/auth/domain/dtos/user.dto';
export const RegisterProblemSchema = z.object({
  title: z
    .string({ message: 'Título requerido' })
    .max(180, { message: 'O título deve ter no máximo 180 caracteres' }),
  description: z.string({ message: 'Descrição requerido' }),
  problem_box_id: z.number(),
  tags: z.string(),
  user_id: z.number(),
});

export const ProblemSchema = z.object({
  id: z.number(),
  title: z.string().max(180),
  description: z.string(),
  attachments: z.array(z.string()),
  tags: z.array(z.string()),
  problemBox: ProblemBoxWithoutProblemsSchema,
  created_at: z.string(),
  user: UserSchema,
});

export type ProblemDto = z.infer<typeof ProblemSchema>;
export type RegisterProblemDto = z.infer<typeof RegisterProblemSchema>;

import { z } from 'zod';

export const ProjectSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3),
  description: z.string().min(10),
  thumbnailUrl: z.string().optional(),
  liveUrl: z.string(),
  projectUrl: z.string(),
  features: z.array(z.string()),
});

export type TProject = z.infer<typeof ProjectSchema>;

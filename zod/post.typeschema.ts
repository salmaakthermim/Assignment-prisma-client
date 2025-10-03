import z from 'zod';

export const PostSchema = z.object({
  id: z.number().int().positive().optional(),
  title: z.string(),
  description: z.string().nullable().optional(),
  thumbnailUrl: z.string().nullable().optional(),
  content: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type TPost = z.infer<typeof PostSchema>;

'use server';

import { TProject } from '@/zod/project.typeschema';
import { TResponse } from '@/zod/response.typeschema';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function CreateProjectAction({
  name,
  description,
  thumbnailUrl,
  liveUrl,
  projectUrl,
  features,
}: TProject) {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${url}/api/projects/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      description,
      thumbnailUrl,
      liveUrl,
      projectUrl,
      features,
    }),
  });

  const data: TResponse<TProject> = await res.json();
  if (data.statusCode == 200) {
    revalidateTag('projects');
    revalidatePath('/');
    revalidatePath('/projects');
    revalidatePath('/dashboard');
    return { succes: true };
  } else return { success: false };
}

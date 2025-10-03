'use server';

import { TPost } from '@/zod/post.typeschema';
import { TResponse } from '@/zod/response.typeschema';
import { revalidatePath, revalidateTag } from 'next/cache';
import { success } from 'zod';

export async function CreatePostAction({
  title,
  description,
  thumbnailUrl,
  content,
}: TPost) {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${url}/api/posts/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      description,
      thumbnailUrl,
      content,
    }),
  });

  const data: TResponse<TPost> = await res.json();
  if (data.statusCode == 200) {
    revalidateTag('posts');
    revalidatePath('/');
    revalidatePath('/blog');
    revalidatePath('/dashboard');
    return { succes: true };
  } else return { success: false };
}

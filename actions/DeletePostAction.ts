'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

export async function DeletePostAction(id: string) {
  if (!id) return { success: false };

  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  try {
    const res = await fetch(`${url}/api/posts/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json().catch(() => null);
    console.log(data);
    if (data?.statusCode === 200) {
      revalidateTag('posts');
      revalidatePath('/');
      revalidatePath('/blog');
      revalidatePath('/dashboard');
      return { success: true };
    }
  } catch (e) {
    // ignore
    return { success: false };
  }
}

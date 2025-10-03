import { TPost } from '@/zod/post.typeschema';
import { TResponse } from '@/zod/response.typeschema';
import { notFound } from 'next/navigation';
import React from 'react';
import BlogEditForm from './edit-form';

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${url}/api/posts/get/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 60, tags: ['posts'] },
  });
  const resData: TResponse<TPost> = await res.json();

  if (!resData.data) {
    return notFound();
  }
  return (
    <section>
      <BlogEditForm postData={resData.data} />
    </section>
  );
}

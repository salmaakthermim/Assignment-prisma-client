import { TProject } from '@/zod/project.typeschema';
import { TResponse } from '@/zod/response.typeschema';
import { notFound } from 'next/navigation';
import React from 'react';
import ProjectEditForm from './edit-form';

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${url}/api/projects/get/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 60, tags: ['projects'] },
  });
  const resData: TResponse<TProject> = await res.json();

  if (!resData.data) {
    return notFound();
  }
  return (
    <section>
      <ProjectEditForm projectData={resData.data} />
    </section>
  );
}

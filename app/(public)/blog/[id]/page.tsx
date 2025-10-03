import RichTextEditor from '@/components/features/text-editor';
import { Button } from '@/components/ui/button';
import { BASIC_INFO } from '@/lib/contants';
import { TPost } from '@/zod/post.typeschema';
import { TResponse } from '@/zod/response.typeschema';

import { ArrowLeft, Edit } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${url}/api/posts/get-all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 60, tags: ['posts'] },
  });
  const resData: TResponse<TPost[]> = await res.json();

  return resData.data.map((post) => ({
    id: String(post.id),
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await props.params;

  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${url}/api/posts/get/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 60 },
  });
  const resData: TResponse<TPost> = await res.json();

  return {
    title: resData.data.title,
    description: resData.data.description,
  };
}

export default async function PostPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;
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
    <main className='mx-auto px-3 py-32 max-w-7xl'>
      <div className='flex items-center gap-4 mb-6'>
        <Link href='/'>
          <Button variant='outline' size='sm'>
            <ArrowLeft className='mr-2 w-4 h-4' />
            Back
          </Button>
        </Link>
      </div>

      <article>
        <h1 className='mb-4 font-bold text-4xl'>{resData.data?.title}</h1>
        <div className='flex items-center gap-2 mb-8 text-muted-foreground'>
          <span>{BASIC_INFO.name}</span>
          <span>•</span>
          <time>
            {new Date(resData.data.createdAt ?? new Date()).toLocaleDateString(
              'en-US',
              {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }
            )}
          </time>
        </div>

        <RichTextEditor
          content={resData.data?.content || ''}
          editable={false}
        />
      </article>
    </main>
  );
}

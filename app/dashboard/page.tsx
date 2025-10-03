import React from 'react';

import { Card } from '@/components/ui/card';
import { ArrowLeft, FileText, FolderKanban } from 'lucide-react';
import { TResponse } from '@/zod/response.typeschema';
import { TPost } from '@/zod/post.typeschema';
import { TProject } from '@/zod/project.typeschema';
import ItemActions from '@/components/ui/item-actions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import LogoutButton from './logoutbutton';

export default async function page() {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${url}/api/user/get-dashboard-data`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 60, tags: ['posts', 'projects'] },
  });

  const responseData: TResponse<{
    postData: TPost[];
    projectData: TProject[];
  }> = await res.json();

  const stats = [
    {
      name: 'Total Blog Posts',
      value: responseData.data.postData.length,
      change: '',
      icon: FileText,
    },
    {
      name: 'Total Projects',
      value: responseData.data.projectData.length,
      change: '',
      icon: FolderKanban,
    },
  ];

  return (
    <div className='p-8'>
      <div className='mb-6'>
        <div className='flex justify-between mb-6 w-full'>
          <Button variant='outline' size='sm' asChild>
            <Link href={`/`}>
              <ArrowLeft className='mr-2 w-4 h-4' />
              Home
            </Link>
          </Button>
          <LogoutButton />
        </div>
        <h1 className='mb-2 font-bold text-foreground text-3xl'>Overview</h1>
        <p className='text-muted-foreground'>
          Welcome back! Here's what's happening with your portfolio.
        </p>
      </div>

      <div className='gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8'>
        {stats.map((stat) => (
          <Card key={stat.name} className='bg-card p-6 border-border'>
            <div className='flex items-center gap-4 mb-4'>
              <div className='bg-primary/10 p-3 rounded-lg'>
                <stat.icon className='w-6 h-6 text-primary' />
              </div>
              <div>
                <p className='mb-1 text-muted-foreground text-sm'>
                  {stat.name}
                </p>
                <p className='mb-0 font-bold text-foreground text-2xl'>
                  {stat.value}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className='gap-6 grid grid-cols-1 lg:grid-cols-2'>
        <Card className='bg-card p-6 border-border'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='font-semibold text-foreground text-lg'>
              Recent Blog Posts
            </h2>
            <Link
              href='/dashboard/blog/create'
              className='text-primary underline'
            >
              Create
            </Link>
          </div>
          <div className='space-y-4'>
            {responseData.data.postData.map((value, i) => (
              <div
                key={String(value.id) || i}
                className='flex justify-between items-center py-3 last:border-0 border-b border-border'
              >
                <div>
                  <p className='font-medium text-foreground text-sm'>
                    {value.title}
                  </p>
                  <p className='text-muted-foreground text-xs'>
                    Published{' '}
                    {new Date(value.createdAt ?? new Date()).toLocaleDateString(
                      'en-US',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }
                    )}
                  </p>
                </div>
                <div>
                  <ItemActions
                    id={String(value.id)}
                    type='post'
                    viewHref={`/blog/${value.id}`}
                    editHref={`/dashboard/blog/edit/${value.id}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className='bg-card p-6 border-border'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='font-semibold text-foreground text-lg'>
              Recent Projects
            </h2>
            <Link
              href='/dashboard/project/create'
              className='text-primary underline'
            >
              Create
            </Link>
          </div>
          <div className='space-y-4'>
            {responseData.data.projectData.map((value, i) => (
              <div
                key={String(value.id) || i}
                className='flex justify-between items-center py-3 last:border-0 border-b border-border'
              >
                <div>
                  <p className='font-medium text-foreground text-sm'>
                    {value.name}
                  </p>
                  <p className='text-muted-foreground text-xs'>
                    {value.description
                      ? `${String(value.description).slice(0, 80)}${
                          String(value.description).length > 80 ? '…' : ''
                        }`
                      : ''}
                  </p>
                </div>
                <div>
                  <ItemActions
                    id={String(value.id)}
                    type='project'
                    viewHref={value.liveUrl}
                    editHref={`/dashboard/project/edit/${value.id}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

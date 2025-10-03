import React from 'react';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Loading() {
  return (
    <div className='p-8'>
      <div className='mb-6'>
        <div className='flex justify-between mb-6 w-full'>
          <div className='flex items-center gap-2'>
            <Skeleton className='rounded-md w-24 h-8' />
          </div>
          <Skeleton className='rounded-md w-20 h-8' />
        </div>

        <div className='mb-2'>
          <Skeleton className='mb-2 rounded-md w-52 h-8' />
          <Skeleton className='rounded-md w-96 h-4' />
        </div>
      </div>

      <div className='gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8'>
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className='bg-card p-6 border-border'>
            <div className='flex items-center gap-4 mb-4'>
              <Skeleton className='rounded-lg w-12 h-12' />
              <div className='flex-1'>
                <Skeleton className='mb-2 w-32 h-4' />
                <Skeleton className='w-20 h-8' />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className='gap-6 grid grid-cols-1 lg:grid-cols-2'>
        <Card className='bg-card p-6 border-border'>
          <div className='flex justify-between items-center mb-4'>
            <Skeleton className='w-40 h-6' />
            <Skeleton className='w-20 h-4' />
          </div>
          <div className='space-y-4'>
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className='flex justify-between items-center py-3 last:border-0 border-b border-border'
              >
                <div className='flex-1'>
                  <Skeleton className='mb-2 w-48 h-4' />
                  <Skeleton className='w-32 h-3' />
                </div>
                <div className='ml-4'>
                  <Skeleton className='rounded-md w-12 h-8' />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className='bg-card p-6 border-border'>
          <div className='flex justify-between items-center mb-4'>
            <Skeleton className='w-40 h-6' />
            <Skeleton className='w-20 h-4' />
          </div>
          <div className='space-y-4'>
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className='flex justify-between items-center py-3 last:border-0 border-b border-border'
              >
                <div className='flex-1'>
                  <Skeleton className='mb-2 w-48 h-4' />
                  <Skeleton className='w-40 h-3' />
                </div>
                <div className='ml-4'>
                  <Skeleton className='rounded-md w-12 h-8' />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

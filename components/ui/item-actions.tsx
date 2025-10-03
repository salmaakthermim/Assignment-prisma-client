'use client';

import React from 'react';
import Link from 'next/link';
import { Eye, Trash2, Edit } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

import { DeletePostAction } from '@/actions/DeletePostAction';
import { DeleteProjectAction } from '@/actions/DeleteProjectAction';
import { toast } from 'sonner';

type Props = {
  id: string | number;
  type: 'post' | 'project';
  viewHref?: string;
  editHref?: string;
};

export default function ItemActions({ id, type, viewHref, editHref }: Props) {
  const action = type === 'post' ? DeletePostAction : DeleteProjectAction;

  return (
    <div className='flex items-center gap-2'>
      {viewHref && (
        <Button variant='ghost' asChild>
          <Link
            href={viewHref}
            title='View'
            className='p-2 rounded-md text-muted-foreground hover:text-foreground'
          >
            <Eye className='w-4 h-4' />
          </Link>
        </Button>
      )}

      {editHref && (
        <Button variant='ghost' asChild>
          <Link
            href={editHref}
            title='Edit'
            className='p-2 rounded-md text-muted-foreground hover:text-foreground'
          >
            <Edit className='w-4 h-4' />
          </Link>
        </Button>
      )}

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant='ghost'
            className='p-2 rounded-md text-destructive'
            aria-label='Delete'
          >
            <Trash2 className='w-4 h-4' />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Deleting this {type} will remove it
              permanently.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            {/* Use Next.js Server Action as the form action */}
            <form
              action={async () => {
                const res = await action(String(id));
                if (res?.success) toast.success('Deleted Succesfully!');
                else toast.error('Something Went wrong');
              }}
            >
              <input type='hidden' name='id' value={String(id)} />
              <AlertDialogAction type='submit' className='bg-destructive'>
                Delete
              </AlertDialogAction>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

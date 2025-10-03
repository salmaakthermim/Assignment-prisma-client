'use client';

import { CreatePostAction } from '@/actions/CreatePostAction';
import { EditPostAction } from '@/actions/EditPostAction';
import UploadWidget from '@/components/features/imageupload/upload-widget';
import RichTextEditor from '@/components/features/text-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TPost } from '@/zod/post.typeschema';
import { TResponse } from '@/zod/response.typeschema';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function BlogEditForm({ postData }: { postData: TPost }) {
  const router = useRouter();
  const [title, setTitle] = useState<string>(postData.title);
  const [description, setDescription] = useState<string>(
    postData.description ?? ''
  );
  const [imageUrl, setImageUrl] = useState<string>(postData.thumbnailUrl ?? '');
  const [content, setContent] = useState<string>(postData.content);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      toast.error('Please Upload a thumbnail image');
      return;
    }
    setIsSubmitting(true);

    const createPost = await EditPostAction({
      id: postData.id,
      title,
      content,
      description,
      thumbnailUrl: imageUrl,
    });
    if (createPost.succes) toast.success('Post Updated successful!');
    setIsSubmitting(false);
  };

  return (
    <section className='mx-auto px-4 py-20 max-w-6xl'>
      <div className='mb-6'>
        <Link href={`/`}>
          <Button variant='outline' size='sm'>
            <ArrowLeft className='mr-2 w-4 h-4' />
            Back
          </Button>
        </Link>
      </div>
      <div className='flex lg:flex-row flex-col-reverse gap-2'>
        <div className='w-full lg:w-2/3'>
          <h1 className='mb-8 font-bold text-3xl'>Edit Post</h1>
          <form className='space-y-6 max-w-3xl' onSubmit={handleSubmit}>
            <div className='space-y-2'>
              <Label htmlFor='title'>Title</Label>
              <Input
                id='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Enter post title'
                className='bg-slate-50'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='title'>Description</Label>
              <Input
                id='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Enter post description'
                className='bg-slate-50'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label>Upload Blog Thumbnail </Label>
              <UploadWidget onUploadComplete={setImageUrl} />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='content'>Content</Label>
              <RichTextEditor content={content} onChange={setContent} />
            </div>

            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Upating...' : 'Edit Post'}
            </Button>
          </form>
        </div>
        <div className='space-y-2 w-1/3'>
          <Label>Thumbnail</Label>
          {imageUrl && imageUrl !== '' && (
            <figure className='relative w-full min-h-[300px]'>
              <Image
                src={imageUrl}
                alt='thumbnail'
                className='object-contain'
                fill
              />
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { TPost } from '@/zod/post.typeschema';
import { TResponse } from '@/zod/response.typeschema';
import Link from 'next/link';

export async function BlogSection() {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${url}/api/posts/get-all`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { tags: ['posts'] },
  });
  const resData: TResponse<TPost[]> = await res.json();
  return (
    <section id='blog' className='bg-muted/30 px-6 py-20'>
      <div className='mx-auto max-w-6xl container'>
        {/* Section header */}
        <div className='mb-16 text-center'>
          <h2 className='mb-4 font-bold text-foreground text-3xl md:text-4xl text-balance'>
            Latest Blog Posts
          </h2>
          <p className='mx-auto max-w-2xl text-muted-foreground text-lg text-balance'>
            Thoughts on web development, design patterns, and the latest
            technologies I'm exploring.
          </p>
        </div>

        {/* Blog posts grid */}
        <div className='gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {resData.data.map((post) => (
            <Card
              key={post.id}
              className='group bg-card hover:bg-card/80 hover:shadow-lg border-border overflow-hidden transition-all duration-300'
            >
              {/* Blog post image */}
              <div className='relative overflow-hidden'>
                <Image
                  src={post.thumbnailUrl || '/placeholder.png'}
                  // src={'/placeholder.svg'}
                  alt={post.title}
                  width={400}
                  height={200}
                  className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300'
                />
                <div className='top-4 left-4 absolute'>
                  <Badge
                    variant='secondary'
                    className='bg-background/90 text-foreground'
                  >
                    {`Blog`}
                  </Badge>
                </div>
              </div>

              <CardHeader className='pb-3'>
                <div className='flex items-center gap-2 mb-2 text-muted-foreground text-sm'>
                  <Calendar size={14} />
                  <span>
                    {new Date(post.createdAt ?? new Date()).toLocaleDateString(
                      'en-US',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }
                    )}
                  </span>
                  <span>•</span>
                  <span>{`2 Minutes`}</span>
                </div>
                <CardTitle className='text-card-foreground group-hover:text-primary text-lg leading-tight transition-colors duration-200'>
                  {post.title}
                </CardTitle>
              </CardHeader>

              <CardContent className='pt-0'>
                <CardDescription className='mb-4 text-muted-foreground leading-relaxed'>
                  {post.description}
                </CardDescription>

                {/* Read more button */}
                <Button
                  variant='ghost'
                  size='sm'
                  asChild
                  className='group/btn p-0 h-auto font-medium'
                >
                  <Link
                    href={`/blog/${post.id}`}
                    className='flex items-center gap-2'
                  >
                    Read More
                    <ArrowRight
                      size={16}
                      className='transition-transform group-hover/btn:translate-x-1 duration-200'
                    />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View all posts button */}
        <div className='mt-12 text-center'>
          <Button variant='outline' size='lg' asChild>
            <Link href='/blog'>View All Posts</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

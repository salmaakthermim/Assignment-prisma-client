'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEvent, useRef, useState } from 'react';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await signIn('credentials', {
      email: emailRef.current,
      password: passwordRef.current,
      redirect: false,
    });
    if (result.error) {
      toast.error('Error signing up', {
        description: 'Invalid email or password',
      });
    } else if (result.ok) {
      toast.success('Signed In Succesfully!', {
        description: 'Redirecting to dashboard',
      });
      router.push('/dashboard');
    }
    setIsLoading(false);
  };
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your admin account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-6'>
              <div className='gap-3 grid'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  onChange={(e) => (emailRef.current = e.target.value)}
                  placeholder='m@example.com'
                  required
                />
              </div>
              <div className='gap-3 grid'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>
                </div>
                <Input
                  id='password'
                  type='password'
                  placeholder='******'
                  min={6}
                  required
                  onChange={(e) => (passwordRef.current = e.target.value)}
                />
              </div>
              <div className='flex flex-col gap-3'>
                <Button type='submit' disabled={isLoading} className='w-full'>
                  {isLoading && <Loader2 className='animate-spin' />}
                  Login
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

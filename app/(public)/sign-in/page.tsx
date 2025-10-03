import Link from 'next/link';
import { SignInForm } from './sign-in-form';

export default function SignInPage() {
  return (
    <div className='flex justify-center items-center bg-background p-4 min-h-screen'>
      <div className='space-y-8 w-full max-w-md'>
        <div className='text-center'>
          <Link href='/' className='inline-block'>
            <h1 className='font-bold text-primary hover:text-primary/80 text-2xl transition-colors'>
              Portfolio
            </h1>
          </Link>
          <h2 className='mt-6 font-bold text-foreground text-3xl'>
            Welcome back
          </h2>
          <p className='mt-2 text-muted-foreground'>
            Sign in to your account to continue
          </p>
        </div>

        <SignInForm />

        <div className='text-center'></div>
      </div>
    </div>
  );
}

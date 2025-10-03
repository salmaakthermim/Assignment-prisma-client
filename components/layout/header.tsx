'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const session = useSession();

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className='top-0 right-0 left-0 z-50 fixed bg-background/80 backdrop-blur-md border-b border-border'>
      <div className='mx-auto px-6 py-4 container'>
        <div className='flex justify-between items-center'>
          {/* Logo/Name */}
          <Link href='/' className='font-bold text-foreground text-xl'>
            Towhid Karim
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-8'>
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className='font-medium text-muted-foreground hover:text-foreground text-sm transition-colors duration-200'
              >
                {item.name}
              </a>
            ))}

            <Button disabled={session.status === 'loading'} asChild>
              <Link href={session.data ? '/dashboard' : '/sign-in'}>
                {session.data ? (
                  'Dashboard'
                ) : session.status === 'loading' ? (
                  <span className='flex flex-row justify-center items-center gap-2'>
                    <Loader2 className='animate-spin' />
                    Loading...
                  </span>
                ) : (
                  'Log In'
                )}
              </Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant='ghost'
            size='sm'
            className='md:hidden'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className='md:hidden mt-4 pt-4 pb-4 border-t border-border'>
            <div className='flex flex-col space-y-3'>
              <Button asChild>
                <Link href={session.data ? '/dashboard' : '/sign-in'}>
                  {session.data ? 'Dashboard' : 'Sign In'}
                </Link>
              </Button>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className='py-2 font-medium text-muted-foreground hover:text-foreground text-sm transition-colors duration-200'
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

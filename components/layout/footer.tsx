import { Button } from '@/components/ui/button';
import { BASIC_INFO } from '@/lib/contants';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { name: 'About', href: '#about' },
      { name: 'Projects', href: '#projects' },
      { name: 'Blog', href: '#blog' },
      { name: 'Contact', href: '#contact' },
    ],
    resources: [
      { name: 'Resume', href: BASIC_INFO.resume },
      { name: 'All Projects', href: '/projects' },
      { name: 'All Posts', href: '/blog' },
      { name: 'Uses', href: '/uses' },
    ],
  };

  return (
    <footer id='contact' className='bg-muted/30 border-t border-border'>
      <div className='mx-auto px-6 py-12 container'>
        <div className='gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8'>
          {/* Brand and description */}
          <div className='lg:col-span-2'>
            <h3 className='mb-4 font-bold text-foreground text-xl'>
              {BASIC_INFO.name}
            </h3>
            <p className='mb-6 max-w-md text-muted-foreground leading-relaxed'>
              Full-stack developer passionate about creating exceptional digital
              experiences. Let's build something amazing together.
            </p>
            <div className='flex items-center gap-3'>
              <Button variant='ghost' size='sm' asChild>
                <Link
                  href={BASIC_INFO.github}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Github size={20} />
                  <span className='sr-only'>GitHub</span>
                </Link>
              </Button>
              <Button variant='ghost' size='sm' asChild>
                <Link
                  href={BASIC_INFO.linkedIn}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Linkedin size={20} />
                  <span className='sr-only'>LinkedIn</span>
                </Link>
              </Button>
              <Button variant='ghost' size='sm' asChild>
                <Link href={`mailto:${BASIC_INFO.email}`}>
                  <Mail size={20} />
                  <span className='sr-only'>Email</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <h4 className='mb-4 font-semibold text-foreground text-sm uppercase tracking-wider'>
              Navigation
            </h4>
            <ul className='space-y-3'>
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className='text-muted-foreground hover:text-foreground text-sm transition-colors duration-200'
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resource links */}
          <div>
            <h4 className='mb-4 font-semibold text-foreground text-sm uppercase tracking-wider'>
              Resources
            </h4>
            <ul className='space-y-3'>
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className='text-muted-foreground hover:text-foreground text-sm transition-colors duration-200'
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className='pt-8 border-t border-border'>
          <div className='flex md:flex-row flex-col justify-between items-center gap-4'>
            <p className='text-muted-foreground text-sm'>
              © {currentYear} {BASIC_INFO.name}. All rights reserved.
            </p>
            <p className='flex items-center gap-1 text-muted-foreground text-sm'>
              Built with <Heart size={14} className='text-red-500' /> using
              Next.js and Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

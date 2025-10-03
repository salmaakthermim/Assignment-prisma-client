import { Button } from '@/components/ui/button';
import { BASIC_INFO } from '@/lib/contants';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section
      id='hero'
      className='flex justify-center items-center px-6 pt-20 min-h-screen'
    >
      <div className='mx-auto max-w-4xl container'>
        <div className='space-y-8 text-center'>
          {/* Main heading */}
          <div className='space-y-4'>
            <h1 className='font-bold text-4xl md:text-6xl lg:text-7xl text-balance'>
              <span className='text-foreground'>Towhid Karim</span>
            </h1>
            <p className='font-medium text-muted-foreground text-xl md:text-2xl'>
              Full Stack Engineer
            </p>
          </div>

          {/* Description */}
          <div className='mx-auto max-w-2xl'>
            <p className='text-muted-foreground text-lg md:text-xl text-balance leading-relaxed'>
              I build accessible, pixel-perfect digital experiences for the web.
              My favorite work lies at the intersection of design and
              development, creating experiences that not only look great but are
              meticulously built for performance and usability.
            </p>
          </div>

          {/* Social links */}
          <div className='flex justify-center items-center space-x-6'>
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
              <Link href={`mailto:towhidkarim123@gmail.com`}>
                <Mail size={20} />
                <span className='sr-only'>Email</span>
              </Link>
            </Button>
          </div>

          {/* CTA buttons */}
          <div className='flex sm:flex-row flex-col justify-center items-center gap-4 pt-4'>
            <Button size='lg' asChild>
              <Link href='#projects'>View My Work</Link>
            </Button>
            <Button variant='outline' size='lg' asChild>
              <Link href='#contact'>Get In Touch</Link>
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className='pt-12'>
            <Button variant='ghost' size='sm' asChild>
              <a href='#about' className='animate-bounce'>
                <ArrowDown size={20} />
                <span className='sr-only'>Scroll down</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

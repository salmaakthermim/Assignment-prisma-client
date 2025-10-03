import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Mail,
  MapPin,
  Download,
  Github,
  Linkedin,
  Twitter,
} from 'lucide-react';
import Image from 'next/image';
import { BASIC_INFO } from '@/lib/contants';
import Link from 'next/link';

const skills = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Express',
  'Python',
  'PostgreSQL',
  'MongoDB',
  'Drizzle',
  'Prisma',
  'Git',
];

export function AboutSection() {
  return (
    <section id='about' className='px-6 py-20'>
      <div className='mx-auto max-w-6xl container'>
        {/* Section header */}
        <div className='mb-16 text-center'>
          <h2 className='mb-4 font-bold text-foreground text-3xl md:text-4xl text-balance'>
            About Me
          </h2>
          <p className='mx-auto max-w-2xl text-muted-foreground text-lg text-balance'>
            Get to know more about my background, skills, and what drives my
            passion for development.
          </p>
        </div>

        <div className='gap-12 grid grid-cols-1 lg:grid-cols-3'>
          {/* Personal info and bio */}
          <div className='space-y-8 lg:col-span-2'>
            {/* Bio */}
            <div>
              <h3 className='mb-4 font-semibold text-foreground text-2xl'>
                Hello, I'm {BASIC_INFO.name}
              </h3>
              <div className='space-y-4 text-muted-foreground leading-relaxed'>
                <p>
                  I'm a passionate full-stack developer with experience in
                  creating digital solutions that make a difference. I
                  specialize in building scalable web applications using modern
                  technologies like React, Next.js, and Node.js.
                </p>
                <p>
                  My journey in tech started with a curiosity about how websites
                  work, which led me to pursue a degree in Computer Science.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new
                  technologies, contributing to open-source projects, or sharing
                  my knowledge through blog posts and mentoring.
                </p>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className='mb-4 font-semibold text-foreground text-xl'>
                Skills & Technologies
              </h3>
              <div className='flex flex-wrap gap-2'>
                {skills.map((skill) => (
                  <Badge key={skill} variant='secondary' className='text-sm'>
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className='space-y-6'>
            {/* Profile image */}
            <Card className='overflow-hidden'>
              <CardContent className='p-0'>
                <Image
                  src='/user-avatar.png'
                  alt='Profile picture'
                  width={300}
                  height={300}
                  className='w-full h-64 object-contain'
                />
              </CardContent>
            </Card>

            {/* Contact info */}
            <Card>
              <CardContent className='space-y-4 p-6'>
                <h3 className='font-semibold text-foreground text-lg'>
                  Contact Information
                </h3>
                <div className='space-y-3'>
                  <div className='flex items-center gap-3 text-muted-foreground'>
                    <Mail size={18} />
                    <Link
                      href='mailto:your.email@example.com'
                      className='hover:text-foreground transition-colors'
                    >
                      {BASIC_INFO.email}
                    </Link>
                  </div>
                  <div className='flex items-center gap-3 text-muted-foreground'>
                    <MapPin size={18} />
                    <span>Rajshai, Bangladesh</span>
                  </div>
                </div>

                {/* Social links */}
                <div className='pt-4 border-t border-border'>
                  <div className='flex items-center gap-3'>
                    <Button variant='ghost' size='sm' asChild>
                      <Link
                        href={BASIC_INFO.github}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <Github size={18} />
                      </Link>
                    </Button>
                    <Button variant='ghost' size='sm' asChild>
                      <Link
                        href={BASIC_INFO.linkedIn}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <Linkedin size={18} />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Download resume */}
                <Button className='w-full' asChild>
                  <Link href={BASIC_INFO.resume} download>
                    <Download size={18} className='mr-2' />
                    Download Resume
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

import { AboutSection } from '@/components/layout/aboutsection';
import { BlogSection } from '@/components/layout/blogsection';
import { Header } from '@/components/layout/header';
import { HeroSection } from '@/components/layout/herosection';
import { ProjectsSection } from '@/components/layout/projectsection';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <BlogSection />
      <AboutSection />
    </>
  );
}

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
}

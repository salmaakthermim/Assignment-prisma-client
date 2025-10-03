import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: number;
    email: string;
    name?: string;
  }

  interface Session {
    user: User;
  }
}

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_BACKEND_URL: string;
  }
}

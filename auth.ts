import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { email } from 'zod';
import { TResponse } from './zod/response.typeschema';
export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        const url = process.env.NEXT_PUBLIC_BACKEND_URL;

        const res = await fetch(`${url}/api/user/admin-sign-in`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: String(credentials.email),
            password: credentials.password,
          }),
        });

        const responseData: TResponse<{
          id: number;
          userName: string;
          email: string;
        } | null> = await res.json();

        user = responseData.data;
        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration

          throw new Error('Invalid credentials.');
        }

        // return user object with their profile data
        return user;
      },
    }),
  ],
});

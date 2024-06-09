import NextAuth, {
  AuthError,
  CredentialsSignin,
  DefaultSession,
} from 'next-auth';

import Credentials from 'next-auth/providers/credentials';
import { verify } from '@/lib/password';
import db from '@/lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  adapter: PrismaAdapter(db),
  secret: '34vb90&5gbi%%^&hj',
  session: { strategy: 'jwt', maxAge: 60 * 60 * 24 },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      return session;
    },
  },
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async function (credentials) {
        let user = null;
        user = await db.user.findUnique({
          where: { username: credentials.username },
        });

        if (!user) {
          throw new AuthError('User not found');
        }
        console.log('user', user);
        try {
          await verify(credentials.password, user.hashed_password);
        } catch (e) {
          throw new CredentialsSignin('Incorrect password');
        }

        // return user object with the their profile data
        return user;
      },
    }),
  ],
});

declare module 'next-auth' {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      username: string;
    } & DefaultSession['user'];
  }
}

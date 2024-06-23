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
        token.id = user.id!;
        token.username = user.username;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.username = token.username as string;
      return session;
    },
    redirect({ url, baseUrl }) {
      // Allow relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;

      // Allow callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url;

      // Fallback, go to home
      return baseUrl;
    },
  },
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username', type: 'text',  },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async function (credentials) {
        let user = null;
        if (!credentials.username) throw new AuthError('Username is required');
        if (!credentials.password) throw new AuthError('Password is required');

        user = await db.user.findUnique({
          where: { username: credentials.username as string },
        });

        if (!user) {
          throw new AuthError('User not found');
        }
        console.log('user', user);
        try {
          await verify(credentials.password as string, user.hashed_password);
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
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    username: string;
  }
  /**
   * The shape of the account object returned in the OAuth providers' `account` callback,
   * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
   */
  interface Account {}

  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session {
    /**
     * By default, TypeScript merges new interface properties and overwrites existing ones.
     * In this case, the default session user properties will be overwritten,
     * with the new ones defined above. To keep the default session user properties,
     * you need to add them back into the newly declared interface.
     */
    user: {
      username: string;
    } & DefaultSession['user'];
  }
}

// The `JWT` interface can be found in the `next-auth/jwt` submodule
// import { JWT } from 'next-auth/jwt';

// declare module 'next-auth/jwt' {
//   /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
//   interface JWT {
//     id: string;
//     username: string;
//   }
// }

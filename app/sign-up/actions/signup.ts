'use server';

import db from '@/lib/db';
import { saltAndHash } from '@/lib/password';

export async function signup(
  _currentState: string | undefined,
  formData: {
    get: (arg0: string) => string;
  }
) {
  if (formData.get('password') !== formData.get('confirm_password'))
    return "Passwords don't match";
  try {
    let user;
    user = await db.user.findFirst({
      where: {
        OR: [
          { username: formData.get('username') },
          { email: formData.get('email') },
        ],
      },
    });
    if (user)
      return 'User exists <a href="/api/auth/signin">Sign in instead?</a>';
    user = await db.user.create({
      data: {
        username: formData.get('username'),
        email: formData.get('email'),
        hashed_password: await saltAndHash(formData.get('password')),
      },
    });

    return user;
  } catch (error) {
    return error.message;
  }
}

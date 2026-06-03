'use client';

import * as React from 'react';

import { useFormState, useFormStatus } from 'react-dom';
import { signup } from '@/app/sign-up/_actions/signup';
import styles from './page.module.css';
import { XMarkIcon } from '@heroicons/react/16/solid';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className={styles.button} type="submit" disabled={pending}>
      {pending ? 'Creating account…' : 'Sign Up'}
    </button>
  );
}

export default function SignUp() {
  const [state, dispatch] = useFormState(signup, undefined);

  return (
    <div className="flex place-content-center items-center h-full">
      <button
        className="sm:hidden absolute top-4 right-4"
        onClick={() => window.history.back()}
      >
        <XMarkIcon className="size-8" />
      </button>
      <form className={styles.form} action={dispatch}>
        <label className={styles.label}>
          Username
          <input name="username" type="text" required autoComplete="username" />
        </label>
        <label className={styles.label}>
          Email
          <input name="email" type="email" required autoComplete="email" />
        </label>
        <label className={styles.label}>
          Password
          <input
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
          />
        </label>
        <label className={styles.label}>
          Confirm Password
          <input
            name="confirm_password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
          />
        </label>
        {state?.errorMessage && (
          <div className={styles.error}>
            <p>{state.errorMessage}</p>
          </div>
        )}

        <SubmitButton />
      </form>
    </div>
  );
}

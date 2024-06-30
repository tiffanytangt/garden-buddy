'use client';

import * as React from 'react';

import { useFormState } from 'react-dom';
import { signup } from '@/app/sign-up/_actions/signup';
import styles from './page.module.css';
import { XMarkIcon } from '@heroicons/react/16/solid';

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
          <input name="username" type="text" />
        </label>
        <label className={styles.label}>
          Email
          <input name="email" type="email" />
        </label>
        <label className={styles.label}>
          Password
          <input name="password" type="password" />
        </label>
        <label className={styles.label}>
          Confirm Password
          <input name="confirm_password" type="password" />
        </label>
        {state?.errorMessage && (
          <div className={styles.error}>
            <p dangerouslySetInnerHTML={{ __html: state.errorMessage }} />
          </div>
        )}

        <button className={styles.button} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

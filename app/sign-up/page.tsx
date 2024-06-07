'use client';

import * as React from 'react';

import { useFormState } from 'react-dom';
import { signup } from '@/app/sign-up/actions/signup';
import styles from './page.module.css';

export default function SignUp() {
  const [errorMessage, dispatch] = useFormState(signup, undefined);

  return (
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
      {errorMessage && (
        <div className={styles.error}>
          <p dangerouslySetInnerHTML={{ __html: errorMessage }} />
        </div>
      )}

      <button className={styles.button} type="submit">
        Sign Up
      </button>
    </form>
  );
}

'use client';

import { Button } from '@headlessui/react';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

function BackButton({ children }: Props) {
  return <Button onClick={() => window.history.back()}>{children}</Button>;
}

export default BackButton;

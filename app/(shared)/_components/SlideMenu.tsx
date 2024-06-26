import React from 'react';
import { Transition } from '@headlessui/react';

const SlideMenu = ({
  children,
  isOpen,
  slideDirection,
}: React.PropsWithChildren<{
  isOpen: boolean;
  slideDirection: 'up' | 'down';
}>) => {
  const transitionProps =
    slideDirection === 'up'
      ? {
          enterFrom: 'translate-y-3/4 opacity-0',
          enterTo: 'translate-y-0 opacity-100',
          leaveFrom: 'translate-y-0 opacity-100',
          leaveTo: 'translate-y-3/4 opacity-0',
        }
      : {
          enterFrom: '-translate-y-3/4 opacity-0',
          enterTo: 'translate-y-0 opacity-100',
          leaveFrom: 'translate-y-0 opacity-100',
          leaveTo: '-translate-y-3/4 opacity-0',
        };
  return (
    <Transition
      show={isOpen}
      enter="transition-all duration-200"
      leave="transition-all duration-200"
      {...transitionProps}
    >
      {children}
    </Transition>
  );
};

export default SlideMenu;

'use client';

import React, { useState, useRef } from 'react';
import { useClickOutside } from '@/app/_hooks/clickOutside';
import { Plant } from '@prisma/client';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid';
import { Transition } from '@headlessui/react';

export interface PlantCardProps {
  plant: Plant & { photo: { location: string } | null };
  image?: string;
  children?: React.ReactNode;
}

export const PlantCard: React.FC<PlantCardProps> = ({ plant, children }) => {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  useClickOutside([menuRef, buttonRef], () => setIsContextMenuOpen(false));

  return (
    <div
      className="rounded-sm overflow-hidden size-44 relative flex flex-col justify-end
      bg-cover bg-center bg-white dark:bg-neutral-800 text-white text-sm"
      title={plant.slug}
      style={{
        backgroundImage: `url("${plant.photo?.location || '/plant-default.jpeg'}")`,
      }}
    >
      {children}
      <Transition
        show={isContextMenuOpen}
        enter="transition-all duration-300"
        leave="transition-all duration-300"
        enterFrom="scale-y-.6 .opacity-0"
        enterTo="scale-y-100 .opacity-100"
        leaveFrom="scale-y-100 .opacity-100"
        leaveTo="scale-y-.6 o.pacity-0"
        >
        <div
          ref={menuRef}
          className="w-full border border-gray-300 bg-opacity-90 bg-white text-black p-3"
        >
          <div>Edit</div>
          <div>Delete</div>
        </div>
      </Transition>
      <div className="p-2 flex flex-row justify-between bg-emerald-800 dark:bg-emerald-950 opacity-90">
        <p className="text-white text-sm">{plant.displayName}</p>
        <div
          ref={buttonRef}
          className="size-4 hover:cursor-pointer"
          onClick={() => setIsContextMenuOpen(!isContextMenuOpen)}
        >
          {!isContextMenuOpen && <ChevronUpIcon className="size-4/>" />}
          {isContextMenuOpen && <ChevronDownIcon className="size-4/>" />}
        </div>
      </div>
    </div>
  );
};

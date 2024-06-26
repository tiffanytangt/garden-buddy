'use client';

import React, { useState, useRef } from 'react';
import { useClickOutside } from '@/app/(shared)/_hooks/clickOutside';
import { Plant } from '@prisma/client';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid';
import { deletePlant } from '../_actions/deletePlant';
import SlideMenu from '@/app/(shared)/_components/SlideMenu';

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
      <SlideMenu slideDirection='up' isOpen={isContextMenuOpen}>
        <div
          ref={menuRef}
          className="w-full border border-gray-300 bg-opacity-90 bg-white text-black p-3"
        >
          <button
            className="w-full text-justify"
            onClick={() => deletePlant(plant.id)}
          >
            Delete
          </button>
        </div>
      </SlideMenu>
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

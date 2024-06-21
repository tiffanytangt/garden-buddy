'use client';

import React, { useState, useRef } from 'react';
import { useClickOutside } from '@/app/_hooks/clickOutside';
import { Plant } from '@prisma/client';

export interface PlantCardProps {
  plant: Plant & { photo?: { location: string } };
  image?: string;
  children?: React.ReactNode;
}

export const PlantCard: React.FC<PlantCardProps> = ({
  plant,
  children,
}) => {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  useClickOutside([menuRef, buttonRef], () => setIsContextMenuOpen(false));

  return (
    <div className='rounded-sm overflow-hidden'>
      <div
        title={plant.slug}
        className="p-2 flex flex-row justify-between bg-emerald-800 dark:bg-emerald-950"
      >
        <p className="text-white text-sm">{plant.displayName}</p>
        <div
          ref={buttonRef}
          className="w-4 h-4 hover:cursor-pointer"
          style={{
            backgroundImage:
              'radial-gradient(circle, white 15%, transparent 20%)',
            backgroundSize: '100% 33.33%',
          }}
          onClick={() => setIsContextMenuOpen(!isContextMenuOpen)}
        />
      </div>
      <div
        className="h-96 p-2 relative bg-white dark:bg-neutral-800 dark:text-white bg-cover bg-center"
        style={{
          backgroundImage: `url("${plant.photo?.location || '/plant-default.jpeg'}")`,
        }}
      >
        {children}
        {isContextMenuOpen && (
          <div
            ref={menuRef}
            className="bg-white absolute top-0 right-0 text-black p-3"
          >
            <div>Edit</div>
            <div>Delete</div>
          </div>
        )}
      </div>
    </div>
  );
};

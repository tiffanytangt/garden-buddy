'use client';

import React, { useState, useRef } from 'react';
import { useClickOutside } from '@/app/(shared)/_hooks/clickOutside';
import { Plant } from '@prisma/client';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid';
import { deletePlant } from '../_actions/deletePlant';
import SlideMenu from '@/app/(shared)/_components/SlideMenu';
import UpdatePlantModal from './UpdatePlantModal';
import { Button } from '@headlessui/react';
import Link from 'next/link';

export type PlantCardProps = {
  plant: Plant & { photo: { location: string } | null };
};

export const PlantCard: React.FC<PlantCardProps> = ({ plant }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside([menuRef, buttonRef, modalRef], () =>
    setIsContextMenuOpen(false)
  );

  return (
    <div
      className="rounded-sm overflow-hidden size-44 relative flex flex-col justify-end
      bg-cover bg-center bg-white dark:bg-neutral-800 text-white text-sm"
      title={plant.slug}
      style={{
        backgroundImage: `url("${plant.photo?.location || '/plant-default.jpeg'}")`,
      }}
    >
      <Link href={`/plants/${plant.slug}`} className='h-full'/>
      <SlideMenu slideDirection="up" isOpen={isContextMenuOpen}>
        <div
          ref={menuRef}
          className="w-full border border-gray-300 bg-opacity-90 bg-white text-black p-3 flex flex-col items-start"
        >
          <Button onClick={() => setIsEditModalOpen(true)}>Edit</Button>
          <Button onClick={() => deletePlant(plant.id)}>Delete</Button>
        </div>
      </SlideMenu>
      <div
        ref={buttonRef}
        className="p-2 flex flex-row justify-between bg-emerald-800 dark:bg-emerald-950 opacity-90"
        onClick={() => setIsContextMenuOpen(!isContextMenuOpen)}
      >
        <p className="text-white text-sm">{plant.displayName}</p>
        <div className="size-4 hover:cursor-pointer">
          {!isContextMenuOpen && <ChevronUpIcon className="size-4/>" />}
          {isContextMenuOpen && <ChevronDownIcon className="size-4/>" />}
        </div>
      </div>
      <UpdatePlantModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        plant={plant}
      />
    </div>
  );
};

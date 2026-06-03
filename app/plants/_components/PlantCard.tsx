'use client';

import React, { useState } from 'react';
import { Plant } from '@prisma/client';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { deletePlant } from '../_actions/deletePlant';
import UpdatePlantModal from './UpdatePlantModal';
import Image from 'next/image';
import Link from 'next/link';

export type PlantCardProps = {
  plant: Plant & { photo: { location: string } | null };
};

export const PlantCard: React.FC<PlantCardProps> = ({ plant }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = () => {
    if (confirm(`Delete "${plant.displayName}"? This can't be undone.`)) {
      deletePlant(plant.id);
    }
  };

  return (
    <div
      className="group relative aspect-square w-full overflow-hidden rounded-2xl
      bg-gray-100 dark:bg-neutral-800 shadow-sm transition-shadow hover:shadow-md"
    >
      <Link href={`/plants/${plant.slug}`} className="block size-full">
        <Image
          src={plant.photo?.location || '/plant-default.jpeg'}
          alt={plant.displayName}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1280px) 25vw, 16vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-3 pt-8">
          <p className="truncate text-sm font-medium text-white drop-shadow">
            {plant.displayName}
          </p>
        </div>
      </Link>

      <Menu>
        <MenuButton
          aria-label={`Actions for ${plant.displayName}`}
          className="absolute right-1.5 top-1.5 rounded-full bg-black/30 p-1 text-white
          opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/50
          focus:opacity-100 group-hover:opacity-100"
        >
          <EllipsisVerticalIcon className="size-5" />
        </MenuButton>
        <MenuItems
          anchor="bottom end"
          className="z-50 w-32 rounded-xl border border-gray-200 bg-white py-1 text-sm shadow-lg
          [--anchor-gap:4px] dark:border-gray-700 dark:bg-neutral-800"
        >
          <MenuItem>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="block w-full px-3 py-1.5 text-left text-gray-800
              data-[focus]:bg-gray-100 dark:text-gray-100 dark:data-[focus]:bg-neutral-700"
            >
              Edit
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={handleDelete}
              className="block w-full px-3 py-1.5 text-left text-red-600
              data-[focus]:bg-red-50 dark:data-[focus]:bg-red-950/40"
            >
              Delete
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>

      <UpdatePlantModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        plant={plant}
      />
    </div>
  );
};

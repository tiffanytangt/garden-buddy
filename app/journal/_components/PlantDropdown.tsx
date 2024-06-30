import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import React from 'react';
import Image from 'next/image';

type Props = {
  value: string;
  onChange: (value: string) => void;
  plants: {
    id: number;
    displayName: string;
    photo: { location: string } | null;
  }[];
};

export default function PlantDropdown({ value, onChange, plants }: Props) {
  const selectedPlant = plants.find(({ id }) => id == +value);

  return (
    <Combobox
      as="div"
      className="block disabled:bg-gray-200"
      onChange={onChange}
      value={value}
    >
      <div className="relative text-black">
        <div className="absolute inset-y-0 left-0 flex items-center gap-2">
          {selectedPlant?.photo && (
            <Image
              src={selectedPlant.photo.location}
              width={50}
              height={50}
              className="size-10"
              alt="selected plant photo"
            />
          )}
        </div>
        <ComboboxInput
          disabled // Not a real input, just the box to open the dropdown
          className="w-full pl-12"
          placeholder="Select a plant"
          displayValue={() => selectedPlant?.displayName || ''}
        />
        <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5 w-full flex items-center justify-end">
          <ChevronDownIcon className="size-4  group-data-[hover]:fill-black" />
        </ComboboxButton>
        <ComboboxOptions
          anchor="bottom"
          className="bg-white text-black w-[var(--input-width)] border "
        >
          {plants.map((plant) => (
            <ComboboxOption
              key={plant.id}
              value={plant.id}
              className={'py-2 px-4 flex gap-4 items-center'}
            >
              {plant.photo && (
                <Image
                  src={plant.photo?.location}
                  alt={plant.displayName}
                  width={50}
                  height={50}
                  className="size-10"
                />
              )}
              {plant.displayName}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
}

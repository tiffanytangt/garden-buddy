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
import { Input } from '@/app/(shared)/_components/form';

type Props = {
  value: string;
  plants: {
    id: number;
    displayName: string;
    photo: { location: string } | null;
  }[];
} & (
  | {
      readonly: true;
      onChange?: never;
    }
  | {
      readonly?: false;
      onChange: (value: string) => void;
    }
);

export default function PlantDropdown({
  value,
  plants,
  readonly,
  ...props
}: Props) {
  const selectedPlant = plants.find(({ id }) => id == +value);
  return (
    <Combobox
      as="div"
      className="block disabled:bg-gray-200"
      onChange={readonly ? undefined : props.onChange}
      value={value}
      disabled={readonly}
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
          as={Input}
          disabled // Not a real input, just the box to open the dropdown
          className="w-full pl-12"
          placeholder="Select a plant"
          displayValue={() => selectedPlant?.displayName || ''}
        />
        {!readonly && (
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5 w-full flex items-center justify-end">
            <ChevronDownIcon className="size-4  group-data-[hover]:fill-black" />
          </ComboboxButton>
        )}
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

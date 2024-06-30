'use client';

import React from 'react';
import { GetPlantsResult } from '@/app/plants/_actions/getPlants';
import {
  Input,
  Field,
  Label,
  Description,
  Button,
  Textarea,
} from '@headlessui/react';
import { Controller, useForm } from 'react-hook-form';
import { ExclamationCircleIcon } from '@heroicons/react/16/solid';
import { addJournalEntry } from '../_actions/addJournalEntry';
import { ErrorMessage } from '@hookform/error-message';
import PlantDropdown from './PlantDropdown';
import { redirect } from 'next/navigation';

type Props = {
  plants: GetPlantsResult[];
};
type AddJournalEntryInputs = {
  plantId: string;
  photos: FileList;
  description: string;
  timestamp: string;
  type: string;
};

export default function JournalEntryForm({ plants }: Props) {
  const {
    register,
    control,
    trigger,
    getValues,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<AddJournalEntryInputs>();

  const disableFields = isSubmitting || !isDirty;

  return (
    <form
      className="flex flex-col gap-2"
      action={async (formData) => {
        if ((await trigger()) == false) return;
        // We need to set plantId because the Combobox field is not actually an input
        formData.set('plantId', getValues('plantId'));
        const entry = await addJournalEntry(formData);
        if (entry?.plantId) redirect('/plants/' + entry.plantId);
      }}
    >
      <Field disabled={disableFields}>
        <Label>Plant</Label>
        {errors.plantId && (
          <Description className="text-sm flex items-center gap-1 py-2 text-yellow-600">
            <ExclamationCircleIcon className="size-4" />
            <ErrorMessage errors={errors} name="plantId" />
          </Description>
        )}
        <Controller
          name="plantId"
          control={control}
          rules={{ required: 'Required' }}
          render={({ field }) => (
            <PlantDropdown
              value={field.value}
              onChange={field.onChange}
              plants={plants}
            />
          )}
        />
      </Field>
      <Field disabled={disableFields}>
        <Label>Note</Label>
        <Description className="text-sm font-extralight">optional</Description>
        <Textarea
          className="block w-full disabled:bg-gray-200 text-black h-32"
          {...register('description')}
        />
      </Field>
      <Field disabled={disableFields}>
        <Description>
          <small>Upload picture(s)</small>
        </Description>
        <Input
          {...register('photos')}
          type="file"
          accept="image/*"
          className="block w-full"
          multiple
        />
      </Field>
      <Field disabled={disableFields}>
        <Label>Date</Label>
        {errors.timestamp && (
          <Description className="text-sm flex items-center gap-1 py-2 text-yellow-600">
            <ExclamationCircleIcon className="size-4" />
            <ErrorMessage errors={errors} name="timestamp" />
          </Description>
        )}
        <Input
          type="date"
          defaultValue={new Date().toISOString().split('T')[0]}
          className="block w-full disabled:bg-gray-200 text-black"
          {...register('timestamp', { required: 'Required' })}
        />
      </Field>

      <div className="flex flex-col gap-4">
        <Button
          className="p-2 bg-emerald-800 text-white disabled:text-gray-400 mt-4"
          type="submit"
          disabled={disableFields}
        >
          Save Journal Entry
        </Button>
      </div>
    </form>
  );
}

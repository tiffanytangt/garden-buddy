'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { GetPlantsResult } from '@/app/plants/_actions/getPlants';
import { Field, Label, Description } from '@headlessui/react';
import { Controller, useForm } from 'react-hook-form';
import { ExclamationCircleIcon } from '@heroicons/react/16/solid';
import { addJournalEntry } from '../_actions/addJournalEntry';
import { compressImage } from '@/lib/compressImage';
import { ErrorMessage } from '@hookform/error-message';
import { redirect } from 'next/navigation';
import { TextArea, Input } from '@/app/(shared)/_components/form';
import { Button } from '@/app/(shared)/_components/Button';
import PlantDropdown from '@/app/(shared)/_components/PlantDropdown';

type Props = {
  plants: GetPlantsResult[];
  preselectedPlantId?: number;
  locked?: boolean;
};
type AddJournalEntryInputs = {
  plantId: string;
  photos: FileList;
  description: string;
  timestamp: string;
  type: string;
};

const requiredMark = <span className="text-yellow-600">*</span>;

export default function JournalEntryForm({
  plants,
  preselectedPlantId,
  locked,
}: Props) {
  const {
    register,
    control,
    trigger,
    watch,
    getValues,
    formState: { errors, isDirty },
  } = useForm<AddJournalEntryInputs>({
    defaultValues: {
      plantId: preselectedPlantId ? String(preselectedPlantId) : '',
    },
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const disableFields = submitting;

  // Preview the photos the user picked before they're uploaded
  const photos = watch('photos');
  const previews = useMemo(
    () =>
      photos
        ? Array.from(photos)
            .filter((file) => file.size > 0)
            .map((file) => ({
              name: file.name,
              url: URL.createObjectURL(file),
            }))
        : [],
    [photos]
  );
  useEffect(() => {
    // Avoid leaking object URLs when the selection changes / unmounts
    return () => previews.forEach((preview) => URL.revokeObjectURL(preview.url));
  }, [previews]);

  return (
    <form
      className="flex flex-col gap-2"
      action={async (formData) => {
        if ((await trigger()) == false) return;
        // We need to set plantId because the Combobox field is not actually an input
        formData.set('plantId', getValues('plantId'));
        setSubmitError(null);
        setSubmitting(true);
        let entry;
        try {
          // Compress images client-side before upload to keep the payload small
          const photos = formData.getAll('photos') as File[];
          formData.delete('photos');
          for (const photo of photos) {
            if (photo.size > 0)
              formData.append('photos', await compressImage(photo));
          }
          entry = await addJournalEntry(formData);
        } catch {
          setSubmitError('Something went wrong while saving. Please try again.');
          setSubmitting(false);
          return;
        }
        setSubmitting(false);
        // redirect() throws internally, so it must stay outside the try/catch
        if (entry?.plant?.slug)
          redirect('/plants/' + entry.plant.slug + '?newEntry=' + entry.id);
      }}
    >
      <Field disabled={disableFields}>
        <Label>Plant {requiredMark}</Label>
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
          render={({ field }) =>
            locked ? (
              <PlantDropdown readonly value={field.value} plants={plants} />
            ) : (
              <PlantDropdown
                value={field.value}
                onChange={field.onChange}
                plants={plants}
              />
            )
          }
        />
      </Field>
      <Field disabled={disableFields}>
        <Label>Date {requiredMark}</Label>
        <Description className="text-sm font-extralight">
          Defaults to today
        </Description>
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
      <Field disabled={disableFields}>
        <Label>Photos</Label>
        <Description className="text-sm font-extralight">optional</Description>
        <Input
          {...register('photos')}
          type="file"
          accept="image/*;capture=camera"
          className="block w-full"
          multiple
        />
        {previews.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {previews.map((preview) => (
              // eslint-disable-next-line @next/next/no-img-element -- blob: URLs aren't optimizable by next/image
              <img
                key={preview.url}
                src={preview.url}
                alt={preview.name}
                className="size-16 object-cover rounded"
              />
            ))}
          </div>
        )}
      </Field>
      <Field disabled={disableFields}>
        <Label>Note</Label>
        <Description className="text-sm font-extralight">optional</Description>
        <TextArea
          className="block w-full disabled:bg-gray-200 text-black h-32"
          {...register('description')}
        />
      </Field>

      <div className="flex flex-col gap-4">
        {submitError && (
          <Description className="text-sm flex items-center gap-1 py-2 text-yellow-600">
            <ExclamationCircleIcon className="size-4" />
            {submitError}
          </Description>
        )}
        <Button
          variant="primary"
          className=" mt-4"
          type="submit"
          disabled={disableFields || (!locked && !isDirty)}
        >
          {submitting ? 'Saving…' : 'Save Journal Entry'}
        </Button>
      </div>
    </form>
  );
}

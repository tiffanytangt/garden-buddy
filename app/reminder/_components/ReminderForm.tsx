'use client';

import React from 'react';
import { GetPlantsResult } from '@/app/plants/_actions/getPlants';
import { Field, Label } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { createReminder } from '../_actions/addReminder';
import { TextArea, Input } from '@/app/(shared)/_components/form';
import { Button } from '@/app/(shared)/_components/Button';
import ReminderChoosePlant from './ReminderChoosePlant';
import PlantDropdown from '@/app/(shared)/_components/PlantDropdown';
import FieldError from '@/app/(shared)/_components/form/FieldError';
import { redirect } from 'next/navigation';

type Props = {
  plants: GetPlantsResult[];
};
type AddReminderInputs = {
  plantId: string;
  title: string;
  description: string;
  timestamp: string;
  type: string;
};

export default function ReminderSteps({ plants }: Props) {
  const {
    register,
    trigger,
    setError,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<AddReminderInputs>();

  const disableFields = isSubmitting;
  const [step, setStep] = React.useState<'CHOOSE_PLANT' | 'REMINDER_DETAILS'>(
    'CHOOSE_PLANT'
  );
  const [plantId, setPlantId] = React.useState<number | null>();
  if (step === 'CHOOSE_PLANT') {
    return (
      <ReminderChoosePlant
        value={plantId}
        plants={plants}
        onPlantSelected={(plantId) => {
          setPlantId(plantId);
          setStep('REMINDER_DETAILS');
        }}
      />
    );
  }

  return (
    <form
      className="flex flex-col gap-2"
      action={async (formData) => {
        if ((await trigger()) == false) return;
        if (plantId) formData.set('plantId', `${plantId}`);
        try {
          await createReminder(formData);
        } catch (error) {
          setError('root', { message: 'Error creating reminder' });
        } finally {
          redirect('/');
        }
      }}
    >
      <Field disabled={disableFields}>
        <Label>Plant</Label>
        {plantId ? (
          <PlantDropdown plants={plants} value={`${plantId}`} readonly />
        ) : (
          <div className="text-gray-500 text-sm">No plant selected</div>
        )}
      </Field>
      <Field disabled={disableFields}>
        <Label>Title</Label>
        <FieldError message={errors.title?.message} />
        <Input
          type="text"
          className="block w-full"
          {...register('title', { required: 'Required', maxLength: 100 })}
        />
      </Field>
      <Field disabled={disableFields}>
        <Label>Details</Label>
        <FieldError message={errors.description?.message} />
        <TextArea className="block w-full" {...register('description')} />
      </Field>
      <Field disabled={disableFields}>
        <Label>Date</Label>
        <FieldError message={errors.timestamp?.message} />
        <Input
          type="datetime-local"
          defaultValue={new Date().toISOString().split('T')[0]}
          className="block w-full disabled:bg-gray-200 text-black"
          {...register('timestamp', { required: 'Required' })}
        />
      </Field>

      <div className="flex gap-4 mt-4 justify-between">
        <Button
          variant="secondary"
          type="submit"
          disabled={disableFields}
          onClick={() => setStep('CHOOSE_PLANT')}
        >
          Back
        </Button>
        <Button
          variant="primary"
          type="submit"
          disabled={disableFields || !isDirty}
        >
          Save
        </Button>
      </div>
      <FieldError message={errors.root?.message} level="error" />
    </form>
  );
}

'use client';

import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Label,
} from '@headlessui/react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const AddPlantModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <PlusCircleIcon className="size-16 text-emerald-800/10" />
      </button>
      <Dialog open={isOpen} className="relative z-50" onClose={() => null}>
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
          <DialogPanel className="h-1/2 sm:h-auto flex flex-col items-center justify-center max-w-lg border bg-white dark:bg-black p-10">
            <DialogTitle>New plant</DialogTitle>
            <form
              action={async (formData) => {
                await addPlant(formData);
                setIsOpen(false);
              }}
              className="flex flex-col gap-8"
            >
              <AddPlantFormFields onCancel={() => setIsOpen(false)} />
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default AddPlantModal;

import { useFormStatus } from 'react-dom';
import { addPlant } from '../_actions/addPlant';
import { Input } from '@/app/(shared)/_components/form';
import { Button } from '@/app/(shared)/_components/Button';
import { useForm, useFormState } from 'react-hook-form';

const AddPlantFormFields = ({ onCancel }: { onCancel: () => void }) => {
  const { pending } = useFormStatus();
  const { control, register } = useForm();
  const { isDirty } = useFormState({ control, name: ['name', 'photo'] });

  return (
    <div className="flex flex-col gap-8">
      dirty? {isDirty ? 'yes' : 'no'}
      <Field disabled={pending}>
        <Label>Plant name:</Label>
        <Input
          {...register('name', { required: 'Required' })}
          type="text"
          placeholder="name"
          className="block w-full disabled:bg-gray-200 text-black"
        />
      </Field>
      <Field disabled={pending}>
        <Description>
          <small>Upload a picture to easily view your plants at a glance</small>
        </Description>
        <Input
          {...register('photo')}
          type="file"
          accept="image/*;capture=camera"
          className="block w-full"
        />
      </Field>
      <div className="flex flex-col gap-4">
        <Button variant="primary" type="submit" disabled={pending}>
          Save Plant
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            if (
              !isDirty ||
              confirm('Are you sure you want to discard your changes?')
            )
              onCancel();
          }}
          disabled={pending}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

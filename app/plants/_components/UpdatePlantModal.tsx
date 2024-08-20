'use client';

import {
  Dialog,
  DialogPanel,
  Field,
  Label,
  Button,
  Input,
  Description,
} from '@headlessui/react';
import Image from 'next/image';
import { Plant } from '@prisma/client';
import { updatePlant } from '../_actions/updatePlant';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useFormStatus } from 'react-dom';

function UpdatePlant({
  isOpen,
  onClose,
  plant,
}: {
  isOpen: boolean;
  onClose: () => void;
  plant: Plant & { photo: { location: string } | null };
}) {
  const {
    register,
    trigger,
    formState: { errors, isSubmitting, isDirty, isValidating },
  } = useForm();

  const { pending } = useFormStatus();
  const disableSubmit = isValidating || isSubmitting || !isDirty;
  return (
    <Dialog open={isOpen} className="relative z-50" onClose={onClose}>
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
        <DialogPanel className="flex flex-col items-center justify-center max-w-lg sm:border bg-white dark:bg-black p-10 gap-5 ">
          {plant.photo && (
            <div className="w-full aspect-square overflow-hidden">
              <Image
                alt={`${plant.slug}-photo`}
                src={plant.photo.location}
                width={100}
                height={100}
                className="w-full"
              />
            </div>
          )}
          <form
            className="flex flex-col gap-8"
            action={async (formData) => {
              if ((await trigger()) == false) return;
              await updatePlant(plant.id, formData);
              onClose();
            }}
          >
            <div className="flex flex-col gap-8">
              <Field disabled={pending}>
                <Label>Plant name:</Label>
                {errors.name && (
                  <Description className="text-red-500">
                    <ErrorMessage errors={errors} name="name" />
                  </Description>
                )}
                <Input
                  {...register('name', { required: true, maxLength: 50 })}
                  type="text"
                  placeholder="name"
                  className="block w-full disabled:bg-gray-200 text-black"
                  defaultValue={plant.displayName}
                />
              </Field>
              <Field disabled={pending}>
                <Input
                  {...register('photo')}
                  name="photo"
                  type="file"
                  accept="image/*;capture=camera"
                  className="block w-full"
                />
              </Field>

              <div className="flex flex-col gap-4">
                <Button
                  className="p-2 bg-emerald-800 text-white disabled:text-gray-400 mt-4"
                  type="submit"
                  disabled={disableSubmit}
                >
                  Save Plant
                </Button>
                <Button
                  className="p-2 bg-slate-800 text-white disabled:text-gray-400"
                  onClick={() => {
                    if (
                      confirm('Are you sure you want to discard your changes?')
                    )
                      onClose();
                  }}
                  disabled={pending}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default UpdatePlant;

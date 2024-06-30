'use server';

import db from '@/lib/db';
import { cache } from 'react';
import Prisma from '@prisma/client';

interface getPlantOptions {
  sortBy?: keyof Prisma.Prisma.PlantOrderByWithRelationInput;
}
export const getPlants = cache(
  (userId: string, { sortBy: orderBy }: getPlantOptions) => {
    return db.plant.findMany({
      where: { userId: userId },
      include: { photo: true },
      orderBy: {
        ...(orderBy && { [orderBy]: 'desc' }),
      },
    });
  }
);

export type GetPlantsResult = Prisma.Plant & {
  photo: { location: string } | null;
};

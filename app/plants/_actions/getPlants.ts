'use server';

import db from '@/lib/db';
import { cache } from 'react';
import Prisma from '@prisma/client';

interface getPlantOptions {
  sortBy?: keyof Prisma.Prisma.PlantOrderByWithRelationInput;
  limit?: number;
}
export const getPlants = cache(
  (userId: string, { sortBy: orderBy, limit: take }: getPlantOptions) => {
    return db.plant.findMany({
      where: { userId: userId },
      include: { photo: true },
      orderBy: {
        ...(orderBy && { [orderBy]: 'desc' }),
      },
      take,
    });
  }
);

export type GetPlantsResult = Prisma.Plant & {
  photo: { location: string } | null;
};

import db from "@/lib/db";
import { cache } from "react";

export const getPlants = cache((userId: string) => {
    return db.plant.findMany({
      where: { userId: userId},
      include: { photo: true },
    })
  });
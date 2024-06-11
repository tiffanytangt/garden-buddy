import db from '@/lib/db';
import * as React from 'react';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { PlantCard } from './_components/PlantCard';
import { addPlant } from './_actions/addPlant';

export default async function Plants() {
  const session = await auth();

  if (!session?.user) return redirect('/');

  const plants = db.plant.findMany({ where: { userId: session?.user.id } });

  return (
    <>
      <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-6 py-6">
        {(await plants).map((plant) => {
          return <PlantCard key={plant.id} plant={plant} />;
        })}

        {/* temporary form for adding plants */}
        <div className="h-full p-4 border-2 border-dotted rounded-sm border-opacity-20">
          <form className="h-full flex flex-col m-auto text-center gap-4 justify-center" action={addPlant}>
            <input name="name" type="text" placeholder='name' />
            <button className="p-2 bg-emerald-800  text-white" type="submit">
              Add Plant
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

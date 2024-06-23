import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { PlantCard } from './_components/PlantCard';
import { addPlant } from './_actions/addPlant';
import { getPlants } from './_actions/getPlants';
import { Button } from '@headlessui/react';

export default async function Plants() {
  const session = await auth();
  if (!session?.user.id) return redirect('/');
  const plants = await getPlants(session.user.id);

  return (
    <>
      <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-6 py-6">
        {plants.map((plant) => {
          return <PlantCard key={plant.id} plant={plant} />;
        })}

        {/* temporary form for adding plants */}
        <div className="h-full p-4 border-2 border-dotted rounded-sm border-opacity-20">
          <form
            className="h-full flex flex-col m-auto text-center gap-4 justify-center"
            action={addPlant}
          >
            <input name="name" type="text" placeholder="name" />
            <input name="photo" type="file" accept=".png, .jpg, .jpeg" />
            <Button className="p-2 bg-emerald-800 text-white" type="submit">
              Add Plant
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

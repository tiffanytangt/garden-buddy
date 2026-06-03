import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { PlantCard } from './_components/PlantCard';
import { getPlants } from './_actions/getPlants';
import AddPlantModal from './_components/AddPlantModal';

export default async function Plants() {
  const session = await auth();
  if (!session?.user.id) return redirect('/');
  const plants = await getPlants(session.user.id, { sortBy: 'createdAt' });

  return (
    <div className="container mx-auto flex flex-col gap-6">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-extralight sm:text-3xl">My Plants</h1>
        {plants.length > 0 && (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {plants.length} {plants.length === 1 ? 'plant' : 'plants'}
          </span>
        )}
      </div>

      {plants.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <h2 className="text-lg font-medium">Your garden is empty</h2>
          <p className="max-w-xs text-sm text-gray-500 dark:text-gray-400">
            Add your first plant to start tracking its growth with photos and
            journal entries.
          </p>
          <AddPlantModal
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-800 px-5 py-2.5 font-medium text-white transition-colors hover:bg-emerald-700"
            trigger={
              <>
                <PlusCircleIcon className="size-5" />
                Add your first plant
              </>
            }
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {plants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
          <AddPlantModal
            className="flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-2xl border-[3px] border-dashed border-emerald-800/15 text-emerald-800/40 transition-colors hover:border-emerald-800/30 hover:text-emerald-800/60 dark:border-emerald-200/10 dark:text-emerald-200/30 dark:hover:border-emerald-200/20 dark:hover:text-emerald-200/50"
            trigger={
              <>
                <PlusCircleIcon className="size-10" />
                <span className="text-sm font-medium">Add plant</span>
              </>
            }
          />
        </div>
      )}
    </div>
  );
}

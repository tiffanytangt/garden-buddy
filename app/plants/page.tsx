import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { PlantCard } from './_components/PlantCard';
import { getPlants } from './_actions/getPlants';
import AddPlantModal from './_components/AddPlantModal';

export default async function Plants() {
  const session = await auth();
  if (!session?.user.id) return redirect('/');
  const plants = await getPlants(session.user.id);

  return (
    <div
      className="container mx-auto grid justify-items-center
      grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 py-6"
    >
      <div className="size-44 p-4 border-4 border-dashed border-emerald-800 border-opacity-10 rounded-sm content-center text-center">
        <AddPlantModal  />
      </div>
      {plants.map((plant) => {
        return <PlantCard key={plant.id} plant={plant} />;
      })}
    </div>
  );
}

import Link from 'next/link';

type MyPlantsProps = {
  plants: {
    id: number;
    displayName: string;
    photo: {
      location: string;
    } | null;
    slug: string;
  }[];
};
export default function MyPlants({ plants }: MyPlantsProps) {
  return (
    <>
      <div className="flex justify-between items-center mb-4 sm:mb-2">
        <h2 className="text-sm font-bold">My Plants</h2>
        <Link href="/plants" className="text-emerald-600 font-medium">
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plants.map((plant) => {
          return (
            <Link key={plant.id} href={`/plants/${plant.slug}`}>
              <div
                className="rounded-sm overflow-hidden bg-cover bg-center"
                title={plant.displayName}
                style={{
                  backgroundImage: `url("${plant.photo?.location || '/plant-default.jpeg'}")`,
                }}
              >
                <div className="h-32 pl-4 pb-1 flex text-white text-lg font-extralight items-end bg-gradient-to-b from-zinc-100/50 to-zinc-950">
                  {plant.displayName}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

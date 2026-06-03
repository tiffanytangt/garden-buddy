import Link from 'next/link';
import Image from 'next/image';

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
        {plants.map((plant) => (
          <Link
            key={plant.id}
            href={`/plants/${plant.slug}`}
            className="group relative block h-32 overflow-hidden rounded-2xl"
            title={plant.displayName}
          >
            <Image
              src={plant.photo?.location || '/plant-default.jpeg'}
              alt={plant.displayName}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-3 pt-8">
              <span className="text-white text-sm font-medium drop-shadow">
                {plant.displayName}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

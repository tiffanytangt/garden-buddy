import { useState } from 'react';
import { GetPlantsResult } from '@/app/plants/_actions/getPlants';
import { Button } from '@/app/(shared)/_components/Button';
import PlantDropdown from '@/app/(shared)/_components/PlantDropdown';
type ReminderChoosePlantProps = {
  value?: number | null;
  plants: GetPlantsResult[];
  onPlantSelected: (plantId: number | null) => void;
};
export default function ReminderChoosePlant({
  value,
  onPlantSelected,
  plants,
}: ReminderChoosePlantProps) {
  const [isPlantScoped, setIsPlantScoped] = useState<boolean | undefined>(
    value === null ? false : value ? true : undefined
  );
  const [currentValue, setCurrentValue] = useState<string | undefined>(
    value ? `${value}` : undefined
  );

  return (
    <div className="flex flex-col gap-4 min-h-72">
      <div>Is this reminder for a specific plant?</div>
      <div className="flex gap-4">
        <Button
          variant={isPlantScoped ? 'primary' : 'secondary'}
          onClick={() => setIsPlantScoped(true)}
        >
          Yes
        </Button>
        <Button
          variant={isPlantScoped === false ? 'primary' : 'secondary'}
          onClick={() => {
            setIsPlantScoped(false);
            setCurrentValue(undefined);
          }}
        >
          No
        </Button>
      </div>
      {isPlantScoped && (
        <div className="flex flex-col gap-2">
          <PlantDropdown
            plants={plants}
            onChange={(plantId) => {
              setCurrentValue(plantId);
            }}
            value={currentValue ?? ''}
          />
        </div>
      )}
      {(isPlantScoped === false || (isPlantScoped && currentValue)) && (
        <Button
          variant="primary"
          onClick={() => {
            onPlantSelected(currentValue ? +currentValue : null);
          }}
        >
          Next
        </Button>
      )}
    </div>
  );
}

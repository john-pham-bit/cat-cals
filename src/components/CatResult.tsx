import { FC } from "react";
import { calculateCals, CatType } from "../utils/CalculateCals";

type CatResultProps = {
  catType: CatType;
  catWeight: number;
};

const CatForm: FC<CatResultProps> = ({ catType, catWeight }) => {
  const calories = calculateCals(catType, catWeight);

  return (
    <>
      <div className="p-2">
        <h2 className="text-2xl font-bold">Feeding recommendation</h2>
        <h3 className="ml-2 text-xl">{calories} kcal / day</h3>
      </div>
    </>
  );
};

export default CatForm;

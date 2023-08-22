import { FC, useEffect, useState } from "react";
import CalorieThresholds from "../data/CalThresholds.json";
import { CatType } from "../utils/CalculateCals";

type CatFormProps = {
  catType: CatType;
  setNewCatType: (newCatType: CatType) => void;
  setNewCatWeight: (newCatWeight: number) => void;
};

const CatForm: FC<CatFormProps> = ({
  catType,
  setNewCatType,
  setNewCatWeight,
}) => {
  const [catWeightString, setNewCatWeightString] = useState("7.5");

  useEffect(() => {
    let parsedWeight = parseFloat(catWeightString);
    if (!Number.isNaN(parsedWeight)) {
      setNewCatWeight(parsedWeight);
    }
  }, [catWeightString]);

  const catTypes = CalorieThresholds.catTypes;
  const catTypeLabels = CalorieThresholds.catTypeLabels;

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col p-1.5"
        action=""
      >
        <label htmlFor="cat-type" className="text-xl">
          Cat Type
        </label>
        <select
          name="cat-type"
          id="cat-type"
          value={catType}
          onChange={(e) => setNewCatType(e.target.value as CatType)}
          className="rounded-lg border-2 border-black bg-slate-50 p-1.5 text-xl"
        >
          {catTypes.map((catTypeOption, i) => {
            return (
              <option key={catTypeOption} value={catTypeOption}>
                {catTypeLabels[i]}
              </option>
            );
          })}
        </select>
        <label htmlFor="cat-weight" className="text-xl">
          Cat Weight
        </label>
        <input
          type="number"
          name="cat-weight"
          id="cat-weight"
          min="5"
          max="20"
          step="0.1"
          value={catWeightString}
          onChange={(e) => setNewCatWeightString(e.target.value)}
          className="rounded-lg border-2 border-black bg-slate-50 p-1.5 text-xl 
          [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
      </form>
    </>
  );
};

export default CatForm;

import { useState } from "react";
import CatForm from "./CatForm";
import CatResult from "./CatResult";
import { CatType } from "../utils/CalculateCals";
import CalorieTable from "./CalorieTable";

function CatCalculator() {
  const [catType, setNewCatType] = useState<CatType>("typical-neutered");
  const [catWeight, setNewCatWeight] = useState(7.5);

  return (
    <>
      <div className="flex h-full flex-col justify-between sm:w-full lg:max-w-screen-md">
        <div>
          <div className="mb-8">
            <CatForm
              catType={catType}
              setNewCatType={setNewCatType}
              setNewCatWeight={setNewCatWeight}
            />
          </div>
          <CatResult catType={catType} catWeight={catWeight} />
        </div>
        <div className="sm:mb-10">
          <CalorieTable catType={catType} />
        </div>
      </div>
    </>
  );
}

export default CatCalculator;

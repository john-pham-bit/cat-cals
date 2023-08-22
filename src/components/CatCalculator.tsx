import { useState } from "react";
import CatForm from "./CatForm";
import CatResult from "./CatResult";
import { CatType } from "../utils/CalculateCals";

function CatCalculator() {
  const [catType, setNewCatType] = useState<CatType>("typical-neutered");
  const [catWeight, setNewCatWeight] = useState(7.5);

  return (
    <>
      <div className="w-full">
        <div className="mb-8 w-full">
          <CatForm
            catType={catType}
            setNewCatType={setNewCatType}
            setNewCatWeight={setNewCatWeight}
          />
        </div>
        <div className="w-full">
          <CatResult catType={catType} catWeight={catWeight} />
        </div>
      </div>
    </>
  );
}

export default CatCalculator;

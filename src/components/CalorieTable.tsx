import { FC, useState } from "react";
import { CatType } from "../utils/CalculateCals";
import CalorieThresholds from "../data/CalThresholds.json";

type CalorieTableProps = {
  catType: CatType;
};

function getLabelFromType(catType: CatType): string {
  const catTypes = CalorieThresholds.catTypes;
  const catTypeLabels = CalorieThresholds.catTypeLabels;

  let label = "";
  for (let i = 0; i < catTypes.length; ++i) {
    if (catTypes[i] == catType) {
      label = catTypeLabels[i];
      break;
    }
  }
  return label;
}

const CatForm: FC<CalorieTableProps> = ({ catType }) => {
  // using a separate state for display so it can animate on catType change
  const [displayCatType, setDisplayCatType] =
    useState<CatType>("typical-neutered");

  const weightThresholds = CalorieThresholds.weightThresholds;
  const calThresholds = CalorieThresholds[displayCatType];

  let weightToCal = weightThresholds.map((weight, i) => {
    return { weight, calories: calThresholds[i], id: crypto.randomUUID() };
  });

  function getAnimation() {
    if (catType == displayCatType) {
      return "animate-dropin";
    }
    return "animate-dropout";
  }

  function onAnimationEnd(e: React.AnimationEvent<HTMLDivElement>) {
    e.currentTarget.classList.remove("animate-dropin");
    e.currentTarget.classList.remove("animate-dropout");

    if (catType != displayCatType) {
      setDisplayCatType(catType);
      e.currentTarget.classList.add("opacity-0");
    } else {
      // full animation is over when the displayCatType has been updated
      e.currentTarget.classList.remove("opacity-0");
    }
  }

  return (
    <>
      <div
        className={`flex flex-col justify-center p-2
        ${getAnimation()}`}
        onAnimationEnd={onAnimationEnd}
      >
        <table className="border-collapse">
          <colgroup>
            <col span={1} className="w-1/2" />
            <col span={1} className="w-1/2" />
          </colgroup>
          <thead>
            <tr>
              <th className="text-xl font-bold" colSpan={2}>
                {getLabelFromType(displayCatType)}
              </th>
            </tr>
            <tr>
              <th className="border-2 border-black bg-gray-500 text-white">
                Weight
              </th>
              <th className="border-2 border-black bg-gray-500 text-white">
                kcal / day
              </th>
            </tr>
          </thead>
          <tbody>
            {weightToCal.map((row) => {
              return (
                <tr key={row.id}>
                  <td className="border-2 border-black bg-slate-50 text-center">
                    {row.weight}
                  </td>
                  <td className="border-2 border-black bg-slate-50 text-center">
                    {row.calories}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CatForm;

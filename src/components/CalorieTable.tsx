import { FC } from "react";
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
  const weightThresholds = CalorieThresholds.weightThresholds;
  const calThresholds = CalorieThresholds[catType];

  let weightToCal = weightThresholds.map((weight, i) => {
    return { weight, calories: calThresholds[i], id: crypto.randomUUID() };
  });

  return (
    <>
      <div className="flex flex-col justify-center p-2">
        <h2 className="text-center text-xl font-bold">
          {getLabelFromType(catType)}
        </h2>
        <table className="border-collapse">
          <thead>
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

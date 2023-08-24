import { FC, useState } from "react";
import { CatType } from "../utils/CalculateCals";
import CalorieThresholds from "../data/CalThresholds.json";
import catImage1 from "../assets/cat1.png";
import catImage2 from "../assets/cat2.png";
import catImage3 from "../assets/cat3.png";
import catImage4 from "../assets/cat4.png";

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

  const catTypeToCatImage = new Map<CatType, React.ReactElement>();
  catTypeToCatImage.set(
    "typical-neutered",
    <CatFormImage image={catImage1} altText="An orange cat." styling="h-44" />,
  );
  catTypeToCatImage.set(
    "typical-intact",
    <CatFormImage image={catImage2} altText="An green cat." styling="h-40" />,
  );
  catTypeToCatImage.set(
    "typical-prone-to-gain",
    <CatFormImage image={catImage3} altText="An gray cat." styling="h-44" />,
  );
  catTypeToCatImage.set(
    "diet",
    <CatFormImage
      image={catImage4}
      altText="A cat in a shirt."
      styling="h-52 -translate-x-16 -translate-y-8"
    />,
  );

  function getTableAnimation() {
    if (catType == displayCatType) {
      return "animate-dropin";
    }
    return "animate-dropout";
  }

  function onTableAnimationEnd(e: React.AnimationEvent<HTMLDivElement>) {
    e.currentTarget.classList.remove("animate-dropin");
    e.currentTarget.classList.remove("animate-dropout");

    const animatedCatImage = document.querySelector("#animated-cat-image");
    if (catType != displayCatType) {
      // animate-dropout ended
      setDisplayCatType(catType);
      e.currentTarget.classList.add("opacity-0");

      animatedCatImage?.classList.remove("animate-catimage");
    } else {
      // animate-dropin ended
      e.currentTarget.classList.remove("opacity-0");

      // animate the cat image again
      animatedCatImage?.classList.add("animate-catimage");
    }
  }

  return (
    <>
      <div
        className={`relative flex flex-col justify-center p-2
        ${getTableAnimation()}`}
        onAnimationEnd={onTableAnimationEnd}
      >
        <div id="animated-cat-image" className={`relative`}>
          <div className="absolute right-0 top-0 z-0 h-40 -translate-x-8 translate-y-8">
            {catTypeToCatImage.get(displayCatType)}
          </div>
        </div>
        <table className="z-10 border-collapse">
          <colgroup>
            <col span={1} className="w-1/2" />
            <col span={1} className="w-1/2" />
          </colgroup>
          <thead>
            <tr>
              <th
                className="border-2 border-black bg-gray-500 text-xl font-bold text-white"
                colSpan={2}
              >
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

type CatFormImageProps = {
  image: string;
  altText: string;
  styling: string;
};

const CatFormImage: FC<CatFormImageProps> = ({ image, altText, styling }) => {
  return (
    <>
      <img src={image} alt={altText} className={`${styling}`} />
    </>
  );
};

export default CatForm;

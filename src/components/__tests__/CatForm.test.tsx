import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CatForm from "../CatForm";
import { vi } from "vitest";
import { ReactElement } from "react";

function setup(jsx: ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

describe("CatForm", () => {
  let onChangeCatType: () => void;
  let onChangeCatWeight: () => void;

  beforeEach(() => {
    onChangeCatType = vi.fn();
    onChangeCatWeight = vi.fn();
  });

  it("calls the onChange callback handler for cat type", async () => {
    const { user } = setup(
      <CatForm
        catType={"typical-neutered"}
        setNewCatType={onChangeCatType}
        setNewCatWeight={onChangeCatWeight}
      />,
    );

    expect(onChangeCatType).toHaveBeenCalledTimes(0);

    const catTypeField = screen.getByLabelText(/Cat Type/);

    await user.selectOptions(catTypeField, screen.getByText(/intact/));
    expect(onChangeCatType).toHaveBeenCalledTimes(1);

    await user.selectOptions(catTypeField, screen.getByText(/intact/));
    expect(onChangeCatType).toHaveBeenCalledTimes(2);

    await user.selectOptions(catTypeField, screen.getByText(/neutered/));
    expect(onChangeCatType).toHaveBeenCalledTimes(3);
  });

  it("calls the onChange callback handler for cat weight only for valid number inputs", async () => {
    const { user } = setup(
      <CatForm
        catType={"typical-neutered"}
        setNewCatType={onChangeCatType}
        setNewCatWeight={onChangeCatWeight}
      />,
    );

    // it is called once initially with the default value
    expect(onChangeCatWeight).toHaveBeenCalledTimes(1);

    const catWeightField = screen.getByLabelText(/Cat Weight/);

    await user.clear(catWeightField);
    expect(onChangeCatWeight).toHaveBeenCalledTimes(1);

    await user.type(catWeightField, "111");
    expect(catWeightField).toHaveDisplayValue("111");
    expect(onChangeCatWeight).toHaveBeenCalledTimes(4);

    await user.type(catWeightField, "{backspace}");
    expect(catWeightField).toHaveDisplayValue("11");
    expect(onChangeCatWeight).toHaveBeenCalledTimes(5);

    await user.type(catWeightField, ".");
    expect(catWeightField).toHaveDisplayValue("11");
    await user.type(catWeightField, "5");
    expect(catWeightField).toHaveDisplayValue("11.5");
    expect(onChangeCatWeight).toHaveBeenCalledTimes(6);
  });
});

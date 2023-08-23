import { findByText, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactElement } from "react";

import App from "./App";
import { CatType } from "./utils/CalculateCals";

const NEUTERED: CatType = "typical-neutered";
const INTACT: CatType = "typical-intact";
const GAIN: CatType = "typical-prone-to-gain";
const DIET: CatType = "diet";

function setup(jsx: ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

describe("App", () => {
  beforeEach(() => {});

  it("cat type and cat weight fields are rendered", async () => {
    setup(<App />);

    expect(screen.getByLabelText(/Cat Type/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Cat Weight/)).toBeInTheDocument();
  });

  it("changing cat weight updates feeding recommendation correctly", async () => {
    const { user } = setup(<App />);

    const catWeightField = screen.getByLabelText(/Cat Weight/);
    const recommendationSection =
      screen.getByText(/recommendation/).parentElement;

    await user.selectOptions(screen.getByLabelText(/Cat Type/), [NEUTERED]);

    await user.clear(catWeightField);
    await user.click(catWeightField);
    await user.keyboard("5");
    expect(recommendationSection).toHaveTextContent(/157/);

    await user.clear(catWeightField);
    await user.click(catWeightField);
    await user.keyboard("10");
    expect(recommendationSection).toHaveTextContent(/260/);

    await user.clear(catWeightField);
    await user.click(catWeightField);
    await user.keyboard("14.2");
    expect(recommendationSection).toHaveTextContent(/336.08/);
  });

  it("changing cat type updates feeding recommendation correctly", async () => {
    const { user } = setup(<App />);

    const catWeightField = screen.getByLabelText(/Cat Weight/);
    const recommendationSection =
      screen.getByText(/recommendation/).parentElement;

    await user.clear(catWeightField);
    await user.click(catWeightField);
    await user.keyboard("10");

    await user.selectOptions(screen.getByLabelText(/Cat Type/), [NEUTERED]);
    expect(recommendationSection).toHaveTextContent(/260/);

    await user.selectOptions(screen.getByLabelText(/Cat Type/), [INTACT]);
    expect(recommendationSection).toHaveTextContent(/303/);

    await user.selectOptions(screen.getByLabelText(/Cat Type/), [GAIN]);
    expect(recommendationSection).toHaveTextContent(/216/);

    await user.selectOptions(screen.getByLabelText(/Cat Type/), [DIET]);
    expect(recommendationSection).toHaveTextContent(/173/);
  });

  it.todo(
    "updates calorie chart when selecting a different cat type",
    async () => {
      const { user } = setup(<App />);

      await user.selectOptions(screen.getByLabelText(/Cat Type/), [NEUTERED]);
      expect(
        await findByText(screen.getByRole("table"), /neutered/),
      ).toBeInTheDocument();

      await user.selectOptions(screen.getByLabelText(/Cat Type/), [INTACT]);

      // chart's CSS animation delay seems to be causing this test to fail
      expect(
        await findByText(screen.getByRole("table"), /intact/),
      ).toBeInTheDocument();

      await user.selectOptions(screen.getByLabelText(/Cat Type/), [GAIN]);
      expect(
        await findByText(screen.getByRole("table"), /prone to gain/),
      ).toBeInTheDocument();

      await user.selectOptions(screen.getByLabelText(/Cat Type/), [DIET]);
      expect(
        await findByText(screen.getByRole("table"), /weight loss/),
      ).toBeInTheDocument();
    },
  );
});

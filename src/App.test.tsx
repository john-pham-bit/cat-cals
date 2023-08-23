import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactElement } from "react";

import App from "./App";

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

    await user.selectOptions(
      screen.getByLabelText(/Cat Type/),
      screen.getByText(/neutered/),
    );

    await user.clear(catWeightField);
    await user.click(catWeightField);
    await user.keyboard("5");
    expect(screen.getByText(/157/)).toBeInTheDocument();

    await user.clear(catWeightField);
    await user.click(catWeightField);
    await user.keyboard("10");
    expect(screen.getByText(/260/)).toBeInTheDocument();

    await user.clear(catWeightField);
    await user.click(catWeightField);
    await user.keyboard("14.2");
    expect(screen.getByText(/336.08/)).toBeInTheDocument();
  });

  it("changing cat type updates feeding recommendation correctly", async () => {
    const { user } = setup(<App />);

    const catWeightField = screen.getByLabelText(/Cat Weight/);

    await user.clear(catWeightField);
    await user.click(catWeightField);
    await user.keyboard("10");

    await user.selectOptions(
      screen.getByLabelText(/Cat Type/),
      screen.getByText(/neutered/),
    );
    expect(screen.getByText(/260/)).toBeInTheDocument();

    await user.selectOptions(
      screen.getByLabelText(/Cat Type/),
      screen.getByText(/intact/),
    );
    expect(screen.getByText(/303/)).toBeInTheDocument();

    await user.selectOptions(
      screen.getByLabelText(/Cat Type/),
      screen.getByText(/prone to gain/),
    );
    expect(screen.getByText(/216/)).toBeInTheDocument();

    await user.selectOptions(
      screen.getByLabelText(/Cat Type/),
      screen.getByText(/weight loss/),
    );
    expect(screen.getByText(/173/)).toBeInTheDocument();
  });

  it.todo(
    "updates calorie chart when selecting a different cat type",
    async () => {
      const { user } = setup(<App />);

      await user.selectOptions(
        screen.getByLabelText(/Cat Type/),
        screen.getByText(/neutered/),
      );

      await user.selectOptions(
        screen.getByLabelText(/Cat Type/),
        screen.getByText(/intact/),
      );

      await user.selectOptions(
        screen.getByLabelText(/Cat Type/),
        screen.getByText(/prone to gain/),
      );

      await user.selectOptions(
        screen.getByLabelText(/Cat Type/),
        screen.getByText(/weight loss/),
      );
    },
  );
});

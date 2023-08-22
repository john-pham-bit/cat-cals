import { render, screen } from "@testing-library/react";
import CatResult from "../CatResult";
import { CatType } from "../../utils/CalculateCals";

const NEUTERED: CatType = "typical-neutered";
const INTACT: CatType = "typical-intact";
const GAIN: CatType = "typical-prone-to-gain";
const DIET: CatType = "diet";

describe("CatResult", () => {
  it("renders correct feeding recommendation for neutered 7.5lb", () => {
    render(<CatResult catType={NEUTERED} catWeight={7.5} />);
    expect(screen.getByText(/210/)).toBeInTheDocument();
  });

  it("renders correct feeding recommendation for neutered 15lb", () => {
    render(<CatResult catType={NEUTERED} catWeight={15} />);
    expect(screen.getByText(/354/)).toBeInTheDocument();
  });

  it("renders correct feeding recommendation for neutered 7.5lb", () => {
    render(<CatResult catType={INTACT} catWeight={7.5} />);
    expect(screen.getByText(/245/)).toBeInTheDocument();
  });

  it("renders correct feeding recommendation for neutered 15lb", () => {
    render(<CatResult catType={INTACT} catWeight={15} />);
    expect(screen.getByText(/413/)).toBeInTheDocument();
  });

  it("renders correct feeding recommendation for neutered 7.5lb", () => {
    render(<CatResult catType={GAIN} catWeight={7.5} />);
    expect(screen.getByText(/175/)).toBeInTheDocument();
  });

  it("renders correct feeding recommendation for neutered 15lb", () => {
    render(<CatResult catType={GAIN} catWeight={15} />);
    expect(screen.getByText(/295/)).toBeInTheDocument();
  });

  it("renders correct feeding recommendation for neutered 7.5lb", () => {
    render(<CatResult catType={DIET} catWeight={7.5} />);
    expect(screen.getByText(/140/)).toBeInTheDocument();
  });

  it("renders correct feeding recommendation for neutered 15lb", () => {
    render(<CatResult catType={DIET} catWeight={15} />);
    expect(screen.getByText(/236/)).toBeInTheDocument();
  });
});

import { calculateCals, lerp, CatType } from "../CalculateCals";

const NEUTERED: CatType = "typical-neutered";
const INTACT: CatType = "typical-intact";
const GAIN: CatType = "typical-prone-to-gain";
const DIET: CatType = "diet";

describe("CalculateCals", () => {
  describe("neutered calories", () => {
    it("has correct minimum neutered calories", () => {
      expect(calculateCals(NEUTERED, 5)).toEqual(157);
    });

    it("has correct maximum neutered calories", () => {
      expect(calculateCals(NEUTERED, 20)).toEqual(440);
    });

    it("has correct neutered calories for 12.5lb", () => {
      expect(calculateCals(NEUTERED, 12.5)).toEqual(298);
    });

    it("has correct neutered calories for 9.8lb", () => {
      expect(calculateCals(NEUTERED, 9.8)).toEqual(256);
    });
  });

  describe("intact calories", () => {
    it("has correct minimum intact calories", () => {
      expect(calculateCals(INTACT, 5)).toEqual(183);
    });

    it("has correct maximum intact calories", () => {
      expect(calculateCals(INTACT, 20)).toEqual(513);
    });

    it("has correct intact calories for 12.5lb", () => {
      expect(calculateCals(INTACT, 12.5)).toEqual(362);
    });

    it("has correct intact calories for 9.8lb", () => {
      expect(calculateCals(INTACT, 9.8)).toEqual(298.36);
    });
  });

  describe("prone-to-gain calories", () => {
    it("has correct minimum prone-to-gain calories", () => {
      expect(calculateCals(GAIN, 5)).toEqual(131);
    });

    it("has correct maximum prone-to-gain calories", () => {
      expect(calculateCals(GAIN, 20)).toEqual(367);
    });

    it("has correct prone-to-gain calories for 12.5lb", () => {
      expect(calculateCals(GAIN, 12.5)).toEqual(258);
    });

    it("has correct prone-to-gain calories for 9.8lb", () => {
      expect(calculateCals(GAIN, 9.8)).toEqual(212.72);
    });
  });

  describe("diet calories", () => {
    it("has correct minimum diet calories", () => {
      expect(calculateCals(DIET, 5)).toEqual(105);
    });

    it("has correct maximum diet calories", () => {
      expect(calculateCals(DIET, 20)).toEqual(293);
    });

    it("has correct diet calories for 12.5lb", () => {
      expect(calculateCals(DIET, 12.5)).toEqual(207);
    });

    it("has correct diet calories for 9.8lb", () => {
      expect(calculateCals(DIET, 9.8)).toEqual(170.36);
    });
  });

  describe("out-of-range calories", () => {
    it("has correct calories for less than 5lb weight", () => {
      expect(calculateCals(NEUTERED, 4)).toEqual(157);
    });

    it("has correct calories for greater than 20lb weight", () => {
      expect(calculateCals(NEUTERED, 22)).toEqual(440);
    });
  });
});

describe("lerp", () => {
  it("fails to lerp with negative alpha", () => {
    expect(() => {
      lerp(1, 5, -1);
    }).toThrow(RangeError);
  });

  it("fails to lerp with alpha greater than 1.0", () => {
    expect(() => {
      lerp(1, 5, 1.1);
    }).toThrow(RangeError);
  });

  it("lerps with 0 alpha", () => {
    expect(lerp(1, 5, 0)).toEqual(1);
  });

  it("lerps with 0.25 alpha", () => {
    expect(lerp(1, 5, 0.25)).toEqual(2);
  });

  it("lerps with 0.5 alpha", () => {
    expect(lerp(1, 5, 0.5)).toEqual(3);
  });

  it("lerps with 0.75 alpha", () => {
    expect(lerp(1, 5, 0.75)).toEqual(4);
  });

  it("lerps with 0.9 alpha", () => {
    expect(lerp(1, 5, 0.9)).toEqual(4.6);
  });

  it("lerps with 1.0 alpha", () => {
    expect(lerp(1, 5, 1)).toEqual(5);
  });
});

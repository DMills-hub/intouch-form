import { isType } from "./type";

describe("type util", () => {
  it("Should validate string type", () => {
    expect(isType("John Doe", "string")).toBe(true);
  });

  it("Should validate number type", () => {
    expect(isType(20, "number")).toBe(true);
  });
});

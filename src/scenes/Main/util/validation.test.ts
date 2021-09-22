import { isValueEmptyMessage, onValidate } from "./validation";

describe("validate util", () => {
  describe("onValidate", () => {
    it("Should return empty message when passed empty value", () => {
      expect(onValidate("", "Name")).toBe(isValueEmptyMessage("", "Name"));
    });

    it("Should return undefined when we have a valid value", () => {
      expect(onValidate("John Doe", "Name")).toBe(undefined);
    });

    it("Should return message from callback", () => {
      expect(onValidate("John Doe", "Name", (value) => "Invalid")).toBe(
        "Invalid"
      );
    });
    it("Should return undefined from callback", () => {
      expect(onValidate("John Doe", "Name", (value) => undefined)).toBe(
        undefined
      );
    });
  });
});

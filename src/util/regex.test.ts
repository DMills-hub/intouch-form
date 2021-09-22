import { isValidRegex, phoneNumberRegex, emailRegex } from "./regex";

describe("regex util", () => {
  it("Should validate phonenumber regex", () => {
    expect(isValidRegex("079", phoneNumberRegex)).toBe(false);
  });
  it("Should validate email regex", () => {
    expect(isValidRegex("testemail@gmail.com", emailRegex)).toBe(true);
  });
});

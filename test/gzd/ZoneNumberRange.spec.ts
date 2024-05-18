import { expect } from "chai";
import { MGRSConstants } from "../../lib/MGRSConstants.js";
import { ZoneNumberRange } from "../../lib/gzd/ZoneNumberRange.js";

describe("ZoneNumberRange Tests", () => {
  it("test iterator", () => {
    const range = new ZoneNumberRange();

    let count = 0;
    for (const _ of range) {
      count++;
    }
    expect(count).to.equal(MGRSConstants.MAX_ZONE_NUMBER);
  });
});

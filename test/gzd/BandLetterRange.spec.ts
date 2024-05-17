import { expect } from "chai";
import { BandLetterRange } from "../../lib/gzd/BandLetterRange.js";
import { GridZones } from "../../lib/gzd/GridZones.js";

const BAND_LETTERS = "CDEFGHJKLMNPQRSTUVWXX";

/**
 * Test the full range
 */
describe("BandLetterRange Tests", () => {
  /**
   * Test the full range
   */
  it("test full range", () => {
    const bandRange = new BandLetterRange();
    for (const bandLetter of bandRange) {
      expect((BAND_LETTERS.indexOf(bandLetter) - 10) * 8).to.be.approximately(
        GridZones.getSouthLatitude(bandLetter),
        0.0,
      );
    }
  });
});

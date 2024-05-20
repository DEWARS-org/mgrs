import { test } from "@japa/runner";
import { BandLetterRange } from "../../lib/gzd/BandLetterRange.js";
import { GridZones } from "../../lib/gzd/GridZones.js";

const BAND_LETTERS = "CDEFGHJKLMNPQRSTUVWXX";

/**
 * Test the full range
 */
test.group("BandLetterRange Tests", () => {
  /**
   * Test the full range
   */
  test("test full range", ({ expect }) => {
    const bandRange = new BandLetterRange();
    for (const bandLetter of bandRange) {
      expect((BAND_LETTERS.indexOf(bandLetter) - 10) * 8).toBeCloseTo(
        GridZones.getSouthLatitude(bandLetter),
        0.0,
      );
    }
  });
});

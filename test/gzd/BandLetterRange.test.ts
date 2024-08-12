import { expect } from "@std/expect";
import { BandLetterRange } from "../../lib/gzd/BandLetterRange.ts";
import { GridZones } from "../../lib/gzd/GridZones.ts";

const BAND_LETTERS = "CDEFGHJKLMNPQRSTUVWXX";

/**
 * Test the full range
 */
Deno.test("test full range", () => {
  const bandRange = new BandLetterRange();
  for (const bandLetter of bandRange) {
    expect((BAND_LETTERS.indexOf(bandLetter) - 10) * 8).toBeCloseTo(
      GridZones.getSouthLatitude(bandLetter),
      0.0,
    );
  }
});

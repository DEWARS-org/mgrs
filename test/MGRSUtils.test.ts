import { expect } from "@std/expect";
import { Hemisphere } from "@dewars/grid";
import { MGRSConstants } from "../lib/MGRSConstants.ts";
import { MGRSUtils } from "../lib/MGRSUtils.ts";

Deno.test("test validate zone number", () => {
  expect(() => {
    MGRSUtils.validateZoneNumber(MGRSConstants.MIN_ZONE_NUMBER - 1);
  }).toThrow(Error);
  expect(() => {
    MGRSUtils.validateZoneNumber(MGRSConstants.MAX_ZONE_NUMBER + 1);
  }).toThrow(Error);
});

Deno.test("test validate band letter", () => {
  expect(() => {
    let min = MGRSConstants.MIN_BAND_LETTER.charCodeAt(0);
    min--;
    MGRSUtils.validateBandLetter(String.fromCharCode(min));
  }).toThrow(Error);
  expect(() => {
    let max = MGRSConstants.MAX_BAND_LETTER.charCodeAt(0);
    max++;
    MGRSUtils.validateBandLetter(String.fromCharCode(max));
  }).toThrow(Error);
});

Deno.test("test next band letter", () => {
  const nextBandLetter = MGRSUtils.nextBandLetter(
    MGRSConstants.MIN_BAND_LETTER,
  );
  expect(nextBandLetter.charCodeAt(0)).toBeGreaterThan(
    MGRSConstants.MIN_BAND_LETTER.charCodeAt(0),
  );
});

Deno.test("test previous band letter", () => {
  const prevBandLetter = MGRSUtils.previousBandLetter(
    MGRSConstants.MAX_BAND_LETTER,
  );
  expect(prevBandLetter.charCodeAt(0)).toBeLessThan(
    MGRSConstants.MAX_BAND_LETTER.charCodeAt(0),
  );
});

Deno.test("test hemisphere", () => {
  expect(MGRSUtils.getHemisphere(MGRSConstants.BAND_LETTER_NORTH)).toEqual(
    Hemisphere.North,
  );
});

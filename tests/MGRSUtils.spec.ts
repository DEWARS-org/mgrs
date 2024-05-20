import { test } from "@japa/runner";
import { Hemisphere } from "@ngageoint/grid-js";
import { MGRSConstants } from "../lib/MGRSConstants.js";
import { MGRSUtils } from "../lib/MGRSUtils.js";

test.group("MGRSUtils Tests", () => {
  test("test validate zone number", ({ expect }) => {
    expect(() => {
      MGRSUtils.validateZoneNumber(MGRSConstants.MIN_ZONE_NUMBER - 1);
    }).toThrow(Error);
    expect(() => {
      MGRSUtils.validateZoneNumber(MGRSConstants.MAX_ZONE_NUMBER + 1);
    }).toThrow(Error);
  });

  test("test validate band letter", ({ expect }) => {
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

  test("test next band letter", ({ expect }) => {
    const nextBandLetter = MGRSUtils.nextBandLetter(
      MGRSConstants.MIN_BAND_LETTER,
    );
    expect(nextBandLetter.charCodeAt(0)).toBeGreaterThan(
      MGRSConstants.MIN_BAND_LETTER.charCodeAt(0),
    );
  });

  test("test previous band letter", ({ expect }) => {
    const prevBandLetter = MGRSUtils.previousBandLetter(
      MGRSConstants.MAX_BAND_LETTER,
    );
    expect(prevBandLetter.charCodeAt(0)).toBeLessThan(
      MGRSConstants.MAX_BAND_LETTER.charCodeAt(0),
    );
  });

  test("test hemisphere", ({ expect }) => {
    expect(
      MGRSUtils.getHemisphere(MGRSConstants.BAND_LETTER_NORTH).valueOf(),
    ).toEqual(Hemisphere.NORTH.valueOf());
  });
});

import { Hemisphere } from "@ngageoint/grid-js";
import { expect } from "chai";
import { MGRSConstants } from "../lib/MGRSConstants.js";
import { MGRSUtils } from "../lib/MGRSUtils.js";

describe("MGRSUtils Tests", () => {
  it("test validate zone number", () => {
    expect(() => {
      MGRSUtils.validateZoneNumber(MGRSConstants.MIN_ZONE_NUMBER - 1);
    }).to.throw(Error);
    expect(() => {
      MGRSUtils.validateZoneNumber(MGRSConstants.MAX_ZONE_NUMBER + 1);
    }).to.throw(Error);
  });

  it("test validate band letter", () => {
    expect(() => {
      let min = MGRSConstants.MIN_BAND_LETTER.charCodeAt(0);
      min--;
      MGRSUtils.validateBandLetter(String.fromCharCode(min));
    }).to.throw(Error);
    expect(() => {
      let max = MGRSConstants.MAX_BAND_LETTER.charCodeAt(0);
      max++;
      MGRSUtils.validateBandLetter(String.fromCharCode(max));
    }).to.throw(Error);
  });

  it("test next band letter", () => {
    const nextBandLetter = MGRSUtils.nextBandLetter(
      MGRSConstants.MIN_BAND_LETTER,
    );
    expect(nextBandLetter.charCodeAt(0)).is.greaterThan(
      MGRSConstants.MIN_BAND_LETTER.charCodeAt(0),
    );
  });

  it("test previous band letter", () => {
    const prevBandLetter = MGRSUtils.previousBandLetter(
      MGRSConstants.MAX_BAND_LETTER,
    );
    expect(prevBandLetter.charCodeAt(0)).is.lessThan(
      MGRSConstants.MAX_BAND_LETTER.charCodeAt(0),
    );
  });

  it("test hemisphere", () => {
    expect(
      MGRSUtils.getHemisphere(MGRSConstants.BAND_LETTER_NORTH).valueOf(),
    ).to.equal(Hemisphere.NORTH.valueOf());
  });
});

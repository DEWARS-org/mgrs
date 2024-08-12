import { expect } from "@std/expect";
import { MGRSConstants } from "../../lib/MGRSConstants.ts";
import { MGRSUtils } from "../../lib/MGRSUtils.ts";
import { GridZones } from "../../lib/gzd/GridZones.ts";

const BAND_LETTERS = "CDEFGHJKLMNPQRSTUVWXX";

/**
 * Test zone numbers
 */
Deno.test("test zone numbers", () => {
  let zoneNumber = MGRSConstants.MIN_ZONE_NUMBER;
  for (
    let longitude = MGRSConstants.MIN_LON;
    longitude <= MGRSConstants.MAX_LON;
    longitude += MGRSConstants.ZONE_WIDTH
  ) {
    const west =
      longitude > MGRSConstants.MIN_LON && longitude < MGRSConstants.MAX_LON
        ? zoneNumber - 1
        : zoneNumber;
    const east = zoneNumber;

    if (longitude < MGRSConstants.MAX_LON) {
      expect(~~Math.floor(longitude / 6 + 31)).toEqual(east);
    }

    expect(GridZones.getZoneNumberFromLongitude(longitude, false)).toEqual(
      west,
    );
    expect(GridZones.getZoneNumberFromLongitude(longitude, true)).toEqual(
      east,
    );
    expect(GridZones.getZoneNumberFromLongitude(longitude)).toEqual(east);

    if (zoneNumber < MGRSConstants.MAX_ZONE_NUMBER) {
      zoneNumber++;
    }
  }
});

/**
 * Test band letters
 */
Deno.test("test band letters", () => {
  let bandLetter = MGRSConstants.MIN_BAND_LETTER;
  for (
    let latitude = MGRSConstants.MIN_LAT;
    latitude <= MGRSConstants.MAX_LAT;
    latitude += latitude < 80.0 ? MGRSConstants.BAND_HEIGHT : 4.0
  ) {
    const south = latitude > MGRSConstants.MIN_LAT && latitude < 80.0
      ? MGRSUtils.previousBandLetter(bandLetter)
      : bandLetter;
    const north = bandLetter;

    expect(BAND_LETTERS.charAt(~~Math.floor(latitude / 8 + 10))).toEqual(
      north,
    );

    expect(GridZones.getBandLetterFromLatitude(latitude, false)).toEqual(
      south,
    );
    expect(GridZones.getBandLetterFromLatitude(latitude, true)).toEqual(
      north,
    );
    expect(GridZones.getBandLetterFromLatitude(latitude)).toEqual(north);

    if (bandLetter < MGRSConstants.MAX_BAND_LETTER) {
      bandLetter = MGRSUtils.nextBandLetter(bandLetter);
    }
  }
});

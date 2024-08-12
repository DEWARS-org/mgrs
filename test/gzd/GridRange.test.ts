import { expect } from "@std/expect";
import { MGRS } from "../../lib/MGRS.ts";
import { GridRange } from "../../lib/gzd/GridRange.ts";

Deno.test("test iterator", () => {
  const gridRange = new GridRange();

  for (const zone of gridRange) {
    const zoneNumber = zone.getNumber();
    const bandLetter = zone.getLetter();

    const gzd = zoneNumber.toString() + bandLetter;
    expect(MGRS.isMGRS(gzd)).toBe(true);
    const mgrs = MGRS.parse(gzd);
    expect(mgrs).not.toBeNull();
    expect(mgrs.getZone()).toEqual(zoneNumber);
    expect(mgrs.getBand()).toEqual(bandLetter);

    const point = mgrs.toPoint();
    const southwest = zone.getBounds().getSouthwest();

    expect(southwest.getLongitude()).toBeCloseTo(
      point.getLongitude(),
      0.0001,
    );
    expect(southwest.getLatitude()).toBeCloseTo(point.getLatitude(), 0.0001);
  }
});

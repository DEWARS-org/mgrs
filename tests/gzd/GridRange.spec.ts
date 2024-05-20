import { test } from "@japa/runner";
import { MGRS } from "../../lib/MGRS.js";
import { GridRange } from "../../lib/gzd/GridRange.js";

test.group("GridRange Tests", () => {
  test("test iterator", ({ expect }) => {
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
});

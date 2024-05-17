import { expect } from "chai";
import { MGRS } from "../../lib/MGRS.js";
import { GridRange } from "../../lib/gzd/GridRange.js";

describe("GridRange Tests", () => {
  it("test iterator", () => {
    const gridRange = new GridRange();

    for (const zone of gridRange) {
      const zoneNumber = zone.getNumber();
      const bandLetter = zone.getLetter();

      const gzd = zoneNumber.toString() + bandLetter;
      expect(MGRS.isMGRS(gzd)).to.be.true;
      const mgrs = MGRS.parse(gzd);
      expect(mgrs).to.not.be.null;
      expect(mgrs.getZone()).to.be.equal(zoneNumber);
      expect(mgrs.getBand()).to.be.equal(bandLetter);

      const point = mgrs.toPoint();
      const southwest = zone.getBounds().getSouthwest();

      expect(southwest.getLongitude()).to.be.approximately(
        point.getLongitude(),
        0.0001,
      );
      expect(southwest.getLatitude()).to.be.approximately(
        point.getLatitude(),
        0.0001,
      );
    }
  });
});

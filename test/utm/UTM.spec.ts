import { Hemisphere } from "@ngageoint/grid-js";
import { expect } from "chai";
import { UTM } from "../../lib/utm/UTM.js";

describe("UTM Tests", () => {
  it("test to point", () => {
    const utm = UTM.create(0, Hemisphere.NORTH, 0, 0);
    const point = utm.toPoint();
    expect(point).to.not.be.undefined;
  });

  it("test from point", () => {
    const utm = UTM.create(0, Hemisphere.NORTH, 0, 0);
    const point = utm.toPoint();
    const from = UTM.from(point, utm.getZone(), utm.getHemisphere());
    expect(utm.toString() === from.toString()).to.be.true;
  });

  it("test is UTM", () => {
    const utm = UTM.create(0, Hemisphere.NORTH, 0, 0);

    expect(UTM.isUTM(utm.toString())).to.be.true;
    expect(UTM.isUTM("not utm")).to.be.false;
  });

  it("test parse", () => {
    const utm = UTM.create(0, Hemisphere.NORTH, 0, 0);
    const parsed = UTM.parse(utm.toString());

    expect(utm.toString() === parsed.toString()).to.be.true;
  });
});

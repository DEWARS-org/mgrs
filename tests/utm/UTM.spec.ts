import { test } from "@japa/runner";
import { Hemisphere } from "@ngageoint/grid-js";
import { UTM } from "../../lib/utm/UTM.js";

test.group("UTM Tests", () => {
  test("test to point", ({ expect }) => {
    const utm = UTM.create(0, Hemisphere.NORTH, 0, 0);
    const point = utm.toPoint();
    expect(point).not.toBeUndefined();
  });

  test("test from point", ({ expect }) => {
    const utm = UTM.create(0, Hemisphere.NORTH, 0, 0);
    const point = utm.toPoint();
    const from = UTM.from(point, utm.getZone(), utm.getHemisphere());
    expect(utm.toString() === from.toString()).toBe(true);
  });

  test("test is UTM", ({ expect }) => {
    const utm = UTM.create(0, Hemisphere.NORTH, 0, 0);

    expect(UTM.isUTM(utm.toString())).toBe(true);
    expect(UTM.isUTM("not utm")).toBe(false);
  });

  test("test parse", ({ expect }) => {
    const utm = UTM.create(0, Hemisphere.NORTH, 0, 0);
    const parsed = UTM.parse(utm.toString());

    expect(utm.toString() === parsed.toString()).toBe(true);
  });
});

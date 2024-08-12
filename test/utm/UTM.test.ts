import { expect } from "@std/expect";
import { Hemisphere } from "@ngageoint/grid-js/Hemisphere";
import { UTM } from "../../lib/utm/UTM.ts";

Deno.test("test to point", () => {
  const utm = UTM.create(0, Hemisphere.North, 0, 0);
  const point = utm.toPoint();
  expect(point).not.toBeUndefined();
});

Deno.test("test from point", () => {
  const utm = UTM.create(0, Hemisphere.North, 0, 0);
  const point = utm.toPoint();
  const from = UTM.from(point, utm.getZone(), utm.getHemisphere());
  expect(utm.toString() === from.toString()).toBe(true);
});

Deno.test("test is UTM", () => {
  const utm = UTM.create(0, Hemisphere.North, 0, 0);

  expect(UTM.isUTM(utm.toString())).toBe(true);
  expect(UTM.isUTM("not utm")).toBe(false);
});

Deno.test("test parse", () => {
  const utm = UTM.create(0, Hemisphere.North, 0, 0);
  const parsed = UTM.parse(utm.toString());

  expect(utm.toString() === parsed.toString()).toBe(true);
});

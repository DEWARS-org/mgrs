import { expect } from "@std/expect";
import { GridType } from "../../lib/grid/GridType.ts";
import { GridTypeUtils } from "../../lib/grid/GridTypeUtils.ts";

/**
 * Test precisions
 */
Deno.test("test precisions", () => {
  expect(GridType.Gzd).toEqual(0);
  expect(GridType.HundredKilometer).toEqual(100000);
  expect(GridType.TenKilometer).toEqual(10000);
  expect(GridType.Kilometer).toEqual(1000);
  expect(GridType.HundredMeter).toEqual(100);
  expect(GridType.TenMeter).toEqual(10);
  expect(GridType.Meter).toEqual(1);
});

/**
 * Test digit accuracies
 */
Deno.test("test accuracies", () => {
  expect(GridTypeUtils.getAccuracy(GridType.Gzd)).toEqual(0);

  expect(GridTypeUtils.withAccuracy(0)).toEqual(GridType.HundredKilometer);
  expect(GridTypeUtils.getAccuracy(GridType.HundredKilometer)).toEqual(0);

  expect(GridTypeUtils.withAccuracy(1)).toEqual(GridType.TenKilometer);
  expect(GridTypeUtils.getAccuracy(GridType.TenKilometer)).toEqual(1);

  expect(GridTypeUtils.withAccuracy(2)).toEqual(GridType.Kilometer);
  expect(GridTypeUtils.getAccuracy(GridType.Kilometer)).toEqual(2);

  expect(GridTypeUtils.withAccuracy(3)).toEqual(GridType.HundredMeter);
  expect(GridTypeUtils.getAccuracy(GridType.HundredMeter)).toEqual(3);

  expect(GridTypeUtils.withAccuracy(4)).toEqual(GridType.TenMeter);
  expect(GridTypeUtils.getAccuracy(GridType.TenMeter)).toEqual(4);

  expect(GridTypeUtils.withAccuracy(5)).toEqual(GridType.Meter);
  expect(GridTypeUtils.getAccuracy(GridType.Meter)).toEqual(5);
});

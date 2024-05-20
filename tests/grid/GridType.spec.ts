import { test } from "@japa/runner";
import { GridType } from "../../lib/grid/GridType.js";
import { GridTypeUtils } from "../../lib/grid/GridTypeUtils.js";

/**
 * Grid Type Test
 *
 *
 */
test.group("GridType Tests", () => {
  /**
   * Test precisions
   */
  test("test precisions", ({ expect }) => {
    expect(GridType.GZD).toEqual(0);
    expect(GridType.HUNDRED_KILOMETER).toEqual(100000);
    expect(GridType.TEN_KILOMETER).toEqual(10000);
    expect(GridType.KILOMETER).toEqual(1000);
    expect(GridType.HUNDRED_METER).toEqual(100);
    expect(GridType.TEN_METER).toEqual(10);
    expect(GridType.METER).toEqual(1);
  });

  /**
   * Test digit accuracies
   */
  test("test accuracies", ({ expect }) => {
    expect(GridTypeUtils.getAccuracy(GridType.GZD)).toEqual(0);

    expect(GridTypeUtils.withAccuracy(0)).toEqual(GridType.HUNDRED_KILOMETER);
    expect(GridTypeUtils.getAccuracy(GridType.HUNDRED_KILOMETER)).toEqual(0);

    expect(GridTypeUtils.withAccuracy(1)).toEqual(GridType.TEN_KILOMETER);
    expect(GridTypeUtils.getAccuracy(GridType.TEN_KILOMETER)).toEqual(1);

    expect(GridTypeUtils.withAccuracy(2)).toEqual(GridType.KILOMETER);
    expect(GridTypeUtils.getAccuracy(GridType.KILOMETER)).toEqual(2);

    expect(GridTypeUtils.withAccuracy(3)).toEqual(GridType.HUNDRED_METER);
    expect(GridTypeUtils.getAccuracy(GridType.HUNDRED_METER)).toEqual(3);

    expect(GridTypeUtils.withAccuracy(4)).toEqual(GridType.TEN_METER);
    expect(GridTypeUtils.getAccuracy(GridType.TEN_METER)).toEqual(4);

    expect(GridTypeUtils.withAccuracy(5)).toEqual(GridType.METER);
    expect(GridTypeUtils.getAccuracy(GridType.METER)).toEqual(5);
  });
});

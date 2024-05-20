import { test } from "@japa/runner";
import { MGRSConstants } from "../../lib/MGRSConstants.js";
import { ZoneNumberRange } from "../../lib/gzd/ZoneNumberRange.js";

test.group("ZoneNumberRange Tests", () => {
  test("test iterator", ({ expect }) => {
    const range = new ZoneNumberRange();

    let count = 0;
    for (const _ of range) {
      count++;
    }
    expect(count).toEqual(MGRSConstants.MAX_ZONE_NUMBER);
  });
});

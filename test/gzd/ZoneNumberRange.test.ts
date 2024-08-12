import { expect } from "@std/expect";
import { MGRSConstants } from "../../lib/MGRSConstants.ts";
import { ZoneNumberRange } from "../../lib/gzd/ZoneNumberRange.ts";

Deno.test("test iterator", () => {
  const range = new ZoneNumberRange();

  let count = 0;
  for (const _ of range) {
    count++;
  }
  expect(count).toEqual(MGRSConstants.MAX_ZONE_NUMBER);
});

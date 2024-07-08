import { assertSubset } from "./assertSubset.ts";
import { assertThrows } from "@std/assert";

Deno.test('assertSubset', () => {
    assertSubset({ a: 1, b: 2 }, { a: 1 })
    assertThrows(() => assertSubset({ a: 1 }, { a: 1, b: 2 }))
})

Deno.test('assertSubset: should work on inherited properties', () => {
    const prototype = { a: 1, b: 2 }
    assertSubset(Object.create(prototype), { a: 1 })
})
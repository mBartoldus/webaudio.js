import { assertStrictEquals } from '@std/assert'

/**
 * For circumventing Deno std's ```assertObjectMatch```, which only checks an object's own properties
 * (and therefore doesn't work for testing instances whose getters are declared on the prototype).
 * 
 * Does not have protections against circular references. Use with caution, as the webaudio spec includes circular references.
*/
// deno-lint-ignore no-explicit-any
export function assertSubset(actualSuperset: any, expectedSubset: any) {
    if (typeof expectedSubset !== 'object') return assertStrictEquals(actualSuperset, expectedSubset)
    for (const k in expectedSubset)
        assertSubset(actualSuperset?.[k], expectedSubset[k])
}
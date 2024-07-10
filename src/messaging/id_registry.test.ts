import { createIdRegistry, registerId, getId } from './id_registry.ts'
import { assert } from "@std/assert";

Deno.test("idRegistry: should generate unique ids", () => {
    const context = {}
    createIdRegistry(context)
    const objects = []
    for (let i = 0; i < 1000; i++) objects.push({})
    for (const object of objects) registerId(context, object)
    const ids = objects.map(o => getId(o))
    for (const id of ids)
        assert(ids.indexOf(id) === ids.lastIndexOf(id))
})
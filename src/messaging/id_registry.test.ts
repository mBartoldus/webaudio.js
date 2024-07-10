import { createIdRegistry, registerId, getId } from './id_registry.ts'
import { assert } from "https://jsr.io/@std/assert/0.226.0/mod.ts"

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
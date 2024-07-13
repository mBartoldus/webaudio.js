import { createControlQueue, sendControlMessage, getControlQueue, clearControlQueue } from "./control_queue.ts";
import { assertStrictEquals } from "@std/assert";

Deno.test("controlQueue: should store messages", () => {
    const context = {}
    createControlQueue(context)
    const messages = []
    for (let i = 0; i < 1000; i++)
        messages.push({})
    for (const message of messages)
        sendControlMessage(context, message)
    const controlQueue = getControlQueue(context)
    for (let i=0; i<messages.length; i++)
        assertStrictEquals(controlQueue[i], messages[i])
})

Deno.test("controlQueue: should be able to clear messages", () => {
    const context = {}
    createControlQueue(context)
    const messages = []
    for (let i = 0; i < 1000; i++)
        messages.push({})
    for (const message of messages)
        sendControlMessage(context, message)
    clearControlQueue(context)
    assertStrictEquals(getControlQueue(context).length, 0)
})
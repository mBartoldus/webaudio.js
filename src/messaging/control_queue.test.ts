import { createControlQueue, sendControlMessage, getControlQueue, clearControlQueue } from "./control_queue.ts";
import { assertEquals } from "@std/assert";

Deno.test("controlQueue: should store messages", () => {
    const context = {}
    createControlQueue(context)
    const messages = []
    for (let i = 0; i < 1000; i++)
        messages.push({ value: Math.random() })
    for(const message of messages)
        sendControlMessage(context, message)
    assertEquals(getControlQueue(context), messages)
})

Deno.test("controlQueue: should be able to clear messages", () => {
    const context = {}
    createControlQueue(context)
    const messages = []
    for (let i = 0; i < 1000; i++)
        messages.push({ value: Math.random() })
    for(const message of messages)
        sendControlMessage(context, message)
    clearControlQueue(context)
    assertEquals(getControlQueue(context), [])
})
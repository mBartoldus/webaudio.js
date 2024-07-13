import { BaseAudioContext } from './base_audio_context.ts'
import { _permit } from '../utils/illegal_constructor.ts'
import { sendControlMessage, getControlQueue } from '../messaging/control_queue.ts'
import { registerId, getId } from '../messaging/id_registry.ts'
import { assertEquals, assert } from '@std/assert'
import { assertSubset } from "../utils/assert_subset.ts"

Deno.test('BaseAudioContext: should keep track of control messages', () => {
    const ctx = new BaseAudioContext({ _permit })
    sendControlMessage(ctx, {})
    sendControlMessage(ctx, {})
    sendControlMessage(ctx, {})
    assertEquals(getControlQueue(ctx), [{}, {}, {}])
})

Deno.test('BaseAudioContext: should generate unique ids', () => {
    const ctx = new BaseAudioContext({ _permit })
    const nodes = [{}, {}, {}]
    for (const node of nodes)
        registerId(ctx, node)
    const ids = nodes.map(n => getId(n))
    for (const id of ids)
        assert(ids.indexOf(id) === ids.lastIndexOf(id))
})

Deno.test('BaseAudioContext: should initialize default values', ()=>{
    const expected = {
        currentTime: 0,
        sampleRate: 44100,
        state: "suspended"
    }
    const ctx = new BaseAudioContext({ _permit })
    assertSubset(ctx, expected)
})
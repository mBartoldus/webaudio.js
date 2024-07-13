import { AudioParam } from './audio_param.ts'
import { assertSubset } from '../utils/assert_subset.ts'
import { assertAlmostEquals, assertEquals } from '@std/assert'
import { _permit } from '../utils/illegal_constructor.ts'
import { BaseAudioContext } from '../base_audio_context/base_audio_context.ts'
import { getId } from "../messaging/id_registry.ts";
import { getControlQueue } from "../messaging/control_queue.ts";

Deno.test('AudioParam: should initialize default property values', () => {
    const context = new BaseAudioContext({ _permit })
    const param = new AudioParam({ _permit, context })
    assertSubset(param, {
        automationRate: 'a-rate',
        value: 0,
        defaultValue: 0
    })
    assertAlmostEquals(-3.4028235e38, param.minValue, 1e+31)
    assertAlmostEquals(3.4028235e38, param.maxValue, 1e+31)
})

Deno.test('AudioParam.setValueAtTime: should send control message', () => {
    const context = new BaseAudioContext({ _permit })
    const param1 = new AudioParam({ _permit, context })
    param1.setValueAtTime(100, 0.5)
    const id1 = getId(param1)
    const expected = [{
        automation: {
            paramId: id1,
            event: {
                time: 0.5,
                value: 100,
                interpolation: "none"
            }
        }
    }]
    assertEquals(getControlQueue(context), expected)
})

Deno.test('AudioParam.linearRampToValueAtTime: should send control message', () => {
    const context = new BaseAudioContext({ _permit })
    const param1 = new AudioParam({ _permit, context })
    param1.linearRampToValueAtTime(1000, 255.99)
    const id1 = getId(param1)
    const expected = [{
        automation: {
            paramId: id1,
            event: {
                time: 255.99,
                value: 1000,
                interpolation: "linear"
            }
        }
    }]
    assertEquals(getControlQueue(context), expected)
})

Deno.test('AudioParam.exponentialRampToValueAtTime: should send control message', () => {
    const context = new BaseAudioContext({ _permit })
    const param1 = new AudioParam({ _permit, context })
    param1.exponentialRampToValueAtTime(-2, 3.1415)
    const id1 = getId(param1)
    const expected = [{
        automation: {
            paramId: id1,
            event: {
                time: 3.1415,
                value: -2,
                interpolation: "exponential"
            }
        }
    }]
    assertEquals(getControlQueue(context), expected)
})
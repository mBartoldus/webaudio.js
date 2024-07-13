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
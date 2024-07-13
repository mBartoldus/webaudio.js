import { AudioParam } from './audio_param.ts'
import { assertSubset } from '../utils/assert_subset.ts'
import { assertAlmostEquals } from '@std/assert'
import { _permit } from '../utils/illegal_constructor.ts'
import { BaseAudioContext } from '../base_audio_context/base_audio_context.ts'

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
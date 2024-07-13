import { AudioNode } from "./audio_node.ts"
import { BaseAudioContext } from "../base_audio_context/base_audio_context.ts"
import { _permit } from "../utils/illegal_constructor.ts"
import { getId } from "../messaging/id_registry.ts";
import { getControlQueue } from "../messaging/control_queue.ts";
import { share } from "@mbartoldus/threadables";

import { assertSubset } from "../utils/assert_subset.ts";
import { assertEquals } from '@std/assert'

Deno.test('AudioNode: should initialize default property values', () => {
    const context = new BaseAudioContext({ _permit })
    const node = new AudioNode({ context, _permit })
    assertSubset(node, {
        numberOfInputs: 1,
        numberOfOutputs: 1,
        channelCount: 1,
        channelCountMode: 'explicit',
        channelInterpretation: 'discrete',
    })
})


Deno.test('AudioNode: should send AudioNodeMsg upon construction', () => {

    const context = new BaseAudioContext({ _permit })
    const node = new AudioNode({ context, _permit })
    class DerivedNode extends AudioNode { }
    const derivedNode = new DerivedNode({ context, _permit })

    assertEquals(getControlQueue(context), [{
        audioNode: {
            type: 'AudioNode',
            id: getId(node),
            properties: share(node),
            params: {}
        }
    }, {
        audioNode: {
            type: 'DerivedNode',
            id: getId(derivedNode),
            properties: share(derivedNode),
            params: {}
        }
    }])
})
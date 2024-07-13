import type {
    BaseAudioContext,
    ChannelInterpretation,
    ChannelCountMode,
    // AudioNode as IAudioNode
} from '../interfaces.ts'
import * as threadables from '@mbartoldus/threadables'
import { AudioParam } from '../audio_param/audio_param.ts'
import {
    type AudioNodeThreadables,
    audioNodeMetadata,
} from './threadables.ts'
import { _permit, assertLegalConstruction } from '../utils/illegal_constructor.ts'

import { sendControlMessage } from '../messaging/control_queue.ts'
import { registerId, getId } from '../messaging/id_registry.ts'

export interface AudioNodeInit<T = AudioNodeThreadables> {
    _permit: typeof _permit,
    context: BaseAudioContext
    options?: Record<string, T>
    params?: Record<string, AudioParam>
}

export class AudioNode extends EventTarget implements AudioNodeThreadables {
    declare readonly numberOfInputs: number
    declare readonly numberOfOutputs: number
    declare channelInterpretation: ChannelInterpretation
    declare channelCountMode: ChannelCountMode
    declare channelCount: number

    readonly context: BaseAudioContext

    constructor() {
        const init = arguments[0] as AudioNodeInit
        assertLegalConstruction(init._permit)
        super()
        this.context = init.context
        threadables.allocateData(this, new.target.prototype)
        threadables.assign(this, {
            numberOfInputs: 1,
            numberOfOutputs: 1,
            channelCount: 1,
            channelCountMode: 'explicit',
            channelInterpretation: 'discrete',
            ...(init.options ?? {})
        })

        const params: Record<string, DataView> = {}
        for (const k in init.params) params[k] = threadables.share(init.params[k])

        registerId(this.context, this)

        sendControlMessage(this.context, {
            audioNode: {
                id: getId(this),
                type: new.target.name,
                properties: threadables.share(this),
                params
            }
        })
    }
    connect(
        destinationNode: AudioNode,
        output?: number,
        input?: number
    ): AudioNode
    connect(
        destinationParam: AudioParam,
        output?: number
    ): void
    connect(destination: AudioNode | AudioParam, outputIndex = 0, inputIndex = 0) {
        sendControlMessage(this.context, {
            connect: {
                src: getId(this),
                dst: getId(destination),
                outputIndex,
                inputIndex
            }
        })
        if (destination instanceof AudioNode) return destination
    }

}
threadables.declare(AudioNode.prototype, audioNodeMetadata)
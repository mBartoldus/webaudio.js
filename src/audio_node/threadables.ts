import type { ObjectMetadata } from "@mbartoldus/threadables"
import type { ChannelCountMode, ChannelInterpretation } from "../interfaces.ts"

export interface AudioNodeThreadables {
    readonly numberOfInputs: number
    readonly numberOfOutputs: number
    channelCount: number
    channelCountMode: ChannelCountMode
    channelInterpretation: ChannelInterpretation
}
export const audioNodeMetadata: ObjectMetadata<AudioNodeThreadables> = {
    numberOfInputs: { type: 'Uint32', writable: false },
    numberOfOutputs: { type: 'Uint32', writable: false },
    channelInterpretation: { type: ['discrete', 'speakers'] },
    channelCountMode: { type: ['explicit', 'max', 'clamped-max'] },
    channelCount: { type: 'Uint32' },
}
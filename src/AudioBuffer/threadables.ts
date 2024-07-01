import { ObjectMetadata } from '@mbartoldus/threadables'

export interface AudioBufferThreadables {
    readonly duration: number
    readonly length: number
    readonly numberOfChannels: number
    readonly sampleRate: number
}

export const audioBufferMetadata: ObjectMetadata<AudioBufferThreadables> = {
    duration: { type: 'Float64', writable: false },
    length: { type: 'Uint32', writable: false },
    numberOfChannels: { type: 'Uint32', writable: false },
    sampleRate: { type: 'Float64', writable: false },
}
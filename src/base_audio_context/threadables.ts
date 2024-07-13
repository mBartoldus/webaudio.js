import { ObjectMetadata } from '@mbartoldus/threadables'
import { AudioContextState } from '../interfaces.ts'

export interface ContextThreadables {
    readonly currentTime: number
    readonly sampleRate: number
    readonly state: AudioContextState
}
export const contextMetadata: ObjectMetadata<ContextThreadables> = {
    currentTime: { type: 'Float64', writable: false },
    sampleRate: { type: 'Float64', writable: false },
    state: { type: ['suspended', 'running', 'closed'], writable: false },
}
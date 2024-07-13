import { type ContextThreadables, contextMetadata } from "./threadables.ts"
import type { AudioContextState } from "../interfaces.ts"
// will later import the BaseAudioContext interface as IBaseAudioContext

import * as threadables from '@mbartoldus/threadables'
import { assertLegalConstruction, _permit } from "../utils/illegal_constructor.ts"

import { createIdRegistry } from "../messaging/id_registry.ts"
import { createControlQueue } from "../messaging/control_queue.ts";

export abstract class BaseAudioContext extends EventTarget implements ContextThreadables {
    declare readonly currentTime: number
    declare readonly sampleRate: number
    declare readonly state: AudioContextState

    // readonly destination: AudioDestinationNode
    // readonly audioWorklet?: AudioWorklet

    constructor() {
        const { _permit } = arguments[0]
        assertLegalConstruction(_permit)
        super()
        threadables.allocateData(this, new.target.prototype)
        createIdRegistry(this)
        createControlQueue(this)
        threadables.assign(this, {
            currentTime: 0,
            sampleRate: 44100,
            state: "suspended"
        })
    }
}
threadables.declare(BaseAudioContext.prototype, contextMetadata)
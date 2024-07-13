import *  as threadables from '@mbartoldus/threadables'
import { type AudioParamThreadables, audioParamMetadata } from './threadables.ts'
import { assertLegalConstruction, _permit } from '../utils/illegal_constructor.ts'
import type { 
    AutomationRate,
    AudioParam as IAudioParam,
    BaseAudioContext
} from '../interfaces.ts'

export interface InitializeAudioParam {
    _permit: typeof _permit
    context: BaseAudioContext
    options?: Partial<AudioParamThreadables>
}

export class AudioParam implements AudioParamThreadables, IAudioParam {
    declare readonly defaultValue: number
    declare readonly minValue: number
    declare readonly maxValue: number
    declare value: number
    declare automationRate: AutomationRate
    #context: BaseAudioContext
    constructor() {
        const init = arguments[0] as InitializeAudioParam
        assertLegalConstruction(init._permit)
        threadables.allocateData(this)
        threadables.assign(this, {
            defaultValue: 0,
            minValue: -3.4028235e38,
            maxValue: 3.4028235e38,
            ...(init.options ?? {})
        })
        this.#context = init.context
    }
    setValueAtTime(value: number, startTime: number) {
        return this
    }
    linearRampToValueAtTime(value: number, endTime: number) {
        return this
    }
    exponentialRampToValueAtTime(value: number, endTime: number) {
        return this
    }
    setTargetAtTime(
        target: number,
        startTime: number,
        timeConstant: number
    ) {
        return this
    }
    setValueCurveTime(
        values: Iterable<number>,
        startTime: number,
        duration: number
    ) {
        return this
    }
    cancelScheduledValues(cancelTime: number) {
        return this
    }
    cancelAndHoldAtTime(cancelTime: number) {
        return this
    }
}
threadables.declare(AudioParam.prototype, audioParamMetadata)
import *  as threadables from '@mbartoldus/threadables'
import { type AudioParamThreadables, audioParamMetadata } from './threadables.ts'
import { assertLegalConstruction, _permit } from '../utils/illegal_constructor.ts'
import { sendControlMessage } from "../messaging/control_queue.ts"
import type {
    AutomationRate,
    AudioParam as IAudioParam,
    BaseAudioContext
} from '../interfaces.ts'
import { getId, registerId } from "../messaging/id_registry.ts";

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
        registerId(this.#context, this)
    }
    #automate(value: number, time: number, interpolation: "none" | "linear" | "exponential"): this {
        sendControlMessage(this.#context, {
            automation: {
                paramId: getId(this),
                event: { time, value, interpolation }
            }
        })
        return this
    }
    setValueAtTime(value: number, startTime: number) {
        return this.#automate(value, startTime, "none")
    }
    linearRampToValueAtTime(value: number, endTime: number) {
        return this.#automate(value, endTime, "linear")
    }
    exponentialRampToValueAtTime(value: number, endTime: number) {
        return this.#automate(value, endTime, "exponential")
    }
    setTargetAtTime(
        _target: number,
        _startTime: number,
        _timeConstant: number
    ) {
        return this
    }
    setValueCurveTime(
        _values: Iterable<number>,
        _startTime: number,
        _duration: number
    ) {
        return this
    }
    cancelScheduledValues(_cancelTime: number) {
        return this
    }
    cancelAndHoldAtTime(_cancelTime: number) {
        return this
    }
}
threadables.declare(AudioParam.prototype, audioParamMetadata)
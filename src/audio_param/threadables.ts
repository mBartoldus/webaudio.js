import type { ObjectMetadata } from '@mbartoldus/threadables'
import { AutomationRate } from '../interfaces.ts'

export interface AudioParamThreadables {
    readonly defaultValue: number
    readonly minValue: number
    readonly maxValue: number
    value: number
    automationRate: AutomationRate
}
export const audioParamMetadata: ObjectMetadata<AudioParamThreadables> = {
    defaultValue: { type: 'Float64', writable: false },
    minValue: { type: 'Float64', writable: false },
    maxValue: { type: 'Float64', writable: false },
    value: { type: 'Float64' },
    automationRate: { type: ['a-rate', 'k-rate'] },
}
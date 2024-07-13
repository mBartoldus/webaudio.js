export type AutomationEvent = {
    time: number
    value: number
    interpolation: 'none' | 'linear' | 'exponential'
}
export interface AutomationMsg {
    paramId: number
    event?: AutomationEvent
    cancelAtTime?: number
}
import type { ControlMsg } from "./control_message.ts"

const _controlQueue = Symbol('control message queue')

// deno-lint-ignore no-explicit-any
export function createControlQueue(context: any): void {
    Object.defineProperty(context, _controlQueue, {
        value: [],
        enumerable: false
    })
}

// deno-lint-ignore no-explicit-any
export function sendControlMessage(context: any, msg: ControlMsg): void {
    //@ts-ignore assume _ctrlQueue will be defined as a non-enumerable property
    context[_controlQueue].push(msg)
}

// deno-lint-ignore no-explicit-any
export function getControlQueue(context: any): ControlMsg[] {
    //@ts-ignore assume _ctrlQueue will be defined as a non-enumerable property
    return context[_controlQueue]
}

// deno-lint-ignore no-explicit-any
export function clearControlQueue(context: any): void {
    //@ts-ignore assume _ctrlQueue will be defined as a non-enumerable property
    context[_controlQueue].length = 0
}
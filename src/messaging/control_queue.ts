const _controlQueue = Symbol('control message queue')

// deno-lint-ignore no-explicit-any
export function createControlQueue(context: any): void {
    Object.defineProperty(context, _controlQueue, {
        value: [],
        enumerable: false
    })
}

// deno-lint-ignore no-explicit-any
export function sendControlMessage(context: any, msg: any): void {
    //@ts-ignore assume _ctrlQueue will be defined as a non-enumerable property
    context[_controlQueue].push(msg)
}

// deno-lint-ignore no-explicit-any
export function getControlQueue(context: any): any[] {
    //@ts-ignore assume _ctrlQueue will be defined as a non-enumerable property
    return context[_controlQueue]
}
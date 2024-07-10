const _registerId = Symbol('register id with context')
const _id = Symbol('node id')

// deno-lint-ignore no-explicit-any
export function createIdRegistry(context: any): void {
    let id = 0
    Object.defineProperty(context, _registerId, {
        value: () => id++,
        enumerable: false
    })
}

// deno-lint-ignore no-explicit-any
export function registerId(context: any, object: any): void {
    //@ts-ignore assume _registerId will be defined as a non-enumerable property
    const id = context[_registerId]()
    Object.defineProperty(object, _id, {
        value: id,
        enumerable: false
    })
}

// deno-lint-ignore no-explicit-any
export function getId(node: any): number {
    //@ts-ignore assume _id will be defined as a non-enumerable property
    return node[_id]
}

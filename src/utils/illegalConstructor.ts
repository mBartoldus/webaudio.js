/**
 * For legal construction of illegal constructors.
 * @example
 * new AudioNode({ _permit, ...options })
 */
export const _permit = Symbol()

/**
 * For defining an illegal constructor.
 * @example
 * class X {
 *  constructor(){
 *   assertLegalConstruction(arguments[0])
 *  }
 * }
 * new X()
 * // throws TypeError
 * new X(_permit)
 * // permitted
 */
export function assertLegalConstruction(permit: typeof _permit) {
    if (permit !== _permit)
        throw new TypeError('illegal constructor')
}
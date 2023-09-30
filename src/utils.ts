/**
 * Computes the Greatest Common Divider (GCD) of the two given numbers and
 * returns the result.
 *
 * @param a A number.
 * @param b Another number.
 * @returns A number
 */
export function calcGCD(a: number, b: number): number {
    if (b === 0) {
        return a
    }
    return calcGCD(b, a % b)
}

/**
 * Computes the Least Common Multiple (LCM) of the given numbers and returns
 * the result.
 * The given numbers array must contain at least two numbers.
 *
 * @param numbers A list of numbers with at least two elements.
 * @returns A number.
 */
export function calcLCM(numbers: number[]): number {
    if (numbers.length === 0) {
        return 0
    }
    let lcm = numbers[0]
    if (numbers.length === 1) {
        return lcm
    }
    for (let index = 1; index < numbers.length; index++) {
        lcm = (lcm * numbers[index]) / calcGCD(lcm, numbers[index])
    }
    return lcm
}

// —————————————————————————————————————————————————————————————————————————————
// Constants

/** Start of unix epoch. */
export const epoch = "Thu, 01 Jan 1970 00:00:00 GMT"

// —————————————————————————————————————————————————————————————————————————————
// Utilities

/** Generates random alphanumeric string. */
export function randomString(length:number) {
    const bytes = new Uint8Array(Math.ceil(length / 2))
    crypto.getRandomValues(bytes)
    return Array
       .from(bytes, byte => byte.toString(16).padStart(2, "0"))
       .join("")
       .substring(0, length)
 }
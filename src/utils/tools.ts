/** Generates random alphanumeric string. */
export function randomString(length: number) {
   const bytes = new Uint8Array(Math.ceil(length / 2))
   crypto.getRandomValues(bytes)
   return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0"))
      .join("")
      .substring(0, length)
}

/** Maps raw `cookie` string from to a key-value object.
 - assumes that cookies are fully URI encoded (optional but often true)
 - trims illegal whitespaces from cookie values
 - maps `"value"` → `value`
 - client and server libraries across communities are inconsistent
 - brackets may be reasonable [despite standard](https://github.com/js-cookie/js-cookie/issues/595)
 - https://httpwg.org/specs/rfc6265.html#sane-set-cookie
*/
export function getCookies(cookies: string | null): Record<string, string> {
   const regex = /^([^=]+)=([^;]*)/
   const pairs = cookies
      ? cookies
         .split("; ")
         .map((cookie) => {
            let [, key, value] = regex.exec(cookie) ?? []
            if (value[0] === '"') value = value.slice(1, -1)
            return [
               decodeURIComponent(key),
               decodeURIComponent(value?.trim() ?? ""),
            ]
         })
         .filter(([key, _]) => key)
      : []

   return Object.fromEntries(pairs)
}

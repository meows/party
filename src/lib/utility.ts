// —————————————————————————————————————————————————————————————————————————————
// Constants

type GoogleGeocodingResponse = {
    results: {
        address_components: {
            long_name: string
            short_name: string
            types: string[]
        }[]
        formatted_address: string
        geometry: {
            location: {
                lat: number
                lng: number
            }
            location_type: string
            viewport: {
                northeast: {
                    lat: number
                    lng: number
                }
                southwest: {
                    lat: number
                    lng: number
                }
            }
        }
        place_id: string
        plus_code: {
            compound_code: string
            global_code: string
        }
        types: string[]
    }[]
}

type address_components_types = "street_number"
    | "route"
    | "locality"
    | "administrative_area_level_1"
    | "administrative_area_level_2"
    | "country"
    | "postal_code"

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

 export function GoogleGeocodingParser(data:any) {
    const { results } = data;
    const { geometry } = results[0];
    const { location } = geometry;
    return location;
 }
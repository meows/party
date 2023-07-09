type MenuChoice = "events"
    | "search"
    | "message"
    | "accounts"

type SortEvents = "date"
    | "distance"
    | "popularity"

type SortDateRange = "Any Day"
    | "Today"
    | "Tomorrow"
    | "Upcoming Week"
    | "Upcoming Weekend"
    | "Custom"

type Cookie = {
    user: string
    token: string
}
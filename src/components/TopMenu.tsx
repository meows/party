import { PropsWithChildren } from "react"

type ItemProps = PropsWithChildren<{
   onClick?: () => void
   className?: string
}>

type MenuProps = PropsWithChildren<{
   className?: string

}>

export default function Menu() {
   return (
      <menu id="TopMenu">
         <li>Events</li>
         <li>Search</li>
         <li>Message</li>
         <li>Accounts</li>
      </menu>
   )
}

export function TopMenu({ children, ...props }: MenuProps) {
   return (
      <menu>
         <div {...props}>{children}</div>
      </menu>
   )
}

export function Item({ children, ...props }: ItemProps) {
   return <div {...props}>{children}</div>
}
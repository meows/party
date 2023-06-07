import { PropsWithChildren } from "react"

type ItemProps = PropsWithChildren<{
   onClick?: () => void
   className?: string
}>

type MenuProps = PropsWithChildren<{
   className?: string
   active: MenuChoice
}>

export default function Menu({ active, children, ...props }: MenuProps) {
   return (
      <menu id="TopMenu" {...props}>
         <li id="logo">XYZ</li>
         <li title="Events" className={active === "events" ? "active" : ""}>Events</li>
         <li title="Search" className={active === "search" ? "active" : ""}>Search</li>
         <li title="Message" className={active === "message" ? "active" : ""}>Message</li>
         <li title="Accounts" className={active === "accounts" ? "active" : ""}>Accounts</li>
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
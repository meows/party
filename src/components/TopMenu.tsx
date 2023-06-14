import { PropsWithChildren } from "react"

type ItemProps = PropsWithChildren<{
   onClick?: () => void
   className?: string
}>

type MenuProps = PropsWithChildren<{
   className?: string
   active: MenuChoice
}>

function classNames(...classes: string[]) {
   return classes.filter(Boolean).join(" ");
 }

export default function Menu({ active, children, ...props }: MenuProps) {
   return (
      <menu id="TopMenu" {...props}>
         <li id="logo">XYZ</li>
         <li title="Events" className={classNames("text-xs", active === "events" ? "active" : "")}>Events</li>
         <li title="Search" className={classNames("text-xs", active === "search" ? "active" : "")}>Search</li>
         <li title="Message" className={classNames("text-xs", active === "message" ? "active" : "")}>Message</li>
         <li title="Accounts" className={classNames("text-xs", active === "accounts" ? "active" : "")}>Accounts</li>
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
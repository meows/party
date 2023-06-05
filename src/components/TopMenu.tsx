import { PropsWithChildren } from "react"

type ItemProps = PropsWithChildren<{
   onClick?: () => void
   className?: string
}>

type MenuProps = PropsWithChildren<{
   className?: string

}>

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
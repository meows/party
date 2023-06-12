import React, { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { atom, useAtom } from 'jotai'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

type ButtonProps<T> = React.PropsWithChildren<{
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  name: string
  default: T
}>

type DropItem = React.PropsWithChildren<{
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}>

const selectedAtom = atom("")

export function DropItem<T>({ children, onClick, ...props }: DropItem) {
  const [, setSelected] = useAtom(selectedAtom)
  return (
    <Menu.Item {...props}>
      {({ active }) => (
        <button
          onClick={() => { 
            setSelected(children!.valueOf() as string)
          }}
          className={classNames(
            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
            'block w-full px-4 py-2 text-left text-sm'
          )}
        >
          { children }
        </button>
      )}
    </Menu.Item>
  )
}

export default function DropButton<T>({ children, name, ...props }: ButtonProps<T>) {
  console.log(children)
  const [selected] = useAtom(selectedAtom)
  return (
    <Menu as="div" className="relative inline-block text-left min-w-[150px] max-w-[150px]">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          { `${name}: ${selected}` }
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            { 
              children
            }
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

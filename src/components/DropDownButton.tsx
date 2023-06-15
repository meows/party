import React, { Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { atom, useAtom } from "jotai";

// —————————————————————————————————————————————————————————————————————————————
// Environment

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type DropDownButtonProps<T> = React.PropsWithChildren<{
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  name: string;
  defaultValue: T;
}>;

// type WithInitialValue<Value> = {
//   init: Value;
// };

type DropDownItemProps = React.PropsWithChildren<{
  // onClick?: React.MouseEventHandler<HTMLButtonElement>;
  // useSelectedAtom?: () => [string, (value: string) => void];
  // useSelectedAtom?: PrimitiveAtom<T> & WithInitialValue<T>;
}>;


// TODO: Pass down useSelectedAtom to the children instead of being global.
//       so that each instance of DropDownButton has it's own atom.
// Generate a unique atom for each instance of DropDownButton
// function createSelectedAtom(defaultValue: any) {
//   return atom<typeof defaultValue>(defaultValue);
// }

const useSelectedAtom = atom("");

// —————————————————————————————————————————————————————————————————————————————
// Component

const DropDownItem: React.FC<DropDownItemProps> = ({ children, ...props }) => {
  const [, setSelected] = useAtom(useSelectedAtom);
  return (
    <Menu.Item {...props}>
      {({ active }) => (
        <button
          onClick={() => {
            setSelected(children!.valueOf() as string);
          }}
          className={classNames(
            active ? "bg-gray-100 text-gray-900" : "text-gray-700",
            "block w-full px-4 py-2 text-left text-sm whitespace-nowrap"
          )}
        >
          {children}
        </button>
      )}
    </Menu.Item>
  );
}

const DropDownButton: React.FC<DropDownButtonProps<SortEvents | SortDateRange>> = ({
  children,
  defaultValue,
  name,
}) => {
  // const useSelectedAtom = createSelectedAtom(defaultValue);
  const [selected, setSelected] = useAtom(useSelectedAtom);

  useEffect(() => {
    setSelected(defaultValue as SortEvents | SortDateRange);
  }, []);

  return (
    <Menu
      as="div"
      className="relative inline-block min-w-[150px] max-w-[150px] text-left"
    >
      <div>
        <Menu.Button className="inline-flex w-full bg-brand-blue_light justify-between gap-x-1.5 whitespace-nowrap rounded-xl px-3 py-2 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {`${name} ${selected}`}
          <ChevronDownIcon
            className="mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
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
        <Menu.Items className="absolute left-0 z-10 mt-2 min-w-[150px] max-w-[150px] origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">{
            children
          // An attempt to pass useSelectedAtom to the children.
          // React.Children.map(children, (child) => {
          //     if (React.isValidElement(child)) {
          //       return React.cloneElement(child, { useSelectedAtom });
          //     }
          //     return child;
          //   })
            }</div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export {DropDownButton, DropDownItem};

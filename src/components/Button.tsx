import React from "react";
import { MdKeyboardReturn } from "react-icons/md";

type ButtonProps = React.PropsWithChildren;

function Button({ children }: ButtonProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 p-5">
      <button className="flex cursor-pointer items-center justify-between rounded bg-brand-red px-3 py-1.5 text-brand-gray_light hover:bg-brand-red_dark focus:outline-none">
        <span className="px-1">{children}</span>
        <MdKeyboardReturn />
      </button>
    </div>
  );
}

export default Button;
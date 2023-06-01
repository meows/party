import React from "react"
import { MdKeyboardReturn } from "react-icons/md"

// Unused props for now but all components should have this, in case they are needed in the future.
type ButtonProps = {

};

const Button:React.FC<ButtonProps> = () => {
    return <div className="p-5 flex flex-wrap justify-center items-center gap-2">
                <button className='flex items-center justify-between focus:outline-none bg-brand-gray_light hover:bg-brand-gray py-1.5 px-3 cursor-pointer rounded text-brand-red'>
                    <span className="px-1">Submit</span>
                    <MdKeyboardReturn />
                </button>
            </div>
}

export default Button;

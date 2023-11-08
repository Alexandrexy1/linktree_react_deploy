import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(inputProps: InputProps) {
    return(

        <input
            className='placeholder:text-gray-700 w-9/12 h-9 px-4 mb-3 outline-none rounded'
            {...inputProps}
            />
    )
}

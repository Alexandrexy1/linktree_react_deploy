import { FiLink2 } from 'react-icons/fi';

interface ButtonProps {
    msg: string;
}

export function Button({ msg }: ButtonProps) {
    return(
        <button type='submit'
            className='text-white bg-blue-600 w-full flex items-center justify-center gap-2 h-9 rounded hover:bg-blue-700'>
            <p className='font-semibold'>{msg}</p> 
            <FiLink2/>
        </button>
    )
}

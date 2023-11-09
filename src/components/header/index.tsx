import { Link } from 'react-router-dom';
import { CiLogout } from 'react-icons/ci';

export function Header() {
    return(
        <header className='pt-8 w-10/12 font-semibold max-sm:w-full'>
        <nav className='bg-white m-auto p-3 rounded-md flex items-center justify-between'>
            <div className='flex gap-3'>
                <Link to='/'>Home</Link>
                <Link to='/'>Links</Link>
                <Link to='admin/networks'>Redes Sociais</Link>
            </div>
            <CiLogout color='#f00' size={24}
                className='cursor-pointer'
                />
        </nav>
        </header>
    )
}
import { Link } from 'react-router-dom'

export function ErrorPage() {
    return(
        <div className='flex flex-col text-white items-center justify-center h-screen'>
            <h2 className='text-3xl font-bold mb-3'>Página não encontrada</h2>
            <p className='text-sl italic mb-5'>Você caiu em uma página que não existe</p>
            <Link to='/' className='bg-gray-50/20 py-2 px-5 rounded-lg hover:scale-105 hover:bg-blue-500 transition-all duration-200'>
                Voltar para home
            </Link>
        </div>
    )
}
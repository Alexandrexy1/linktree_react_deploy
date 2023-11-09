import { Input } from '../../components/inputs';
import { Header } from '../../components/header';
import { FiLink2 } from 'react-icons/fi';


export function Admin() {
    return(
        <div className='flex flex-col w-7/12 m-auto items-center min-h-screen'>
            <Header/>

            <main className='w-4/6 mt-9 flex flex-col items-center gap-3 max-sm:w-11/12'>
                <div className='w-full flex flex-col gap-2'>
                    <h1 className='text-white font-semibold'>Nome do link</h1>
                    <Input placeholder='Nome do seu link'/>
                </div>
                <div className='w-full flex flex-col gap-2'>
                    <h1 className='text-white font-semibold'>URL do link</h1>
                    <Input placeholder='Digite a url...'/>
                </div>

                <button className='text-white bg-blue-600 w-full flex items-center justify-center gap-2 h-9 rounded'>
                    <p className='font-semibold'>Cadastrar</p> 
                    <FiLink2/>
                </button>
            </main>
            <section className='mt-20'>
                <h2 className='text-white text-3xl font-bold'>Meus links</h2>
            </section>
        </div>
    )
}
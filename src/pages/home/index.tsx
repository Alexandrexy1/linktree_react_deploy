import { Social } from '../../components/social'

import { DiGithubBadge } from 'react-icons/di';
import { AiFillLinkedin } from 'react-icons/ai';

export function Home() {
    return(
        <div className='flex flex-col w-full items-center justify-center py-4'>
            <h1 className='md:text-4xl text-3xl font-bold text-white mt-20'>Alexandre Nascimento da Silva</h1>
            <span className='text-gray-200 mt-4 mb-4'>Veja meus links 👇</span>
            <main className='flex flex-col w-11/12 max-w-xl text-center'>
                <section className='flex flex-col bg-white py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer'>
                    <a href="#">
                        <p className='text-base md:text-lg'>youtube</p>
                    </a>
                </section>
                <footer className='flex justify-center gap-3 my-4'>
                    <Social url='https://github.com/Alexandrexy1'>
                        <DiGithubBadge size={45} color='#fff'/>
                    </Social>
                    <Social url='https://www.linkedin.com/in/alexandre-nascimento-da-silva-052342215/'>
                        <AiFillLinkedin size={45} color='#fff'/>
                    </Social>
                </footer>
            </main>
        </div>
    )
}
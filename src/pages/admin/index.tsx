import { Input } from '../../components/inputs';
import { Header } from '../../components/header';
import { Button } from '../../components/button';

import { FormEvent, useEffect, useState } from 'react';
import { FiTrash } from 'react-icons/fi';

import { db } from '../../services/firebaseConnection'
import { addDoc, collection, onSnapshot, query, orderBy, doc, deleteDoc } from 'firebase/firestore';

interface LinkProps {
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
}

export function Admin() {
    const [linkNameInput, setLinkNameInput] = useState('');
    const [linkUrlInput, setLinkUrlInput] = useState('');
    const [bgLinkInput, setBgLinkInput] = useState('#121212')
    const [textColorInput, setTextColorInput] = useState('#f1f1f1')
    const [links, setLinks] = useState<LinkProps[]>([]) 
   
    useEffect(() => {
        const linksCollection = collection(db, 'links');
        const queryRef = query(linksCollection, orderBy('created', 'asc'));

        const search = onSnapshot(queryRef, (snapshot) => {
            const lista = [] as LinkProps[];

            snapshot.forEach((item) => {
                lista.push({
                    id: item.id,
                    name: item.data().name,
                    url: item.data().url,
                    bg: item.data().bg,
                    color: item.data().color
                })
            })
            setLinks(lista);
        })

        return () => {
            search();
        }
    }, [])

    async function handleRegisterLink(e: FormEvent) {
        e.preventDefault();

        if(linkNameInput === '' || bgLinkInput === '') {
            alert('Por favor, preencha os campos antes de cadastrar.');
            return;
        }

        await addDoc(collection(db, 'links'), {
            name: linkNameInput,
            url: linkUrlInput,
            bg: bgLinkInput,
            color: textColorInput,
            created: new Date()
        })
        setLinkNameInput('');
        setLinkUrlInput('');
    }

    async function handleDeleteLink(id: string) {
        const docRef = doc(db, 'links', id);
        await deleteDoc(docRef);
    }


    return(
        <div onSubmit={handleRegisterLink}
        className='flex flex-col w-7/12 m-auto items-center min-h-screen'>
            <Header/>
            <form className='w-4/6 my-9 flex flex-col items-start gap-2 max-sm:w-11/12'>
                <label className='text-white font-medium'>Nome do link</label>
                <Input placeholder='Nome do seu link'
                    maxLength={25}
                    value={linkNameInput}
                    onChange={e => setLinkNameInput(e.target.value)}/>
                
                <label className='text-white font-medium'>URL do link</label>
                <Input placeholder='Digite a url...'
                    type='url'
                    value={linkUrlInput}
                    onChange={e => setLinkUrlInput(e.target.value)}/>
 
                <section className='flex gap-9 font-semibold items-start w-full mb-5'>
                    <div className='text-white flex gap-3 items-end'>
                        <label htmlFor="background-link">Fundo do link</label>

                        <input 
                            type="color" 
                            name='background-link'
                            className='h-8 w-9 rounded'
                            value={bgLinkInput}
                            onChange={e => setBgLinkInput(e.target.value)}
                             />
                    </div>  

                    <div className='text-white flex gap-3 items-end'>
                        <label htmlFor="color-link">Cor do link</label>

                        <input 
                            type="color" 
                            name='color-link'
                            className='h-8 w-9 rounded'
                            value={textColorInput} 
                            onChange={e => setTextColorInput(e.target.value)}/>
                    </div>
                </section>
                {
                    linkNameInput !== '' && (
                        <div className=' flex flex-col justify-center items-center border-gray-100/25 border p-1 w-full mb-4'>
                            <label className='text-white pt-2 text-2xl m-auto font-medium max-sm:text-base max-lg:text-xl'>Veja como está ficando</label>
                            <article className='mt-4 w-full max-w-lg rounded-md'
                                style={{backgroundColor: bgLinkInput, marginBottom: 8, marginTop: 4}}>
                                <p style={{color: textColorInput }}
                                className='px-3 py-2 font-medium text-center'
                                >
                                    {linkNameInput}
                                </p>
                            </article>
                        </div>
                    )
                }
                <Button msg='Cadastrar' />

            </form>
            <h2 className='mb-4 text-white text-2xl'>Meus links</h2>
            
            {links.map( item => (
                <article 
                    key={item.id} 
                    className='flex justify-between items-center mt-2 w-8/12 max-w-xl h-10 px-3 rounded-md max-sm:w-11/12'
                    style={{backgroundColor: item.bg, color: item.color}}>
                    <p>{item.name}</p>
                    <div>
                        <button 
                            className='border border-dashed p-1 rounded bg-black'
                            onClick={() => handleDeleteLink(item.id)}>
                            <FiTrash size={18} color='#fff'/>
                        </button>
                    </div>
                </article>
            ))}
        </div>
    )
}
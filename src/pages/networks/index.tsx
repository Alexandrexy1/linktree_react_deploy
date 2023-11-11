import { useState, FormEvent, useEffect } from 'react';

import { Header } from '../../components/header';
import { Input } from '../../components/inputs';
import { Button } from '../../components/button';

import { db } from '../../services/firebaseConnection';
import { getDoc, setDoc, doc } from 'firebase/firestore';             


export function Networks() {
    const [linkedinURL, setLinkedinURL] = useState('');
    const [githubURL, setGithubURL] = useState('');
    const [portfolioURL, setPortfolioURL] = useState('');

    useEffect(() => {
        async function loadLinks() {
            const socialLinks = doc(db, 'network', 'links');
            const getSocialLinks = await getDoc(socialLinks)
            
            if (getSocialLinks.data()) {
                setLinkedinURL(getSocialLinks.data()?.linkedin);
                setGithubURL(getSocialLinks.data()?.github);
                setPortfolioURL(getSocialLinks.data()?.portfolio);

            }
        }
        loadLinks();
    }, [])


    async function handleRegisterURL(e: FormEvent) {
        e.preventDefault();

        await setDoc(doc(db, 'network', 'links'), {
            linkedin: linkedinURL,
            github: githubURL,
            portfolio: portfolioURL
        })
    }
    return(
        <div className='flex flex-col w-7/12 m-auto items-center min-h-screen'>
            <Header/>
            <h2 className='text-white text-3xl font-medium p-7 max-sm:text-2xl'>Meus links profissionais</h2>

            <form className='flex flex-col items-start justify-start w-8/12 mt-1 gap-2 max-sm:w-11/12' onSubmit={handleRegisterURL}>

                <label className='text-white font-medium'>Link LinkedIn</label>
                <Input 
                    type='url'
                    placeholder='Digite a url...'
                    value={linkedinURL}
                    onChange={e => setLinkedinURL(e.target.value)}
                    />
                <label className='text-white font-medium'>Link GitHub</label>
                <Input 
                    type='url'
                    placeholder='Digite a url...'
                    value={githubURL}
                    onChange={e => setGithubURL(e.target.value)}
                    />
                <label className='text-white font-medium'>Link Portfolio</label>
                <Input 
                    type='url'
                    placeholder='Digite a url...'
                    value={portfolioURL}
                    onChange={e => setPortfolioURL(e.target.value)}
                    />

                <Button msg='Salvar links'/>
            </form>
        </div>
    )
}
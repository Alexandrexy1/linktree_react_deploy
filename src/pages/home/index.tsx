import { useState, useEffect } from 'react';

import { Social } from '../../components/social'

import { DiGithubBadge } from 'react-icons/di';
import { AiFillLinkedin } from 'react-icons/ai';
import { FiFolder } from 'react-icons/fi';

import { db } from '../../services/firebaseConnection'; 
import { getDocs, getDoc, doc, query, collection, orderBy } from 'firebase/firestore';


interface LinkProps {
    name: string;
    url: string;
    bg: string;
    color: string;
}

interface NetworkLinksProps {
    linkedin: string;
    github: string;
    portfolio: string;
}


export function Home() {
    const [links, setLinks] = useState<LinkProps[]>([]);
    const [networkLinks, setNetworkLinks] = useState<NetworkLinksProps>();

    useEffect(() => {
        async function loadLinks() {
            const linksDB = collection(db, 'links');
            const queryLinks = query(linksDB, orderBy('created', 'asc'));

            const getLinks = await getDocs(queryLinks);
            const listLinks = [] as LinkProps[];

            getLinks.forEach( snapshot => {
                listLinks.push({
                    name: snapshot.data()?.name,
                    url: snapshot.data()?.url,
                    bg: snapshot.data()?.bg,
                    color: snapshot.data().color
                })
            })
            setLinks(listLinks);
        }

        loadLinks();
    }, []);

    useEffect(() => {
        async function loadNetworkLinks() {
            const networkDoc = doc(db, 'network', 'links');
            const getNetwork = await getDoc(networkDoc);
            setNetworkLinks({
                linkedin: getNetwork.data()?.linkedin,
                github: getNetwork.data()?.github,
                portfolio: getNetwork.data()?.portfolio
            })
        }
        loadNetworkLinks();
    }, [])


    return(
        <div className='flex flex-col w-full items-center justify-center py-4'>
            <h1 className='md:text-4xl text-3xl font-bold text-white mt-20 max-sp:text-xl max-rp:text-2xl px-3'>Alexandre Nascimento da Silva</h1>
            <span className='text-gray-200 mt-4 mb-4'>Veja meus links 👇</span>
            <main className='flex flex-col w-11/12 max-w-xl text-center'>
                { links && links.map( item => (
                        <section className='flex flex-col py-2 mt-5 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer'
                            key={item.name}
                            style={{backgroundColor: item.bg, color: item.color}}>
                        <a href="#">
                            <p className='text-base md:text-lg' >{item.name}</p>
                        </a>
                    </section>  
                )) 
                
                }

                { networkLinks && Object.keys(networkLinks).length > 0 && (
                    <footer className='flex justify-center items-center gap-3 my-7'>
                        <Social url={networkLinks?.github}>
                            <DiGithubBadge size={45} color='#fff'/>
                        </Social>
                        <Social url={networkLinks?.portfolio}>
                            <FiFolder size={40} color='#fff'/>
                        </Social>
                        <Social url={networkLinks?.linkedin}>
                            <AiFillLinkedin size={45} color='#fff'/>
                        </Social>
                    </footer>
                )
                }
            </main>
        </div>
    )
}
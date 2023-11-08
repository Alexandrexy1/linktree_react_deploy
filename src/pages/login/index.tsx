import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../components/inputs';
import { FormEvent, useState } from 'react';
import { auth } from '../../services/firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';


export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (email === '' || password === '') {
            alert('Preencha todos os dados');
            return;
        }
        signInWithEmailAndPassword(auth, email, password)
            .then(() => navigate('/admin', { replace: true}))
            .catch(e => console.log(e));
    }

    return(
        <div className='flex flex-col items-center justify-center w-full h-screen'>
            <Link to='/'>
                <h1 className='text-5xl text-white mt-11 mb-7 font-bold'>Dev
                    <span className='bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent'>Link</span>
                </h1>
            </Link>

            <form  onSubmit={handleSubmit} className='w-full flex flex-col justify-center items-center max-w-xl'>
                <Input 
                    type='email' 
                    placeholder='Digite seu email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <Input 
                    type='password' 
                    placeholder='**********'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                /> 

                <button 
                type='submit'
                className='text-white bg-blue-600 w-9/12 h-9 rounded text-lg font-medium hover:bg-blue-700'
                >
                    Acessar    
                </button>               
            </form>

        </div>
    )
}

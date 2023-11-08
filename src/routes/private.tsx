/* eslint-disable @typescript-eslint/no-unused-vars */
import { auth } from '../services/firebaseConnection';
import { onAuthStateChanged } from 'firebase/auth';
import { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateProps {
    children: ReactNode;
}

export function Private({ children }: PrivateProps) {
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(() => {
        const onAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                const dadosUser = {
                    uid: user.uid,
                    email: user.email
                }
                localStorage.setItem('@reactlinktree', JSON.stringify(dadosUser));

                setLoading(false);
                setSigned(true);
            } else {
                setLoading(false);
                setSigned(false);
            }

            return () => {
                onAuth();
            }
        });
    }, []);

    if (loading) return <></>;
    if (!signed) return <Navigate to='/login' />
    return children;
}
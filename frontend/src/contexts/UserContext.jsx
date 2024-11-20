
"use client"
import { loadUserByToken } from '@/apis/auth';
import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await loadUserByToken();
                setUser(data);
            } catch (error) {
                setUser(null);

            } finally {
                setLoading(false)
            }
        };
        fetchUser();
    }, []);



    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}

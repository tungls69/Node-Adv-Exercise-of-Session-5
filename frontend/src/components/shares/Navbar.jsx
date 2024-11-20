"use client"
import { useUser } from '@/contexts/UserContext';
import { Badge, Input } from '@nextui-org/react';
import { ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; 
import { useOrder } from '@/contexts/OrderContext';

function Navbar(props) {
    const { user } = useUser();
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter(); 
    const searchParams = useSearchParams(); 

    const { order } = useOrder()

    const totalItemsInCart = order.reduce((total, item) => total + item.quantity, 0);

    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            const currentParams = new URLSearchParams(searchParams.toString());

            currentParams.set('search', searchQuery);

            currentParams.delete('page'); 

            router.push(`/?${currentParams.toString()}`);
        }
    };

    return (
        <div>
            <nav className="bg-white border-gray-200 dark:bg-gray-900 drop-shadow-md border-b">
                <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                    <Link href='/'>
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Beamin</span>
                    </Link>
                    <Input
                        type="text"
                        variant='bordered'
                        label="Search"
                        className='min-w-2xl w-96'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearch} 
                    />
                    <div className='flex space-x-2'>
                        {
                            user?.id ?
                                <Link href={user.role == 'ADMIN' ? '/dashboard' : '/user'} className='flex space-x-2 rounded-md items-center px-1 hover:text-blue-500 cursor-pointer'>
                                    <User className='w-10 h-10' />
                                    <p>{user.email}</p>
                                </Link> :
                                <Link href={'/login'} className='flex space-x-2 rounded-md items-center px-1 hover:text-blue-500 cursor-pointer'>
                                    <User className='w-10 h-10' />
                                    <p>Login</p>
                                </Link>
                        }
                        <Link href='/cart'>
                            <Badge content={totalItemsInCart} color="primary">
                                <ShoppingCart className='w-10 h-10' />
                            </Badge>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;

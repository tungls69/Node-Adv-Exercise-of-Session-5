"use client"
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from "@/apis/foods";  
import Link from 'next/link';

Categories.propTypes = {
    current: PropTypes.string
};

function Categories(props) {
    const [categories, setCategories] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);  
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getCategories();
                setCategories(res.data);  
            } catch (err) {
                setError("Error loading categories.");
            } finally {
                setIsLoading(false); 
            }
        };

        fetchCategories();
    }, []);  

    if (isLoading) {
        return <p>Loading categories...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className='border rounded-md p-2'>
            <p className='text-2xl font-bold underline'>Danh mục</p>
            <div className="space-y-2 mt-4 flex flex-col">
                {categories.map((category) => (
                    <Link key={category.id} href={`/?category=${category.id}`} className="p-2 border-b">
                        {category.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Categories;

'use client';

import { useState } from 'react';
import Image from 'next/image';
import useSearchModal, { SearchQuery } from '../hooks/useSearchModal';

const Categories = () => {
    const searchModal = useSearchModal();
    const [currentCategory, setCurrentCategory] = useState('');

    const handleCategoryClick = (categoryId: string) => {
        setCurrentCategory(categoryId);

        const query: SearchQuery = {
            country: searchModal.query.country,
            checkIn: searchModal.query.checkIn,
            checkOut: searchModal.query.checkOut,
            guests: searchModal.query.guests,
            bedrooms: searchModal.query.bedrooms,
            bathrooms: searchModal.query.bathrooms,
            category: categoryId
        };

        searchModal.setQuery(query);
    };

    return (
        <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12">
        <div 
            onClick={() => handleCategoryClick('')}
            className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
            currentCategory === '' ? 'border-black' : 'border-white'
            } opacity-60 hover:border-gray-200 hover:opacity-100`}
        >
            <Image
            src="/icn_category.jpg"
            alt="Category - All"
            width={20}
            height={20}
            />
            <span className="text-xs">All</span>
        </div>

        <div 
            onClick={() => handleCategoryClick('beach')}
            className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
            currentCategory === 'beach' ? 'border-black' : 'border-white'
            } opacity-60 hover:border-gray-200 hover:opacity-100`}
        >
            <Image
            src="/icn_category.jpg"
            alt="Category - Beach"
            width={20}
            height={20}
            />
            <span className="text-xs">Beach</span>
        </div>

        <div 
            onClick={() => handleCategoryClick('villas')}
            className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
            currentCategory === 'villas' ? 'border-black' : 'border-white'
            } opacity-60 hover:border-gray-200 hover:opacity-100`}
        >
            <Image
            src="/icn_category.jpg"
            alt="Category - Villas"
            width={20}
            height={20}
            />
            <span className="text-xs">Villas</span>
        </div>

        <div 
            onClick={() => handleCategoryClick('cabins')}
            className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
            currentCategory === 'cabins' ? 'border-black' : 'border-white'
            } opacity-60 hover:border-gray-200 hover:opacity-100`}
        >
            <Image
            src="/icn_category.jpg"
            alt="Category - Cabins"
            width={20}
            height={20}
            />
            <span className="text-xs">Cabins</span>
        </div>

        <div 
            onClick={() => handleCategoryClick('tiny_homes')}
            className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
            currentCategory === 'tiny_homes' ? 'border-black' : 'border-white'
            } opacity-60 hover:border-gray-200 hover:opacity-100`}
        >
            <Image
            src="/icn_category.jpg"
            alt="Category - Tiny Homes"
            width={20}
            height={20}
            />
            <span className="text-xs">Tiny Homes</span>
        </div>
        </div>
    );
};

export default Categories;
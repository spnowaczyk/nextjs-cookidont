import React from 'react';
import NavBar from '../../components/NavBar';
import Link from 'next/link';

const adminPage = () => {
    return (
        <>
            <NavBar />
            <div className="container mx-auto px-4 pt-32">
                <h1 className="text-4xl font-bold text-center mb-8">Admin Page</h1>
                <div className="flex justify-center space-x-4">
                    <Link legacyBehavior href="/admin/delete-recipe">
                        <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Delete Recipe</a>
                    </Link>
                    <Link legacyBehavior href="/admin/add-recipe">
                        <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Recipe</a>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default adminPage;
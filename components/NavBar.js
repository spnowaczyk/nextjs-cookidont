import React from "react";
import Link from 'next/link';

const NavBar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full bg-blue-500 py-2 shadow-md shadow-black/5">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                <div className="flex items-center space-x-8">
                    <Link legacyBehavior href="/cart">
                        <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">My Cart</a>
                    </Link>
                    <Link legacyBehavior href="/recipe-list">
                        <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">CookBook</a>
                    </Link>
                </div>
                <Link legacyBehavior href="/admin">
                    <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Admin</a>
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;
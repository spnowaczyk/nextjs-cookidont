import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import ApiService from "../../services/ApiService";
import Link from 'next/link';

export default function RecipeList() {
    const [cart, setCart] = useState({});
    const [recipes, setRecipes] = useState([]);

    const handleAddToCart = (id) => {
        setCart((prevCart) => ({
            ...prevCart,
            [id]: (prevCart[id] || 0) + 1,
        }));
    };

    const handleRemoveFromCart = (id) => {
        setCart((prevCart) => {
            const newCart = { ...prevCart };
            delete newCart[id];
            return newCart;
        });
    };

    const handleIncreaseQuantity = (id) => {
        setCart((prevCart) => ({
            ...prevCart,
            [id]: prevCart[id] + 1,
        }));
    };

    const handleDecreaseQuantity = (id) => {
        setCart((prevCart) => {
            const newQuantity = prevCart[id] - 1;
            if (newQuantity <= 0) {
                const newCart = { ...prevCart };
                delete newCart[id];
                return newCart;
            } else {
                return {
                    ...prevCart,
                    [id]: newQuantity,
                };
            }
        });
    };

    useEffect(() => {
        const fetchRecipesBaseArray = async () => {
            try {
                const fetchedRecipes = await ApiService.fetchRecipesBaseArray('/example-endpoint');
                setRecipes(fetchedRecipes);
                console.log("data loaded");
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchRecipesBaseArray();
    }, []);

    const recipesElements = recipes.map(recipe => {
        const inCart = cart[recipe.id];
        return (
            <div key={recipe.id} className="max-w-sm rounded overflow-hidden shadow-lg">
                <Link legacyBehavior href={`http://localhost:3000/show-recipe?id=${recipe.id}`}>
                    <a>
                        <img className="w-fit h-96 object-cover cursor-pointer" src={recipe.photo_url} alt="Recipe Image"/>
                    </a>
                </Link>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2 line-clamp-2">{recipe.desig}</div>
                    <div className="px-0 py-1 contain-size">
                        <p className="text-gray-700 text-base line-clamp-2">{recipe.description}</p>
                    </div>
                </div>
                <div className="px-6 pt-12 pb-4">
                    {!inCart ? (
                        <button
                            onClick={() => handleAddToCart(recipe.id)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Add to Cart
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => handleRemoveFromCart(recipe.id)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Remove from Cart
                            </button>
                            <div className="flex items-center mt-2">
                                <button
                                    onClick={() => handleDecreaseQuantity(recipe.id)}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-l">
                                    -
                                </button>
                                <div className="px-4 py-2 text-gray-700">
                                    Quantity: {cart[recipe.id]}
                                </div>
                                <button
                                    onClick={() => handleIncreaseQuantity(recipe.id)}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-r">
                                    +
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    });

    return (
        <div className="container mx-auto px-4">
            <Head>
                <title>Recipe Book</title>
            </Head>
            <h1 className="text-4xl font-bold text-center my-8">Recipe Book</h1>
            <div className="grid md:grid-cols-4 gap-4">
                {recipesElements}
            </div>
        </div>
    );
}


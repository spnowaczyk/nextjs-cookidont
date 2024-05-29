import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import NavBar from "../../../components/NavBar";
import apiService from "../../../services/ApiService";

export default function DeleteRecipe() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const fetchedRecipes = await apiService.fetchRecipesBaseArray('/example-endpoint');
                setRecipes(fetchedRecipes);
                console.log("Recipes loaded");
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        };

        fetchRecipes();
    }, []);

    const handleDeleteRecipe = async (id) => {
        try {
            await ApiService.deleteRecipe(`/delete-recipe-endpoint?id=${id}`);
            setRecipes(recipes.filter(recipe => recipe.id !== id));
            console.log("Recipe deleted successfully");
        } catch (error) {
            console.error("Error deleting recipe:", error);
            alert("Failed to delete recipe. Please try again later.");
        }
    };

    return (
        <>
            <NavBar/>
            <div className="pt-32 bg-white">
                <div className="container mx-auto px-4">
                    <Head>
                        <title>Delete Recipes</title>
                    </Head>
                    <h1 className="text-4xl font-bold text-center my-8">Delete Recipes</h1>
                    <div className="grid md:grid-cols-4 gap-4">
                        {recipes.map(recipe => (
                            <div key={recipe.id} className="max-w-sm rounded overflow-hidden shadow-lg">
                                <img className="w-fit h-96 object-cover" src={recipe.photo_url} alt="Recipe Image"/>
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2 line-clamp-2">{recipe.desig}</div>
                                    <div className="px-0 py-1 contain-size">
                                        <p className="text-gray-700 text-base line-clamp-2">{recipe.description}</p>
                                    </div>
                                </div>
                                <div className="px-6 pt-12 pb-4">
                                    <button
                                        onClick={() => handleDeleteRecipe(recipe.id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
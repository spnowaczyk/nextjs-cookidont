import React, { useState, useEffect } from 'react';
import ApiService from "../../services/ApiService";
import { useRouter } from 'next/router';
import NavBar from "../../components/NavBar";

export default function ShowRecipe() {
    const [recipe, setRecipe] = useState(null);
    const router = useRouter();
    const { id } = router.query; // Extracting the 'id' from the query parameter

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const queredId = id.toString();
                const recipe = await ApiService.fetchRecipeExtended(`/recipes/${queredId}`);
                setRecipe(recipe);
                console.log("Data loaded");
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchRecipe();
    }, [id]);

    if (!recipe) return <p>Slow down, brick cowboy! You have {id} bricks!</p>;

    console.log('ingredients')
    console.log(recipe.ingredients)
    console.log('desig')
    console.log(recipe.desig)
    console.log('guide')
    console.log(recipe.guide)
    // Constructing an array of strings representing ingredients and quantities
    const ingredientsList = recipe.ingredients.map(ingredient => `${ingredient[0]}: ${ingredient[1]}`);

    return (
        <>
            <NavBar/>
            <div className="pt-32 bg-white">
                <div className="max-w-4xl mx-auto p-6">
                    <h1 className="text-4xl font-serif mb-4">{recipe.desig}</h1>
                    <div className="mb-4 pt-10">
                        <img className="w-fit h-96 object-cover" src={recipe.photo_url} alt="Recipe Image"/>
                    </div>
                    <p className="mb-6">{recipe.description}</p>
                    <p className="mb-6">{recipe.fluff}</p>
                    <p className="mb-6">Preparation time: {recipe.time}</p>
                    <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
                    <ul className="list-disc list-inside mb-6">
                        {ingredientsList.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <h2 className="text-2xl font-semibold mb-2">Guide</h2>
                    <ol className="list-decimal list-inside">
                        {recipe.guide.map((step, index) => (
                            <li key={index} className="mb-2">{step}</li>
                        ))}
                    </ol>
                </div>
            </div>
        </>
    );
}
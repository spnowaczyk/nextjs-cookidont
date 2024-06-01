import React, { useState } from 'react';
import Head from 'next/head';
import NavBar from "../../../components/NavBar";
import ApiService from "../../../services/ApiService";

export default function AddRecipe() {
    const [recipeData, setRecipeData] = useState({
        desig: '',
        photo_url: '',
        description: '',
        fluff: '',
        time: '',
        ingredients: [{ name: '', amount: '' }],
        guide: ['']
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRecipeData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleIngredientChange = (e, index) => {
        const { name, value } = e.target;
        const newIngredients = [...recipeData.ingredients];
        newIngredients[index] = { ...newIngredients[index], [name]: value };
        setRecipeData(prevState => ({
            ...prevState,
            ingredients: newIngredients
        }));
    };

    const handleGuideChange = (e, index) => {
        const { value } = e.target;
        const newGuide = [...recipeData.guide];
        newGuide[index] = value;
        setRecipeData(prevState => ({
            ...prevState,
            guide: newGuide
        }));
    };

    const handleAddRecipe = async () => {
        try {
            // Convert ingredients to match RecipeExtended format
            const formattedIngredients = recipeData.ingredients.map(ingredient => ({
                name: ingredient.name,
                amount: parseInt(ingredient.amount)
            }));

            // Construct RecipeExtended object
            const recipeExtended = new RecipeExtended(
                null, // Id will be generated by the server
                recipeData.desig,
                recipeData.photo_url,
                recipeData.description,
                recipeData.fluff,
                recipeData.time,
                formattedIngredients,
                recipeData.guide
            );

            // Call API service to add recipe
            await ApiService.addRecipe('/add-recipe-endpoint', recipeExtended);

            // Reset form after successful submission
            setRecipeData({
                desig: '',
                photo_url: '',
                description: '',
                fluff: '',
                time: '',
                ingredients: [{ name: '', quantity: '' }],
                guide: ['']
            });
            alert('Recipe added successfully!');
        } catch (error) {
            console.error('Error adding recipe:', error);
            alert('Failed to add recipe. Please try again later.');
        }
    };

    return (
        <>
            <NavBar/>
            <div className="pt-32 bg-white">
                <div className="max-w-4xl mx-auto p-6">
                    <h1 className="text-4xl font-serif mb-4">Add New Recipe</h1>
                    <form>
                        {/* Title */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="desig">
                                Title
                            </label>
                            <input
                                type="text"
                                id="desig"
                                name="desig"
                                value={recipeData.desig}
                                onChange={handleInputChange}
                                className="border border-gray-300 p-2 rounded w-full"
                                required
                            />
                        </div>
                        {/* Photo URL */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo_url">
                                Photo URL
                            </label>
                            <input
                                type="text"
                                id="photo_url"
                                name="photo_url"
                                value={recipeData.photo_url}
                                onChange={handleInputChange}
                                className="border border-gray-300 p-2 rounded w-full"
                                required
                            />
                        </div>
                        {/* Description */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={recipeData.description}
                                onChange={handleInputChange}
                                className="border border-gray-300 p-2 rounded w-full"
                                required
                            />
                        </div>
                        {/* Fluff */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fluff">
                                Fluff
                            </label>
                            <input
                                type="text"
                                id="fluff"
                                name="fluff"
                                value={recipeData.fluff}
                                onChange={handleInputChange}
                                className="border border-gray-300 p-2 rounded w-full"
                                required
                            />
                        </div>
                        {/* Time */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
                                Time
                            </label>
                            <input
                                type="text"
                                id="time"
                                name="time"
                                value={recipeData.time}
                                onChange={handleInputChange}
                                className="border border-gray-300 p-2 rounded w-full"
                                required
                            />
                        </div>
                        {/* Ingredients */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ingredients">
                                Ingredients
                            </label>
                            {recipeData.ingredients.map((ingredient, index) => (
                                <div key={index} className="flex mb-2">
                                    <input
                                        type="text"
                                        name="name"
                                        value={ingredient.name}
                                        onChange={(e) => handleIngredientChange(e, index)}
                                        className="border border-gray-300 p-2 rounded-l w-full"
                                        placeholder="Ingredient Name"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="amount"
                                        value={ingredient.amount}
                                        onChange={(e) => handleIngredientChange(e, index)}
                                        className="border border-gray-300 p-2 rounded-r w-full"
                                        placeholder="Amount"
                                        required
                                    />
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => setRecipeData(prevState => ({ ...prevState, ingredients: [...prevState.ingredients, { name: '', quantity: '' }] }))}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Add Ingredient
                            </button>
                        </div>
                        {/* Guide */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="guide">
                                Guide
                            </label>
                            {recipeData.guide.map((step, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    value={step}
                                    onChange={(e) => handleGuideChange(e, index)}
                                    className="border border-gray-300 p-2 rounded w-full mb-2"
                                    placeholder={`Step ${index + 1}`}
                                    required
                                />
                            ))}
                            <button
                                type="button"
                                onClick={() => setRecipeData(prevState => ({ ...prevState, guide: [...prevState.guide, ''] }))}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Add Step
                            </button>
                        </div>
                        {/* Add Recipe Button */}
                        <button
                            type="button"
                            onClick={handleAddRecipe}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Add Recipe
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

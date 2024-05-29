import React, { useState, useEffect } from 'react';
import NavBar from "../../components/NavBar";
import apiService from "../../services/ApiService";

const Cart = () => {
    const [ingredients, setIngredients] = useState([]);
    const [newIngredientName, setNewIngredientName] = useState('');
    const [newIngredientAmount, setNewIngredientAmount] = useState('');
    const [checkedIngredients, setCheckedIngredients] = useState({});

    useEffect(() => {
        const getIngredients = async () => {
            try {
                const ingredientsData = await apiService.fetchIngredients('/example-endpoint');
                setIngredients(ingredientsData);
                console.log("Ingredients data loaded");
            } catch (error) {
                console.error("Error fetching ingredients data:", error);
            }
        };

        getIngredients();
    }, []);

    const handleDelete = (ingredientName) => {
        const updatedIngredients = ingredients.filter(ingredient => ingredient.name !== ingredientName);
        setIngredients(updatedIngredients);

        const updatedChecked = { ...checkedIngredients };
        delete updatedChecked[ingredientName];
        setCheckedIngredients(updatedChecked);
    };

    const handleAddIngredient = () => {
        if (newIngredientName && newIngredientAmount) {
            const newIngredient = {
                name: newIngredientName,
                amount: parseInt(newIngredientAmount)
            };
            setIngredients(prevState => [...prevState, newIngredient]);
            setNewIngredientName('');
            setNewIngredientAmount('');
        }
    };

    const handleCheckboxChange = (ingredientName) => {
        setCheckedIngredients(prevState => ({
            ...prevState,
            [ingredientName]: !prevState[ingredientName]
        }));
    };

    return (
        <>
            <NavBar/>
            <div className="pt-32 bg-white">
                <div className="max-w-4xl mx-auto p-6">
                    <h1 className="text-4xl font-serif mb-4">My Cart</h1>
                    <ul className="list-disc list-inside mb-6">
                        {ingredients.map((ingredient, index) => (
                            <li key={index} className="flex justify-between items-center mb-2">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={checkedIngredients[ingredient.name] || false}
                                        onChange={() => handleCheckboxChange(ingredient.name)}
                                    />
                                    <span
                                        className={`${
                                            checkedIngredients[ingredient.name] ? 'line-through text-gray-500' : ''
                                        }`}
                                    >
                                        {ingredient.name}: {ingredient.amount}
                                    </span>
                                </div>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                    onClick={() => handleDelete(ingredient.name)}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold mb-2">Add Ingredient</h2>
                        <div className="flex space-x-4">
                            <input
                                type="text"
                                placeholder="Ingredient Name"
                                value={newIngredientName}
                                onChange={(e) => setNewIngredientName(e.target.value)}
                                className="border border-gray-300 p-2 rounded w-full"
                            />
                            <input
                                type="number"
                                placeholder="Amount"
                                value={newIngredientAmount}
                                onChange={(e) => setNewIngredientAmount(e.target.value)}
                                className="border border-gray-300 p-2 rounded w-full"
                            />
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleAddIngredient}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
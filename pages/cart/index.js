import React, { useState, useEffect } from 'react';
import NavBar from "../../components/NavBar";
import apiService from "../../services/ApiService";

const Cart = () => {
    const [ingredients, setIngredients] = useState([]);
    const [newIngredientName, setNewIngredientName] = useState('');
    const [newIngredientAmount, setNewIngredientAmount] = useState('');
    const [newIngredientUnit, setNewIngredientUnit] = useState('');
    const [checkedIngredients, setCheckedIngredients] = useState({});

    useEffect(() => {
        const getIngredients = async () => {
            try {
                const ingredientsData = await apiService.fetchIngredientsList('/ingredients-list/1');
                setIngredients(ingredientsData);
                console.log("Ingredients data loaded");
                console.log(ingredientsData)
            } catch (error) {
                console.error("Error fetching ingredients data:", error);
            }
        };

        getIngredients();
    }, []);

    const handleDelete = async (ingredientName) => {
        const updatedIngredients = ingredients.filter(ingredient => ingredient.name !== ingredientName);
        setIngredients(updatedIngredients);

        const updatedChecked = { ...checkedIngredients };
        delete updatedChecked[ingredientName];
        setCheckedIngredients(updatedChecked);

        // Update ingredients list on the server
        console.log(updatedIngredients)
        await apiService.updateIngredientsList('/ingredients-list/1', updatedIngredients);
    };

    const handleAddIngredient = async () => {
        if (newIngredientName && newIngredientAmount && newIngredientUnit) {
            try {
                // Fetch the ingredient by name to check if it exists
                let fetchedIngredient = await apiService.fetchIngredientIfExistByName("/ingredients?search=", newIngredientName);
                console.log('fetchedIngredient');
                console.log(fetchedIngredient);

                // Fetch current ingredients list
                let currentIngredients = await apiService.fetchIngredientsList('/ingredients-list/1');
                console.log('currentIngredients');
                console.log(currentIngredients);

                let keys = Object.keys(fetchedIngredient);
                let fetchedIngredientlength = keys.length;
                console.log('fetchedIngredientLenght')
                console.log(fetchedIngredientlength)

                if(fetchedIngredientlength === 0) {
                    // If the ingredient does not exist at all, create it and add it to the list
                    await apiService.createIngredient('/ingredients', newIngredientName, newIngredientUnit);
                    const newCreatedIngredient = await apiService.fetchIngredientIfExistByName("/ingredients?search=", newIngredientName)
                    console.log('new ing');
                    console.log(newCreatedIngredient)
                    fetchedIngredient = newCreatedIngredient;
                }
                //old code

                // Check if the ingredient already exists in the cart
                const existingIngredientIndex = currentIngredients.findIndex(ingredient => ingredient.id === fetchedIngredient.id);
                console.log('existingIngredientIndex');
                console.log(existingIngredientIndex);

                if (existingIngredientIndex !== -1) {
                    // If ingredient already exists, increase its quantity
                    currentIngredients[existingIngredientIndex].quantity += parseInt(newIngredientAmount);
                } else {
                    // If ingredient does not exist, add it to the list
                    if (fetchedIngredient.id) {
                        // If the ingredient exists in the fetched data
                        currentIngredients.push({
                            ...fetchedIngredient,
                            quantity: parseInt(newIngredientAmount),
                            completed: false
                        });
                    } else {
                    }
                }

                // Update the ingredients list on the server
                await apiService.updateIngredientsList('/ingredients-list/1', currentIngredients);

                // Update the local state
                setIngredients(currentIngredients);
                setNewIngredientName('');
                setNewIngredientAmount('');
                setNewIngredientUnit('');
            } catch (error) {
                console.error('Error adding or updating ingredient:', error);
            }
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
                                        {ingredient.name}: {ingredient.quantity} {ingredient.unit}
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
                            <input
                                type="text"
                                placeholder="Unit"
                                value={newIngredientUnit}
                                onChange={(e) => setNewIngredientUnit(e.target.value)}
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

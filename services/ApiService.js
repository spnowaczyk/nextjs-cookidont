import RecipeBase, { RecipeExtended } from "../resources/Recipe"
import Formatting from "./Formatting";
import apiService from "./ApiService";

class ApiService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async fetchRecipesBaseArray(endpoint) {
        try {
            const url = this.baseUrl + endpoint;
            console.log(url)
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(response)
            const data = await response.json();
            const recipes = data.map(item => {
                const imageUrl = item.image ? this.baseUrl + '/storage/' + item.image  : 'https://mobileimages.lowes.com/productimages/4d55aa9a-b645-48ec-9a9e-7e6480283eea/02592174.jpg'; // Default image if none provided
                console.log(imageUrl)
                return new RecipeBase(item.id, item.name, imageUrl, item.description);
            });
            return recipes;
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
            return [];
        }
    }

    async fetchRecipeExtended(endpoint) {
        try {
            const url = this.baseUrl + endpoint;
            console.log(url);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data); // Log the data to see its structure
            const imageUrl = data.image ? this.baseUrl + '/storage/' + data.image : 'https://mobileimages.lowes.com/productimages/4d55aa9a-b645-48ec-9a9e-7e6480283eea/02592174.jpg'; // Default image if none provided
            const ingredients = data.ingredients ? data.ingredients.map(ingredient => [ingredient.name, ingredient.pivot.quantity]) : [];
            console.log(ingredients);
            const stepsFormatted = Formatting.stringToStepsArray(data.steps)
            const recipe = new RecipeExtended(data.id, data.name, imageUrl, data.description, data.fluff, data.time_to_prepare, ingredients, stepsFormatted || []);
            console.log(recipe); // Log the constructed recipe object
            return recipe; // Return an array with the single recipe object
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
            return []; // Return an empty array if there's an error
        }
    }

    async fetchIngredientsFromRecipe(endpoint) {
        try {
            const url = this.baseUrl + endpoint;
            console.log(url);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const ingredients = data.ingredients.map(ingredient => ({
                id: ingredient.id,
                quantity: ingredient.pivot.quantity,
                completed: false
            }));

            return ingredients; // Return the ingredients array after mapping
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
            return []; // Return an empty array if there's an error
        }
    }

    async fetchIngredientsList(endpoint) {
        try {
            const url = this.baseUrl + endpoint;
            console.log(url);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            // Extract ingredients from the data and format them
            const ingredients = data.ingredients.map(ingredient => ({
                id: ingredient.id,
                name: ingredient.name,
                unit: ingredient.unit,
                quantity: ingredient.pivot.quantity,
                completed: ingredient.pivot.completed

            }));
            return ingredients;
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
            return []; // Return an empty array if there's an error
        }
    }

    async fetchIngredientIfExistByName(endpoint, searchedName) {
        try {
            const url = this.baseUrl + endpoint + searchedName;
            console.log(url);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            // Find the ingredient with a case-insensitive match for the name
            const ingredient = data.find(ingredient => ingredient.name.toLowerCase() === searchedName.toLowerCase());

            if (ingredient) {
                return {
                    id: ingredient.id,
                    name: ingredient.name,
                    unit: ingredient.unit,
                };
            }

            console.log('no matches')
            return {}; // Return an empty object if no ingredient matches
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
            return {}; // Return an empty object if there's an error
        }
    }

    async addRecipe(endpoint, recipeData) {
        return true;
    }

    async updateIngredientsList(endpoint, updatedIngredients) {
        try {
            const requestBody = {
                ingredients: updatedIngredients.map(ingredient => ({
                    id: ingredient.id,
                    quantity: ingredient.quantity,
                    completed: ingredient.completed
                }))
            };

            const response = await fetch(`${this.baseUrl}` + endpoint, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error('Failed to update ingredients list');
            }

            console.log('Ingredients list updated successfully');
        } catch (error) {
            console.error('Error updating ingredients list:', error);
        }
    };

    async createIngredient(endpoint, CreateName, CreateUnit) {
        const url = this.baseUrl + endpoint;
        console.log(url);
        try {
            const requestBody = {
                name: CreateName,
                unit: CreateUnit
            };

            const response = await fetch(`${this.baseUrl}` + endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error('Failed to update ingredients list');
            }

            console.log('Ingredients list updated successfully');
        } catch (error) {
            console.error('Error updating ingredients list:', error);
        }
    };

    async mergeAndUpdateIngredientsByRecepie(recipeEndpoint, ingredientsListEndpoint, ingredientsListUpdateEndpoint) {
        try {
            // Fetch ingredients from the recipe
            const recipeIngredients = await this.fetchIngredientsFromRecipe(recipeEndpoint);
            console.log('Recipe ingredients:', recipeIngredients);

            // Fetch current ingredients list
            let currentIngredients = await this.fetchIngredientsList(ingredientsListEndpoint);
            console.log('Current ingredients list:', currentIngredients);

            // Merge ingredients from recipe with the current ingredients list
            recipeIngredients.forEach(recipeIngredient => {
                const existingIngredientIndex = currentIngredients.findIndex(ingredient => ingredient.id === recipeIngredient.id);
                if (existingIngredientIndex !== -1) {
                    // If ingredient already exists, increase its quantity
                    currentIngredients[existingIngredientIndex].quantity += recipeIngredient.quantity;
                } else {
                    // If ingredient does not exist, add it to the list
                    currentIngredients.push(recipeIngredient);
                }
            });

            console.log('Merged ingredients list:', currentIngredients);

            // Update the ingredients list with the merged ingredients
            await this.updateIngredientsList(ingredientsListUpdateEndpoint, currentIngredients);
        } catch (error) {
            console.error('Error merging and updating ingredients list:', error);
        }
    }

    async demergeAndUpdateIngredientsByRecepie(recipeEndpoint, ingredientsListEndpoint, ingredientsListUpdateEndpoint) {
        try {
            // Fetch ingredients from the recipe
            const recipeIngredients = await this.fetchIngredientsFromRecipe(recipeEndpoint);
            console.log('Recipe ingredients:', recipeIngredients);

            // Fetch current ingredients list
            let currentIngredients = await this.fetchIngredientsList(ingredientsListEndpoint);
            console.log('Current ingredients list:', currentIngredients);

            // Demerge ingredients from recipe with the current ingredients list
            recipeIngredients.forEach(recipeIngredient => {
                const existingIngredientIndex = currentIngredients.findIndex(ingredient => ingredient.id === recipeIngredient.id);
                if (existingIngredientIndex !== -1) {
                    // If ingredient already exists, decrease its quantity
                    currentIngredients[existingIngredientIndex].quantity -= recipeIngredient.quantity;

                    // If quantity is less than or equal to 0, remove the ingredient
                    if (currentIngredients[existingIngredientIndex].quantity <= 0) {
                        currentIngredients.splice(existingIngredientIndex, 1);
                    }
                }
            });

            console.log('Updated ingredients list after demerging:', currentIngredients);

            // Update the ingredients list with the demerged ingredients
            await this.updateIngredientsList(ingredientsListUpdateEndpoint, currentIngredients);
        } catch (error) {
            console.error('Error demerging and updating ingredients list:', error);
        }
    }

}



// Eksportowanie instancji klasy
export default new ApiService('http://167.71.40.16');
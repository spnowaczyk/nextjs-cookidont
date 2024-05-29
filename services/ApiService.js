import RecipeBase, { RecipeExtended } from "../resources/Recipe"

class ApiService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async fetchRecipesBaseArray(endpoint) {
        const recipies = [];
        recipies.push(new RecipeBase(0, "Spaghetti Carbonara", "https://www.kwestiasmaku.com/sites/v123.kwestiasmaku.com/files/carbonara_02.jpg", "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper."));
        recipies.push(new RecipeBase(1, "Orange Marmalade", "https://www.biggerbolderbaking.com/wp-content/uploads/2021/08/Orange-Marmalade-Thumbnail-scaled.jpg", "A sweet and tangy citrus spread made from oranges."));
        recipies.push(new RecipeBase(2, "The Brick", "https://bit.ly/4aA1Ajl", "the tasty, one and only, BRICK. I love brick. I love brick. I love brick. I love brick. I love brick. I love brick. I love brick. I love brick. I love brick. I love brick. I love brick. I love brick."));
        return recipies;
    }

    async fetchRecipeExtended(endpoint) {
        let recipe;
        if (endpoint === '/example-endpoint?id=0') {
            recipe = new RecipeExtended(
                1,
                "Spaghetti Carbonara",
                "https://www.kwestiasmaku.com/sites/v123.kwestiasmaku.com/files/carbonara_02.jpg",
                "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
                "This dish is a comforting, hearty meal perfect for any occasion.",
                "30 minutes",
                [
                    { name: "Butter (g)", amount: 100 },
                    { name: "Milk (ml)", amount: 200 },
                    { name: "Orange (pcs)", amount: 2 }
                ],
                [
                    "Put a large saucepan of water on to boil.",
                    "Finely chop the pancetta, having first removed any rind.",
                    "Beat the eggs in a medium bowl, season with a little freshly grated black pepper and set everything aside.",
                    "Add the pancetta to a cold frying pan and place over medium heat, allowing the fat to render out and the pancetta to crisp up.",
                    "Remove from heat and add the garlic, then the drained spaghetti.",
                    "Mix most of the cheese in with the eggs, keeping a small handful back for sprinkling over later.",
                    "Quickly mix the pasta with the egg and cheese mixture.",
                    "Serve immediately with the rest of the cheese and a sprinkle of parsley."
                ]
            );
        } else if (endpoint === '/example-endpoint?id=1') {
            recipe = new RecipeExtended(
                2,
                "Orange Marmalade",
                "https://www.biggerbolderbaking.com/wp-content/uploads/2021/08/Orange-Marmalade-Thumbnail-scaled.jpg",
                "A sweet and tangy citrus spread made from oranges.",
                "This homemade marmalade is bursting with flavor and perfect for spreading on toast or pastries.",
                "1 hour",
                [
                    { name: "Butter (g)", amount: 100 },
                    { name: "Milk (ml)", amount: 200 },
                    { name: "Orange (pcs)", amount: 2 }
                ],
                [
                    "Wash the oranges and lemons thoroughly.",
                    "Cut the oranges and lemons in half and juice them.",
                    "Strain the juice into a large pot, removing any seeds.",
                    "Thinly slice the orange and lemon peels.",
                    "Add the sliced peels to the pot with the juice.",
                    "Measure the juice and add an equal amount of sugar to the pot.",
                    "Add 1 cup of water for every cup of juice and sugar mixture.",
                    "Bring the mixture to a boil over medium-high heat, stirring frequently.",
                    "Reduce the heat to low and let the mixture simmer for 45-60 minutes, or until it reaches the desired consistency.",
                    "Pour the marmalade into sterilized jars and seal tightly.",
                    "Let the jars cool completely before storing in the refrigerator."
                ]
            );
        }
        return recipe;
    }
    async fetchIngredients(endpoint) {
        let ingredients = [
            { name: "Butter (g)", amount: 100 },
            { name: "Milk (ml)", amount: 200 },
            { name: "Orange (pcs)", amount: 2 }
        ];
        return ingredients;
    }

    async addRecipe(endpoint, recipeData) {
        return true;
    }

}

// Eksportowanie instancji klasy
export default new ApiService('https://api.example.com');
class RecipeBase {
    constructor(id, desig, photo_url, description) {
        this.id = id;
        this.desig = desig;
        this.photo_url = photo_url;
        this.description = description;
    }
}

class RecipeExtended extends RecipeBase {
    constructor(id, desig, photo_url, description, fluff, time, ingredients, guide) {
        super(id, desig, photo_url, description);
        this.fluff = fluff;
        this.time = time;
        this.ingredients = ingredients;
        this.guide = guide;
    }
}

export default RecipeBase;

export { RecipeExtended };
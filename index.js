'use strict';

const cakeRecipes = require("./cake-recipes.json");
const prompt = require("prompt-sync")();

let savedIngredients = []; // Array for saved ingredients

// Function to get a list of unique authors
const getAllAuthors = (recipes) => {
    let authors = [];
    recipes.forEach(({ Author }) => {
        if (!authors.includes(Author)) {
            authors.push(Author);
        }
    });
    return authors;
};

// Function to display all recipe names
const printRecipeNames = (recipes) => {
    if (recipes.length === 0) {
        console.log("No recipes found.");
        return;
    }
    recipes.forEach(({ Name }) => console.log(Name));
};

// Function for searching recipes by author
const getRecipesByAuthor = (recipes, author) => {
    return recipes.filter(({ Author }) => Author === author);
};

// Function for searching a recipe by ingridients
const getRecipesByIngredient = (recipes, ingredient) => {
    return recipes.filter(({ Ingredients }) => Ingredients.some(i => i.includes(ingredient)));
};

// Function for searching a recipe by name
const getRecipeByName = (recipes, name) => {
    return recipes.find(({ Name }) => Name.toLowerCase().includes(name.toLowerCase()));
};

// Function to get a list of all ingredients of saved recipes
const getAllIngredients = (recipes) => {
    return recipes.reduce((acc, { Ingredients }) => acc.concat(Ingredients), []);
};

// Function for displaying menu
const displayMenu = () => {
    console.log("\nRecipe Management System Menu:");
    console.log("1. Show All Authors");
    console.log("2. Show Recipe names by Author");
    console.log("3. Show Recipe names by Ingredient");
    console.log("4. Get Recipe by Name");
    console.log("5. Get All Ingredients of Saved Recipes");
    console.log("0. Exit");
    return parseInt(prompt("Enter a number (0-5): "));
};

let choice;
do {
    choice = displayMenu();

    switch (choice) {
        case 1:
            console.log("\nAll Authors:");
            console.log(getAllAuthors(cakeRecipes).join(", "));
            break;
        case 2:
            const author = prompt("Enter author's name: ");
            const recipesByAuthor = getRecipesByAuthor(cakeRecipes, author);
            printRecipeNames(recipesByAuthor);
            break;
        case 3:
            const ingredient = prompt("Enter an ingredient: ");
            const recipesByIngredient = getRecipesByIngredient(cakeRecipes, ingredient);
            printRecipeNames(recipesByIngredient);
            break;
        case 4:
            const recipeName = prompt("Enter recipe name: ");
            const recipe = getRecipeByName(cakeRecipes, recipeName);
            if (recipe) {
                console.log("\nRecipe Details:", recipe);
                if (prompt("Save ingredients? (yes/no): ").toLowerCase() === "yes") {
                    savedIngredients = savedIngredients.concat(recipe.Ingredients);
                    console.log("Ingredients saved!");
                }
            } else {
                console.log("Recipe not found.");
            }
            break;
        case 5:
            console.log("\nAll saved ingredients:");
            console.log([...new Set(savedIngredients)].join(", "));
            break;
        case 0:
            console.log("Exiting...");
            break;
        default:
            console.log("Invalid input. Please enter a number between 0 and 5.");
    }
} while (choice !== 0);
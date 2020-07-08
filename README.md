# Me MyChef and I

## Table of Contents
- [Description](#description)
- [Demo](#demo)
- [Installation](#installation)  
- [Questions](#questions)
- [License](#license)

## Description
'Me MyChef & I' is web application designed to offer users delicous recipes based on what food they have in their home fridge. The web app uses API'S from spoonacular.com, which has 2600+ indgredients and 360k+ recipes. This application will help users to simply visualize ingredients in the fridge and organize and make changes easily. To get started, users simply click on the "Check Your Fridge" icon. From there, you can view, add or remove food from your fridge. It will automatically save, which makes it easy to update and also delete if food has gone bad. Once your fridge is up to date, click on the "Find Recipe" icon and recipes from spoonacular appear for the user, based on the updated fridge.

## Demo
### Heroku URL
[Click Here to checkout a deployed application](https://lit-badlands-54539.herokuapp.com/)

### Screenshots
![Me Mychef and I](./public/assets/image/screenshot-browser.png)
![Mobile-Main](./public/assets/image/mobile-main.png)
![Mobile-Ingredients](./public/assets/image/mobile-ingredients.png)
![Mobile-Recipe](./public/assets/image/mobile-recipe.png)

## Installation
### Local application 
- Step 1: `npm install dotenv express mysql`
- Step 2: `node server.js` (app will run in localhost:8080)
- Step 3: In the `db` folder Use `schema.sql` and `seed.sql` to build a database.

### Heroku appliaction
- The Homepages has an option for an user to choose between `Ingredients` or `Recipe`.
- `Ingredients` will gives users to input their ingredients in the fridge available at home to visualize in one way.
- An user will be able to add/delete any ingredients they wish to do so. Also if the ingredient is not listed in the list by categories, they can add name, category, quantity, and an image url.
- `Recipe` will gives users tips/facts about the food and links to blogs that has the best explanation.
- Once the users enter ingredients in the search, the related recipe will be generated with an image of the recipe, recipe name, missing ingredients, and instructions on making recipe provided.

## License
![License](https://img.shields.io/badge/License-MIT%20License-blue)
- **[MIT License](https://opensource.org/licenses/MIT)** 
- 2020 Team HAAC-ers

## Questions
| Ask Me Now! | Ask Me Now! | Ask Me Now! | Ask Me Now! |
| :---: | :---: | :---: | :---: |
| ![alt text](https://avatars0.githubusercontent.com/u/65268642?s=460&u=bd568c7596e7f6c9585caeb89e88b084e56c21f9&v=4 "Github Profile Picture") | ![alt text](https://avatars3.githubusercontent.com/u/63874445?s=460&u=002d392fd3ed13215f1c72eec6952f72b24bc516&v=4 "Github Profile Picture") | ![alt text](https://media.discordapp.net/attachments/730118992714399874/730120549740838962/Avi.jpg?width=498&height=498 "Github Profile Picture") | ![alt text](https://avatars1.githubusercontent.com/u/63617922?s=460&u=40a42e2aa11ac5027beef3caa9279981244347b5&v=4 "Github Profile Picture") |
| <a style="text-decoration: none; color: red" href="https://github.com/nuleeannajeon" target="_blank">Anna Jeon</a> | <a style="color: orange" href="https://github.com/tndus604" target="_blank">Haley Jeon</a> | <a style="color: green" href="https://github.com/Spntrx" target="_blank">Avi Balsingh</a> | <a style="color: blue" href="https://github.com/Chet1317" target="_blank">Chet Martin</a> |
<<<<<<< HEAD
// api for spoonacular that grabs recipies based off ingredients list
=======
// // api for spoonacular that grabs recipies based off ingredients list
>>>>>>> 0da17b77250e7c7dbeeb1b20cb8d4b246e6eb86a
// const settings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=apples%2Cflour%2Csugar&number=5&ignorePantry=true&ranking=1",
// 	"method": "GET",
// 	"headers": {
// 		"X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
<<<<<<< HEAD
// 		"X-RapidAPI-Key": "d814cc11a8744e6bb7d9a18faa6b7f17"
=======
// 		"X-RapidAPI-Key": "c4da594f4amsh53139c876b46e00p155ca6jsn0a6b630dd26b"
>>>>>>> 0da17b77250e7c7dbeeb1b20cb8d4b246e6eb86a
// 	}
// };

// $.ajax(settings).done(function (response) {
// 	console.log(response);
// });
<<<<<<< HEAD
// fetch("https://api.spoonacular.com/recipes/complexSearch?query=pasta&maxFat=25&number=2&apiKey=d814cc11a8744e6bb7d9a18faa6b7f17")
fetch('https://api.spoonacular.com/recipes/716429/information?apiKey=cb1c464d94f142c08b156c5beddade8b&includeNutrition=false')
.then(function (response) {
    return response.json();
}) .then(function (data) {
console.log(data)
})
// creates array to hold user inputs of ingredients
var ingredientsList = [];
// intilizises local storage and populates ingredents list var if not empty
function init() {
    var storedIngredientsList = JSON.parse(localStorage.getItem("storedIngredients"));
=======

// fetch('https://upenn-cors-anywhere.herokuapp.com/https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
// .then(function (response) {
//     return response.json();
// }) .then(function (data) {
// console.log(data)
// })
// // creates array to hold user inputs of ingredients
// var ingredientsList = [];
// // intilizises local storage and populates ingredents list var if not empty
// function init() {
//     var storedIngredientsList = JSON.parse(localStorage.getItem("storedIngredients"));
>>>>>>> 0da17b77250e7c7dbeeb1b20cb8d4b246e6eb86a
    
//     if (storedIngredientsList !== null) {
//         ingredientsList = storedIngredientsList;
//     };
      

//     localStorage.setItem("storedIngredients", JSON.stringify(ingredientsList));

// };

// init();

// // stores ingredients to local stroage
// function storeIngredients(){
//     localStorage.setItem("storedIngredients", JSON.stringify(ingredientsList));

// }

// $("#addIngredientsButton").click(function(){
//     var userInput = $("#userInputIngredientText").val();
//     if(userInput !== null){
//         ingredientsList.push(userInput);
//         renderIngredientsList();
//         storeIngredients();

//     };
// });

// function renderIngredientsList(){
//     // var userInput = $("#userInputIngredientText").val()
//     $("#ingredientsListSaved").empty();
//     ingredientsList.forEach((value, key) => {
//         var index = key;
//         var userInput = value;
//         var listHtml = 
//         $(`<li id="listbox-item-`+index+`" role="option"
//         class="text-gray-900 h-20 cursor-default hover:text-gray-500 select-none relative py-2 pl-3 pr-9">
//         <div class="grid grid-cols-12 h-16">
//             <div class="flex items-center col-span-10 h-auto">
//                 <span class="ml-3 block truncate text-lg font-bold font-gray-800">
//                 `+userInput+`
//                 </span>
//             </div>
//             <span class="col-end-13 col-span-1 h-16 w-16 flex justify-center my-auto pr-4">
//                 <svg class=" cursor-pointer stroke-2 h-30 w-30  text-red-500 hover:text-red-700"
//                     fill="none" stroke="currentColor" viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg">
//                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
//                         d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z">
//                     </path>
//                 </svg>
//             </span>
//         </div>
//     </li>`);

        
//         console.log(value, key)
        

//         $("#ingredientsListSaved").append(listHtml);

        
//     });

// };
// renderIngredientsList();

// Adds functionality to carousel 2 that displays search results

let defaultTransform = 0;
function goNext() {
    defaultTransform = defaultTransform - 398;
    var slider = document.getElementById("slider");
    if (Math.abs(defaultTransform) >= slider.scrollWidth / 1.7) defaultTransform = 0;
    slider.style.transform = "translateX(" + defaultTransform + "px)";
}
next.addEventListener("click", goNext);
function goPrev() {
    var slider = document.getElementById("slider");
    if (Math.abs(defaultTransform) === 0) defaultTransform = 0;
    else defaultTransform = defaultTransform + 398;
    slider.style.transform = "translateX(" + defaultTransform + "px)";
}
prev.addEventListener("click", goPrev);
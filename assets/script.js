// api for spoonacular that grabs recipies based off ingredients list
// const settings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=apples%2Cflour%2Csugar&number=5&ignorePantry=true&ranking=1",
// 	"method": "GET",
// 	"headers": {
// 		"X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
// 		"X-RapidAPI-Key": "d814cc11a8744e6bb7d9a18faa6b7f17"
// 	}
// };

// $.ajax(settings).done(function (response) {
// 	console.log(response);
// });
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
    
    if (storedIngredientsList !== null) {
        ingredientsList = storedIngredientsList;
    };
      

    localStorage.setItem("storedIngredients", JSON.stringify(ingredientsList));

};

init();

// stores ingredients to local stroage
function storeIngredients(){
    localStorage.setItem("storedIngredients", JSON.stringify(ingredientsList));

}

$("#addIngredientsButton").click(function(){
    if(userInput !== null){
        renderIngredientsList();
        var userInput = $("#userInputIngredientText").val();
        ingredientsList.push(userInput);
        storeIngredients();

    };
});

function renderIngredientsList(){
    // var userInput = $("#userInputIngredientText").val()
    $("#ingredientsListSaved").empty();
    ingredientsList.forEach((value, key) => {
        var index = key;
        var userInput = value;
        var listHtml = 
        $(`<li id="listbox-item-`+index+`" role="option" class="text-gray-900 cursor-default hover:bg-indigo-500 hover:text-white select-none relative py-2 pl-3 pr-9">
            <div class="flex items-center">
                <span class="ml-3 block font-normal truncate">
                    `+userInput+`
                </span>
            </div>
            <span class="absolute inset-y-0 right-0 flex items-center pr-4">
            <button type="button" class="h-6 w-6 px-2 bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full">
                Delete
              </button>
            </span>
        </li>`);
        console.log(value, key)
        

        $("#ingredientsListSaved").append(listHtml);

        
    });

};
renderIngredientsList();

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
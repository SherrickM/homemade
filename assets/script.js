// api for spoonacular that grabs recipies based off ingredients list
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=apples%2Cflour%2Csugar&number=5&ignorePantry=true&ranking=1",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
		"X-RapidAPI-Key": "c4da594f4amsh53139c876b46e00p155ca6jsn0a6b630dd26b"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});

fetch('https://upenn-cors-anywhere.herokuapp.com/https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
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
    var userInput = $("#userInputIngredientText").val();
    if(userInput !== null){
        ingredientsList.push(userInput);
        renderIngredientsList();
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
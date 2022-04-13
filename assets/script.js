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
        $(`<li id="listbox-item-`+index+`" role="option" class="text-gray-900 cursor-default hover:bg-gray-300 select-none relative py-2 pl-3 pr-9">
                <div class="flex items-center">
                    <span class="ml-3 block font-normal truncate">
                        `+userInput+`
                    </span>
                </div>
                <span class="absolute inset-y-0 right-0 flex items-center pr-4">
                <svg class="h-6 w-6 sm:px-2 text-pink-600 hover:text-pink-700 w-full transition ease-in duration-200 text-center font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </span>
            </li>`
        );
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
// creates event listener and code for click on toggle button between food and drink
$("#toggleBtn").click(toggleFoodDrink);
// functionality of toggle botton between food and drink
function toggleFoodDrink(event){
    // togogles the class that moves the inner circle to the left and right"
    $("#toggleCircle").toggleClass("translate-x-7");
    // toggle background of food class
    $("#food").toggleClass("bgMidL");
    $("#drink").toggleClass("bgMidL");
    // if the data-v value is "food", then change it to "drink"
    if($("#addIngredientsButton").data("v") == "food"){
        $("#addIngredientsButton").data("v", "drink");
        console.log($("#addIngredientsButton").data("v"));
    }
    // if the data-v value is "drink", then change it to "food"
    else{
        // $("#drink").toggleClass("bgMidL");
        $("#addIngredientsButton").data("v", "food");
        console.log($("#addIngredientsButton").data("v"))
    }
    
    renderIngredientsList();

};

// variable for stored drink ingredintes
var drinkIngredents = [];

// variable for stored food ingredients
var ingredientsList = [];
// variable for selecting the search button
var searchBtn = $("#searchBtn")
console.log(searchBtn)

var ApiKeyGedion =  "d814cc11a8744e6bb7d9a18faa6b7f17";




// // intilizises local storage and populates ingredents list var if not empty
function init() {
    var storedIngredientsList = JSON.parse(localStorage.getItem("storedIngredients"));
    // deletes last food item if list is > 5
    if (ingredientsList > 5){
        ingredientsList.pop()
    };
    // if local storage contains items, bring them into food ingredients list
    if (storedIngredientsList !== null) {
        ingredientsList = storedIngredientsList;
    };
      
    // adds food ingredients list to stored food ingredients in local storage(storedIngredients)
    localStorage.setItem("storedIngredients", JSON.stringify(ingredientsList));

    // init for drink list
    var storedDrinkIngredientsList = JSON.parse(localStorage.getItem("storedDrinkIngredients"));

    // if local storage contains items, bring them into drink ingredients list
    if (storedDrinkIngredientsList !== null) {
        drinkIngredents = storedDrinkIngredientsList;
    };
      
    // adds food ingredients list to stored drink ingredients in local storage(storedDrinkIngredients)
    localStorage.setItem("storedDrinkIngredients", JSON.stringify(drinkIngredents));

    appendHistory();

};
// calls init function to initilize local storage
init();



// stores ingredients to local stroage
function storeIngredients(){
    // sets food ingredients list into local storage
    localStorage.setItem("storedIngredients", JSON.stringify(ingredientsList));

    // store drinks list
    localStorage.setItem("storedDrinkIngredients", JSON.stringify(drinkIngredents));

}

$("#addIngredientsButton").click(function(){
    // limits length of ingredients of drinks then food to no more than 5
    if (drinkIngredents.length > 4){
        drinkIngredents.pop()
    };
    if (ingredientsList.length > 4){
        ingredientsList.pop()
    };
    // if data attribute "v" of addIngredientsButton is food, add user input in userInputIngredientText
    // to the (food) ingredientsList. render to page and save to local storage
    if($("#addIngredientsButton").data("v") == "food"){
        var userInput = $("#userInputIngredientText").val();
        if(userInput !== null){
            ingredientsList.splice(0,0, userInput);
            renderIngredientsList();
            storeIngredients();
        };
    // if data attribute "v" of addIngredientsButton is drink, add user input in userInputIngredientText
    // to the (drink) drinkIngredents list. render to page and save to local storage
    } else if ($("#addIngredientsButton").data("v") == "drink") {
        var userInput = $("#userInputIngredientText").val();
        if(userInput !== null){
            drinkIngredents.splice(0,0, userInput);
            renderIngredientsList();
            storeIngredients();
        };

    }
    
    // clears the user input after being added
    $("#userInputIngredientText").val("");

    
    
});

function renderIngredientsList(){
    // clears rendered list ingredents from page to prevent double rendering
    $("#ingredientsListSaved").empty();
    // creates variable for current list for alternating between food and drink
    var currentList = null;
    // if toogle switch's data-v = food, populate currentList with food ingredients, otherwise
    // populate with drink list
    if($("#addIngredientsButton").data("v") == "food"){
        currentList = ingredientsList;
    } else {
        currentList = drinkIngredents
        };
    // for each value in the currentList, render html from list
    currentList.forEach((value, key) => {
        var index = key;
        var userInput = value;
        var listHtml = 
        $(`<li id="listbox-item-`+index+`" role="option"
        class="text-gray-900 h-16 cursor-default hover:text-gray-500 select-none relative py-2 pl-3 pr-9">
        <div class="grid grid-cols-12 h-16">
            <div class="flex items-center col-span-10 h-auto">
                <span class="ml-3 block truncate text-lg font-bold font-gray-800">
                `+userInput+`
                </span>
            </div>
            <span class=" col-end-13 col-span-1 h-12 w-12 flex justify-center my-auto pr-4">
                <svg class="deleteBtn cursor-pointer stroke-2 h-30 w-30  text-red-500 hover:text-red-700" data-i=`+index+`
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z">
                    </path>
                </svg>
            </span>
                    </li>`);

                    $("#ingredientsListSaved").append(listHtml);
     
     });
                
};

// calls function to render lists from local storage to page
renderIngredientsList();

searchBtn.on("click", searchFoodApi);



function searchFoodApi(){
    //  we have to decide if we are going to use daynamic url or just use three inredients everytime. 
    // for(var i=0; i < ingredientsList.length; i++){
                
    // var dynamicUrl = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=${ingredientsList[i]}%2${ingredientsList[i]}%2C${ingredientsList[i]}&number=5&ignorePantry=true&ranking=1`
    // }
    // console.log(dynamicUrl)
    // const settings = {
	// "async": true,
	// "crossDomain": true,
	// "url": `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=${ingredientsList[0]}%2${ingredientsList[1]}%2C${ingredientsList[2]}%2C${ingredientsList[3]}%2C${ingredientsList[4]}&number=5&ignorePantry=true&ranking=1`,
	// "method": "GET",
	// "headers": {
	// 	"X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
	// 	"X-RapidAPI-Key": "c4da594f4amsh53139c876b46e00p155ca6jsn0a6b630dd26b"
        
	// }
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${ApiKeyGedion}&ingredients=${ingredientsList[0]},+${ingredientsList[1]},+${ingredientsList[2]}&number=5`)
    .then(function(response){
    return response.json();
})

    .then(function (response) {
	
    localStorage.setItem("storedSearch", JSON.stringify(response));
    
    for (var i = 0; i< response.length; i++){
        var id = response[i].id;
        
    
    $("#firstimage"+[i]).attr("src", `https://spoonacular.com/recipeImages/${id}-312x231.jpg`);
    $("#recipieName"+[i]).text(response[i].title);
    
    }

});
};

function appendHistory(){
    var savedSearch = JSON.parse(localStorage.getItem("storedSearch"));
    console.log("hello")
    for (var i = 0; i< savedSearch.length; i++){
        var idlocal = savedSearch[i].id;
       
    
    $("#history"+[i]).attr("src", `https://spoonacular.com/recipeImages/${idlocal}-312x231.jpg`);
    $("#historyname"+[i]).text(savedSearch[i].title);
    
    }




 


// adds funtionality to delete button
// on click of delete button, run function deleteListItem
$("#ingredientsListSaved").on("click", ".deleteBtn", deleteListItem);
// function for deleting list items
function deleteListItem (){
    // selects the index value of the list item (data(i) property in html) for deletion
    var deleteBtnIndex = $(this).data("i");
    // if toggled to food, delete from food list, otherwise delete from drink
    if($("#addIngredientsButton").data("v") == "food"){
        ingredientsList.splice(deleteBtnIndex, 1);
        console.log(ingredientsList);
    } else {
        drinkIngredents.splice(deleteBtnIndex, 1);
        };
    // render and store new lists
    renderIngredientsList();
    storeIngredients();

};

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
prev.addEventListener("click", goPrev)};
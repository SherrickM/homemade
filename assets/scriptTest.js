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
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd">
                    </path>
                </svg>
            </span>
        </li>`);
        console.log(value, key)
        

        $("#ingredientsListSaved").append(listHtml);

        
    });

};

renderIngredientsList();
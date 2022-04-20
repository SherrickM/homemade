// creates event listener and code for click on toggle button between food and drink
$("#toggleBtn").click(toggleFoodDrink);
// functionality of toggle botton between food and drink
function toggleFoodDrink(event) {
    // togogles the class that moves the inner circle to the left and right"
    $("#toggleCircle").toggleClass("translate-x-7");
    // toggle background of food class
    $("#food").toggleClass("bgMidL");
    $("#drink").toggleClass("bgMidL");

    // if the data-v value is "food", then change it to "drink"
    if ($("#addIngredientsButton").data("v") == "food") {

        renderDrinkIngredientsSelector();

    } else { // if the data-v value is "drink", then change it to "food"

        renderFoodIngredientsSelector();

    }

    renderIngredientsList();

};

function renderDrinkIngredientsSelector() {
    $("#addIngredientsButton").data("v", "drink");

    //here's where you'll show the drink card/ hide food card
    $("#foodRecipeSearchResults").hide();
    $("#drinkRecipeSearchResults").show();

    console.log($("#addIngredientsButton").data("v"));
}

function renderFoodIngredientsSelector() {
    $("#addIngredientsButton").data("v", "food");

    //here's where you'll show food card/hide drink card
    $("#foodRecipeSearchResults").show();
    $("#drinkRecipeSearchResults").hide();

    console.log($("#addIngredientsButton").data("v"))
}



// variable for stored drink ingredintes
var drinkIngredients = [];

// variable for stored food ingredients
var ingredientsList = [];
// variable for selecting the search button
var searchBtn = $("#searchBtn")
console.log(searchBtn)

var ApiKeyGedion = "d814cc11a8744e6bb7d9a18faa6b7f17";


// // intilizises local storage and populates ingredents list var if not empty
function init() {
    var storedIngredientsList = JSON.parse(localStorage.getItem("storedIngredients"));
    // deletes last food item if list is > 5
    if (ingredientsList > 5) {
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
        drinkIngredients = storedDrinkIngredientsList;
        if (drinkIngredients > 0) {
            drinkIngredients.pop()
        };
    };

    // adds food ingredients list to stored drink ingredients in local storage(storedDrinkIngredients)
    localStorage.setItem("storedDrinkIngredients", JSON.stringify(drinkIngredients));

};
// calls init function to initilize local storage
init();

// stores ingredients to local stroage
function storeIngredients() {
    // sets food ingredients list into local storage
    localStorage.setItem("storedIngredients", JSON.stringify(ingredientsList));

    // store drinks list
    localStorage.setItem("storedDrinkIngredients", JSON.stringify(drinkIngredients));

}

$("#addIngredientsButton").click(function () {
    // limits length of ingredients of drinks then food to no more than 5
    if (drinkIngredients.length > 0) {
        drinkIngredients.pop()
    };
    if (ingredientsList.length > 4) {
        ingredientsList.pop()
    };
    // if data attribute "v" of addIngredientsButton is food, add user input in userInputIngredientText
    // to the (food) ingredientsList. render to page and save to local storage
    if ($("#addIngredientsButton").data("v") == "food") {
        var userInput = $("#userInputIngredientText").val();
        if (userInput !== null) {
            ingredientsList.splice(0, 0, userInput);
            renderIngredientsList();
            storeIngredients();
        };
        // if data attribute "v" of addIngredientsButton is drink, add user input in userInputIngredientText
        // to the (drink) drinkIngredients list. render to page and save to local storage
    } else if ($("#addIngredientsButton").data("v") == "drink") {
        var userInput = $("#userInputIngredientText").val();
        if (userInput !== null) {
            drinkIngredients.splice(0, 0, userInput);
            renderIngredientsList();
            storeIngredients();
        };

    }
    // clears the user input after being added
    $("#userInputIngredientText").val("");



});

function renderIngredientsList() {
    // clears rendered list ingredents from page to prevent double rendering
    $("#ingredientsListSaved").empty();
    // creates variable for current list for alternating between food and drink
    var currentList = null;
    // if toogle switch's data-v = food, populate currentList with food ingredients, otherwise
    // populate with drink list
    if ($("#addIngredientsButton").data("v") == "food") {
        currentList = ingredientsList;
    } else {
        currentList = drinkIngredients
    };
    // for each value in the currentList, render html from list
    currentList.forEach((value, key) => {
        var index = key;
        var userInput = value;
        var listHtml =
            $(`<li id="listbox-item-${index}" role="option"
        class="text-gray-900 h-16 cursor-default hover:text-gray-500 select-none relative py-2 pl-3 pr-9">
        <div class="grid grid-cols-12 h-16">
            <div class="flex items-center col-span-10 h-auto">
                <span class="ml-3 block truncate text-lg font-bold font-gray-800">
                `+ userInput + `
                </span>
            </div>
            <span class=" col-end-13 col-span-1 h-12 w-12 flex justify-center my-auto pr-4">
                <svg class="deleteBtn cursor-pointer stroke-2 h-30 w-30  text-red-500 hover:text-red-700" data-i=`+ index + `
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

searchBtn.on("click", searchApi);


var searchedID =[];


function searchApi() {
    if ($("#addIngredientsButton").data("v") == "food") {
        var apiingredients = ingredientsList.join(",+")

        fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${ApiKeyGedion}&ingredients=${apiingredients}&number=5`)
            .then(function (response) {
                return response.json();
            })

            .then(function (response) {


//     .then(function (response) {
	
//     localStorage.setItem("storedSearch", JSON.stringify(response));
    

//     for (var i = 0; i< response.length; i++){
//         var id = response[i].id;
        
    
//     $("#firstimage"+[i]).attr("src", `https://spoonacular.com/recipeImages/${id}-312x231.jpg`);
//     $("#recipieName"+[i]).text(response[i].title);
    
//     }

// });
// };



    
    for (var i = 0; i< response.length; i++){
        var id = response[i].id;
        var missedIng = response[i].missedIngredients;
        console.log(missedIng[0].name)
        searchedID.push(id);

        var sliderEl = $("#slider2");
        var classConatinerEl = $("<div>");
        classConatinerEl.addClass("cardContainer px-3 py-3 flex flex-shrink-0 relative sm:mr-12  w-full  sm:w-96");
        sliderEl.append(classConatinerEl);
        var cardEl = $("<div>");
        cardEl.addClass("card py-2 bg-white rounded  mx-auto rounded-2xl shadow-md sm:w-96");
        classConatinerEl.append(cardEl);
        var imagecontainer = $("<div>");
        imagecontainer.addClass("p-2  drop-shadow-lg");
        cardEl.append(imagecontainer);
        var recipeimg = $("<img>");
        recipeimg.addClass("mx-auto rounded drop-shadow-lg");
        recipeimg.attr({
            src : `https://spoonacular.com/recipeImages/${id}-312x231.jpg`,
            id : "#firstimage"+[i]
        });
        imagecontainer.append(recipeimg);
        var h1El = $("<h1>");
        h1El.addClass("text-4xl text-center px-4");
        h1El.text(response[i].title);
        cardEl.append(h1El);
        var lineEl = $("<div>")
        lineEl.addClass("border border-green-800 w-64 mx-auto my-2");
        cardEl.append(lineEl);
        var h3El = $("<h3>");
        h3El.addClass("text-center text-2xl px-4 ");
        h3El.text("Remaining ingredients Needed: ");
        cardEl.append(h3El);
        var listconatiner = $("<div>");
        listconatiner.addClass("border border-black rounded w-64 h-32 mx-auto mt-2 drop-shadow-md");
        cardEl.append(listconatiner);
        var list = $("<ul>");
        list.addClass("missedIngredients ml-5 pl-2 pt-2 w-64 h-32 list-decimal");
        listconatiner.append(list);
        var listitem = $("<li>")
        for (var j = 0; j < missedIng.length; j++){
            var listitem = $("<li>");
            listitem.text(missedIng[j].name);
            list.append(listitem);
            }
        list.append(listitem);
        var saveBtnEl = $("<div>");
        saveBtnEl.addClass("seeFullRecipeBtn rounded-full mx-auto shadow-2xl flex w-64 justify-center mt-6 border hover:cursor-pointer")
        cardEl.append(saveBtnEl);
        var savereciepeEL = $("<a>")
        savereciepeEL.text("Save Recipe");
        savereciepeEL.append(saveBtnEl);
        var iconsContainerEL = $("<div>");
        iconsContainerEL.addClass("mt-8 mb-8 flex justify-around w-80 mx-auto");
        cardEl.append(iconsContainerEL);
        var spoonacularEL = $("<div>");
        iconsContainerEL.append(spoonacularEL);
        var spoonacularIcon = $("<img>");
        spoonacularIcon.attr({
            src : "assets/images/spoonacular-score-25.svg",
            alt : "spoonacular Score:",
            title : "spoonacular Score: "
        });
        spoonacularIcon.addClass("badge h-12")
        spoonacularEL.append(spoonacularIcon);
        var scoreTextEl = $("<p>");
        scoreTextEl.addClass("center text-");
        scoreTextEl.text("Score: ");
        scoreTextEl.attr("id", "recipeScore")
        spoonacularEL.append(scoreTextEl);
        var cookTimeEL = $("<div>");
        iconsContainerEL.append(cookTimeEL);
        var cookTimeIcon = $("<img>");
        cookTimeIcon.attr({
            src : "assets/images/fast.svg",
            alt : "spoonacular Score:",
            title : "spoonacular Score: "
        });
        cookTimeIcon.addClass("badge h-12")
        cookTimeEL.append(cookTimeIcon);
        var TimeTextEl = $("<p>");
        TimeTextEl.addClass("center text-");
        TimeTextEl.attr("id", "cookTime"+[i])
        TimeTextEl.text("Time: ");
        cookTimeEL.append(TimeTextEl);
}
    
    fetch(`https://api.spoonacular.com/recipes/informationBulk?apiKey=${ApiKeyGedion}&ids=${searchedID}`)
    .then(function(response2){
        return response2.json();
    })
        .then(function(response2){
            localStorage.setItem("storedBulkSearch", JSON.stringify(repsonse2));
            $("#cookTime").text(`Time :${ response2[i].readyInMinutes} mins.`)
            console.log(response2);
        })
        
});

                localStorage.setItem("storedSearch", JSON.stringify(response));

                for (var i = 0; i < response.length; i++) {
                    var id = response[i].id;


                    $("#firstimage" + [i]).attr("src", `https://spoonacular.com/recipeImages/${id}-312x231.jpg`);
                    $("#recipieName" + [i]).text(response[i].title);

                }

            });
    } else {
        var apiDrinkIngredients =  drinkIngredients[0]

        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${apiDrinkIngredients}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {

                localStorage.setItem("storedSearch", JSON.stringify(response));
             //   console.log(response);
             for (var i = 0; i< 5; i++){
                var drinks1=response.drinks[i];
                console.log(drinks1);
                // var drinkImage = drinks1.strDrinkThumb;
                // var drinkTitle = drinks1.strDrink;
                // var drinkId = drinks1.idDrink;
                // fetch(`https:// www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`)
                // .then(function (response) {
                //     return response.json();
                // }
                // )
                // for (var i = 0; i < response.length; i++) {
                //     var id = response[i].id;
             }

                //     $("#firstimage" + [i]).attr("src", `https://spoonacular.com/recipeImages/${id}-312x231.jpg`);
                //     $("#recipieName" + [i]).text(response[i].title);

                // }

            });
    }

};


function appendHistory() {
    var savedSearch = JSON.parse(localStorage.getItem("storedSearch"));

    console.log(savedSearch)
    console.log(savedSearch[0].id);
    for (var i = 0; i< savedSearch.length; i++){
        var savedFoodId = savedSearch[i].id
     $("#historyimage"+[i]).attr("src", `https://spoonacular.com/recipeImages/${savedFoodId}-312x231.jpg`);
     $("#historyname"+[i]).text(savedSearch[i].title);
    }

    
    }


}


appendHistory();

// adds funtionality to delete button
// on click of delete button, run function deleteListItem
$("#ingredientsListSaved").on("click", ".deleteBtn", deleteListItem);
// function for deleting list items
function deleteListItem() {
    // selects the index value of the list item (data(i) property in html) for deletion
    var deleteBtnIndex = $(this).data("i");
    // if toggled to food, delete from food list, otherwise delete from drink
    if ($("#addIngredientsButton").data("v") == "food") {
        ingredientsList.splice(deleteBtnIndex, 1);
        console.log(ingredientsList);
    } else {
        drinkIngredients.splice(deleteBtnIndex, 1);
    };
    // render and store new lists
    renderIngredientsList();
    storeIngredients();

};

// Adds functionality to carousel 2 that displays search results


var next2 = $("#next2");
var prev2 = $("#prev2");
let defaultTransform2 = 0;
function goNext2() {
    defaultTransform2 = defaultTransform2 - 398;
    var slider = document.getElementById("slider2");
    if (Math.abs(defaultTransform2) >= slider.scrollWidth / 1.7) defaultTransform2 = 0;
    slider.style.transform = "translateX(" + defaultTransform2 + "px)";
}
next2.on("click", goNext2);
function goPrev2() {
    var slider = document.getElementById("slider2");
    if (Math.abs(defaultTransform2) === 0) defaultTransform2 = 0;
    else defaultTransform2 = defaultTransform2 + 398;
    slider.style.transform = "translateX(" + defaultTransform2 + "px)";
}
prev2.on("click", goPrev2);

// Adds functionality to carousel 3 that displays saved food results


var next3 = $("#next3");
var prev3 = $("#prev3");
let defaultTransform3 = 0;
function goNext3() {
    defaultTransform3 = defaultTransform3 - 398;
    var slider = document.getElementById("slider3");
    if (Math.abs(defaultTransform3) >= slider.scrollWidth / 1.7) defaultTransform3 = 0;
    slider.style.transform = "translateX(" + defaultTransform3 + "px)";
}
next3.on("click", goNext3);
function goPrev3() {
    var slider = document.getElementById("slider3");
    if (Math.abs(defaultTransform3) === 0) defaultTransform3 = 0;
    else defaultTransform3 = defaultTransform3 + 398;
    slider.style.transform = "translateX(" + defaultTransform3 + "px)";
}
prev3.on("click", goPrev3);

// Adds functionality to carousel 4 that displays saved food results


var next4 = $("#next4");
var prev4 = $("#prev4");
let defaultTransform4 = 0;
function goNext4() {
    defaultTransform4 = defaultTransform4 - 398;
    var slider = document.getElementById("slider4");
    if (Math.abs(defaultTransform4) >= slider.scrollWidth / 1.7) defaultTransform4 = 0;
    slider.style.transform = "translateX(" + defaultTransform4 + "px)";
}
next4.on("click", goNext4);
function goPrev4() {
    var slider = document.getElementById("slider4");
    if (Math.abs(defaultTransform4) === 0) defaultTransform4 = 0;
    else defaultTransform4 = defaultTransform4 + 398;
    slider.style.transform = "translateX(" + defaultTransform4 + "px)";
}
//prev.addEventListener("click", goPrev);
prev4.on("click", goPrev4);




// Api functionality*******
// var recipeIds = [];
// function getFoodRecipeByIngredients () {
//     var urlingredintlist = ingredientsList.join(",+");
//     const options = {
//         method: 'GET',
//     };
//     fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=`+urlingredintlist+`&number=5&apiKey=820e8a82b4dc451a8a662f4ae853fb43`, options)
//     .then(response => {
//         return response.json();
//     })
//     .then(function (data) {
//         $.each(data,function(prop,obj)
//             {
//             recipeIds.push(obj.id);
//         });
//         getRecipieInfo();
//       })
//     .catch(err => console.error(err));
// };

// getFoodRecipeByIngredients();

// function getRecipieInfo(){
//     id = 673463;
//     const options = {
//         method: 'GET',
//     };
//     fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=820e8a82b4dc451a8a662f4ae853fb43&recipeBoxId=673463`, options)
//     .then(function (response) {
//         return response.json();
//       })
//       .then(function (data) {
//         console.log(data);
//       })
// };

// getRecipieInfo()



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

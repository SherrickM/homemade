fetch('https://upenn-cors-anywhere.herokuapp.com/https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
.then(function (response) {
    return response.json();
}) .then(function (data) {
console.log(data)
})
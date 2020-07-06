// function checkFridge() {
//     var fridgeItems = document.getElementById("fridgeItems");
//     var openFridge = document.getElementById("openFridge");
//     var closeFridge = document.getElementById("closeFridge");
//     fridgeItems.style.display = "block";
//     openFridge.style.display = "block";
//     closeFridge.style.display = "none";
// }

/* unlike node where we can pull in packages with npm, or react, for normal
    webpages, we can use a cool resource called unpkg from the html page, so
    in this example we use the moment npm package on both the server & client side */

/*
    note how we wrap our api fetch in this function that allows us to do some
    additional error / message handling for all API calls...
*/
async function apiCall( url, method='get', data={} ){
    let settings = {
        method,
        headers: { 'Content-Type': 'application/json' }
    }
    // only attach the body for put/post
    if( method === 'post' || method === 'put' ) {
        settings.body = JSON.stringify( data )
    }

    const result = await fetch( url,settings ).then( res=>res.json() )

    return result
}

async function itemList( category='' ) {
    const itemList = await apiCall('/api/food' + (category ? `/${category}` : ''))
    console.log(`[itemList] category=${category}`, itemList)

    const renderItem = document.querySelector('#renderItem')
    renderItem.innerHTML = ''

    itemList.forEach( function(data) {
        renderItem.innerHTML += `
        <div class="col-4">
        <a class="btn" onclick="addToFridge(${data})">
        <img src="${data.image_url}" style="height: 70px; border-radius: 50%;">
        <p>${data.item}</p>
        </a>
        </div>
        `
    })
}



// ------------------------Spoonacular API-------------------------------

function showData() {
	var ingredient = document.querySelector("#ingredientInput").value.toLowerCase();
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=20&ranking=1&ignorePantry=false&ingredients=${ingredient}`,
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
			"x-rapidapi-key": "642fe22188msha6dd6111fa42a5cp18c081jsn4095bcf2f4c1"
		}
	}
	$.ajax(settings).done(function (response) {
		console.log(response);
		var recipeResult = document.querySelector("#recipeResult");
		recipeResult.innerHTML = "";
		for (i=0 ; i<response.length; i++) {
			var recipeID = response[i].id;
			recipeResult.innerHTML += `
			<div class="col-sm-12 col-md-4">
				<img src="${response[i].image}">
			</div>
			<div class="col-sm-12 col-md-8">
				<p><strong>${response[i].title}</strong>
				<br>Missing Ingredients:</p>
				<ul>
					${response[i].missedIngredients[0] ? `<li>${response[i].missedIngredients[0].name}` : ``}
					${response[i].missedIngredients[1] ? `<li>${response[i].missedIngredients[1].name}` : ``}
					${response[i].missedIngredients[2] ? `<li>${response[i].missedIngredients[2].name}` : ``}
					${response[i].missedIngredients[3] ? `<li>${response[i].missedIngredients[3].name}` : ``}
					${response[i].missedIngredients[4] ? `<li>${response[i].missedIngredients[4].name}` : ``}
				</ul>
				<button class="btn btn-primary" onClick="showInstruction(${recipeID})">Detail</button>
				<ol id="showDetail${recipeID}"></ol>
			</div>
			`;
		}
	})
}

var clicks = 0;

function showInstruction(recipeID) {
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeID}/analyzedInstructions?stepBreakdown=false`,
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
			"x-rapidapi-key": "642fe22188msha6dd6111fa42a5cp18c081jsn4095bcf2f4c1"
		}
    }
	$.ajax(settings).done(function (data) {
		console.log(data);
		var showDetail = document.querySelector('#showDetail'+recipeID);
		showDetail.innerHTML = '';
		for (var i=0; i<data.length; i++) {
			for (var j=0; j<data[i].steps.length; j++) {
				showDetail.innerHTML += `
				${data[i].steps[j] ? `<li>${data[i].steps[j].step}</li>` : `<li>Sorry there's no detailed recipe :(</li>`}
				`
			}
		}
	})
}



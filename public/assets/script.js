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
        <button class="btn" onclick="addToFridge(this)" id="${data.id}" name="${data.item}" is_rotten="${data.is_rotten}">
        <img src="${data.image_url}" style="height: 70px; border-radius: 50%;">
        <p>${data.item}</p>
        </button>
        </div>
        `
    })
}

async function addItem(event){
    event.preventDefault();
    console.log(`additem will begins`)

async function displayFridgeList (){
    const getResponse = await apiCall('/api/fridge');
    var renderFridge = document.querySelector('#renderFridge');
    getResponse.forEach( function(data) {
        renderFridge.innerHTML += `
		<div class="col-6">
			<img src="${data.image_url}" style="height: 70px; border-radius: 50%;">
			<div>${data.item} <button class="btn btn-danger"><i class="fa fa-trash"></i></button></div>
		</div>
    `
    })
}
async function addToFridge(data){
    const fridgeItem = {
        id: data.id,
        item: data.name
    }
    console.log(fridgeItem);
    const savedResponse = await apiCall('/api/food', 'put', fridgeItem);
    console.log('saveResponse: ', savedResponse );

    var renderFridge = document.querySelector('#renderFridge');
    const getResponse = await apiCall('/api/fridge')
    renderFridge.innerHTML = ''
    getResponse.forEach( function(data) {
        renderFridge.innerHTML += `
		<div class="col-6">
			<img src="${data.image_url}" style="height: 70px; border-radius: 50%;">
			<div${data.item} <button class="btn btn-danger"><i class="fa fa-trash"></i></button></div>
		</div>
        `
    })
}


async function addItem(event) {
	event.preventDefault()
	
	const newItem = {
		category: document.querySelector('#category').value,
		item: document.querySelector('#itemName').value,
		quantity: document.querySelector('#quantity').value,
		image_url: document.querySelector('#image_url').value
	}

	document.querySelector('#category').value = '';
	document.querySelector('#itemName').value = '';
	document.querySelector('#quantity').value = '';
	document.querySelector('#image_url').value = '';
	if (!newItem.image_url){
        newItem.image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSd2ZSGjR-kIYsWVqqgYJH5g-Aowx8abKcADw&usqp=CAU'
    }
	console.log('[addItem] itemData =', newItem);

	const saveResponse = await apiCall('/api/food', 'post', newItem)
	console.log('[saveResponse]', saveResponse)

	if(saveResponse.status) {
		itemList(newItem.category)
	}
}



    var fridgeIngredient = document.querySelector('#fridge-ingredient');
    const getResponse = await apiCall('/api/fridge')
    fridgeIngredient.innerHTML = ''
    getResponse.forEach( function(data) {
        fridgeIngredient.innerHTML += 
        `
            <img src="${data.image_url}" /><span>${data.item}</span>
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
			<div class="col-sm-12 col-md-6 col-lg-4 recipe-image">
				<img class="recipeFood-image" src="${response[i].image}">
			</div>
			<div class="col-sm-12 col-md-6 col-lg-8">
				<p><strong>${response[i].title}</strong>
				<br>Missing Ingredients:</p>
				<ul>
					${response[i].missedIngredients[0] ? `<li>${response[i].missedIngredients[0].name}` : ``}
					${response[i].missedIngredients[1] ? `<li>${response[i].missedIngredients[1].name}` : ``}
					${response[i].missedIngredients[2] ? `<li>${response[i].missedIngredients[2].name}` : ``}
					${response[i].missedIngredients[3] ? `<li>${response[i].missedIngredients[3].name}` : ``}
					${response[i].missedIngredients[4] ? `<li>${response[i].missedIngredients[4].name}` : ``}
				</ul>
				<button class="btn step-btn" onClick="showInstruction(${recipeID})">Instruction</button>
				<ol id="showDetail${recipeID}"></ol>
			</div>
			`;
		}
	})
}

function showInstruction(recipeID) {
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeID}/analyzedInstructions?stepBreakdown=false`,
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
			"x-rapidapi-key": "7d919f5728mshf027707abe93ba0p1301a8jsn156c49de9236"
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
};

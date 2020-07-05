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
        <div class="col-3">
        <img src="${data.image_url}" style="height: 70px; border-radius: 50%;">
        <button class="btn" onclick="itemAdd(${data.id})">${data.item}</button>
        </div>
        `
    })
}

// async function taskList( due='' ){
//     const taskList = await apiCall( '/api/food' + (category ? `/${category}` : '') )
//     console.log( `[taskList] due='${category}'`, taskList )

//     const listEl = document.querySelector('#list')
//     listEl.innerHTML = ''

//     taskList.forEach( function( task ){
//         listEl.innerHTML += `
//         <li class="list-group-item">
//             <div class="float-right p-0">
//                 <button onClick="taskDelete(${task.id})" class="border-0 btn-transition btn btn-outline-danger"> <i class="fa fa-trash"></i> </button>
//             </div>
//             <div class="todo-indicator bg-${task.priority}"></div>
//             <h3 class="text-primary">${task.info}</h3>
//             <small class="text-muted">${task.due ? 'Due: '+moment(task.due).format('MMM Do, YYYY') : '' }</small>
//         </li>
//         `
//     })
// }

/* functions triggered by the html page */

// run once page has loaded
// async function mainApp(){
//     console.log( '[mainApp] starting...' )

//     // show the task list ...
//     taskList()
// }

// function showTodaysTasks(){
//     document.querySelector('#todayTasksBtn').classList.add('d-none')
//     document.querySelector('#allTasksBtn').classList.remove('d-none')

//     const today = moment().format('YYYY-MM-DD')
//     taskList( today )
// }

// function showAllTasks(){
//     document.querySelector('#todayTasksBtn').classList.remove('d-none')
//     document.querySelector('#allTasksBtn').classList.add('d-none')

//     taskList()
// }

// // toggled by the [Add Task] button
// function toggleTaskForm( forceHide=false ){
//     const formEl = document.querySelector('#taskForm')
//     if( !forceHide || formEl.classList.contains('d-none') ){
//         formEl.classList.remove( 'd-none' )
//     } else {
//         formEl.classList.add( 'd-none' )
//     }
// }

// // triggered by the [x] delete button
// async function taskDelete( id ){
//     const deleteResponse = await apiCall( `/api/tasks/${id}`, 'delete' )
//     console.log( '[taskDelete] ', deleteResponse )

//     taskList()
// }

// // save the new form
// async function saveForm( event ){
//     event.preventDefault()

//     const formData = {
//         priority: document.querySelector('#taskPriority').value,
//         info: document.querySelector('#taskInfo').value,
//         due: document.querySelector('#taskDue').value
//     }

//     // clear form
//     document.querySelector('#taskPriority').value = ''
//     document.querySelector('#taskInfo').value = ''
//     document.querySelector('#taskDue').value = ''
//     console.log( '[saveForm] formData=', formData )

//     const saveResponse = await apiCall( '/api/tasks', 'post', formData )
//     console.log( '[saveResponse] ', saveResponse )

//     if( saveResponse.status ){
//         // hide the form
//         toggleTaskForm( true )

//         // refresh the list
//         taskList()
//     }
// }

function showData() {
	var ingredient = document.querySelector("#ingredientInput").value.toLowerCase();
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=10&ranking=1&ignorePantry=false&ingredients=${ingredient}`,
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
			"x-rapidapi-key": "7d919f5728mshf027707abe93ba0p1301a8jsn156c49de9236"
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
            <div class="col-sm-12 col-md-8" id=''>
				<p><strong>${response[i].title}</strong></p>
				<button class="btn btn-primary" onClick="showInstruction(${recipeID})">Detail</button>
				<ol id="item${recipeID}"></ol>
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
			"x-rapidapi-key": "7d919f5728mshf027707abe93ba0p1301a8jsn156c49de9236"
		}
    }
	$.ajax(settings).done(function (data) {
		console.log(data);
		var showDetail = document.querySelector('#item'+recipeID);
        showDetail.innerHTML = '';
        
        if (clicks % 2 === 0){
            for (var i=0; i<data.length; i++) {
                for (var j=0; j<data[i].steps.length; j++) {
                    showDetail.innerHTML += `
                    <li>${data[i].steps[j].step}</li>
                    `
                    // if( data.length = 0 ){
                    //     showDetail.innerHTML += `No Instruction Available`
                    //     console.log(`where is zero`)
                    // }     NEED FIX*******************WHEN NO STEPS FOUND
                }
            }
        }
        else {
            showDetail.innerHTML = ''
        }
		
        clicks++
	})
}


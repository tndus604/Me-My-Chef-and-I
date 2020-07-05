// function checkFridge() {
//     var fridgeItems = document.getElementById("fridgeItems");
//     var openFridge = document.getElementById("openFridge");
//     var closeFridge = document.getElementById("closeFridge");
//     fridgeItems.style.display = "block";
//     openFridge.style.display = "block";
//     closeFridge.style.display = "none";
// }
async function apiCall(url, method='get', data={}){
    let settings = { method, headers: { 'Content-Type': 'application/json' } }

    if( method === 'post' || method === 'put' ) {
        settings.body = JSON.stringify( data )
    }

    const result = await fetch( url, settings ).then( res=>res.json() );
    return result
}

    /* put the api result message onto the screen as a message if it exists */
    // if( result.status && result.message ){
    //     const apiResultEl = document.querySelector('#apiMessage')
    //     apiResultEl.innerHTML = result.message
    //     apiResultEl.classList.remove( 'd-none' )
    //     console.log( 'showing message: '+ result.message )
    //     setTimeout( function(){
    //         apiResultEl.classList.add( 'd-none' )
    //     }, 5000 )
    // } else if( !result.status && result.message ){
    //     alert( 'Problems: ' + result.message )
    // }

let vegiBtnEl = document.querySelector('.vige-btn');

async function itemListByCatagory (id, category) {
    category = id 

    const itemList = await apiCall('/api/food' + (category ? `/${category}` : '' ));
    console.log(itemList)

    let listEl = document.querySelector('#list');
    listEl.innerHTML = ''
    itemList.forEach( function(foods){
        listEl.innerHTML += 
        `
            <img class="item-image" src="${foods.image_url} alt=''/><span> ${foods.item}</span><br>
        `
    } )
}

async function showCategory (id){
    itemListByCatagory(id);
}
// async function showIngredients( category='' ){
//     const itemList = await apiCall( '/api/food' + (category ? `/${category}` : '') )
//     // console.log( `[taskList] due='${due}'`, taskList )

//     const listEl = document.querySelector('#list')
//     listEl.innerHTML = ''

//     itemList.forEach( function( name ){
//         listEl.innerHTML += `
//         <li class="list-group-item">
//             <div class="float-right p-0">
//                 <button onClick="taskDelete(${name.id})" class="border-0 btn-transition btn btn-outline-danger"> <i class="fa fa-trash"></i> </button>
//             </div>
//             <div class="todo-indicator"></div>
//             <h3 class="text-primary">${name.item}</h3>
//             <small class="text-muted">${name.category ? 'category: '+name.category : '' }</small>
//         </li>
//         `
//     })
//     showtable();
// }

// function showtable(){
    
// }



// becauase we are going to have a promise, aka wanting a certain functionality
// to WAIT on something else
// async function handleClick(){
//     // a promise is something that will eventually resolve
//     // emulating aan API call or something else that takes a long time
//     const greetingMessage = new Promise( (resolve, reject) => {
//         // use a setTimeout to similulate this promise taking a long time
//         // very similar to an API call
//         setTimeout( ()=> resolve('Hello'), 3000) //similuating taking 3 seconds or 3000 milliseconds to resolve this promise
//     })
    
//     // our messaage variable will not be assigned until our promise is resolved
//     console.log('...waiting');
//     const message = await greetingMessage; // simulating calling an API
    
    
//     const displayMessage = document.getElementById('greetMessage');
//     displayMessage.innerText = message;
//     console.log('promise fulfilled!')
    
// }



// API REQUESTS! CONSUMING APIS
// APIs stand for Application Programming Interface
// Essentially the transfer of data across the web
// They are the middle man between the database and the client (waiters/waitstaff in a kitchen)


/*API Request consists of 1-5 things

    1:  Endpoints/url (Required) think of it like a telephone #
        -Base API is whatever you deployed the api on (the deployed url)
        -LocalHost or https://127.0.0.1
        -specific endpoints for different functionaality
            - specified with the /
    2: Parameters (filters on what you are searching for in the server/database) (Optional)
            - parameters start with ?
            - can attach to the url endpoint at the end
            - then they are just key/value pairs
    3: HTTP METHODS (Get, Post, Put, Delete) (Optional but always Present)
            - Per CRUD
                -Get is Read
                -Post is Create
                -Put is Update
                -Delete is Delete
            - GET is the default
    4: Headers (Optional)
        -Post Request we usually have the following Headers
        - "Content-Type" = "application/json"
        - the above is saying we will be sending json information/data
    5: Body (Optional usually only associated with POST, PUT)
        -data we are sending to the database!

*/

// -------------------------------API REQUESTS---------------------------


//GET Request
// because we know that API requests can take a long time we want this to be asychronous
async function fetchPokemonData(name){
    
    // because this is a GET requesst we really only need to specificy the url & paramater
    // we can use the fetch() built-in function to make API requests
    
    // the api call is treated as a promise aka we need to wait for it to be resolved/fulfilled
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    
    const result = await response.json();
    return result; 
}



// STEP 1: CONNECTING FROM HTML TO JAVASCRIPT
async function handleSubmit(event) {
    event.preventDefault();
    
    // event is the whole event
    // target is what the event is attached to
    // if there are multiple inputs/radios/checkboxes then it'll be inside elements
    // if there is just 1 we can target it based off its name attribute
    const pokemonName = event.target.pokemon.value;
    console.log(pokemonName);
    
    const pokemonData =  await fetchPokemonData(pokemonName);
    console.log(pokemonData);
    
    // Created Child Node
    const div = document.createElement('div')
    
    console.log(pokemonData.abilities)
    const liHTML = pokemonData.abilities.map( (abilityObject) => `<li>${abilityObject.ability.name}</li>`).join(" ")
    
    div.innerHTML = `<img src=${pokemonData.sprites.other['dream_world']['front_default']} alt="pokemon image">
                    <p>${pokemonData.name} says hi! Also I am ${pokemonData.weight} pounds</p>
                    <p>These are my abilities</p>
                    <ul>
                        ${liHTML}
                    </ul>
                        
                    `
    
    const display = document.getElementById('pokemon-display')
    display.appendChild(div)
}


// POST REQUEST

async function postTodos(data){
    
    /*POST REQUEST REQ.
        - url X
        - method X
        - headers X
        - body X
    */
   
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    )
    
    return await response.json()
}


// TYING TO THE HTML
async function handleAPIClick(){
    
    const todo = {
        userId: 20,
        id: 500,
        title: "walk my dog",
        completed: false
    }
    
    const result = await postTodos(todo);
    console.log(result);
}
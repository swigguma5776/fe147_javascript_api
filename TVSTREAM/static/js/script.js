

// STEP 1: Grab this DATA from the form
async function handleSubmit(event){
    event.preventDefault();
    
    // grab our seaarch terms from the form
    // console.log(event)
    const search = event.target.search.value;
    console.log(search);
    
    const showData = await fetchTVData(search);
    console.log(showData)
    
    displayShow(showData);
}


// STEP 2: Making a GET Request to our API

async function fetchTVData(show){
    
    const response = await fetch(`https://api.tvmaze.com/singlesearch/shows?q=${show}`)
    return await response.json()
}

// create  a globaal id value that we increment (Option 1 for unique)
// let id = 1

// STEP 3: Make Cards for our Display
function displayShow(show) {
    
    const id = Math.floor(Math.random() * 100000) //fake id creation
    const html = `<div class="card bg-dark border rounded shadow text-white p-4 mx-auto">
                        <div class="d-md-flex">
                        <div class="border rounded" id="image">
                            <img src=${show.image.original} class="img-fluid" alt=${show.name}>
                        </div>
                        <div class="mt-3 mt-md-0 ms-md-3" id="text">
                            <h1>${show.name}</h1>
                            <p>Summary: </p>
                            ${show.summary}
                            <p>Genres: ${show.genres.join(", ")}</p>
                            <p>Rating: ${show.rating.average}</p>
                            <button onclick=deleteShow(${id}) class="btn btn-outline-info">Delete</button>
                        </div>
                        </div>
                    </div>
    `
    // create a new object we can append to our document
    const card = document.createElement('div');
    card.setAttribute('id', id)
    card.innerHTML = html;
    
    // find the parent to aappend to
    const display = document.getElementById("show-display");
    display.appendChild(card);
}
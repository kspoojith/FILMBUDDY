
function navHomePage(){
    document.getElementById('homePage').classList.remove('d-none');
    document.getElementById('learnPage').classList.add('d-none');
    document.getElementById('podcastPage').classList.add('d-none');
    document.getElementById('storePage').classList.add('d-none');
    document.getElementById('moviesPage').classList.add('d-none');
}
function navPodcastPage(){
    document.getElementById('homePage').classList.add('d-none');
    document.getElementById('learnPage').classList.add('d-none');
    document.getElementById('podcastPage').classList.remove('d-none');
    document.getElementById('storePage').classList.add('d-none');
    document.getElementById('moviesPage').classList.add('d-none');

}
function navMoviesPage(){
    document.getElementById('homePage').classList.add('d-none');
    document.getElementById('learnPage').classList.add('d-none');
    document.getElementById('podcastPage').classList.add('d-none');
    document.getElementById('storePage').classList.add('d-none');
    document.getElementById('moviesPage').classList.remove('d-none');
}


function navLearnPage(){
    document.getElementById('homePage').classList.add('d-none');
    document.getElementById('learnPage').classList.remove('d-none');
    document.getElementById('podcastPage').classList.add('d-none');
    document.getElementById('storePage').classList.add('d-none');
    document.getElementById('moviesPage').classList.add('d-none');
}


function navStorePage(){
    document.getElementById('homePage').classList.add('d-none');
    document.getElementById('learnPage').classList.add('d-none');
    document.getElementById('podcastPage').classList.add('d-none');
    document.getElementById('storePage').classList.remove('d-none');
    document.getElementById('moviesPage').classList.add('d-none');
}


function searchMovies() {
    const searchQuery = document.getElementById('searchBar').value.trim();
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';
    
    if (searchQuery) {
       
        fetch('https://www.omdbapi.com/?s=' + searchQuery + '&apikey=505c066d')
            .then(response => response.json())
            .then(obj => {
                
                obj.Search.forEach(movie => {
                    let card = document.createElement('div');
                    card.classList.add('movies-page-card');
                    card.onclick = function () {
                        fetch('https://www.omdbapi.com/?t=' + movie.Title + '&apikey=505c066d')
                            .then(response => response.json())
                            .then(OBJ => {
                                showModal(OBJ);
                            });
                    }

                    const poster = document.createElement('img');
                    poster.src = movie.Poster;
                    poster.alt = `${movie.Title} Poster`;
                    poster.classList.add('movies-page-poster');

                    const content = document.createElement('div');
                    content.classList.add('movies-page-content');

                    const movieTitle = document.createElement('h2');
                    movieTitle.classList.add('movies-page-title');
                    movieTitle.textContent = movie.Title;

                    const info = document.createElement('div');
                    info.classList.add('movies-page-info');
                    info.innerHTML = `
                        <p><strong>Year:</strong> ${movie.Year}</p>
                        <p><strong>Type:</strong> ${movie.Type}</p>
                    `;

                    const rating = document.createElement('a');
                    rating.href = 'https://www.imdb.com/title/' + movie.imdbID + '/ratings/?ref_=tt_ov_rt'
                    rating.classList.add('movies-page-rating');
                    rating.textContent = `IMDb Rating: ⭐`;

                    content.appendChild(movieTitle);
                    content.appendChild(info);
                    content.appendChild(rating);

                    card.appendChild(poster);
                    card.appendChild(content);
                    

                    resultsContainer.appendChild(card);
                });
            });
    }
}

function showModal(movie) {
    document.getElementById('movieModal').classList.remove('d-none');
    document.getElementById('moviePoster').src=movie.Poster;
    document.getElementById('movieTitle').textContent = movie.Title;
    document.getElementById('movieYear').textContent = "Year: " + movie.Year;
    document.getElementById('movieGenre').textContent = "Genre: " + movie.Genre;
    document.getElementById('movieDirector').textContent = "Director: " + movie.Director;
    document.getElementById('movieActors').textContent = "Actors: " + movie.Actors;
    document.getElementById('moviePlot').textContent = "Plot: " + movie.Plot;
    document.getElementById('movieModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('movieModal').classList.add('d-none');
}

// Function to open modal with product details
function openProductModal(asin) {
    let options={
        method:'GET',
    }
    fetch('https://api.ecommerceapi.io/amazon_product?api_key=671f840199b55900555a23b2&domain=com&asin='+asin,options)
    .then(function(response){
        return response.json();
    })
    .then(function(obj){
        console.log(obj.product_results);
        document.getElementById('productmodalimg').src=obj.product_results.images[0];
        document.getElementById('productTitle').innerText = obj.product_results.title;
        document.getElementById('productPrice').innerText = "Price: " + obj.product_results.price;
        document.getElementById('productModal').style.display = 'flex';
    })
    
}

// Function to display products
function displayProducts(products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product');
        productCard.setAttribute('data-name', product.title);
        productCard.addEventListener('click',()=>openProductModal(product.asin));

        productCard.innerHTML = `
                   <img src="${product.image}" alt="${product.name}">
                   <h3>${product.title}</h3>
                   <p>${product.price}</p>
               `;

        productList.appendChild(productCard);
    });
}



// Fetch data from external source and display products
function fetchFilmEquipment(search='filmmaking+equipments') {
    let spin=document.getElementById('spinner');
    if (spin) {
        spin.classList.remove('d-none');
    }
    let options = {
        method: 'GET',
    };
    fetch(`https://api.ecommerceapi.io/amazon_search?api_key=671f840199b55900555a23b2&url=https://www.amazon.in/s?k=${search}`, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(obj) {
            if (spin) {
                spin.classList.add('d-none');
            }
            console.log(obj.results);
            displayProducts(obj.results);
        });
}






// Function to close modal
function closeProductModal() {
    document.getElementById('productModal').style.display = 'none';
}

fetchFilmEquipment();

    // Search filter



// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    console.log('hello');
    
    let searchStore=document.getElementById('storeSearch');
    if(searchStore){
        console.log('hello');
        document.getElementById('storeSearch').addEventListener('change', function(event) {
            
            console.log('Hello')
            document.getElementById('productList').textContent='';
            let searchTerm = event.target.value.toLowerCase();
            searchTerm=searchTerm.replace(' ','+');
            fetchFilmEquipment(searchTerm);
            
    });
    }else{
        console.log('something fishy');
    }
    // Category filter
    document.getElementById('productDropdown').addEventListener('change', function(event) {
        console.log('dropdown working');
        document.getElementById('productList').textContent='';
        const category = event.target.value.toLowerCase();
        fetchFilmEquipment(category);
    });
    
    
});
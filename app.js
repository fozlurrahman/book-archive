const errorMessage = document.getElementById('error-message').style.display = 'none';


 //----------------------------------------------  
// search books area 
// ----------------------------------------------

const searchBooks = () =>{
    
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.innerText = searchText;
    searchField.value = '';
    document.getElementById('error-message').style.display ='none';

    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.docs))
    .catch(error => displayError(error));
}

// error catch functiion
const displayError = error =>{
    document.getElementById('error-message').style.display='block';
}


 //----------------------------------------------  
//   search result display 
// ----------------------------------------------
const displaySearchResult = data =>{
   const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

// search result count and error message dispaly 
   const searchResultCount = data.length;
   if(searchResultCount !== 0){
  document.getElementById('search-result-count').innerText = searchResultCount;
   }
   else{
    const notFount = document.getElementById('search-result-count').innerText = '';
    notFount.style.color = 'red';
   }

// search result disaly area 
   data.forEach( book =>{
       console.log(book);
       const div = document.createElement('div');
        div.classList.add('col');
       div.innerHTML = `

       <div class="col card shadow p-3">
                <img src=" https://covers.openlibrary.org/b/id/${book?.cover_i}-M.jpg"class="card-img-top" alt="..." style="height: 220px;">
                <div class="card-body">
                    <h5 class="card-title">${book.title} </h5>
                    <p class="card-text bolder">Aouthor: ${book.author_name}</p>
                    <p class="card-text bolder">Frist Publish date: ${book.first_publish_year}</p>
                    <p class="card-text"></p>
                </div>
            </div>
       `;
       searchResult.appendChild(div);
   })

}
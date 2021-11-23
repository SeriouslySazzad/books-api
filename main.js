const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // Clear Input Field
    searchField.value = '';
    if(searchText === ''){
        document.getElementById('error-message').innerText = `Please Write a Book Name!!!!!`
        document.getElementById('search-result').innerHTML = '';
        document.getElementById('result-found').innerHTML = '';
    }
    else {
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        document.getElementById('error-message').innerHTML = '';
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.docs.slice(0, 20)))
    }
}

const displaySearchResult = books => {
    console.log(books.length);
    const searchResult = document.getElementById('search-result');

    // Search Result Found
    const searchResultFound = document.getElementById('result-found');
    searchResultFound.innerText = `Search Result Found: ${books.length}`;

    // Clear Previous Search Result
    searchResult.innerHTML = '';
    if (books.length === 0) {
        document.getElementById('error-message').innerText = 'No Result Found!!!!!!!';
        searchResult.innerHTML = '';
        searchResultFound.innerHTML = '';
    }
    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 bg-secondary">
            <img class="w-100 mx-auto" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" alt="" class="card-img-top">
            <div class="card-body">
                <h2 class="card-title text-white">Book Name: ${book.title.slice(0, 50)}</h2>
                <h2 class="card-text text-white">Author: ${book.author_name}</h2>
                <h3 class="card-text text-white ">Publish Year: ${book.publish_year}</h3>
                <p class="text-white"> First Publish Year: ${book.first_publish_year}</p>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
}
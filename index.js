const BASE_URL = 'http://localhost:3000';
const headers = {
    'Content-Type': 'application/json',
};
//ensure's the document to loads it then fetch's the data to display the films
document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    
    fetchFilms();
});

// Fetch's films from db.json then displays them on our web page 
function fetchFilms() {
    fetch(`${BASE_URL}/films`, {
        method: 'GET',
        headers,
    })
    .then((res) => res.json())
    .then(renderFilms)
    .catch((err) => {
        console.log(err);
    });
}

// dispays the list of films on the webpage
function renderFilms(films) {
    const listFilmsDiv = document.getElementById('list-films');

    //goes over each film and creates a card for each
    films.forEach((film) => {
        // Create a new div element for each film
        const card = document.createElement('div');
        card.innerText = film.title;
        card.classList.add('list-film-item');

        // Creates an onclick listener to the card to display tha film details
        card.addEventListener('click', () => {
            renderFilmDetails(film);
        });

        // Append each new card to the listFilmsDiv on the page
        listFilmsDiv.appendChild(card);
    });
}

// Displays the details of one film on the html
async function renderFilmDetails(passedFilm) {
    //fetch's film details from db.json
    const response = await fetch(
        `${BASE_URL}/films/${passedFilm.id}`,
        {
            method: 'GET',
            headers,
        }
    )};

    const film = await response.json();

    const filmDetailsDiv = document.getElementById('film-details');

      // Creating elements for each piece of film information and set their content
    // Reset film details div
    filmDetailsDiv.innerHTML = '';

    // Title element
    const titleParagraph = document.createElement('p');
    titleParagraph.innerText = `Title: ${film.title}`;

    // Runtime element
    const runtimeParagraph = document.createElement('p');
    runtimeParagraph.innerText = `Runtime: ${film.runtime} minutes`;

    // Description element
    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.innerText = `Description: ${film.description}`;

    // Poster element
    const posterElement = document.createElement('img');
    posterElement.src = film.poster;
    posterElement.classList.add('film-poster');

    // Capacity element
    const capacityParagraph = document.createElement('p');
    capacityParagraph.innerText = `Capacity: ${film.capacity}`;

    // Showtime element
    const showtimeParagraph = document.createElement('p');
    showtimeParagraph.innerText = `Showtime: ${film.showtime}`;

    // Tickets sold element
    const ticketsSoldParagraph = document.createElement('p');
    ticketsSoldParagraph.innerText = `Tickets sold: ${film.tickets_sold}`;

     // Creating buttons to update and reset the number of tickets sold
    // Add tickets button
    const addTicketsButton = document.createElement('button');
    addTicketsButton.innerText = 'Add tickets';
    addTicketsButton.type = 'button';

    addTicketsButton.addEventListener('click', (e) => {
        e.preventDefault();

         // adds the number of tickets sold by 1 and update the db.json
        
        film.tickets_sold = film.tickets_sold += 1;

        updateFilmTickets(film);
    });

            // Reset the number of tickets sold to 0 and update the db.json
    const resetTicketsButton = document.createElement('button');
    resetTicketsButton.innerText = 'Reset tickets';

    resetTicketsButton.addEventListener('click', (e) => {
        e.preventDefault();

        film.tickets_sold = 0;

        resetFilmTickets(film);
    });

    // takes all the elements created puts them together to be displayed on the web page
    filmDetailsDiv.append(
        titleParagraph,
        runtimeParagraph,
        descriptionParagraph,
        posterElement,
        capacityParagraph,
        showtimeParagraph,
        ticketsSoldParagraph,)
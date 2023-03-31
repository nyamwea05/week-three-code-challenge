const BASE_URL = 'http://localhost:3000';
const headers = {
    'Content-Type': 'application/json',
};

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    
    fetchFilms();
});

// Fetch films from db.json then display/render them on our html
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

// Attach or render films on the html
function renderFilms(films) {
    const listFilmsDiv = document.getElementById('list-films');

    films.forEach((film) => {
        // Create a new div element for each film
        const card = document.createElement('div');
        card.innerText = film.title;
        card.classList.add('list-film-item');

        // Add an onclick listener
        card.addEventListener('click', () => {
            renderFilmDetails(film);
        });

        // Append each new card to the listFilmsDiv
        listFilmsDiv.appendChild(card);
    });
}

// Render one film on the html
async function renderFilmDetails(passedFilm) {
    const response = await fetch(
        `${BASE_URL}/films/${passedFilm.id}`,
        {
            method: 'GET',
            headers,
        }
    )};

    const film = await response.json();

    const filmDetailsDiv = document.getElementById('film-details');

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

    // Add tickets button
    const addTicketsButton = document.createElement('button');
    addTicketsButton.innerText = 'Add tickets';
    addTicketsButton.type = 'button';

    addTicketsButton.addEventListener('click', (e) => {
        e.preventDefault();

        // Add one ticket to existing tickets sold
        film.tickets_sold = film.tickets_sold += 1;

        updateFilmTickets(film);
    });

    // Reset tickets button
    const resetTicketsButton = document.createElement('button');
    resetTicketsButton.innerText = 'Reset tickets';

    resetTicketsButton.addEventListener('click', (e) => {
        e.preventDefault();

        film.tickets_sold = 0;

        resetFilmTickets(film);
    });

    // Attach all elements
    filmDetailsDiv.append(
        titleParagraph,
        runtimeParagraph,
        descriptionParagraph,
        posterElement,
        capacityParagraph,
        showtimeParagraph,
        ticketsSoldParagraph,)
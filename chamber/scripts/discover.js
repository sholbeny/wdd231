import { places } from "../data/places.mjs";

// -------------------------
// Discover Cards
// -------------------------

const discoverCards = document.querySelector("#discover-cards");

places.forEach((place, index) => {
    const card = document.createElement("article");
    card.classList.add("discover-card");
    card.classList.add(`card${index + 1}`);

    const title = document.createElement("h2");
    title.textContent = place.name;

    const figure = document.createElement("figure");

    const image = document.createElement("img");
    image.src = place.image;
    image.alt = place.name;
    image.width = 300;
    image.height = 200;
    image.loading = "lazy";

    figure.appendChild(image);

    const address = document.createElement("address");
    address.textContent = place.address;

    const description = document.createElement("p");
    description.textContent = place.description;

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Learn More";

    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(address);
    card.appendChild(description);
    card.appendChild(button);

    discoverCards.appendChild(card);
});


// -------------------------
// Visitor Message
// -------------------------

const visitMessage = document.querySelector("#visit-message");

const lastVisit = localStorage.getItem("lastVisit");
const currentVisit = Date.now();

const millisecondsPerDay = 1000 * 60 * 60 * 24;

if (!lastVisit) {
    visitMessage.textContent =
        "Welcome! Let us know if you have any questions.";
} else {
    const timeDifference = currentVisit - Number(lastVisit);

    const daysDifference = Math.floor(
        timeDifference / millisecondsPerDay
    );

    if (daysDifference < 1) {
        visitMessage.textContent =
            "Back so soon! Awesome!";
    } else if (daysDifference === 1) {
        visitMessage.textContent =
            "You last visited 1 day ago.";
    } else {
        visitMessage.textContent =
            `You last visited ${daysDifference} days ago.`;
    }
}

localStorage.setItem("lastVisit", currentVisit);


// -------------------------
// Footer
// -------------------------

const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
    lastModified.textContent =
        `Last Modified: ${document.lastModified}`;
}
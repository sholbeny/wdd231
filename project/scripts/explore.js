import { getLocations } from "./locations.js";

const locationCards = document.querySelector("#location-cards");
const dialog = document.querySelector("#location-dialog");
const dialogContent = document.querySelector("#dialog-content");
const closeDialog = document.querySelector("#close-dialog");
const filterButtons = document.querySelectorAll(".filter");

let hauntedLocations = [];


async function loadLocations() {
    hauntedLocations = await getLocations();

    if (hauntedLocations.length === 0) {
        locationCards.innerHTML = `
            <p class="error-message">
                Sorry, the haunted locations could not be loaded.
            </p>
        `;
        return;
    }

    displayLocations(hauntedLocations);
}


function getSavedLocations() {
    return JSON.parse(localStorage.getItem("savedLocations")) || [];
}


function displayLocations(locations) {
    locationCards.innerHTML = "";

    const savedLocations = getSavedLocations();

    locations.forEach((location) => {
        const isSaved = savedLocations.includes(location.id);

        const card = document.createElement("article");
        card.classList.add("explore-card");

        card.innerHTML = `
            <img
                src="${location.image}"
                alt="${location.name}"
                loading="lazy"
            >

            <div class="explore-card-content">

                <h3>${location.name}</h3>

                <p class="location-place">
                    ${location.city}, ${location.state}
                </p>

                <p class="location-type">
                    ${location.typeName}
                </p>

                <div class="card-buttons">

                    <button
                        class="details-button"
                        data-id="${location.id}">
                        Details
                    </button>

                    <button
                        class="save-button"
                        data-id="${location.id}"
                        aria-pressed="${isSaved}">
                        ${isSaved ? "♥ Saved" : "♡ Save"}
                    </button>

                </div>

            </div>
        `;

        locationCards.appendChild(card);
    });

    addCardEvents();
}


function addCardEvents() {
    const detailButtons = document.querySelectorAll(".details-button");
    const saveButtons = document.querySelectorAll(".save-button");

    detailButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const location = hauntedLocations.find(
                (place) => place.id === button.dataset.id
            );

            showLocationDetails(location);
        });
    });

    saveButtons.forEach((button) => {
        button.addEventListener("click", () => {
            saveLocation(button.dataset.id);

            button.textContent = "♥ Saved";
            button.setAttribute("aria-pressed", "true");
        });
    });
}


function showLocationDetails(location) {
    let contact = "";

    if (location.phone) {
        contact += `
            <p>
                <strong>Phone:</strong>
                ${location.phone}
            </p>
        `;
    }

    if (location.email) {
        contact += `
            <p>
                <strong>Email:</strong>
                <a href="mailto:${location.email}">
                    ${location.email}
                </a>
            </p>
        `;
    }

    dialogContent.innerHTML = `
        <img
            src="${location.image}"
            alt="${location.name}"
        >

        <h2>${location.name}</h2>

        <p class="dialog-location">
            ${location.city}, ${location.state}
        </p>

        <p>
            <strong>Type:</strong>
            ${location.typeName}
        </p>

        <h3>History</h3>

        <p>
            ${location.history}
        </p>

        <h3>Reported Paranormal Activity</h3>

        <p>
            ${location.paranormal}
        </p>

        <h3>Visitor Information</h3>

        <p>
            <strong>Address:</strong>
            ${location.address}
        </p>

        ${contact}

        <a
            href="${location.website}"
            target="_blank"
            rel="noopener noreferrer"
            class="button">
            Visit Official Website
        </a>
    `;

    dialog.showModal();
}


function saveLocation(id) {
    const savedLocations = getSavedLocations();

    if (!savedLocations.includes(id)) {
        savedLocations.push(id);

        localStorage.setItem(
            "savedLocations",
            JSON.stringify(savedLocations)
        );
    }
}


filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterButtons.forEach((btn) => {
            btn.classList.remove("active-filter");
        });

        button.classList.add("active-filter");

        const filter = button.dataset.filter;

        if (filter === "all") {
            displayLocations(hauntedLocations);
        } else {
            const filteredLocations = hauntedLocations.filter(
                (location) => location.type === filter
            );

            displayLocations(filteredLocations);
        }
    });
});


closeDialog.addEventListener("click", () => {
    dialog.close();
});


loadLocations();
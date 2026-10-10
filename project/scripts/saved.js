import { getLocations } from "./locations.js";

const savedContainer = document.querySelector("#saved-locations");
const emptySaved = document.querySelector("#empty-saved");
const dialog = document.querySelector("#location-dialog");
const dialogContent = document.querySelector("#dialog-content");
const closeDialog = document.querySelector("#close-dialog");

let hauntedLocations = [];


async function loadSavedLocations() {
    hauntedLocations = await getLocations();

    if (hauntedLocations.length === 0) {
        savedContainer.innerHTML = `
            <p class="error-message">
                Sorry, the haunted locations could not be loaded.
            </p>
        `;

        emptySaved.style.display = "none";
        return;
    }

    displaySavedLocations();
}


function getSavedIds() {
    return JSON.parse(localStorage.getItem("savedLocations")) || [];
}


function displaySavedLocations() {
    const savedIds = getSavedIds();

    const savedLocations = hauntedLocations.filter((location) =>
        savedIds.includes(location.id)
    );

    savedContainer.innerHTML = "";

    if (savedLocations.length === 0) {
        emptySaved.style.display = "block";
        savedContainer.style.display = "none";
        return;
    }

    emptySaved.style.display = "none";
    savedContainer.style.display = "grid";

    savedLocations.forEach((location) => {
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
                        class="remove-button"
                        data-id="${location.id}">
                        Remove
                    </button>

                </div>

            </div>
        `;

        savedContainer.appendChild(card);
    });

    addSavedEvents();
}


function addSavedEvents() {
    const detailsButtons = document.querySelectorAll(".details-button");
    const removeButtons = document.querySelectorAll(".remove-button");

    detailsButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const location = hauntedLocations.find(
                (place) => place.id === button.dataset.id
            );

            showLocationDetails(location);
        });
    });

    removeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            removeLocation(button.dataset.id);
        });
    });
}


function removeLocation(id) {
    let savedIds = getSavedIds();

    savedIds = savedIds.filter((savedId) => savedId !== id);

    localStorage.setItem(
        "savedLocations",
        JSON.stringify(savedIds)
    );

    displaySavedLocations();
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


closeDialog.addEventListener("click", () => {
    dialog.close();
});


loadSavedLocations();
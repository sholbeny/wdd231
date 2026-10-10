const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    if (navigation.classList.contains("open")) {
        menuButton.innerHTML = "&#10005;";
        menuButton.setAttribute("aria-label", "Close navigation menu");
    } else {
        menuButton.innerHTML = "&#9776;";
        menuButton.setAttribute("aria-label", "Open navigation menu");
    }
});


// Current year
const currentYear = document.querySelector("#currentyear");

currentYear.textContent = new Date().getFullYear();


// Last modified
const lastModified = document.querySelector("#lastModified");

lastModified.textContent =
    `Last Modified: ${document.lastModified}`;
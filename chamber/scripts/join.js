// Set the timestamp when the page loads
const timestamp = document.querySelector("#timestamp");

if (timestamp) {
    timestamp.value = new Date().toISOString();
}


// Membership dialogs
const npDialog = document.querySelector("#np-dialog");
const bronzeDialog = document.querySelector("#bronze-dialog");
const silverDialog = document.querySelector("#silver-dialog");
const goldDialog = document.querySelector("#gold-dialog");


// Open buttons
const npButton = document.querySelector("#open-np");
const bronzeButton = document.querySelector("#open-bronze");
const silverButton = document.querySelector("#open-silver");
const goldButton = document.querySelector("#open-gold");


// Open dialogs
npButton.addEventListener("click", () => {
    npDialog.showModal();
});

bronzeButton.addEventListener("click", () => {
    bronzeDialog.showModal();
});

silverButton.addEventListener("click", () => {
    silverDialog.showModal();
});

goldButton.addEventListener("click", () => {
    goldDialog.showModal();
});


// Close dialog buttons
const closeButtons = document.querySelectorAll(".close-dialog");

closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});


// Footer information
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
    lastModified.textContent = `Last Modified: ${document.lastModified}`;
}


// Hamburger menu
const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#navigation");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        navigation.classList.toggle("open");
        menuButton.classList.toggle("open");
    });
}
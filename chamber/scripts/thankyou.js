// Get the form information from the URL
const params = new URLSearchParams(window.location.search);

const firstName = params.get("first");
const lastName = params.get("last");
const email = params.get("email");
const phone = params.get("phone");
const organization = params.get("organization");
const timestamp = params.get("timestamp");


// Display the submitted information
const applicationInfo = document.querySelector("#application-info");

if (applicationInfo) {
    applicationInfo.innerHTML = `
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile Phone:</strong> ${phone}</p>
        <p><strong>Business/Organization:</strong> ${organization}</p>
        <p><strong>Application Date:</strong> ${timestamp}</p>
    `;
}


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
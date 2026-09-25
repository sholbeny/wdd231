const formData = new URLSearchParams(window.location.search);

const firstName = formData.get("first");
const lastName = formData.get("last");
const email = formData.get("email");
const phone = formData.get("phone");
const organization = formData.get("organization");
const timestamp = formData.get("timestamp");

let applicationDate = "Not available";

if (timestamp) {
    const date = new Date(timestamp);

    applicationDate = date.toLocaleString("en-US", {
        dateStyle: "long",
        timeStyle: "short"
    });
}

const applicationInfo = document.querySelector("#application-info");

applicationInfo.innerHTML = `
    <p><strong>First Name:</strong> ${firstName}</p>
    <p><strong>Last Name:</strong> ${lastName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Mobile Phone:</strong> ${phone}</p>
    <p><strong>Business/Organization:</strong> ${organization}</p>
    <p><strong>Application Date:</strong> ${applicationDate}</p>
`;

const currentYear = document.querySelector("#currentyear");
currentYear.textContent = new Date().getFullYear();

const lastModified = document.querySelector("#lastModified");
lastModified.textContent = `Last Modified: ${document.lastModified}`;

const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    menuButton.classList.toggle("open");
});
const formResults = document.querySelector("#form-results");

const currentUrl = window.location.href;
const url = new URL(currentUrl);
const formData = url.searchParams;

const name = formData.get("name");
const email = formData.get("email");
const location = formData.get("location");
const season = formData.get("season");
const reason = formData.get("reason");

formResults.innerHTML = `
    <p>
        <strong>Name:</strong>
        ${name}
    </p>

    <p>
        <strong>Email:</strong>
        ${email}
    </p>

    <p>
        <strong>Haunted Location:</strong>
        ${location}
    </p>

    <p>
        <strong>Preferred Season:</strong>
        ${season}
    </p>

    <p>
        <strong>Why You Want to Visit:</strong>
        ${reason}
    </p>
`;
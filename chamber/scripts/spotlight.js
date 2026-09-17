const spotlightContainer = document.querySelector("#spotlight-cards");

async function getSpotlightMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load member data.");
        }

        const members = await response.json();

        displaySpotlights(members);
    } catch (error) {
        console.error("Error loading spotlight members:", error);
        spotlightContainer.innerHTML =
            "<p>Member spotlights are currently unavailable.</p>";
    }
}

function displaySpotlights(members) {
    // Membership levels:
    // 1 = Member
    // 2 = Silver
    // 3 = Gold

    const qualifiedMembers = members.filter(
        (member) => member.membership === 2 || member.membership === 3
    );

    // Randomize the qualified members
    qualifiedMembers.sort(() => Math.random() - 0.5);

    // Select three random members
    const selectedMembers = qualifiedMembers.slice(0, 3);

    spotlightContainer.innerHTML = "";

    selectedMembers.forEach((member) => {
        const card = document.createElement("article");
        card.classList.add("spotlight-card");

        const name = document.createElement("h3");
        name.textContent = member.name;

        const image = document.createElement("img");
        image.src = `images/${member.image}`;
        image.alt = `${member.name} logo`;
        image.loading = "lazy";
        image.width = 250;
        image.height = 150;

        const address = document.createElement("p");
        address.textContent = member.address;

        const phone = document.createElement("p");
        phone.textContent = member.phone;

        const website = document.createElement("a");
        website.href = member.website;
        website.textContent = "Visit Website";
        website.target = "_blank";
        website.rel = "noopener";

        const membership = document.createElement("p");
        membership.classList.add("membership-level");

        if (member.membership === 3) {
            membership.textContent = "Gold Member";
        } else {
            membership.textContent = "Silver Member";
        }

        card.appendChild(name);
        card.appendChild(image);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(membership);

        spotlightContainer.appendChild(card);
    });
}

getSpotlightMembers();
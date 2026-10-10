export async function getLocations() {
    try {
        const response = await fetch("data/locations.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const locations = await response.json();

        return locations;
    } catch (error) {
        console.error("Could not load haunted locations:", error);
        return [];
    }
}
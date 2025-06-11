
export async function getAllEvents() {
    const response = await fetch('https://next-events-48d19-default-rtdb.europe-west1.firebasedatabase.app/events.json');
    return response.json();
}

export async function getFeaturedEvents() {
    const allEvents = await getAllEvents()
    return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
    const allEvents = await getAllEvents()
    return allEvents.find((event) => event.id === id);
}

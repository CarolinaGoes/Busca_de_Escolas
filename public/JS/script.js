// Function to initialize the map
function initMap() {
    const map = L.map('map').setView([-23.55052, -46.633308], 12); // Default to São Paulo

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const input = document.getElementById("address-input");
    const searchButton = document.getElementById("search-button");

    searchButton.addEventListener("click", () => {
        const address = input.value;
        if (address) {
            geocodeAddress(map, address);
        }
    });
}

// Function to geocode an address and update the map
function geocodeAddress(map, address) {
    // Use Nominatim API for geocoding
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const { lat, lon } = data[0];
                const latLng = [parseFloat(lat), parseFloat(lon)];
                map.setView(latLng, 15); // Center the map on the result
                L.marker(latLng).addTo(map); // Add a marker at the location
            } else {
                alert("Endereço não encontrado.");
            }
        })
        .catch(error => {
            console.error("Erro ao buscar o endereço:", error);
            alert("Ocorreu um erro ao buscar o endereço.");
        });
}

// Initialize the map when the page loads
document.addEventListener("DOMContentLoaded", initMap);

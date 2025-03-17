function searchSchools() {
    const address = document.getElementById('address').value;
    if (address) {
        window.location.href = `/public/pages/schools.html?address=${encodeURIComponent(address)}`;
    } else {
        alert('Por favor, digite um endereço.');
    }
}

// Function to initialize the map and mark the address
function initMap() {
    const urlParams = new URLSearchParams(window.location.search);
    const address = urlParams.get('address');
    const map = L.map('map').setView([-23.55052, -46.633308], 13); // Default to São Paulo coordinates
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Fetch the address from the backend and add a marker
    fetch('http://localhost:3000/address')
        .then(response => response.json())
        .then(data => {
            const { name, address } = data;
            geocodeAddress(address, (lat, lon) => {
                addPermanentMarker(map, lat, lon, name);
            });
        })
        .catch(error => {
            console.error('Error fetching address from backend:', error);
        });

    if (address) {
        // Geocode the address and add a marker
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const { lat, lon } = data[0];
                    map.setView([lat, lon], 15);
                    const marker = L.marker([lat, lon]).addTo(map)
                        .bindPopup(`<a href="https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=15/${lat}/${lon}" target="_blank">${address}</a>`)
                        .openPopup();
                } else {
                    alert('Endereço não encontrado.');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar o endereço:', error);
                alert('Erro ao buscar o endereço.');
            });
    }
}

// Function to add a permanent marker for a specific address
function addPermanentMarker(map, lat, lon, name) {
    const marker = L.marker([lat, lon], {
        icon: L.divIcon({
            className: 'custom-marker',
            html: '<div class="marker-cei-aloysio"></div>'
        })
    }).addTo(map)
    .bindPopup(`<a href="https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=15/${lat}/${lon}" target="_blank">${name}</a>`)
    .openPopup();
}

function geocodeAddress(address, callback) {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const { lat, lon } = data[0];
                callback(lat, lon);
            } else {
                console.error('Endereço não encontrado:', address);
            }
        })
        .catch(error => {
            console.error('Erro ao buscar o endereço:', error);
        });
}

document.addEventListener('DOMContentLoaded', initMap);
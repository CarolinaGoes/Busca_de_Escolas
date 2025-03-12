function searchSchools() {
  let inputAddress = document.getElementById("address");
  let address = inputAddress ? inputAddress.value.trim() : "";

  if (address === "") {
    alert("Por favor, digite um endereço.");
    return;
  }

  // Redireciona para schools.html com o endereço pesquisado
  window.location.href = "schools.html?address=" + encodeURIComponent(address);
}

document.addEventListener("DOMContentLoaded", function () {
  // Captura os parâmetros da URL
  const urlParams = new URLSearchParams(window.location.search);
  const address = urlParams.get("address");

  if (address) {
    let resultsDiv = document.getElementById("results");

    if (resultsDiv) {
      let newAddress = document.createElement("p");
      newAddress.textContent = address;
      resultsDiv.appendChild(newAddress);

      // Chama a função para exibir o mapa
      showMap(address);
    } else {
      console.error("A div de resultados não foi encontrada em schools.html");
    }
  }
});  //

function showMap(address) {
  // API de Geocodificação do OpenStreetMap (Nominatim)
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

  // Criar o mapa
  let map = L.map("map").setView([0, 0], 1); // Set initial view to avoid blank map

  // Adicionar camada do OpenStreetMap
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
  }).addTo(map);

  fetch(url) // Corrected the fetch URL
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        let lat = data[0].lat;
        let lon = data[0].lon;

        // Definir a posição inicial do mapa para o endereço pesquisado
        map.setView([lat, lon], 15);

        // Adicionar marcador para o endereço pesquisado
        L.marker([lat, lon])
          .addTo(map)
          .bindPopup(`<b>Endereço pesquisado:</b><br>${address}`)
          .openPopup();

        // Agora, adiciona os marcadores dos endereços do banco de dados
        addMarkers(map);
      } else {
        alert("Endereço não encontrado no mapa.");
      }
    })
    .catch(error => console.error("Erro ao buscar coordenadas:", error));
}

// Função para adicionar os marcadores no mapa (endereço vindo do banco de dados)
function addMarkers(map) {
  // Fetch para obter os dados dos endereços
  fetch("api.php")
    .then(response => response.json())
    .then(data => {
      data.forEach(function(ENDEREÇO) {
        // Realiza a geocodificação dos endereços do banco de dados
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco.endereco)}`)
          .then(response => response.json())
          .then(data => {
            if (data.length > 0) {
              let lat = data[0].lat;
              let lon = data[0].lon;

              // Criar marcador para cada endereço do banco de dados
              L.marker([lat, lon])
                .addTo(map)
                .bindPopup(`<b>${ENDEREÇO.nome}</b><br>${ENDEREÇO.ENDEREÇO}`);
            }
          })
          .catch(error => console.error('Erro na geocodificação:', error));
      });
    })
    .catch(error => {
      console.error("Erro ao buscar dados dos endereços:", error);
    });
}

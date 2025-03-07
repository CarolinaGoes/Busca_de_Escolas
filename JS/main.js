function buscarEscolas() {
  var endereco = document.getElementById("endereco").value;
  if (endereco) {
    try {
      window.location.href = "mapa.html?endereco=" + encodeURIComponent(endereco);
    } catch (error) {
      console.error('Error during redirection:', error);
      alert('Erro ao redirecionar para a página do mapa.');
    }
  } else {
    alert("Por favor, digite um endereço.");
  }
}

// Remover a função aplicarFiltros

async function exibirPrimeiraLinha() {
  try {
    const response = await fetch('http://localhost:3000/getFirstRow', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    const { nome, endereco, dre } = data;
    const displayElement = document.getElementById('primeiraLinhaDisplay');
    displayElement.innerText = `Nome: ${nome}\nEndereço: ${endereco}\nDRE: ${dre}`;
  } catch (error) {
    console.error('Error fetching first row data:', error);
    alert('Erro ao buscar dados da primeira linha. Tente novamente mais tarde.');
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const urlParams = new URLSearchParams(window.location.search);
  const endereco = urlParams.get('endereco');
  // Remover a lógica relacionada aos filtros
  const data = urlParams.get('data');
  const enderecoDisplay = document.getElementById('enderecoDisplay');
  if (endereco) {
    enderecoDisplay.innerText = "Endereço: " + decodeURIComponent(endereco);
    if (data) {
      const routeData = JSON.parse(decodeURIComponent(data));
      enderecoDisplay.innerText += "\nDados da Rota: " + JSON.stringify(routeData, null, 2);
    }
  } else {
    enderecoDisplay.innerText = "Nenhum endereço fornecido.";
  }
  exibirPrimeiraLinha();
});

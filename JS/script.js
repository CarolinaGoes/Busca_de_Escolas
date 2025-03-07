function searchSchools() {

  window.location.href= "schools.html";

  let inputAdress = document.getElementById("adress");
  let adress = inputAdress.value;

  if (adress.trim() === "") {
    alert("Por favor, digite um endereço.");
    return;
  }

  let adressInputDiv = document.getElementsByClassName("address-input")[0]; // Acessa o primeiro elemento
  let newAdress = document.createElement("p");
  newAdress.textContent = adress;

  let resultsDiv = document.getElementById("results"); // Para exibir os resultados
  resultsDiv.appendChild(newAdress); 

  inputAdress.value = ""; // Limpa o campo de entrada após a busca
  console.log(adress);
}

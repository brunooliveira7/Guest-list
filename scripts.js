const formElement = document.querySelector("form");
const inputElement = document.querySelector("input");
const guestListElement = document.querySelector("ul");

// Função para validar entrada
function isValidInput(text) {
  return text.trim() !== "" && !/\d+/g.test(text);
}

// Função para limpar input
function clearInput() {
  inputElement.value = "";
}

// Função para salvar a lista no localStorage
function saveGuestsToLocalStorage() {
  const guests = [...guestListElement.querySelectorAll("li span")].map(
    (span) => span.textContent
  );
  localStorage.setItem("guestList", JSON.stringify(guests));
}

// Função para carregar convidados do localStorage
function loadGuestsFromLocalStorage() {
  const guests = JSON.parse(localStorage.getItem("guestList")) || [];
  guests.forEach(addGuestToList);
}

// Função para adicionar convidado à lista
function addGuestToList(guestName) {
  if (!guestName) return;

  const listItem = document.createElement("li");
  listItem.classList.add("guest");

  const guestSpan = document.createElement("span");
  guestSpan.textContent = guestName;

  const removeGuest = document.createElement("img");
  removeGuest.setAttribute("src", "asset/remove.svg");

  listItem.appendChild(guestSpan);
  listItem.appendChild(removeGuest);
  guestListElement.appendChild(listItem);

  // Atualiza o localStorage
  saveGuestsToLocalStorage();
}

// Função para remover convidado da lista
function removeGuestFromList(event) {
  if (event.target.tagName === "IMG") {
    if (confirm("Deseja remover este convidado?")) {
      event.target.parentElement.remove();

      // Atualiza o localStorage
      saveGuestsToLocalStorage();
    }
  }
}

// Manipulador de envio do formulário
function handleFormSubmit(event) {
  event.preventDefault();
  const guestName = inputElement.value.trim();

  // Verifica se o campo está vazio
  if (guestName === "") {
    alert("Por favor, digite um nome.");
    return;
  }

  // Valida entrada
  if (!isValidInput(guestName)) {
    alert("O texto contém número(s)! Por favor, digite corretamente.");
    return;
  }

  addGuestToList(guestName);
  clearInput();
  alert("Cadastro enviado!");
}

// Adicionar event listeners
formElement.addEventListener("submit", handleFormSubmit);
guestListElement.addEventListener("click", removeGuestFromList);

// Carregar convidados do localStorage ao iniciar
loadGuestsFromLocalStorage();

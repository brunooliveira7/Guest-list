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
}

function removeGuestFromList(event) {
  if (event.target.tagName === "IMG") {
    if (confirm("Deseja remover este convidado?")) {
      event.target.parentElement.remove();
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
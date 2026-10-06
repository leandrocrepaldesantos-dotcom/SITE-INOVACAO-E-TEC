// =========================================================
// KUROENERGY — INTERATIVIDADE
// Menu mobile + validação acessível do formulário.
// O formulário é apenas demonstrativo: não envia dados para um servidor.
// =========================================================

const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu-principal");

if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"
    );
  });

  // Fecha o menu depois que uma opção é escolhida no celular.
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Abrir menu de navegação");
    });
  });
}

const form = document.querySelector("#contact-form");
const statusMessage = document.querySelector("#form-status");

const fields = {
  nome: {
    input: document.querySelector("#nome"),
    error: document.querySelector("#nome-erro"),
  },
  email: {
    input: document.querySelector("#email"),
    error: document.querySelector("#email-erro"),
  },
  mensagem: {
    input: document.querySelector("#mensagem"),
    error: document.querySelector("#mensagem-erro"),
  },
};

function setError(fieldName, message) {
  const field = fields[fieldName];

  field.input.setAttribute("aria-invalid", "true");
  field.error.textContent = message;
}

function clearError(fieldName) {
  const field = fields[fieldName];

  field.input.removeAttribute("aria-invalid");
  field.error.textContent = "";
}

function validateForm() {
  let valid = true;

  Object.keys(fields).forEach(clearError);

  const nome = fields.nome.input.value.trim();
  const email = fields.email.input.value.trim();
  const mensagem = fields.mensagem.input.value.trim();

  if (nome.length < 2) {
    setError("nome", "Digite um nome com pelo menos 2 caracteres.");
    valid = false;
  }

  // Validação simples para fins escolares.
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!emailValido) {
    setError("email", "Digite um e-mail válido, como exemplo@dominio.com.");
    valid = false;
  }

  if (mensagem.length < 10) {
    setError("mensagem", "A mensagem precisa ter pelo menos 10 caracteres.");
    valid = false;
  }

  return valid;
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    statusMessage.textContent = "";

    if (!validateForm()) {
      statusMessage.textContent = "Revise os campos destacados antes de enviar.";
      statusMessage.style.color = "#a51d2d";

      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();

      return;
    }

    // Não há envio real para proteger dados pessoais.
    statusMessage.textContent =
      "Mensagem validada com sucesso! Neste projeto escolar, o formulário não envia dados para um servidor.";
    statusMessage.style.color = "#064526";

    form.reset();
    Object.keys(fields).forEach(clearError);
  });
}

// Se o usuário começar a corrigir um campo, o erro dele desaparece.
Object.keys(fields).forEach((fieldName) => {
  fields[fieldName].input.addEventListener("input", () => {
    clearError(fieldName);
    if (statusMessage) statusMessage.textContent = "";
  });
});


const menu = document.querySelector("#menu");
const links = document.querySelector("#links");

// Menu para celular
menu.addEventListener("click", () => {
    const aberto = links.classList.toggle("aberto");

    menu.setAttribute("aria-expanded", aberto);
    menu.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
    );
});

links.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        links.classList.remove("aberto");
        menu.setAttribute("aria-expanded", "false");
    });
});

// Saudação automática
const hora = new Date().getHours();
const saudacao = document.querySelector("#saudacao");

if (hora >= 5 && hora < 12) {
    saudacao.textContent = "Bom dia!";
} else if (hora >= 12 && hora < 18) {
    saudacao.textContent = "Boa tarde!";
} else {
    saudacao.textContent = "Boa noite!";
}

// Modo claro e escuro
const tema = document.querySelector("#tema");

tema.addEventListener("click", () => {
    const claro = document.documentElement.classList.toggle("claro");

    tema.textContent = claro ? "🌙" : "☀️";
    tema.setAttribute(
        "aria-label",
        claro ? "Ativar modo escuro" : "Ativar modo claro"
    );
});

// Ano automático
document.querySelector("#ano").textContent = new Date().getFullYear();

// Validação do formulário
const formulario = document.querySelector("#formulario");

formulario.addEventListener("submit", event => {
    event.preventDefault();

    const nome = document.querySelector("#nome");
    const email = document.querySelector("#email");
    const mensagem = document.querySelector("#mensagem");
    const consentimento = document.querySelector("#consentimento");
    const resultado = document.querySelector("#resultado");

    let valido = true;

    function erro(campo, texto) {
        document.querySelector("#erro-" + campo).textContent = texto;
        document.querySelector("#" + campo).setAttribute(
            "aria-invalid",
            texto ? "true" : "false"
        );

        if (texto) valido = false;
    }

    erro("nome", nome.value.trim().length < 2
        ? "Digite seu nome corretamente." : "");

    erro("email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())
        ? "" : "Digite um e-mail válido.");

    erro("mensagem", mensagem.value.trim().length < 10
        ? "Escreva uma mensagem com pelo menos 10 caracteres." : "");

    document.querySelector("#erro-consentimento").textContent =
        consentimento.checked ? "" : "Marque a opção de consentimento.";

    if (!consentimento.checked) valido = false;

    if (valido) {
        resultado.textContent =
            "Tudo certo! O formulário foi validado, mas não envia mensagens.";
        resultado.style.color = "#36c98f";
        formulario.reset();
    } else {
        resultado.textContent = "Confira os campos e tente novamente.";
        resultado.style.color = "#ff7777";
    }
});

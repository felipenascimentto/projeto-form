const inputNome = document.getElementById('nome');
const inputEmail = document.getElementById('email');
const erroNomeDiv = document.getElementById('erroNome');
const erroEmailDiv = document.getElementById('erroEmail');
const botao = document.getElementById('botaoEnviar');
const feedbackGlobal = document.getElementById('feedbackGlobal');
function validarNomeCompleto(nome) {
    const nomeTrim = nome.trim();
    if (nomeTrim === '') {
        return { valido: false, mensagem: 'O nome não pode estar vazio.' };
    }
    const palavras = nomeTrim.split(/\s+/).filter(p => p.length > 0);
    if (palavras.length < 2) {
        return { valido: false, mensagem: 'Informe nome e sobrenome.' };
    }
    if (nomeTrim.length < 8) {
        return { valido: false, mensagem: 'Nome muito curto.' };
    }
    const letrasValidas = /[A-Za-zÀ-ú]/;
    if (!letrasValidas.test(nomeTrim)) {
        return { valido: false, mensagem: 'Nome deve conter letras.' };
    }
    return { valido: true, mensagem: '' };
}

function validarEmail(email) {
    const emailTrim = email.trim();
    if (emailTrim === '') {
        return { valido: false, mensagem: 'e-mail obrigatório.' };
    }
    const regexEmail = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (!regexEmail.test(emailTrim)) {
        return { valido: false, mensagem: 'E-mail inválido.' };
    }
    return { valido: true, mensagem: '' };
}
function aplicarErroNome() {
    const nome = inputNome.value;
    const resultado = validarNomeCompleto(nome);
    if (!resultado.valido) {
        inputNome.classList.add('invalido');
        erroNomeDiv.style.display = 'block';
        erroNomeDiv.textContent = resultado.mensagem;
    } else {
        inputNome.classList.remove('invalido');
        erroNomeDiv.style.display = 'none';
        erroNomeDiv.textContent = '';
    }
    return resultado.valido;
}

function aplicarErroEmail() {
    const email = inputEmail.value;
    const resultado = validarEmail(email);
    if (!resultado.valido) {
        inputEmail.classList.add('invalido');
        erroEmailDiv.style.display = 'block';
        erroEmailDiv.textContent = resultado.mensagem;
    } else {
        inputEmail.classList.remove('invalido');
        erroEmailDiv.style.display = 'none';
        erroEmailDiv.textContent = '';
    }
    return resultado.valido;
}

function limparFeedbackGlobal() {
    feedbackGlobal.innerHTML = '';
    feedbackGlobal.className = 'feedback-global';
}

function enviarFormulario() {
    const nomeValido = aplicarErroNome();
    const emailValido = aplicarErroEmail();

    if (nomeValido && emailValido) {
        const nomeExibido = inputNome.value.trim();
        const emailExibido = inputEmail.value.trim();
        feedbackGlobal.innerHTML = `Formulário enviado!<br>Nome: ${nomeExibido}<br>E-mail: ${emailExibido}`;
        feedbackGlobal.className = 'feedback-global feedback-sucesso';
        inputNome.classList.remove('invalido');
        inputEmail.classList.remove('invalido');
    } else {
        let mensagemErroGlobal = 'Corrija os erros abaixo:';
        if (!nomeValido) {
            mensagemErroGlobal += `<br>• Nome: ${erroNomeDiv.textContent}`;
        }
        if (!emailValido) {
            mensagemErroGlobal += `<br>• E-mail: ${erroEmailDiv.textContent}`;
        }
        feedbackGlobal.innerHTML = mensagemErroGlobal;
        feedbackGlobal.className = 'feedback-global feedback-erro';
    }
}

inputNome.addEventListener('input', () => {
    aplicarErroNome();
    limparFeedbackGlobal();
});

inputEmail.addEventListener('input', () => {
    aplicarErroEmail();
    limparFeedbackGlobal();
});

inputNome.addEventListener('blur', () => {
    aplicarErroNome();
    limparFeedbackGlobal();
});

inputEmail.addEventListener('blur', () => {
    aplicarErroEmail();
    limparFeedbackGlobal();
});

botao.addEventListener('click', (event) => {
    event.preventDefault();
    enviarFormulario();
});

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        enviarFormulario();
    }
}

inputNome.addEventListener('keypress', handleKeyPress);
inputEmail.addEventListener('keypress', handleKeyPress);

limparFeedbackGlobal();
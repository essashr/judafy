import { app } from './firebaseConfig.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const auth = getAuth();
const form = document.querySelector('form');
const errorMessage = document.getElementById('error-message');
const loginContainer = document.querySelector('.login');
const loginForm = document.getElementById('login-form');

async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('Usuário logado:', user);
        showButtons();
        loginForm.reset();
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        showError('E-mail ou senha inválidos');
    }
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('Usuário logado:', user);
        showButtons();
    } else {
        console.log('Nenhum usuário logado.');
    }
});

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    await login(email, password);
});

const togglePassword = document.querySelector('#toggle-password');
const passwordInput = document.querySelector('#password');
togglePassword.addEventListener('click', function (e) {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.classList.toggle('bxs-lock-alt');
    this.classList.toggle('bxs-lock-open-alt');
});

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('visible');
    setTimeout(() => {
        errorMessage.classList.remove('visible');
    }, 3000);
}

function showButtons() {
    if (!document.querySelector('.buttons')) {
        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('buttons');

        const newsletterButton = document.createElement('button');
        newsletterButton.classList.add('btn');
        newsletterButton.textContent = 'Newsletter';
        buttonsDiv.appendChild(newsletterButton);

        const formsButton = document.createElement('button');
        formsButton.classList.add('btn');
        formsButton.textContent = 'Forms';
        buttonsDiv.appendChild(formsButton);

        newsletterButton.addEventListener('click', () => {
            window.location.href = 'newsletter.html';
        });

        formsButton.addEventListener('click', () => {
            window.location.href = 'forms.html';
        });

        loginContainer.appendChild(buttonsDiv);
    }
}

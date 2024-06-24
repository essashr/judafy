import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const auth = getAuth();
async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('Usuário logado:', user);
        window.location.href = "db.html";
    } catch (error) {
        console.error('Erro ao fazer login:', error);
    }
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('Usuário logado:', user);
        window.location.href = "db.html";
    } else {
        console.log('Nenhum usuário logado.');
    }
});

const form = document.querySelector('form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    await login(email, password);
});
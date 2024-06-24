import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('Usuário logado:', user);
    } else {
        window.location.href = "login.html";
    }
});

async function logOut() {
    try {
        await signOut(auth);
    } catch (error) {
        console.error('Erro ao deslogar:', error);
    }
}

window.logOut = logOut;
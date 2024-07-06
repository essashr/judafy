import { app } from './firebaseConfig.js';
import { getDatabase, ref, get } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js';
import { getAuth, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

const auth = getAuth();
const db = getDatabase(app);

async function fetchContacts() {
    try {
        const contactsRef = ref(db, 'Contatos');
        const snapshot = await get(contactsRef);
        const contactsWrapper = document.getElementById('contactsWrapper');
        if (snapshot.exists()) {
            const contactsData = snapshot.val();
            contactsWrapper.innerHTML = '';
            Object.keys(contactsData).forEach(key => {
                const contact = contactsData[key];
                const contactDiv = document.createElement('div');
                contactDiv.className = 'contact-entry';
                contactDiv.innerHTML = `
                    <p><strong>Primeiro Nome:</strong> ${contact.primeiroNome}</p>
                    <p><strong>Último Nome:</strong> ${contact.ultimoNome}</p>
                    <p><strong>Email:</strong> ${contact.email}</p>
                    <p><strong>Telefone:</strong> ${contact.telefone}</p>
                    <p><strong>Mensagem:</strong> ${contact.mensagem}</p>
                    <p><strong>Data:</strong> ${contact.data}</p>
                    <hr>
                `;
                contactsWrapper.appendChild(contactDiv);
            });
        } else {
            contactsWrapper.innerHTML = '<p>Nenhum formulário encontrado.</p>';
        }
    } catch (error) {
        console.log(error);
    }
}

async function fetchNewsletter() {
    try {
        const newsletterRef = ref(db, 'Notícias');
        const snapshot = await get(newsletterRef);
        const newsletterWrapper = document.getElementById('newsletterWrapper');
        if (snapshot.exists()) {
            const newsletterData = snapshot.val();
            newsletterWrapper.innerHTML = '';
            Object.keys(newsletterData).forEach(key => {
                const entry = newsletterData[key];
                const newsletterDiv = document.createElement('div');
                newsletterDiv.className = 'newsletter-entry';
                newsletterDiv.innerHTML = `
                    <p><strong>Email:</strong> ${entry.email}</p>
                    <p><strong>Data:</strong> ${entry.data}</p>
                    <hr>
                `;
                newsletterWrapper.appendChild(newsletterDiv);
            });
        } else {
            newsletterWrapper.innerHTML = '<p>Nenhum inscrito encontrado.</p>';
        }
    } catch (error) {
        console.log(error);
    }
}

onAuthStateChanged(auth, (user) => {
    if (!user) {
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

document.addEventListener('DOMContentLoaded', () => {
    fetchContacts();
    fetchNewsletter();
});
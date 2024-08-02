import { getAuth, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { fetchContacts } from './fetchData.js';

const auth = getAuth();

function displayContacts(contactsData) {
    const contactsWrapper = document.getElementById('contactsWrapper');
    if (contactsData) {
        contactsWrapper.innerHTML = '';
        Object.keys(contactsData).forEach(key => {
            const contact = contactsData[key];
            const contactDiv = document.createElement('div');
            contactDiv.className = 'contact-entry';
            contactDiv.innerHTML = `
                <p><strong>ID:</strong> ${contact.id}</p>
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
}

async function loadContacts() {
    const contactsData = await fetchContacts();
    displayContacts(contactsData);
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
    loadContacts();
});

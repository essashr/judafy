import { getAuth, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { fetchNewsletter } from './fetchData.js';

const auth = getAuth();

function displayNewsletterEntries(newsletterData) {
    const newsletterWrapper = document.getElementById('newsletterWrapper');
    if (newsletterData) {
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
}

async function loadNewsletterEntries() {
    const newsletterData = await fetchNewsletter();
    displayNewsletterEntries(newsletterData);
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
    loadNewsletterEntries();
});

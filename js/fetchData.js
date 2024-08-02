import { app } from './firebaseConfig.js';
import { getDatabase, ref, get } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js';

const db = getDatabase(app);

export async function fetchContacts() {
    try {
        const contactsRef = ref(db, 'Contatos');
        const snapshot = await get(contactsRef);
        return snapshot.exists() ? snapshot.val() : null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function fetchNewsletter() {
    try {
        const newsletterRef = ref(db, 'Notícias');
        const snapshot = await get(newsletterRef);
        return snapshot.exists() ? snapshot.val() : null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

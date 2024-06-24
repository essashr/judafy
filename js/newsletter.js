import { app } from './firebaseConfig.js';
import { getDatabase, ref, push } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js';

const db = getDatabase(app);
const form = document.getElementById('newsletterForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.getElementById('newsletter').value;

  const now = new Date();

  const formattedTimestamp = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

  const newContact = {
    email,
    data: formattedTimestamp
  };

  try {
    const contactsRef = ref(db, 'Notícias');
    await push(contactsRef, newContact);
    form.reset();
  } catch (error) {
    console.log(error);
  }
});

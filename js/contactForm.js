import { app } from './firebaseConfig.js';
import { getDatabase, ref, push } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js';

const db = getDatabase(app);
const form = document.getElementById('contactForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const primeiroNome = document.getElementById('contact-first-name').value;
  const ultimoNome = document.getElementById('contact-last-name').value;
  const email = document.getElementById('contact-email').value;
  const telefone = document.getElementById('contact-phone').value;
  const mensagem = document.getElementById('contact-message').value;

  const now = new Date();

  const formattedTimestamp = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

  const newContact = {
    primeiroNome,
    ultimoNome,
    email,
    telefone,
    mensagem,
    data: formattedTimestamp
  };

  try {
    const contactsRef = ref(db, 'Contatos');
    await push(contactsRef, newContact);
    console.log("Enviado");
    form.reset();
  } catch (error) {
    console.log(error);
  }
});
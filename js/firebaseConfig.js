import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

async function fetchFirebaseConfig() {
    const response = await fetch('/api/firebaseConfig');
    const config = await response.json();
    return config;
}

async function initializeFirebase() {
    const firebaseConfig = await fetchFirebaseConfig();
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    return app;
}

export const app = await initializeFirebase();

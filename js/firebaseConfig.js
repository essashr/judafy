        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
        import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

        // Your web app's Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyC4uxtkhAh8PpLpPARTvU09zKPbT3UTmf0",
            authDomain: "judafy.firebaseapp.com",
            projectId: "judafy",
            storageBucket: "judafy.appspot.com",
            messagingSenderId: "366907832297",
            appId: "1:366907832297:web:a359908cd29d202ef13d78",
            measurementId: "G-WD7M5T4MYV"
          /*apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
            authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
            storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.REACT_APP_FIREBASE_APP_ID,
            measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID*/
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
        export { app };
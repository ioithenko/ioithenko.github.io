// Инициализация Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";

const firebaseConfig = {
      apiKey: "AIzaSyBOgF_Ugu3KCqb26VDd1CtRs6dECJK7g4U",
      authDomain: "purecheck.firebaseapp.com",
      projectId: "purecheck",
      storageBucket: "purecheck.firebasestorage.app",
      messagingSenderId: "1077616945405",
      appId: "1:1077616945405:web:02f01694ac5cba34a13694",
      measurementId: "G-BSGH7E645X"
    };

export const app = initializeApp(firebaseConfig);

onAuthStateChanged(auth, (user) => {
  window.firebaseUser = user; // Сохраняем пользователя в глобальной области
  document.dispatchEvent(new Event('firebase-auth-ready'));
});
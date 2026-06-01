import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, OAuthProvider, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configurações do Firebase. Você pode preenchê-las criando um arquivo .env na raiz do projeto
// ou configurando as variáveis de ambiente diretamente nas configurações de build do Netlify!
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD-FakeAPIKeyForCompilingOnly",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "copa-sticker-kaue.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "copa-sticker-kaue",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "copa-sticker-kaue.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "000000000000",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:000:web:000"
};

// Inicializar o app Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Configurar Provedor Google
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Configurar Provedor Apple
const appleProvider = new OAuthProvider('apple.com');
appleProvider.addScope('email');
appleProvider.addScope('name');

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    return {
      name: user.displayName || "Usuário Google",
      email: user.email,
      provider: 'google',
      avatar: user.photoURL || "👤"
    };
  } catch (error) {
    console.error("Erro no login com Google:", error);
    throw error;
  }
};

export const loginWithApple = async () => {
  try {
    const result = await signInWithPopup(auth, appleProvider);
    const user = result.user;
    return {
      name: user.displayName || "Usuário Apple",
      email: user.email,
      provider: 'apple',
      avatar: user.photoURL || "🍏"
    };
  } catch (error) {
    console.error("Erro no login com Apple:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Erro ao deslogar:", error);
  }
};

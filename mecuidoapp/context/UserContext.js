import React, { createContext, useState, useEffect } from 'react';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database'; // Realtime Database

const firebaseConfig = {
  apiKey: "AIzaSyBvO2PWnHKoXWv3wHZeCkO9ikULypv0Y5c",

  authDomain: "mecuidoapp-2dad2.firebaseapp.com",

  projectId: "mecuidoapp-2dad2",

  databaseURL: "https://mecuidoapp-2dad2-default-rtdb.firebaseio.com/",

  storageBucket: "mecuidoapp-2dad2.firebasestorage.app",

  messagingSenderId: "27993496270",

  appId: "1:27993496270:web:b142337a9d40600f8cce9f",

  measurementId: "G-6E9B7L5YPL"

};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const database = firebase.database();

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const snapshot = await database.ref(`users/${firebaseUser.uid}`).once('value');
        const userData = snapshot.val();

        setUser({ uid: firebaseUser.uid, email: firebaseUser.email, ...userData });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const cadastrarUsuario = async ({ email, senha, nome, peso, altura, agua, sono, dataNascimento }) => {
    const userCredential = await auth.createUserWithEmailAndPassword(email, senha);
    const uid = userCredential.user.uid;

    // Salva dados extras no Realtime Database
    await database.ref(`users/${uid}`).set({
      nome,
      peso,
      altura,
      agua,
      sono,
      email,
      dataNascimento,
    });

    setUser({ uid, email, nome, peso, altura, agua, sono });
  };

  const login = async (email, senha) => {
    const userCredential = await auth.signInWithEmailAndPassword(email, senha);
    const uid = userCredential.user.uid;

    const snapshot = await database.ref(`users/${uid}`).once('value');
    const userData = snapshot.val();

    setUser({ uid, email, ...userData });
  };

  const logout = async () => {
    await auth.signOut();
    setUser(null);
  };

  const atualizarUsuario = async (dadosAtualizados) => {
    if (!user) throw new Error('Usuário não autenticado');

    const uid = user.uid;

    await database.ref(`users/${uid}`).update(dadosAtualizados);

    setUser(prev => ({ ...prev, ...dadosAtualizados }));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        cadastrarUsuario,
        login,
        logout,
        atualizarUsuario,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

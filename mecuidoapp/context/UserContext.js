import React, { createContext, useState, useEffect } from 'react';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database'; // Realtime Database

const firebaseConfig = {
  apiKey: 'AIzaSyBvO2PWnHKoXWv3wHZeCkO9ikULypv0Y5c',
  authDomain: 'mecuidoapp-2dad2.firebaseapp.com',
  projectId: 'mecuidoapp-2dad2',
  databaseURL: 'https://mecuidoapp-2dad2-default-rtdb.firebaseio.com/',
  storageBucket: 'mecuidoapp-2dad2.firebasestorage.app',
  messagingSenderId: '27993496270',
  appId: '1:27993496270:web:b142337a9d40600f8cce9f',
  measurementId: 'G-6E9B7L5YPL',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const database = firebase.database();

export const UserContext = createContext();

function traduzirErroFirebase(error) {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'O e-mail fornecido já está em uso.';
    case 'auth/invalid-email':
      return 'O e-mail informado é inválido.';
    case 'auth/operation-not-allowed':
      return 'Operação não permitida. Contate o suporte.';
    case 'auth/weak-password':
      return 'A senha é muito fraca. Use ao menos 6 caracteres.';
    case 'auth/user-disabled':
      return 'Usuário desabilitado.';
    case 'auth/user-not-found':
      return 'Usuário não encontrado.';
    case 'auth/wrong-password':
      return 'Senha incorreta.';
    case 'auth/too-many-requests':
      return 'Muitas tentativas. Tente novamente mais tarde.';
    default:
      return 'Erro desconhecido. Tente novamente.';
  }
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const snapshot = await database
          .ref(`users/${firebaseUser.uid}`)
          .once('value');
        const userData = snapshot.val();

        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          ...userData,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const cadastrarUsuario = async ({
    email,
    senha,
    nome,
    peso,
    altura,
    agua,
    sono,
    dataNascimento,
  }) => {
    let userCredential;
    try {
      userCredential = await auth.createUserWithEmailAndPassword(email, senha);
      const uid = userCredential.user.uid;

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
    } catch (error) {
      // Se usuário foi criado mas deu erro ao salvar dados, apaga o usuário criado
      if (userCredential && userCredential.user) {
        await userCredential.user.delete();
      }
      const mensagem = traduzirErroFirebase(error);
      throw new Error(mensagem);
    }
  };

  const login = async (email, senha) => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, senha);
      const uid = userCredential.user.uid;

      const snapshot = await database.ref(`users/${uid}`).once('value');
      const userData = snapshot.val();

      setUser({ uid, email, ...userData });
    } catch (error) {
      const mensagem = traduzirErroFirebase(error);
      throw new Error(mensagem);
    }
  };

  const logout = async () => {
    await auth.signOut();
    setUser(null);
  };

  const atualizarUsuario = async (dadosAtualizados) => {
    if (!user) throw new Error('Usuário não autenticado');

    const uid = user.uid;

    await database.ref(`users/${uid}`).update(dadosAtualizados);

    setUser((prev) => ({ ...prev, ...dadosAtualizados }));
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

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './navigation/StackNavigation';
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Função para salvar dados de inicialização no AsyncStorage
const initializeData = async () => {
  try {
    const hasInitialized = await AsyncStorage.getItem('hasInitialized');
    if (!hasInitialized) {
      // Exemplo de dados iniciais (se necessário)
      await AsyncStorage.setItem('hasInitialized', 'true');
      console.log('AsyncStorage inicializado com sucesso.'); 
    }
  } catch (error) {
    console.error('Erro ao inicializar AsyncStorage:', error);
  }
};

export default function App() {
  useEffect(() => {
    // Configura o AsyncStorage ao inicializar o aplicativo
    initializeData();
  }, []);

  return (
    <UserProvider>
      <ThemeProvider>
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      </ThemeProvider>
    </UserProvider>
  );
}

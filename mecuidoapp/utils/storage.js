import AsyncStorage from '@react-native-async-storage/async-storage';

export const salvarContaTeste = async () => {
  const contaTeste = {
    nome: 'Usuário Teste',
    email: 'teste@t.com',
    senha: '1231231234',
    peso: 70,
    altura: 170,
    agua: 0,
    sono: 0,
  };

  try {
    const usuariosSalvos = await AsyncStorage.getItem('usuarios');
    const usuarios = usuariosSalvos ? JSON.parse(usuariosSalvos) : [];

    if (!usuarios.some((u) => u.email === contaTeste.email)) {
      usuarios.push(contaTeste);
      await AsyncStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
  } catch (error) {
    console.error('Erro ao salvar conta de teste:', error);
  }
};

export const saveItem = async (key, newValue) => {
  try {
    const existingValue = await getItem(key);
    const updatedValue = { ...existingValue, ...newValue };
    await AsyncStorage.setItem(key, JSON.stringify(updatedValue));
  } catch (error) {
    console.error(`Erro ao salvar item ${key}:`, error);
  }
};

export const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Erro ao obter item ${key}:`, error);
    return null;
  }
};

export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Erro ao remover item ${key}:`, error);
  }
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Erro ao limpar armazenamento:', error);
  }
};

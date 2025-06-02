import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
  SafeAreaView,
} from 'react-native';
import { saveItem, getItem, removeItem } from '../../../utils/storage';
import InputField from '../../common/InputField';
import Checkbox from '../../common/Checkbox';
import { UserContext } from '../../../context/UserContext';
import { ThemeContext } from '../../../context/ThemeContext';
import BotaoDestaque from '../../common/BotaoDestaque';
import LinkDestaque from '../../common/LinkDestaque';
import getStyles from './styles';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [lembrar, setLembrar] = useState(false);

  const { login } = useContext(UserContext); // Método login do contexto de usuário
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);

  useEffect(() => {
    const carregarCredenciais = async () => {
      try {
        const credenciais = await getItem('@user_info');
        if (credenciais) {
          const { email, senha } = credenciais;
          setEmail(email);
          setSenha(senha);
          setLembrar(true);
        }
      } catch (error) {
        console.error('Erro ao carregar as credenciais:', error);
      }
    };

    carregarCredenciais();
  }, []);

  const validarCampos = () => {
    if (!email.trim() || !email.includes('@')) {
      Alert.alert('Erro', 'E-mail inválido');
      return false;
    }
    if (!senha || senha.length < 10) {
      Alert.alert('Erro', 'Senha deve ter ao menos 10 caracteres');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (validarCampos()) {
      try {
        await login(email.trim(), senha); // Login usando o contexto

        if (lembrar) {
          await saveItem('@user_info', { email, senha });
        } else {
          await removeItem('@user_info');
        }

        navigation.navigate('Main'); // Navega para a tela principal
      } catch (error) {
        const errorMessage = error.message;

        if (errorMessage.includes('auth/user-not-found')) {
          Alert.alert('Erro', 'Usuário não encontrado.');
        } else if (errorMessage.includes('auth/wrong-password')) {
          Alert.alert('Erro', 'Senha incorreta.');
        } else {
          Alert.alert('Erro', 'Ocorreu um erro inesperado. Tente novamente.');
        }
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <SafeAreaView style={styles.formWrapper}>
        <View style={styles.formContainer}>
          <InputField
            label="E-mail"
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            iconName="email"
            iconType="MaterialIcons"
            containerStyle={{ marginBottom: 40 }}
          />

          <InputField
            label="Senha"
            placeholder="Digite sua senha"
            secureTextEntry={!mostrarSenha}
            value={senha}
            onChangeText={setSenha}
            showPasswordToggle
            onTogglePassword={() => setMostrarSenha(!mostrarSenha)}
            passwordVisible={mostrarSenha}
          />

          <Checkbox
            label="Lembrar credenciais"
            checked={lembrar}
            onPress={() => setLembrar(!lembrar)}
          />

          <BotaoDestaque
            texto="Entrar"
            onPress={handleLogin}
            style={{ marginTop: 80, marginBottom: 50, alignSelf: 'center', }}
          />

          <LinkDestaque
            texto="Esqueci minha senha"
            onPress={() => navigation.navigate('EsqueciSenha')}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

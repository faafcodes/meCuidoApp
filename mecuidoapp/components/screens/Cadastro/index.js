import React, { useState, useContext, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { ThemeContext } from '../../../context/ThemeContext';
import { UserContext } from '../../../context/UserContext';

import InputField from '../../common/InputField';
import Checkbox from '../../common/Checkbox';
import BotaoDestaque from '../../common/BotaoDestaque';
import Tooltip from '../../common/Tooltip';

import getStyles from './styles';

export default function Cadastro({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const { cadastrarUsuario } = useContext(UserContext);
  const styles = getStyles(theme);

  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [aceitoTermos, setAceitoTermos] = useState(false);
  const [erros, setErros] = useState({});
  const [senhaVisible, setSenhaVisible] = useState(false);
  const [confirmarSenhaVisible, setConfirmarSenhaVisible] = useState(false);
  const senhaTooltipRef = useRef(null);
  const [mostrarTooltipSenha, setMostrarTooltipSenha] = useState(false);

  const formatarData = (data) =>
    data
      ? `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth() + 1)
          .toString()
          .padStart(2, '0')}/${data.getFullYear()}`
      : '';

  const validar = () => {
    const novosErros = {};

    // Nome
    if (!nome.trim()) {
      novosErros.nome = 'O nome é obrigatório.';
    } else if (nome.trim().length < 2) {
      novosErros.nome = 'Nome muito curto. Digite pelo menos 2 caracteres.';
    }

    // Data de nascimento
    if (!dataNascimento) {
      novosErros.dataNascimento = 'A data de nascimento é obrigatória.';
    } else {
      const hoje = new Date();
      const data18anos = new Date(
        dataNascimento.getFullYear() + 18,
        dataNascimento.getMonth(),
        dataNascimento.getDate()
      );

      if (data18anos > hoje) {
        novosErros.dataNascimento = 'Você deve ter pelo menos 18 anos.';
      } else if (dataNascimento.getFullYear() < 1900) {
        novosErros.dataNascimento = 'Uau! Você é praticamente um fóssil! 🤯';
      } else if (dataNascimento > hoje) {
        novosErros.dataNascimento =
          'Você veio do futuro? Isso não é permitido!';
      }
    }

    // Email
    if (!email.includes('@')) {
      novosErros.email = 'Digite um e-mail válido.';
    } else if (email.length > 50) {
      novosErros.email = 'Email muito longo! É um romance? 📖';
    }

    // Senha
    if (senha.length < 10) {
      novosErros.senha = 'A senha deve ter no mínimo 10 caracteres.';
    } else if (senha.length > 20) {
      novosErros.senha = 'Senha muito longa. Use até 20 caracteres.';
    }

    // Confirmar senha
    if (senha !== confirmarSenha) {
      novosErros.confirmarSenha = 'As senhas não coincidem.';
    }

    // Aceite dos termos
    if (!aceitoTermos) {
      novosErros.termos = 'Você precisa aceitar os termos para continuar.';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

const handleCadastrar = async () => {
  const valido = validar();
  if (!valido) return; // <<< Garante que não chama cadastrarUsuario se houver erro

  try {
    const novoUsuario = {
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      dataNascimento: dataNascimento ? dataNascimento.toISOString() : '',
      senha,
      peso: 0,
      altura: 0,
      agua: 0,
      sono: 0,
    };

    await cadastrarUsuario(novoUsuario);
    navigation.navigate('InformacoesIniciais', { usuario: novoUsuario });
  } catch (error) {
    Alert.alert('Erro', error.message || 'Erro ao cadastrar usuário.');
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraScrollHeight={40}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 40 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 40 }}>
          <InputField
            label="Nome" 
            placeholder="Digite como quer ser chamado"
            value={nome}
            onChangeText={setNome}
            iconName="person"
            iconType="MaterialIcons"
            error={erros.nome}
            containerStyle={{ marginTop: 10 }}
            inputStyle={{ height: 40 }}
          />
          <InputField
            label="E-mail"
            placeholder="Digite seu e-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            iconName="email"
            iconType="MaterialIcons"
            error={erros.email}
            inputStyle={{ height: 40 }}
          />
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <InputField
              label="Data de nascimento"
              placeholder="dd/mm/aaaa"
              value={formatarData(dataNascimento)}
              editable={false}
              iconName="calendar-today"
              iconType="MaterialIcons"
              error={erros.dataNascimento}
              inputStyle={{ height: 40 }}
            />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dataNascimento || new Date(2000, 0, 1)}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setDataNascimento(selectedDate);
              }}
            />
          )}
          <InputField
            label="Senha"
            placeholder="Mínimo de 10 caracteres"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!senhaVisible}
            showPasswordToggle
            onTogglePassword={() => setSenhaVisible(!senhaVisible)}
            passwordVisible={senhaVisible}
            tooltip={{
              onToggle: () => setMostrarTooltipSenha(!mostrarTooltipSenha),
              iconRef: senhaTooltipRef,
            }}
            error={erros.senha}
            inputStyle={{ height: 40 }}
          />
          <Tooltip
            visible={mostrarTooltipSenha}
            onClose={() => setMostrarTooltipSenha(false)}
            text="A senha deve ter entre 10 e 20 caracteres para garantir sua segurança."
            position={{ top: 320, left: 50 }}
          />
          <InputField
            label="Confirmar senha"
            placeholder="Digite a senha novamente"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry={!confirmarSenhaVisible}
            showPasswordToggle
            onTogglePassword={() =>
              setConfirmarSenhaVisible(!confirmarSenhaVisible)
            }
            passwordVisible={confirmarSenhaVisible}
            error={erros.confirmarSenha}
            inputStyle={{ height: 40 }}
          />
          <Checkbox
            label={
              <Text style={{ fontSize: 14, color: theme.textPrimary }}>
                Eu concordo com os{' '}
                <Text
                  style={styles.link}
                  onPress={() => navigation.navigate('TermosCondicoes')}>
                  Termos & Condições
                </Text>{' '}
                e com a{' '}
                <Text
                  style={styles.link}
                  onPress={() => navigation.navigate('PoliticaPrivacidade')}>
                  Política de Privacidade
                </Text>{' '}
                do <Text style={styles.softBrand}>mecuido</Text>.
              </Text>
            }
            checked={aceitoTermos}
            onPress={() => setAceitoTermos(!aceitoTermos)}
            error={erros.termos}
          />
          <BotaoDestaque
            onPress={handleCadastrar}
            texto="Criar conta"
            style={{ marginTop: 10, alignSelf: 'center', width: '100%' }}
          />
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

import React, { useState, useContext, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; // Import necessário
import DateTimePicker from '@react-native-community/datetimepicker';

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
    if (!nome.trim()) novosErros.nome = 'Nome é obrigatório';
    if (!dataNascimento)
      novosErros.dataNascimento = 'Data de nascimento é obrigatória';
    if (!email.includes('@')) novosErros.email = 'E-mail inválido';
    if (senha.length < 10)
      novosErros.senha = 'Senha deve ter ao menos 10 caracteres';
    if (senha !== confirmarSenha)
      novosErros.confirmarSenha = 'As senhas não coincidem';
    if (!aceitoTermos) novosErros.termos = 'Você deve aceitar os termos';

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleCadastrar = async () => {
    if (validar()) {
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
        navigation.navigate('InformacoesIniciais');
      } catch (error) {
        Alert.alert('Erro', error.message || 'Erro ao cadastrar usuário.');
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      enableOnAndroid={true}
      extraScrollHeight={20} // Altura adicional para garantir que os campos não fiquem escondidos
    >
      <InputField
        label="Nome"
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
        iconName="person"
        iconType="MaterialIcons"
        error={erros.nome}
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
      />

      <Tooltip
        visible={mostrarTooltipSenha}
        onClose={() => setMostrarTooltipSenha(false)}
        text="A senha deve ter entre 10 e 20 caracteres para garantir sua segurança."
        position={{ top: 320, left: 50 }} // ajuste conforme necessário
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
      <BotaoDestaque onPress={handleCadastrar} texto="Criar conta" />
    </KeyboardAwareScrollView>
  );
}

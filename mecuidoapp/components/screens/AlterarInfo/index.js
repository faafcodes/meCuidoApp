import React, { useContext, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { ThemeContext } from '../../../context/ThemeContext';
import { UserContext } from '../../../context/UserContext';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import InputField from '../../common/InputField';
import BirthdateInputField from '../../common/AniversarioInput';
import Tooltip from '../../common/Tooltip';
import DropDownPicker from 'react-native-dropdown-picker';
import BotaoDestaque from '../../common/BotaoDestaque';
import getStyles from './styles';

export default function EditarInfo({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const { user, atualizarUsuario } = useContext(UserContext);
  const styles = getStyles(theme);

  // Estados iniciais com dados do usuário
  const [nome, setNome] = useState(user?.nome || '');
  const [email, setEmail] = useState(user?.email || '');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [dataNascimento, setDataNascimento] = useState(() => {
    if (user?.dataNascimento) {
      const parsed = new Date(user.dataNascimento);
      const localDate = new Date(
        parsed.getUTCFullYear(),
        parsed.getUTCMonth(),
        parsed.getUTCDate()
      );
      return isNaN(localDate.getTime()) ? null : localDate;
    }
    return null;
  });

  const [sexo, setSexo] = useState(user?.sexo || 'Masculino');

  const [senhaVisible, setSenhaVisible] = useState(false);
  const [confirmarSenhaVisible, setConfirmarSenhaVisible] = useState(false);

  const [openSexo, setOpenSexo] = useState(false);
  const [erro, setErro] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const senhaTooltipRef = useRef(null);
  const sexoTooltipRef = useRef(null);
  const [mostrarTooltipSexo, setMostrarTooltipSexo] = useState(false);
  const [mostrarTooltipSenha, setMostrarTooltipSenha] = useState(false);

  const formatarData = (data) =>
    data
      ? `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth() + 1)
          .toString()
          .padStart(2, '0')}/${data.getFullYear()}`
      : '';

  const validar = () => {
    const erros = {};

    // Validação do nome
    if (!nome.trim()) {
      erros.nome = 'Cadê seu nome, sumiu no vento?';
    } else if (nome.length < 3) {
      erros.nome = 'Nome muito curto! Você é um personagem de desenho?';
    } else if (nome.length > 50) {
      erros.nome = 'Wow! Seu nome cabe numa etiqueta de bagagem?';
    }

    if (!email.includes('@') || !email.includes('.')) {
      erros.email =
        'Esse email não parece real... Tem certeza que não é um meme?';
    } else if (email.length > 50) {
      erros.email =
        'Email longo demais, parece que você quer mandar um livro inteiro!';
    }

    // Validação da data de nascimento absurda
    if (!dataNascimento) {
      erros.dataNascimento = 'Data de nascimento não pode ficar no limbo!';
    } else {
      const ano = dataNascimento.getFullYear();
      const anoAtual = new Date().getFullYear();
      if (ano < 1900) {
        erros.dataNascimento =
          'Uau, você veio do século passado? Que viagem no tempo!';
      } else if (ano > anoAtual) {
        erros.dataNascimento =
          'Você ainda não nasceu? Calendário confuso, hein?';
      }
    }

    if (senha && senha.length < 10) {
      erros.senha = 'Senha muito curta, segura o jogo aí!';
    }
    if (senha && senha !== confirmarSenha) {
      erros.confirmarSenha = 'As senhas não batem, tipo par e ímpar!';
    }
    if (!sexo) {
      erros.sexo =
        'Escolha um sexo, essa decisão não vai te pegar desprevenido!';
    }

    setErro(erros);
    return Object.keys(erros).length === 0;
  };

  const handleSalvar = async () => {
    if (!validar()) return;

    const dadosAtualizados = {};

    if (nome.trim() !== user.nome) dadosAtualizados.nome = nome.trim();
    if (email.trim().toLowerCase() !== user.email)
      dadosAtualizados.email = email.trim().toLowerCase();
    if (sexo !== user.sexo) dadosAtualizados.sexo = sexo;

    const dataOriginal = user?.dataNascimento
      ? new Date(user.dataNascimento).toISOString()
      : null;
    const novaData = dataNascimento
      ? new Date(dataNascimento).toISOString()
      : null;
    if (novaData !== dataOriginal) dadosAtualizados.dataNascimento = novaData;

    if (senha) dadosAtualizados.senha = senha;

    if (Object.keys(dadosAtualizados).length === 0) {
      Alert.alert('Nenhuma alteração', 'Você não modificou nenhum dado.');
      return;
    }

    try {
      await atualizarUsuario({ ...user, ...dadosAtualizados });
      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
      navigation.navigate('Main', { refresh: true });
    } catch (error) {
      Alert.alert('Erro', error.message || 'Erro ao atualizar os dados.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled">
          <InputField
            label="Nome"
            placeholder="Seu nome"
            value={nome}
            onChangeText={setNome}
            iconName="person"
            containerStyle={{ marginTop: 0 }}
            inputStyle={{ height: 40, width: '100%' }}
          />

          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <InputField
              label="Data de nascimento"
              placeholder="dd/mm/aaaa"
              value={formatarData(dataNascimento)}
              editable={false}
              iconName="calendar-today"
              iconType="MaterialIcons"
              containerStyle={{ marginBottom: 22 }}
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

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 16,
            }}>
            <Text style={styles.label}>Sexo</Text>
            <TouchableOpacity
              onPress={() => setMostrarTooltipSexo(!mostrarTooltipSexo)}>
              <MaterialIcons
                name="info-outline"
                size={20}
                color={theme.iconColor}
                style={{ marginLeft: 6 }}
              />
            </TouchableOpacity>
          </View>

          <DropDownPicker
            open={openSexo}
            value={sexo}
            items={[
              { label: 'Masculino', value: 'Masculino' },
              { label: 'Feminino', value: 'Feminino' },
            ]}
            setOpen={setOpenSexo}
            setValue={setSexo}
            placeholder="Selecionar"
            style={styles.dropdown}
            textStyle={styles.dropdownText}
            dropDownContainerStyle={styles.dropdownContainer}
          />
          {erro.sexo && <Text style={styles.error}>{erro.sexo}</Text>}
          <Tooltip
            visible={mostrarTooltipSexo}
            onClose={() => setMostrarTooltipSexo(false)}
            text="Para garantir resultados mais confiáveis, selecione o sexo conforme seu perfil hormonal atual. Caso esteja em tratamento hormonal, escolha o sexo correspondente ao tratamento. Caso contrário, selecione o sexo atribuído no nascimento."
            position={{ top: 150, left: 30 }} // ajuste conforme necessário
          />

          <InputField
            label="E-mail"
            placeholder="email@exemplo.com"
            value={email}
            onChangeText={setEmail}
            iconName="mail"
            keyboardType="email-address"
            containerStyle={{ marginBottom: 22 }}
            inputStyle={{ height: 40 }}
          />

          <InputField
            label="Senha"
            placeholder="********"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!senhaVisible}
            showPasswordToggle
            onTogglePassword={() => setSenhaVisible(!senhaVisible)}
            passwordVisible={senhaVisible}
            tooltip={{
              onToggle: () => setMostrarTooltipSenha(!mostrarTooltipSenha),
            }}
            error={erro.senha}
            containerStyle={{ marginBottom: 22 }}
            inputStyle={{ height: 40 }}
          />

          <Tooltip
            visible={mostrarTooltipSenha}
            onClose={() => setMostrarTooltipSenha(false)}
            text="A senha deve ter entre 10 e 20 caracteres para garantir sua segurança."
            position={{ top: 420, left: 30 }} // ajuste conforme necessário
          />

          <InputField
            label="Confirmar senha"
            placeholder="********"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry={!confirmarSenhaVisible}
            showPasswordToggle
            onTogglePassword={() =>
              setConfirmarSenhaVisible(!confirmarSenhaVisible)
            }
            passwordVisible={confirmarSenhaVisible}
            error={erro.confirmarSenha}
            containerStyle={{ marginBottom: 15 }}
            inputStyle={{ height: 40 }}
          />

          <View style={styles.botaoContainer}>
            <BotaoDestaque
              texto="Alterar dados"
              onPress={handleSalvar}
              style={{ marginTop: 0, alignSelf: 'center', width: '100%' }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

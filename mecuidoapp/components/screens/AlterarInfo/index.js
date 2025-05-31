import React, { useContext, useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { ThemeContext } from '../../../context/ThemeContext';
import { UserContext } from '../../../context/UserContext';
import { MaterialIcons } from '@expo/vector-icons';

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
  const [dataNascimento, setDataNascimento] = useState(
    user?.dataNascimento ? new Date(user.dataNascimento) : null
  );
  const [sexo, setSexo] = useState(user?.sexo || 'Masculino');

  const [senhaVisible, setSenhaVisible] = useState(false);
  const [confirmarSenhaVisible, setConfirmarSenhaVisible] = useState(false);

  const [openSexo, setOpenSexo] = useState(false);
  const [erro, setErro] = useState({});
  const senhaTooltipRef = useRef(null);
  const sexoTooltipRef = useRef(null);

  const validar = () => {
    const erros = {};
    if (senha && senha.length < 10)
      erros.senha = 'Senha deve ter ao menos 10 caracteres';
    if (senha && senha !== confirmarSenha)
      erros.confirmarSenha = 'As senhas não coincidem';
    if (!sexo) erros.sexo = 'Selecione o sexo';
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
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <InputField
          label="Nome"
          placeholder="Seu nome"
          value={nome}
          onChangeText={setNome}
          iconName="person"
        />

        <BirthdateInputField
          label="Data de Nascimento"
          value={dataNascimento}
          onChange={setDataNascimento}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <Text style={styles.label}>Sexo</Text>
          <TouchableOpacity
            onPress={() =>
              sexoTooltipRef.current?.toggleTooltip &&
              sexoTooltipRef.current.toggleTooltip()
            }
            ref={sexoTooltipRef}
          >
            <MaterialIcons
              name="info-outline"
              size={16}
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

        <InputField
          label="E-mail"
          placeholder="email@exemplo.com"
          value={email}
          onChangeText={setEmail}
          iconName="mail"
          keyboardType="email-address"
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
            onToggle: () => {},
            iconRef: senhaTooltipRef,
          }}
          error={erro.senha}
        />

        <InputField
          label="Confirmar senha"
          placeholder="********"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry={!confirmarSenhaVisible}
          showPasswordToggle
          onTogglePassword={() => setConfirmarSenhaVisible(!confirmarSenhaVisible)}
          passwordVisible={confirmarSenhaVisible}
          error={erro.confirmarSenha}
        />

        <View style={styles.botaoContainer}>
          <BotaoDestaque texto="Alterar dados" onPress={handleSalvar} />
        </View>
      </ScrollView>
    </View>
  );
}

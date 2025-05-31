import React, { useState, useContext, useRef } from 'react';
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  findNodeHandle,
  UIManager,
  TouchableOpacity,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemeContext } from '../../../context/ThemeContext';
import { UserContext } from '../../../context/UserContext';
import * as firebase from 'firebase'; 
import 'firebase/database';
import BotaoDestaque from '../../common/BotaoDestaque';
import InputField from '../../common/InputField';
import Tooltip from '../../common/Tooltip';
import getStyles from './styles';

export default function InformacoesIniciais({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const { user, setUser } = useContext(UserContext);
  const styles = getStyles(theme);

  const [sexo, setSexo] = useState(null);
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [sono, setSono] = useState('');
  const [agua, setAgua] = useState('');

  const [openSexo, setOpenSexo] = useState(false);
  const [erro, setErro] = useState({});
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({
    top: 100,
    left: 20,
  });

  const sexoTooltipRef = useRef(null);

  const validarCampos = () => {
    const erros = {};
    if (!sexo) erros.sexo = 'Selecione o sexo';
    if (!altura || isNaN(altura)) erros.altura = 'Altura inválida';
    if (!peso || isNaN(peso)) erros.peso = 'Peso inválido';
    if (!sono || isNaN(sono)) erros.sono = 'Horas de sono inválidas';
    if (!agua || isNaN(agua)) erros.agua = 'Copos de água inválido';
    setErro(erros);
    return Object.keys(erros).length === 0;
  };

  const handleContinuar = async () => {
    if (validarCampos()) {
      const dadosCompletos = {
        ...user,
        sexo,
        altura: parseFloat(altura),
        peso: parseFloat(peso),
        sono: parseFloat(sono),
        agua: parseInt(agua, 10),
      };

      setUser(dadosCompletos); // Atualiza o contexto do usuário

      try {
        // Salva os dados no Realtime Database
        console.log("Usuário no contexto:", user);

        await firebase
          .database()
          .ref(`users/${user.uid}`) // Substitua pelo caminho correto no banco
          .update(dadosCompletos);

        navigation.navigate('Main'); // Navega para a tela principal
      } catch (error) {
        console.error('Erro ao salvar dados no Firebase:', error);
        Alert.alert('Erro', 'Não foi possível salvar as informações.');
      }
    } else {
      Alert.alert('Erro', 'Preencha todos os campos corretamente.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Text style={styles.title}>Quase lá!</Text>
      <Text style={styles.subtitle}>
        Preencha os campos abaixo para começar:
      </Text>

      {/* Dropdown de sexo */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.label}>Sexo</Text>
        <TouchableOpacity
          onPress={() => handleTooltipToggle(sexoTooltipRef)}
          ref={sexoTooltipRef}>
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

      {/* Campos numéricos com InputField */}
      <InputField
        label="Altura (cm)"
        placeholder="Ex: 170"
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
        iconName="straighten"
        iconType="MaterialIcons"
        error={erro.altura}
      />

      <InputField
        label="Peso (kg)"
        placeholder="Ex: 65"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
        iconName="fitness-center"
        iconType="MaterialIcons"
        error={erro.peso}
      />

      <InputField
        label="Horas de sono (por noite)"
        placeholder="Ex: 8"
        keyboardType="numeric"
        value={sono}
        onChangeText={setSono}
        iconName="bedtime"
        iconType="MaterialIcons"
        error={erro.sono}
      />

      <InputField
        label="Copos de água (por dia)"
        placeholder="Ex: 8"
        keyboardType="numeric"
        value={agua}
        onChangeText={setAgua}
        iconName="water-drop"
        iconType="MaterialIcons"
        error={erro.agua}
      />

      <BotaoDestaque texto="Continuar" onPress={handleContinuar} />
    </KeyboardAvoidingView>
  );
}

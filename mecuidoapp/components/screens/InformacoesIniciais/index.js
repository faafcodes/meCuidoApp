import React, { useState, useContext, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
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
  const [mostrarTooltipSexo, setMostrarTooltipSexo] = useState(false);
  const [mostrarTooltipSenha, setMostrarTooltipSenha] = useState(false);
  const [dataNascimento, setDataNascimento] = useState(
    user.dataNascimento ? new Date(user.dataNascimento) : null
  );

  const validarCampos = () => {
    const erros = {};
    const alturaNum = parseFloat(altura);
    const pesoNum = parseFloat(peso);
    const sonoNum = parseFloat(sono);
    const aguaNum = parseInt(agua, 10);

    if (!sexo) {
      erros.sexo = 'Selecione o sexo';
    }

    if (!altura || isNaN(alturaNum)) {
      erros.altura = 'Altura inválida';
    } else if (alturaNum < 50) {
      erros.altura = 'Você é um hobbit? 😄';
    } else if (alturaNum > 250) {
      erros.altura = 'Altura de girafa detectada! 🦒';
    }

    if (!peso || isNaN(pesoNum)) {
      erros.peso = 'Peso inválido';
    } else if (pesoNum < 20) {
      erros.peso = 'Isso é o peso de uma almofada? 🛏️';
    } else if (pesoNum > 300) {
      erros.peso = 'Peso digno de um urso polar! 🐻‍❄️';
    }

    if (!sono || isNaN(sonoNum)) {
      erros.sono = 'Horas de sono inválidas';
    } else if (sonoNum < 2) {
      erros.sono = 'Você é um zumbi? 🧟‍♂️';
    } else if (sonoNum > 16) {
      erros.sono = 'Dormindo mais que um gato! 🐱💤';
    }

    if (!agua || isNaN(aguaNum)) {
      erros.agua = 'Copos de água inválido';
    } else if (aguaNum < 1) {
      erros.agua = 'Sem água? Nem uma gotinha? 💧';
    } else if (aguaNum > 30) {
      erros.agua = 'Você é um aquário ambulante? 🐠';
    }

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
        dataNascimento: dataNascimento ? dataNascimento.toISOString() : '', 
      };

      setUser(dadosCompletos);

      try {
        await firebase
          .database()
          .ref(`users/${user.uid}`)
          .update(dadosCompletos);

        navigation.navigate('Main');
      } catch (error) {
        console.error('Erro ao salvar dados no Firebase:', error);
        Alert.alert('Erro', 'Não foi possível salvar as informações.');
      }
    } else {
      Alert.alert('Erro', 'Preencha todos os campos corretamente.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Atenção',
          'Você não pode voltar nesta etapa. Complete as informações para continuar.',
          [{ text: 'OK', style: 'cancel' }]
        );
        return true; // Impede o comportamento padrão de voltar
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Quase lá!</Text>
        <Text style={styles.subtitle}>
          Preencha os campos abaixo para começar:
        </Text>

        {/* Dropdown de sexo */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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

        <View>
          <BotaoDestaque texto="Continuar" onPress={handleContinuar} style={{ alignSelf: 'center', width: '100%' }}/>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

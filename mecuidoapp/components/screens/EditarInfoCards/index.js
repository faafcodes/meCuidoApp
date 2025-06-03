import React, { useContext, useState } from 'react';
import { View, ScrollView, Alert, Text, SafeAreaView } from 'react-native';
import { ThemeContext } from '../../../context/ThemeContext';
import { UserContext } from '../../../context/UserContext';
import { MaterialIcons } from '@expo/vector-icons';
import InputField from '../../../components/common/InputField'; // Ajuste o caminho conforme necessário
import BotaoEntrar from '../../../components/common/BotaoDestaque'; // Ajuste o caminho conforme necessário
import getStyles from './styles';

export default function EditarInfoAgua({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const { user, atualizarUsuario } = useContext(UserContext);
  const styles = getStyles(theme);

  const [peso, setPeso] = useState(user?.peso ? String(user.peso) : '');
  const [altura, setAltura] = useState(user?.altura ? String(user.altura) : '');
  const [agua, setAgua] = useState(user?.agua ? String(user.agua) : '');
  const [sono, setSono] = useState(user?.sono ? String(user.sono) : '');

  const [erro, setErro] = useState({});

const validar = () => {
  const erros = {};

  const pesoNum = Number(peso);
  const alturaNum = Number(altura);
  const aguaNum = Number(agua);
  const sonoNum = Number(sono);

  // Peso
  if (!peso) {
    erros.peso = 'O peso é obrigatório.';
  } else if (isNaN(pesoNum) || pesoNum <= 0) {
    erros.peso = 'Informe um valor numérico válido para o peso.';
  } else if (pesoNum < 30) {
    erros.peso = '30kg? Você é super-herói ou está virando folha?';
  } else if (pesoNum > 300) {
    erros.peso = '300kg? Você é um monstro da força ou só exagerou?';
  }

  // Altura
  if (!altura) {
    erros.altura = 'A altura é obrigatória.';
  } else if (isNaN(alturaNum) || alturaNum <= 0) {
    erros.altura = 'Informe um valor numérico válido para a altura.';
  } else if (alturaNum < 50) {
    erros.altura = 'Menos de 50cm? Você é um hobbit?';
  } else if (alturaNum > 300) {
    erros.altura = 'Mais de 3 metros? Você é um Avatar?';
  }

  // Água
  if (!agua) {
    erros.agua = 'Informe a quantidade de copos de água.';
  } else if (isNaN(aguaNum) || aguaNum < 0) {
    erros.agua = 'Informe um número válido de copos.';
  } else if (aguaNum === 0) {
    erros.agua = 'Zero copos? Certeza que não é um cacto?';
  } else if (aguaNum > 50) {
    erros.agua = '50 copos? Você é peixe ou está tentando inundar a casa?';
  }

  // Sono
  if (!sono) {
    erros.sono = 'Informe a quantidade de horas de sono.';
  } else if (isNaN(sonoNum) || sonoNum < 0) {
    erros.sono = 'Informe um número válido de horas.';
  } else if (sonoNum > 24) {
    erros.sono = 'Mais de 24 horas? Dorme em outro fuso horário?';
  }

  setErro(erros);
  return Object.keys(erros).length === 0;
};


  const handleSalvar = async () => {
    if (!validar()) return;

    const dadosAtualizados = {};

    if (peso && peso !== String(user.peso))
      dadosAtualizados.peso = Number(peso);
    if (altura && altura !== String(user.altura))
      dadosAtualizados.altura = Number(altura);
    if (agua && agua !== String(user.agua))
      dadosAtualizados.agua = Number(agua);
    if (sono && sono !== String(user.sono))
      dadosAtualizados.sono = Number(sono);

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
      <ScrollView>
        <InputField
          label="Copos de água por dia"
          placeholder="Ex: 8"
          value={agua}
          onChangeText={setAgua}
          keyboardType="numeric"
          containerStyle={{ marginBottom: 10 }}
        />
        {erro.agua && <Text style={styles.error}>{erro.agua}</Text>}

        <View style={styles.subtituloContainer}>
          <MaterialIcons
            name="compare-arrows"
            size={18}
            color={theme.iconColor}
          />
          <Text style={styles.subtituloTexto}>
            1 copo equivale a{' '}
            <Text style={styles.subtituloTextoNegrito}>200ml</Text>.
          </Text>
        </View>

        <InputField
          label="Peso (kg)"
          placeholder="Ex: 65"
          value={peso}
          onChangeText={setPeso}
          keyboardType="numeric"
        />
        {erro.peso && <Text style={styles.error}>{erro.peso}</Text>}

        <InputField
          label="Altura (cm)"
          placeholder="Ex: 170"
          value={altura}
          onChangeText={setAltura}
          keyboardType="numeric"
        />
        {erro.altura && <Text style={styles.error}>{erro.altura}</Text>}

        <InputField
          label="Horas de sono"
          placeholder="Ex: 7"
          value={sono}
          onChangeText={setSono}
          keyboardType="numeric"
        />
        {erro.sono && <Text style={styles.error}>{erro.sono}</Text>}

        <BotaoEntrar
          texto="Salvar"
          onPress={handleSalvar}
          style={{ alignSelf: 'center', width: '100%' }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

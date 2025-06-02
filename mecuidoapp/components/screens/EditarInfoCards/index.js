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

  const handleSalvar = async () => {
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

        <InputField
          label="Altura (cm)"
          placeholder="Ex: 170"
          value={altura}
          onChangeText={setAltura}
          keyboardType="numeric"
        />

        <InputField
          label="Horas de sono"
          placeholder="Ex: 7"
          value={sono}
          onChangeText={setSono}
          keyboardType="numeric"
        />

        <BotaoEntrar
          texto="Salvar"
          onPress={handleSalvar}
          style={{ alignSelf: 'center', width: '100%' }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ThemeContext } from '../../../context/ThemeContext';
import getStyles from './styles';
import ButtonBack from '../../common/BotaoVoltar';

export default function PoliticaPrivacidade({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Política de Privacidade</Text>
        <Text style={styles.text}>
          O <Text style={styles.brand}>mecuido</Text> valoriza sua privacidade. Esta política descreve como coletamos, 
          usamos e protegemos suas informações.
        </Text>

        <Text style={styles.subtitle}>1. Coleta de Dados</Text>
        <Text style={styles.text}>
          Coletamos apenas os dados necessários para o funcionamento do <Text style={styles.brand}>mecuido</Text>, como nome, email e data de nascimento.
        </Text>

        <Text style={styles.subtitle}>2. Uso de Informações</Text>
        <Text style={styles.text}>
          Os dados são utilizados exclusivamente para oferecer uma experiência personalizada no <Text style={styles.brand}>mecuido</Text>.
        </Text>

        <Text style={styles.subtitle}>3. Segurança</Text>
        <Text style={styles.text}>
          Adotamos medidas técnicas para proteger suas informações contra acessos não autorizados.
        </Text>
      </ScrollView>
    </View>
  );
}

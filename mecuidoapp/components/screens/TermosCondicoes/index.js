import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ThemeContext } from '../../../context/ThemeContext';
import getStyles from './styles';
import ButtonBack from '../../common/BotaoVoltar';

export default function TermosCondicoes({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Termos & Condições</Text>
        <Text style={styles.text}>
          Ao utilizar o <Text style={styles.brand}>mecuido</Text>, você concorda com os termos estabelecidos neste contrato. 
          É essencial que você leia atentamente todas as cláusulas. O uso contínuo do aplicativo constitui 
          aceitação integral e irrestrita das condições apresentadas.
        </Text>

        <Text style={styles.subtitle}>1. Uso do Aplicativo</Text>
        <Text style={styles.text}>
          O <Text style={styles.brand}>mecuido</Text> destina-se ao bem-estar pessoal. Qualquer uso fora dessa finalidade é proibido.
        </Text>

        <Text style={styles.subtitle}>2. Responsabilidades</Text>
        <Text style={styles.text}>
          A equipe do <Text style={styles.brand}>mecuido</Text> não se responsabiliza por ações tomadas com base em conteúdos do app.
        </Text>

        <Text style={styles.subtitle}>3. Modificações</Text>
        <Text style={styles.text}>
          Os termos podem ser alterados sem aviso prévio. Verifique periodicamente esta seção.
        </Text>
      </ScrollView>
    </View>
  );
}

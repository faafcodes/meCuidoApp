import React, { useContext } from 'react';
import { View, Text, ScrollView, Image, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { ThemeContext } from '../../../context/ThemeContext';
import getStyles from './styles';

export default function SobreScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);

  const alunos = [
    { nome: 'Gabriel Carvalho Lemos', icon: require('../../../assets/userMan.png') },
    { nome: 'Jean Carlos de Castro e Silva', icon: require('../../../assets/userMan.png') },
    { nome: 'Milena Pereira de Carvalho', icon: require('../../../assets/userWomen.png') },
    { nome: 'Miller Moraes Silveira', icon: require('../../../assets/userMan.png') },
  ];

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.paragraph}>
          Este aplicativo foi desenvolvido para a{' '}
          <Text style={styles.destaqueVerde}>Atividade Online Pontuada 02</Text> da Disciplina de{' '}
          <Text style={styles.destaqueVerde}>Programação para Dispositivos Móveis</Text>, ministrada pelo
          professor <Text style={styles.negrito}>Saulo Pereira Ribeiro</Text>.
        </Text>

        <Text style={styles.titulo}>Desenvolvedores / alunos:</Text>

        {alunos.map((aluno, index) => (
          <View key={index} style={styles.alunoContainer}>
            <Image source={aluno.icon} style={styles.avatar} />
            <View style={styles.nomeBox}>
              <Text style={styles.nomeTexto}>{aluno.nome}</Text>
            </View>
          </View>
        ))}

        <Text style={styles.rodape}>2025/1 - Módulo 2</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

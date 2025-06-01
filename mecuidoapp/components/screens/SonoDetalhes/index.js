import React, { useState, useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ThemeContext } from '../../../context/ThemeContext';
import getStyles from './styles';

const dadosSono = [
  { faixa: 'Recém-nascidos (0-3 meses)', recomendacao: '14-17 horas por dia' },
  { faixa: 'Bebês (4-11 meses)', recomendacao: '12-15 horas por dia' },
  {
    faixa: 'Primeira Infância (1-2 anos)',
    recomendacao: '11-14 horas por dia',
  },
  {
    faixa: 'Idade Pré-Escolar (3-5 anos)',
    recomendacao: '10-13 horas por dia',
  },
  { faixa: 'Idade Escolar (6-12 anos)', recomendacao: '9-12 horas por noite' },
  { faixa: 'Adolescentes (13-17 anos)', recomendacao: '8-10 horas por noite' },
  { faixa: 'Adultos (18-60 anos)', recomendacao: '7-9 horas por noite' },
  { faixa: 'Adultos (61-64 anos)', recomendacao: '7-9 horas por noite' },
  { faixa: 'Adultos (65+ anos)', recomendacao: '7-8 horas por dia' },
];

export default function SonoDetalhes() {
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);

  const [faixaSelecionada, setFaixaSelecionada] = useState('todas'); // default = todas

  const dadosFiltrados =
    faixaSelecionada === 'todas'
      ? dadosSono
      : dadosSono.filter((item) => item.faixa === faixaSelecionada);

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        A quantidade de sono recomendada varia conforme a faixa etária. Confira
        abaixo as recomendações de sono para diferentes grupos:
      </Text>

      <Picker
        selectedValue={faixaSelecionada}
        onValueChange={(itemValue) => setFaixaSelecionada(itemValue)}
        style={styles.picker}
        itemStyle={styles.pickerItem}>
        <Picker.Item label="Todas as faixas etárias" value="todas" />
        {dadosSono.map((item) => (
          <Picker.Item key={item.faixa} label={item.faixa} value={item.faixa} />
        ))}
      </Picker>

      <FlatList
        data={dadosFiltrados}
        keyExtractor={(item) => item.faixa}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemFaixa}>Faixa Etária: {item.faixa}</Text>
            <Text style={styles.itemRecomendacao}>
              Recomendação:{' '}
              <Text style={styles.recomendacaoValor}>{item.recomendacao}</Text>
            </Text>
          </View>
        )}
      />
    </View>
  );
}

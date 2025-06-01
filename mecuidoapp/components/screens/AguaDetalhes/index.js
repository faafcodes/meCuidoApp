import React, { useState, useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ThemeContext } from '../../../context/ThemeContext';
import getStyles from './styles';

const dadosAgua = [
  { faixa: '30-40kg', recomendacao: '1.2L a 1.6L' },
  { faixa: '40-50kg', recomendacao: '1.6L a 2.0L' },
  { faixa: '50-60kg', recomendacao: '2.0L a 2.4L' },
  { faixa: '60-70kg', recomendacao: '2.4L a 2.8L' },
  { faixa: '70-80kg', recomendacao: '2.8L a 3.2L' },
  { faixa: '80-90kg', recomendacao: '3.2L a 3.6L' },
  { faixa: '90-100kg', recomendacao: '3.6L a 4.0L' },
];

export default function AguaDetalhes() {
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);

  const [faixaSelecionada, setFaixaSelecionada] = useState(null);

  const dadosFiltrados = faixaSelecionada
    ? dadosAgua.filter((item) => item.faixa === faixaSelecionada)
    : dadosAgua;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingestão de Água</Text>

      <Picker
        selectedValue={faixaSelecionada}
        onValueChange={(itemValue) => setFaixaSelecionada(itemValue)}
        style={styles.picker}
        itemStyle={styles.pickerItem}
      >
        <Picker.Item label="Todas as faixas de peso" value={null} />
        {dadosAgua.map((item) => (
          <Picker.Item key={item.faixa} label={item.faixa} value={item.faixa} />
        ))}
      </Picker>

      <FlatList
        data={dadosFiltrados}
        keyExtractor={(item) => item.faixa}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemFaixa}>Peso: {item.faixa}</Text>
            <Text style={styles.itemRecomendacao}>
              Recomendação: <Text style={styles.recomendacaoValor}>{item.recomendacao}</Text>
            </Text>
          </View>
        )}
      />
    </View>
  );
}

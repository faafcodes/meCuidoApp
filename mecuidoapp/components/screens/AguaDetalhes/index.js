import React, { useState, useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ThemeContext } from '../../../context/ThemeContext';
import getStyles from './styles';

const calcularRecomendacao = (pesoMin, pesoMax) => {
  const minLitros = (pesoMin * 0.035).toFixed(2);
  const maxLitros = (pesoMax * 0.035).toFixed(2);
  return `${minLitros}L a ${maxLitros}L`;
};

const dadosAgua = [
  { faixa: '30-40kg', recomendacao: calcularRecomendacao(30, 40) },
  { faixa: '40-50kg', recomendacao: calcularRecomendacao(40, 50) },
  { faixa: '50-60kg', recomendacao: calcularRecomendacao(50, 60) },
  { faixa: '60-70kg', recomendacao: calcularRecomendacao(60, 70) },
  { faixa: '70-80kg', recomendacao: calcularRecomendacao(70, 80) },
  { faixa: '80-90kg', recomendacao: calcularRecomendacao(80, 90) },
  { faixa: '90-100kg', recomendacao: calcularRecomendacao(90, 100) },
];

export default function AguaDetalhes() {
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);

  const [faixaSelecionada, setFaixaSelecionada] = useState('todas');

  const dadosFiltrados =
    faixaSelecionada === 'todas'
      ? dadosAgua
      : dadosAgua.filter((item) => item.faixa === faixaSelecionada);

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        O cálculo recomendado é ingerir 35ml de água por quilo de peso. Por
        exemplo: 65kg ≈ 2,27L por dia (0,035 x 65).
      </Text>

      <Picker
        selectedValue={faixaSelecionada}
        onValueChange={(itemValue) => setFaixaSelecionada(itemValue)}
        style={styles.picker}
        itemStyle={styles.pickerItem}>
        <Picker.Item label="Todas as faixas de peso" value="todas" />
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
              Recomendação:{' '}
              <Text style={styles.recomendacaoValor}>{item.recomendacao}</Text>
            </Text>
          </View>
        )}
      />
    </View>
  );
}

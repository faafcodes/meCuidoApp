import React, { useState, useContext } from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ThemeContext } from '../../../context/ThemeContext';
import getStyles from './styles';

const dadosIMC = {
  adulto: [
    { faixa: 'Menor do que 18,5', classificacao: 'Abaixo do peso normal' },
    { faixa: '18,5 - 24,9', classificacao: 'Peso normal' },
    { faixa: '25,0 - 29,9', classificacao: 'Excesso de peso' },
    { faixa: '30,0 - 34,9', classificacao: 'Obesidade classe I' },
    { faixa: '35,0 - 39,9', classificacao: 'Obesidade classe II' },
    { faixa: 'Maior ou igual a 40,0', classificacao: 'Obesidade classe III' },
  ],
  criancas: [
    {
      idade: '6 anos',
      normal: '14,5',
      sobrepeso: 'mais de 16,6',
      obesidade: 'mais de 18,0',
    },
    {
      idade: '7 anos',
      normal: '15,0',
      sobrepeso: 'mais de 17,3',
      obesidade: 'mais de 19,1',
    },
    {
      idade: '8 anos',
      normal: '15,6',
      sobrepeso: 'mais de 18,1',
      obesidade: 'mais de 20,3',
    },
    {
      idade: '9 anos',
      normal: '16,1',
      sobrepeso: 'mais de 18,8',
      obesidade: 'mais de 21,4',
    },
    {
      idade: '10 anos',
      normal: '16,7',
      sobrepeso: 'mais de 19,6',
      obesidade: 'mais de 22,5',
    },
    {
      idade: '11 anos',
      normal: '17,2',
      sobrepeso: 'mais de 20,3',
      obesidade: 'mais de 23,7',
    },
    {
      idade: '12 anos',
      normal: '17,8',
      sobrepeso: 'mais de 21,1',
      obesidade: 'mais de 24,9',
    },
    {
      idade: '13 anos',
      normal: '18,5',
      sobrepeso: 'mais de 21,9',
      obesidade: 'mais de 26,1',
    },
    {
      idade: '14 anos',
      normal: '19,2',
      sobrepeso: 'mais de 22,7',
      obesidade: 'mais de 27,6',
    },
    {
      idade: '15 anos',
      normal: '19,9',
      sobrepeso: 'mais de 23,6',
      obesidade: 'mais de 28,8',
    },
  ],
  meninas: [
    {
      idade: '6 anos',
      normal: '14,3',
      sobrepeso: 'mais de 16,1',
      obesidade: 'mais de 17,4',
    },
    {
      idade: '7 anos',
      normal: '14,9',
      sobrepeso: 'mais de 17,1',
      obesidade: 'mais de 18,9',
    },
    {
      idade: '8 anos',
      normal: '15,5',
      sobrepeso: 'mais de 17,9',
      obesidade: 'mais de 20,0',
    },
    {
      idade: '9 anos',
      normal: '16,1',
      sobrepeso: 'mais de 18,8',
      obesidade: 'mais de 21,1',
    },
    {
      idade: '10 anos',
      normal: '16,8',
      sobrepeso: 'mais de 19,6',
      obesidade: 'mais de 22,3',
    },
    {
      idade: '11 anos',
      normal: '17,4',
      sobrepeso: 'mais de 20,4',
      obesidade: 'mais de 23,5',
    },
    {
      idade: '12 anos',
      normal: '18,1',
      sobrepeso: 'mais de 21,2',
      obesidade: 'mais de 24,6',
    },
    {
      idade: '13 anos',
      normal: '18,9',
      sobrepeso: 'mais de 22,0',
      obesidade: 'mais de 26,0',
    },
    {
      idade: '14 anos',
      normal: '19,6',
      sobrepeso: 'mais de 22,9',
      obesidade: 'mais de 27,3',
    },
    {
      idade: '15 anos',
      normal: '20,3',
      sobrepeso: 'mais de 23,8',
      obesidade: 'mais de 28,8',
    },
  ],
};

export default function IMCDetalhes() {
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);

  const [categoriaSelecionada, setCategoriaSelecionada] = useState('adulto');

  const dadosSelecionados = dadosIMC[categoriaSelecionada];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'lightyellow' }}>
      <View style={styles.container}>
        <Text style={styles.subtitle}>
          O IMC é calculado dividindo o peso (em kg) pela altura ao quadrado (em
          metros): IMC = peso / (altura x altura)
        </Text>

        <Picker
          selectedValue={categoriaSelecionada}
          onValueChange={(itemValue) => setCategoriaSelecionada(itemValue)}
          style={styles.picker}
          itemStyle={styles.pickerItem}>
          <Picker.Item label="Adultos" value="adulto" />
          <Picker.Item label="Meninos (6-15 anos)" value="criancas" />
          <Picker.Item label="Meninas (6-15 anos)" value="meninas" />
        </Picker>

        <FlatList
          data={dadosSelecionados}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 80 }} 
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemFaixa}>
                {categoriaSelecionada === 'adulto'
                  ? `IMC: ${item.faixa}`
                  : `Idade: ${item.idade}`}
              </Text>
              <Text style={styles.itemRecomendacao}>
                {categoriaSelecionada === 'adulto' ? (
                  <>
                    Classificação:
                    <Text style={styles.recomendacaoValor}>
                      {' '}
                      {item.classificacao}
                    </Text>
                  </>
                ) : (
                  <>
                    Normal:{' '}
                    <Text style={styles.recomendacaoValor}>{item.normal}</Text>,
                    Sobrepeso:{' '}
                    <Text style={styles.recomendacaoValor}>
                      {item.sobrepeso}
                    </Text>
                    , Obesidade:{' '}
                    <Text style={styles.recomendacaoValor}>
                      {item.obesidade}
                    </Text>
                  </>
                )}
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

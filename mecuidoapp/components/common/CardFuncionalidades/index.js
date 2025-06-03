import React, { useContext, useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { UserContext } from '../../../context/UserContext';
import { ThemeContext } from '../../../context/ThemeContext';
import getStyles from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import { useNavigation } from '@react-navigation/native';

import aguaImg from '../../../assets/drop-icon.png';
import imcImg from '../../../assets/peso-icon.png';
import sonoImg from '../../../assets/sono-icon.png';

function calcularIdade(dataNascimento) {
  if (!dataNascimento) return null;
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const m = hoje.getMonth() - nascimento.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  return idade;
}

function faixaSonoPorIdade(idade) {
  if (idade === null) return { min: 7, max: 9, desc: 'Adulto (18 a 60 anos)' };
  if (idade <= 0.25)
    return { min: 14, max: 17, desc: 'Recém-nascidos (0-3 meses)' };
  if (idade <= 1) return { min: 12, max: 15, desc: 'Bebês (4-11 meses)' };
  if (idade <= 2)
    return { min: 11, max: 14, desc: 'Primeira Infância (1-2 anos)' };
  if (idade <= 5)
    return { min: 10, max: 13, desc: 'Idade Pré-Escolar (3-5 anos)' };
  if (idade <= 12)
    return { min: 9, max: 12, desc: 'Idade Escolar (6-12 anos)' };
  if (idade <= 17)
    return { min: 8, max: 10, desc: 'Adolescentes (13-17 anos)' };
  if (idade <= 60) return { min: 7, max: 9, desc: 'Adultos (18-60 anos)' };
  if (idade <= 64) return { min: 7, max: 9, desc: 'Adultos (61-64 anos)' };
  return { min: 7, max: 8, desc: 'Adultos (65+ anos)' };
}

export default function CardCarrossel() {
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);
  const navigation = useNavigation();

  const [currentIndex, setCurrentIndex] = useState(0);

  const peso = user?.peso || 0;
  const altura = user?.altura || 0;
  const aguaConsumida = user?.agua || 0;
  const sono = user?.sono || 0;
  const sexo = user?.sexo || 'F';
  const dataNascimento = user?.dataNascimento || null;

  const idade = useMemo(() => calcularIdade(dataNascimento), [dataNascimento]);
  const sonoIdeal = useMemo(() => faixaSonoPorIdade(idade), [idade]);

  const aguaRecomendadaMl = peso * 35;
  const aguaRecomendadaLitros = (aguaRecomendadaMl / 1000).toFixed(2);

  const imc = peso && altura ? (peso / (altura / 100) ** 2).toFixed(1) : '--';
  const imcIdealMin = '18.5';
  const imcIdealMax = '24.9';

  const imcCategoria =
    imc === '--'
      ? '--'
      : imc < 18.5
      ? 'Abaixo do peso normal'
      : imc <= 24.9
      ? 'Peso normal'
      : imc <= 29.9
      ? 'Sobrepeso'
      : imc <= 34.9
      ? 'Obesidade Classe I'
      : imc <= 39.9
      ? 'Obesidade Classe II'
      : 'Obesidade Classe III';

let sonoCategoria = '--';

if (sono === '--') {
  sonoCategoria = '--';
} else if (sono < sonoIdeal.min) {
  sonoCategoria = 'Insuficiente';
} else if (sono > sonoIdeal.max) {
  sonoCategoria = 'Excessivo';
} else {
  sonoCategoria = 'Suficiente';
}


  const aguaLitros = aguaConsumida ? (aguaConsumida * 0.25).toFixed(1) : '--';

  const { width, height } = Dimensions.get('window');
  const cardWidth = width * 0.85 + width * 0.05;
  const cardHeight = height * 0.5;

  const onScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / cardWidth);
    setCurrentIndex(index);
  };

  function handleIconPress() {
    const screens = ['AguaDetalhes', 'ImcDetalhes', 'SonoDetalhes'];
    navigation.navigate(screens[currentIndex]);
  }

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
        }}>
        <Text style={styles.carouselTitlePrefix}>
          {['Ingestão de ', 'Índice de ', 'Gestão do '][currentIndex]}
          <Text
            style={[
              styles.carouselTitleHighlighted,
              { color: [theme.agua, theme.imc, theme.sono][currentIndex] },
            ]}>
            {['água', 'massa corporal', 'sono'][currentIndex]}
          </Text>
        </Text>

        <TouchableOpacity onPress={handleIconPress}>
          <MaterialIcons
            name="info-outline"
            size={22}
            color={theme.textPrimary}
            marginRight={14}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.container}
        onScroll={onScroll}
        scrollEventThrottle={16}>
        {/* Água */}
        <View style={[styles.card, { flexDirection: 'column' }]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}>
            {/* Ícone + Texto HOJE */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons
                name="calendar-today"
                size={25}
                color={theme.textPrimary}
                style={{ marginRight: 6 }}
              />
              <View style={{ marginTop: 8 }}>
                <Text style={styles.cardTitle}>HOJE</Text>
              </View>
            </View>

            {/* Botão de editar */}
            <TouchableOpacity
              onPress={() => navigation.navigate('EditarInfoCards')}>
              <MaterialIcons name="edit" size={24} color={theme.textPrimary} />
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            <View style={styles.infoSection}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 4,
                }}>
                <MaterialIcons
                  name="my-location"
                  size={25}
                  color={theme.textPrimary}
                />
                <Text style={[styles.label, { marginLeft: 6 }]}>
                  Ideal por dia
                </Text>
              </View>
              <Text style={styles.value}>
                <Text style={styles.valueAguaNumber}>
                  {aguaRecomendadaLitros}
                </Text>{' '}
                <Text style={styles.valueAguaUnit}>litros</Text>
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 4,
                  marginTop: 25,
                }}>
                <MaterialIcons
                  name="local-drink"
                  size={25}
                  color={theme.textPrimary}
                />
                <Text style={[styles.label, { marginLeft: 6 }]}>
                  Atual no dia
                </Text>
              </View>
              <Text style={styles.value}>
                <Text style={styles.valueAguaNumber}>{aguaConsumida}</Text>{' '}
                <Text style={styles.valueAguaUnit}>copos</Text>
              </Text>
              <Text style={styles.value}>
                <Text style={styles.valueAguaNumber}>{aguaLitros}</Text>{' '}
                <Text style={styles.valueAguaUnit}>litros</Text>
              </Text>
            </View>
            <Image source={aguaImg} style={styles.image} resizeMode="contain" />
          </View>
        </View>

        {/* IMC */}
        <View style={[styles.card, { flexDirection: 'column' }]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}>
            {/* Ícone + Texto HOJE */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons
                name="calendar-today"
                size={25}
                color={theme.textPrimary}
                style={{ marginRight: 6 }}
              />
              <View style={{ marginTop: 8 }}>
                <Text style={styles.cardTitle}>HOJE</Text>
              </View>
            </View>

            {/* Botão de editar */}
            <TouchableOpacity
              onPress={() => navigation.navigate('EditarInfoCards')}>
              <MaterialIcons name="edit" size={24} color={theme.textPrimary} />
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            <View style={styles.infoSection}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 4,
                }}>
                <MaterialIcons
                  name="my-location"
                  size={25}
                  color={theme.textPrimary}
                />
                <Text style={[styles.label, { marginLeft: 6 }]}>IMC ideal</Text>
              </View>
              <Text style={styles.value}>
                <Text style={styles.valueImcUnit}>{imcIdealMin}</Text>{' '}
                <Text style={styles.valueImcUnit}>a</Text>{' '}
                <Text style={styles.valueImcUnit}>{imcIdealMax}</Text>
              </Text>
              <Text style={styles.description}>Peso normal</Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 4,
                  marginTop: 25,
                }}>
                <MaterialIcons
                  name="monitor-weight"
                  size={25}
                  color={theme.textPrimary}
                />
                <Text style={[styles.label, { marginLeft: 6 }]}>IMC atual</Text>
              </View>
              <Text style={styles.value}>
                <Text style={styles.valueImcNumber}>{imc}</Text>
              </Text>
              <Text style={styles.description}>{imcCategoria}</Text>
            </View>
            <Image source={imcImg} style={styles.image} resizeMode="contain" />
          </View>
        </View>

        {/* Sono */}
        <View style={[styles.card, { flexDirection: 'column' }]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}>
            {/* Ícone + Texto HOJE */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons
                name="calendar-today"
                size={25}
                color={theme.textPrimary}
                style={{ marginRight: 6 }}
              />
              <View style={{ marginTop: 8 }}>
                <Text style={styles.cardTitle}>HOJE</Text>
              </View>
            </View>

            {/* Botão de editar */}
            <TouchableOpacity
              onPress={() => navigation.navigate('EditarInfoCards')}>
              <MaterialIcons name="edit" size={24} color={theme.textPrimary} />
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            <View style={styles.infoSection}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 4,
                }}>
                <MaterialIcons
                  name="my-location"
                  size={25}
                  color={theme.textPrimary}
                />
                <Text style={[styles.label, { marginLeft: 6 }]}>
                  Sono ideal
                </Text>
              </View>
              <Text style={styles.value}>
                <Text style={styles.valueSonoNumber}>{sonoIdeal.min}</Text> a{' '}
                <Text style={styles.valueSonoNumber}>{sonoIdeal.max}</Text>{' '}
                <Text style={styles.valueSonoUnit}>horas</Text>
              </Text>
              <Text style={styles.description}>{sonoIdeal.desc}</Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 4,
                  marginTop: 25,
                }}>
                <MaterialIcons
                  name="nights-stay"
                  size={25}
                  color={theme.textPrimary}
                />
                <Text style={[styles.label, { marginLeft: 6 }]}>
                  Sono atual
                </Text>
              </View>
              <Text style={styles.value}>
                <Text style={styles.valueSonoNumber}>{sono}</Text>{' '}
                <Text style={styles.valueSonoUnit}>horas</Text>
              </Text>
              <Text style={styles.description}>{sonoCategoria}</Text>
            </View>
            <Image source={sonoImg} style={styles.image} resizeMode="contain" />
          </View>
        </View>
      </ScrollView>
      <View style={styles.paginationWrapper}>
        <View style={styles.pagination}>
          {[0, 1, 2].map((i) => (
            <View
              key={i}
              style={[styles.dot, i === currentIndex ? styles.dotActive : null]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

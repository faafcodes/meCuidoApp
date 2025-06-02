import React, { useState, useContext } from 'react';
import { View, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { ThemeContext } from '../../../context/ThemeContext';
import getStyles from './styles';

const { width, height } = Dimensions.get('window');
const cardWidth = width * 0.85;
const cardHeight = width * 0.8;

export default function ImagemComIndicadores({ imagens = [], style }) {


  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);
  const [ativo, setAtivo] = useState(0);

  return (
    <View style={[{ alignItems: 'center' }, styles.container]}>
      <Carousel
        loop
        width={cardWidth}
        height={cardHeight}
        data={imagens}
        scrollAnimationDuration={500}
        onSnapToItem={(index) => setAtivo(index)}
        renderItem={({ item }) => (
          <View style={{ alignItems: 'center' }}>
            <Image
              source={item}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        )}
      />

      <View style={styles.dotsContainer}>
        {imagens.map((_, i) => (
          <View
            key={i}
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: i === ativo ? theme.brandMain : theme.subtitle,
              margin: 5,
            }}
          />
        ))}
      </View>
    </View>
  );
}

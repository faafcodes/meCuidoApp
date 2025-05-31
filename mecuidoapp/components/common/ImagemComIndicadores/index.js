import React, { useState, useContext } from 'react';
import { View, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { ThemeContext } from '../../../context/ThemeContext';

const { width } = Dimensions.get('window');

export default function ImagemComIndicadores({ imagens = [], style }) {
  const [ativo, setAtivo] = useState(0);
  const { theme } = useContext(ThemeContext);

  return (
    <View style={[{ alignItems: 'center' }, style]}>
      <Carousel
        loop
        width={width}
        height={290}
        data={imagens}
        scrollAnimationDuration={500}
        onSnapToItem={(index) => setAtivo(index)}
        renderItem={({ item }) => (
          <View style={{ alignItems: 'center' }}>
            <Image
              source={item}
              style={{ width: 300, height: 290, borderRadius: 10 }}
              resizeMode="cover"
            />
          </View>
        )}
      />

      <View style={{
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'center',
      }}>
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

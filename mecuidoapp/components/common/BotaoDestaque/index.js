import React, { useContext } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { ThemeContext } from '../../../context/ThemeContext';
import getStyles from './styles';

export default function BotaoDestaque({ onPress, texto, style, textStyle }) {
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);

  return (
    <TouchableOpacity style={[styles.botaoDestaque, style]} onPress={onPress}>
      <Text style={[styles.textoBotao, textStyle]}>{texto}</Text>
    </TouchableOpacity>
  );
}


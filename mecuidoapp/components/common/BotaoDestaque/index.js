import React, { useContext } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { ThemeContext } from '../../../context/ThemeContext';
import getStyles from './styles';

export default function BotaoEntrar({ onPress, texto }) {
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);

  return (
    <TouchableOpacity style={styles.botaoEntrar} onPress={onPress}>
      <Text style={styles.textoBotao}>{texto}</Text>
    </TouchableOpacity>
  );
}

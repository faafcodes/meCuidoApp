import React, { useContext } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { ThemeContext } from '../../../context/ThemeContext'; // ajuste o caminho se necessário
import getStyles from './styles';

export default function LinkCriarConta({ onPress, texto }) {
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.linkCriarConta}>{texto}</Text>
    </TouchableOpacity>
  );
}


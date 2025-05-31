import React, { useContext } from 'react';
import { Text } from 'react-native';
import { ThemeContext } from '../../../context/ThemeContext'; 
import getStyles from './styles';

export default function Versao({ numero = '1.0' }) {
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);

  return <Text style={styles.versao}>Versão {numero}</Text>;
}

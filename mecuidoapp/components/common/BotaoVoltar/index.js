// index.js
import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../../../context/ThemeContext';
import getStyles from './styles';

export default function ButtonBack({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Inicio')}
      style={styles.botaoVoltar}
    >
      <Ionicons name="arrow-back" size={24} color={theme.subtitle} />
    </TouchableOpacity>
  );
}

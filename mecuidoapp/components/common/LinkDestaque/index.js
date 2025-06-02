import React, { useContext } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { ThemeContext } from '../../../context/ThemeContext'; 
import getStyles from './styles';

export default function LinkDestaque({ onPress, texto }) {
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.linkDestaque}>{texto}</Text>
    </TouchableOpacity>
  );
}


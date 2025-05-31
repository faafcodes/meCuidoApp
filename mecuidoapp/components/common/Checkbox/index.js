// index.js
import React, { useContext } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { ThemeContext } from '../../../context/ThemeContext';
import getStyles from './styles';

export default function Checkbox({ label, checked, onPress, error }) {
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);

  return (
    <View style={styles.checkboxContainer}>
      <View style={styles.checkboxRow}>
        <TouchableOpacity onPress={onPress} style={styles.checkbox}>
          {checked && <View style={styles.checkboxChecked} />}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>{label}</Text>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

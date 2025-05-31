// src/screens/Inicio/styles.js

import { StyleSheet } from 'react-native';

export default function getStyles(theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 80,
      paddingHorizontal: 30,
      alignItems: 'center',
      backgroundColor: theme.background,
    },
    bemVindo: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.subtitle,
    },
  });
}

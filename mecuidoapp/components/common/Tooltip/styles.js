// components/Tooltip/styles.js
import { StyleSheet } from 'react-native';

export default function getStyles(theme) {
  return StyleSheet.create({
    modal: {
      margin: 0,
      position: 'absolute',
    },
    tooltip: {
      position: 'absolute',
      backgroundColor: theme.backgroundTooltip,
      borderRadius: 8,
      padding: 10,
      minWidth: 150,
      maxWidth: 220,
      minHeight: 70,
      zIndex: 10,
      shadowColor: theme.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    text: {
      color: theme.textPrimary,
      fontSize: 14,
      fontWeight: '500',
    },
  });
}

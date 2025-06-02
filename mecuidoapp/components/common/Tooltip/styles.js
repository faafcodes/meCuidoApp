import { StyleSheet } from 'react-native';

export default function getStyles(theme) {
  return StyleSheet.create({
    modal: {
      margin: 0,
      justifyContent: 'flex-start', 
      alignItems: 'flex-start',
    },
    tooltip: {
      backgroundColor: theme.backgroundTooltip,
      borderRadius: 8,
      padding: 12,
      maxWidth: 300,
      zIndex: 10,
      shadowColor: theme.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    text: {
      color: theme.textPrimary,
      fontSize: 16,
      fontWeight: '500',
      flexWrap: 'wrap',
    },
  });
}

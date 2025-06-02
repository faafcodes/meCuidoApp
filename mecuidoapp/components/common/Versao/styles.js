import { StyleSheet } from 'react-native';

export default function getStyles(theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: theme.background,
    },
    versao: {
      position: 'absolute',
      bottom: 15,
      width: '100%',
      textAlign: 'center',
      fontSize: 12,
      color: theme.subtitle,
    },
  });
}

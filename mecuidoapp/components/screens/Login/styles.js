import { StyleSheet } from 'react-native';

export default function getStyles(theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingTop: 40,
      paddingHorizontal: 30,
    },
    versao: {
      position: 'absolute',
      bottom: 15,
      width: '100%',
      textAlign: 'center',
      fontSize: 10,
      color: theme.subtitle,
    },
  });
}

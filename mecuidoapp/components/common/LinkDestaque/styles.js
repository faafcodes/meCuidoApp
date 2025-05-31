import { StyleSheet } from 'react-native';

export default function getStyles(theme) {
  return StyleSheet.create({
    linkCriarConta: {
      color: theme.brandMain, // Agora usa a cor do tema
      fontSize: 14,
      fontWeight: '600',
      marginBottom: 30,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center'
    },
  });
}

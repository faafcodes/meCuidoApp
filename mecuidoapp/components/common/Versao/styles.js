import { StyleSheet } from 'react-native';

export default function getStyles(theme) {
  return StyleSheet.create({
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

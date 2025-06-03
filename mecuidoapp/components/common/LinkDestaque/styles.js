import { StyleSheet } from 'react-native';

export default function getStyles(theme) {
  return StyleSheet.create({
    linkDestaque: {
      color: theme.brandMain, 
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 30,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center'
    },
  });
}

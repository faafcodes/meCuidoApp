import { StyleSheet } from 'react-native';

export default function getStyles(theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingTop: 40,
      paddingHorizontal: 30,
    },
    link: {
      color: theme.brandMain,
      fontWeight: '600',
      fontSize: 14,
      lineHeight: 20, // igual ao do texto base
      textAlignVertical: 'center', // pode ajudar no Android
    },
    softBrand: {
      fontWeight: '600',
    },
  });
}

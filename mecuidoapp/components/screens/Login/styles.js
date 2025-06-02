import { StyleSheet } from 'react-native';

export default function getStyles(theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: 30,
    },
    formContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingBottom: 100,
    },
    formWrapper: {
      flex: 1,
      justifyContent: 'center',
    },
  });
}

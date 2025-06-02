import { StyleSheet } from 'react-native';

export default function getStyles(theme) {
  return StyleSheet.create({
    formGroup: {
      marginBottom: 30,
    },
    label: {
      fontWeight: '700',
      fontSize: 20,
      marginBottom: 8,
      color: theme.subtitle,
    },
    inputContainer: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: theme.brandSoft,
      borderRadius: 8,
      paddingHorizontal: 12,
      alignItems: 'center',
      backgroundColor: theme.background,
    },
    input: {
      flex: 1,
      height: 50,
      fontSize: 16,
      color: theme.subtitle,
    },
    error: {
      color: theme.error,
      fontSize: 12,
      marginTop: 4,
    },
    labelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },

    rightIcon: {
      marginLeft: 6,
      marginBottom: 8,
    },
    iconInfo: {
      marginLeft: 6,
      marginBottom: 8
    },
  });
}

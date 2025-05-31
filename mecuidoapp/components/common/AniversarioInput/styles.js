import { StyleSheet } from 'react-native';

export default function getStyles(theme) {
  return StyleSheet.create({
    formGroup: {
      marginBottom: 20,
    },
    label: {
      fontWeight: '700',
      fontSize: 14,
      marginBottom: 8,
      color: theme.subtitle,
    },
    labelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    inputContainer: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: theme.brandSoft,
      borderRadius: 8,
      paddingHorizontal: 10,
      alignItems: 'center',
      backgroundColor: theme.background,
      height: 40,
    },
    input: {
      flex: 1,
      fontSize: 14,
    },
    rightIcon: {
      marginLeft: 6,
    },
    iconInfo: {
      marginLeft: 6,
      marginBottom: 8,
    },
    error: {
      color: theme.error,
      fontSize: 12,
      marginTop: 4,
    },
  });
}

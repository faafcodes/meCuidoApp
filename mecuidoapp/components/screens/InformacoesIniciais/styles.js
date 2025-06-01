import { StyleSheet } from 'react-native';

export default function getStyles(theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: 30,
      paddingTop: 80,
    },
    title: {
      fontSize: 22,
      fontWeight: '700',
      color: theme.textPrimary,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.subtitle,
      marginBottom: 20,
    },
    label: {
      fontWeight: '700',
      fontSize: 14,
      marginBottom: 8,
      color: theme.subtitle,
    },
    dropdown: {
      borderColor: theme.brandSoft,
      borderWidth: 1,
      marginBottom: 10,
    },
    dropdownText: {
      color: theme.textPrimary,
    },
    dropdownContainer: {
      borderColor: theme.brandSoft,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.brandSoft,
      borderRadius: 6,
      padding: 12,
      marginBottom: 10,
      color: theme.textPrimary,
    },
    error: {
      color: theme.error,
      fontSize: 12,
      marginBottom: 8,
    },
  });
}

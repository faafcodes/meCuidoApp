import { StyleSheet } from 'react-native';

export default function getStyles(theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: 30,
      paddingTop: 40,
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
      color: theme.subtitle,
    },
    labelComTooltip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginBottom: 8,
    },
    dropdown: {
      borderColor: theme.brandSoft,
      borderWidth: 1,
      borderRadius: 6,
      marginBottom: 10,
    },
    dropdownText: {
      color: theme.textPrimary,
    },
    dropdownContainer: {
      borderColor: theme.brandSoft,
    },
    botaoContainer: {
      marginTop: 20,
      alignItems: 'center',
      marginBottom: 40,
    },
  });
}

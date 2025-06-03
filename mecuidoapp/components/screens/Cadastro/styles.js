import { StyleSheet } from 'react-native';

export default function getStyles(theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: 30,
      paddingTop: 20,
      paddingBottom: 20,
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
      fontSize: 16,
      color: theme.subtitle,
    },
    labelComTooltip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginBottom: 8,
    },
    botaoContainer: {
      marginTop: 20,
      alignItems: 'center',
      marginBottom: 40,
    },

    link: {
      color: theme.brandMain,
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 20, // igual ao do texto base
      textAlignVertical: 'center', // pode ajudar no Android
    },
    softBrand: {
      fontWeight: '600',
    },
  });
}

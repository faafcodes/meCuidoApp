export default function getStyles(theme) {
  return {
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 16,
    },
    scrollContent: {
      paddingBottom: 24,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme.brandMain,
      marginBottom: 16,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.textPrimary,
      marginTop: 16,
      marginBottom: 6,
    },
    text: {
      fontSize: 16,
      color: theme.textSecondary,
      lineHeight: 22,
    },
    brand: {
      color: theme.brand,
      fontWeight: 'bold',
    },
  };
}

export default function getStyles(theme) {
  return {
    checkboxContainer: {
      marginBottom: 30,
    },
    checkboxRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkbox: {
      width: 22,
      height: 22,
      borderWidth: 1,
      borderColor: theme.brandSoft,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    checkboxChecked: {
      width: 12,
      height: 12,
      backgroundColor: theme.brandMain,
      borderRadius: 2,
    },
    checkboxLabel: {
      fontSize: 16,
      color: theme.subtitle,
      flex: 1,
    },
    errorText: {
      color: theme.error,
      fontSize: 16,
      marginTop: 4,
      marginLeft: 28,
    },
  };
}

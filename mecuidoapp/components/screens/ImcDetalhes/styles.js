import { StyleSheet } from 'react-native';

export default function getStyles(theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    pickerStyle: {
      inputIOS: {
        padding: 12,
        backgroundColor: theme.inputBackground,
        borderRadius: 8,
        color: theme.textPrimary,
        marginHorizontal: 16,
        marginTop: 16,
      },
      inputAndroid: {
        padding: 12,
        backgroundColor: theme.inputBackground,
        borderRadius: 8,
        color: theme.textPrimary,
        marginHorizontal: 16,
        marginTop: 16,
      },
      placeholder: {
        color: theme.textSecondary,
      },
    },
    itemContainer: {
      borderWidth: 1,
      borderRadius: 8,
      padding: 16,
      marginHorizontal: 16,
      marginTop: 12,
      borderColor: theme.border,
    },
    itemTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.textPrimary,
    },
    itemDescription: {
      fontSize: 14,
      marginTop: 4,
      color: theme.textSecondary,
    },
    listContent: {
      paddingBottom: 16,
    },
  });
}

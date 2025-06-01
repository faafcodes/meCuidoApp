import { StyleSheet } from 'react-native';

export default function getStyles(theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.background,
    },
    picker: {
      backgroundColor: theme.pickerBackground,
      color: theme.agua,
      borderRadius: 8,
      marginVertical: 12,
      marginBottom: 16,
    },
    pickerItem: {
      height: 44,
    },
    item: {
      paddingVertical: 8,
      paddingHorizontal: 0,
      marginBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0, 0, 0, 0.1)', // borda suave, pode ajustar a cor conforme o tema
    },
    itemFaixa: {
      fontSize: 16,
      color: theme.textPrimary,
      marginBottom: 4,
    },
    itemRecomendacao: {
      fontSize: 16,
      color: theme.textSecondary,
    },
    recomendacaoValor: {
      color: theme.agua,
      fontWeight: 'bold',
    },
  });
}

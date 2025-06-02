import { StyleSheet } from 'react-native';

export default (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: theme.background,
      paddingHorizontal: 30,
      paddingTop: 40,
    },
    inputGroup: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.subtitle,
      marginBottom: 8,
    },
    input: {
      height: 40,
      borderColor: theme.brandSoft,
      borderWidth: 1,
      borderRadius: 6,
      paddingHorizontal: 10,
      color: theme.textPrimary,
    },
    botaoSalvar: {
      backgroundColor: theme.brandMain,
      paddingVertical: 15,
      borderRadius: 6,
      alignItems: 'center',
      marginTop: 20,
    },
    textoBotaoSalvar: {
      color: theme.textPrimary,
      fontWeight: 'bold',
      fontSize: 16,
    },

    subtituloContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 4,
      marginBottom: 12,
    },
    subtituloTexto: {
      marginLeft: 4,
      color: theme.subtitle,
      fontSize: 16,
    },
    subtituloTextoNegrito: {
      fontWeight: 'bold',
    },
  });

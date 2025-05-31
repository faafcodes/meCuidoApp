import { StyleSheet } from 'react-native';

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingTop: 60,
    },
    topBorder: {
      borderTopWidth: 1,
      borderTopColor: theme.mode === 'light' ? '#f2f2f2' : '#2e2e2e',
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.mode === 'light' ? '#f2f2f2' : '#2e2e2e',
    },
    icon: {
      color: theme.brandMain,
      marginRight: 16,
    },
    texto: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.brandMain,
    },
    versao: {
      position: 'absolute',
      bottom: 20,
      alignSelf: 'center',
      fontSize: 12,
      color: theme.subtitle,
    },
    voltar: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 16,
      marginBottom: 24,
    },
    voltarTexto: {
      marginLeft: 8,
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.subtitle,
    },
  });

export default getStyles;

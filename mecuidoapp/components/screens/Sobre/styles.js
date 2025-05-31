import { StyleSheet } from 'react-native';

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingTop: 60,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 16,
      marginBottom: 20,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.subtitle,
      marginLeft: 8,
    },
    content: {
      paddingHorizontal: 24,
      paddingBottom: 40,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'start',
      paddingHorizontal: 24,
      paddingBottom: 40,
    },

    paragraph: {
      fontSize: 16,
      lineHeight: 24,
      color: theme.textSecondary,
      marginBottom: 24,
    },
    destaqueVerde: {
      color: theme.brandMain,
      fontWeight: 'bold',
    },
    negrito: {
      fontWeight: 'bold',
      color: theme.subtitle,
    },
    titulo: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.subtitle,
      marginBottom: 16,
      textAlign: 'center',
    },
    alunoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    avatar: {
      width: 43,
      height: 42,
      borderRadius: 16,
      marginRight: -10,
      zIndex: 10,
    },
    nomeBox: {
      backgroundColor: theme.brandMain,
      borderRadius: 20,
      paddingVertical: 6,
      paddingLeft: 20,
      flex: 1,
    },
    nomeTexto: {
      color: theme.white,
      fontWeight: 'bold',
      fontSize: 20,
    },
    rodape: {
      textAlign: 'center',
      fontSize: 12,
      color: theme.subtitle,
      marginTop: 32,
    },
  });

export default getStyles;

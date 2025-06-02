import { StyleSheet } from 'react-native';

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 150,
      backgroundColor: theme.background,
      paddingHorizontal: 30,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.textPrimary,
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      color: theme.textPrimary,
      marginBottom: 8,
    },
    inputContainer: {
      borderWidth: 1,
      borderColor: theme.brandSoft,
      borderRadius: 8,
      marginBottom: 16,
      paddingHorizontal: 8,
    },
    input: {
      height: 40,
      color: theme.textPrimary,
    },
    modalBackground: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      backgroundColor: theme.background,
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      maxWidth: '90%',
      maxHeight: '80%',
    },
    modalTitle: {
      fontSize: 50,
      fontWeight: 'bold',
      color: theme.brandAccent,
      marginBottom: 10,
    },
    modalText: {
      fontSize: 16,
      color: theme.textPrimary,
      marginBottom: 20,
    },
    modalButton: {
      backgroundColor: theme.brandAccent,
      padding: 10,
      borderRadius: 8,
    },
    modalButtonText: {
      color: theme.white,
      fontSize: 14,
      fontWeight: 'bold',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)', // sombra escura atrás do modal
      justifyContent: 'center', // centraliza verticalmente
      alignItems: 'center', // centraliza horizontalmente
    },
    modalContent: {
      backgroundColor: theme.background || '#fff',
      padding: 20,
      borderRadius: 10,
      width: '80%', // largura fixa proporcional à tela
      maxWidth: 400, // máximo para telas maiores
      alignItems: 'center',
      // shadow para iOS (opcional)
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      // elevação para Android (opcional)
      elevation: 5,
    },
  });

export default getStyles;

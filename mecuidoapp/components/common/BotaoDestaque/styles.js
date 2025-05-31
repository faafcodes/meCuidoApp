// styles.js
export default function getStyles(theme) {
  return {
    botaoEntrar: {
      backgroundColor: theme.brandMain,
      paddingVertical: 10,
      paddingHorizontal: 80,
      borderRadius: 25,
      alignItems: 'center',
      marginTop: 30,
      marginBottom: 30,
    },
    textoBotao: {
      color: theme.white,
      fontWeight: 'bold',
      fontSize: 20,
    },
  };
}

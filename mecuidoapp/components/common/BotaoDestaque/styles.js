import { Dimensions } from 'react-native';

export default function getStyles(theme) {
  const { width, height } = Dimensions.get('window');
  const buttonWidth = width * 0.8;
  const buttonHeight = width * 0.12;
  const buttonText = width * 0.07;
  return {
    botaoDestaque: {
      backgroundColor: theme.brandMain,
      width: buttonWidth,
      height: buttonHeight,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 30,
      marginBottom: 30,
    },
    textoBotao: {
      color: theme.white,
      fontWeight: 'bold',
      fontSize: buttonText,
    },
  };
}
